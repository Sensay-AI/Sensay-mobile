import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, Platform, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Icon, Screen, Text, TitleWithBackButton } from "app/components"
import { colors, spacing } from "../../theme"
import { useStores } from "../../models"
import Autocomplete from "react-native-autocomplete-input"
import { translate } from "../../i18n"
import { PathwayVocabLessonCategorySnapshotIn } from "../../models/StructurePathwayVocabLesson/PathwayVocabLessonCategory"
import { StructurePathwayStackScreenProps } from "../../navigators/StructurePathwayStackNavigator"
import { levelNumberToText } from "../../utils/stringHelper"

interface StructurePathwayVocabLessonScreenProps extends StructurePathwayStackScreenProps<"VocabLesson"> {
}

function filterMovies(data: PathwayVocabLessonCategorySnapshotIn[], query?: string, isFocused?: boolean): PathwayVocabLessonCategorySnapshotIn[] {
  if (!query && isFocused) {
    return data
  }
  if (!query || !data.length) {
    return []
  }
  try {
    const regex = new RegExp(`${query.trim()}`, "i")
    return data.filter((item) => item.category_name.search(regex) >= 0)
  } catch (e) {
    console.error(e)
  }
  return []
}

function compareTitle(firstTitle: string, secondTitle: string) {
  return firstTitle.toLowerCase() === secondTitle.toLowerCase().trim()
}

export const StructurePathwayVocabLessonScreen: FC<StructurePathwayVocabLessonScreenProps> = observer(function StructurePathwayVocabLessonScreen(
  _props,
) {
  const { navigation, route } = _props
  const {
    languageSettingStore: { getLearningLanguage },
    pathwayVocabLessonStore: { fetchCategory },
  } = useStores()
  const [history, setLessonCategoryHistory] = useState<PathwayVocabLessonCategorySnapshotIn[]>([])
  const [query, setQuery] = useState("")
  const [isAutoCompleteFocused, setIsAutoCompleteFocused] = useState(false)
  const isLoading = !history.length
  const queriedCategory = React.useMemo(
    () => filterMovies(history, query, isAutoCompleteFocused),
    [history, query, isAutoCompleteFocused],
  )

  const suggestions: PathwayVocabLessonCategorySnapshotIn[] = React.useMemo(
    () =>
      queriedCategory.length === 1 && compareTitle(queriedCategory[0].category_name, query)
        ? [] // Close suggestion list in case movie title matches query
        : queriedCategory,
    [queriedCategory, query],
  )

  const placeholder = isLoading
    ? translate("structurePathway.vocabLesson.autoCompletePlaceholderLoading")
    : translate("structurePathway.vocabLesson.autoCompletePlaceholderAfterLoading")

  useEffect(() => {
    (async function fetchMovies() {
      await fetchCategory().then(value => {
        if (value.kind === "ok") {
          setLessonCategoryHistory(value.categories)
        }
      })
    })()
  }, [])


  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
      <TitleWithBackButton
        title={"structurePathway.vocabLesson.title"}
        txOptions={{ lang: getLearningLanguage, level: levelNumberToText[route.params.level] }}
        onPressBackButton={() => navigation.push("StructurePathwaySelectLessonAndLevel")}
      />
      { Platform.OS === "android" && <Text tx={"structurePathway.vocabLesson.enterTheContext"} />}
      <View style={$container}>
        <View style={$autocompleteContainer}>
          <Autocomplete
            style={$autoCompleteTextStyle}
            containerStyle={$autoCompleteContainerStyle}
            // editable={!isLoading}
            autoCorrect={false}
            data={suggestions}
            value={query}
            onChangeText={setQuery}
            placeholder={placeholder}
            flatListProps={{
              keyboardShouldPersistTaps: "always",
              keyExtractor: (item: PathwayVocabLessonCategorySnapshotIn) => item.id.toString(),
              renderItem: ({ item }) => (
                <TouchableOpacity onPress={() => {
                  setQuery(item.category_name)
                  navigation.push("DetailVocabLessonFromHistory", {
                    level: route.params.level,
                    categoryName: item.category_name,
                    categoryId: item.id,
                    isFromDetailScreen: false,
                  })
                }}>
                  <Text style={$itemText} text={item.category_name.toString()}></Text>
                </TouchableOpacity>
              ),
              scrollEnabled: true,
            }}
            onSubmitEditing={() => {
              navigation.push("DetailVocabLesson", {
                level: route.params.level,
                query,
              })
            }}
            onFocus={() => setIsAutoCompleteFocused(true)}
          />
          <Icon
            style={$sentChat}
            size={30}
            color={query && colors.tint || colors.palette.neutral400}
            onPress={
              () => {
                navigation.push("DetailVocabLesson", { level: route.params.level, query })
              }
            }
            icon="sentChat"
          />
        </View>
      </View>
    </Screen>
  )
})

const $screenContainer: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
const $autoCompleteContainerStyle: ViewStyle = {
  width: "100%",
}
const $sentChat: ImageStyle = {
  marginTop: spacing.xxs,
}
const $container: ViewStyle = {
  position: "relative",
  backgroundColor: colors.background,
  flex: 1,

  // Android requires padding to avoid overlapping
  // with content and autocomplete
  paddingTop: 50,

  // Make space for the default top bar
  ...Platform.select({
    android: {
      marginTop: 25,
    },
    default: {
      marginTop: 0,
    },
  }),
}
const $autocompleteContainer: ViewStyle = {
  // Hack required to make the autocomplete
  // work on Android
  flex: 1,
  left: 0,
  position: "absolute",
  right: 0,
  top: 0,
  zIndex: 1,
  padding: 5,
  flexDirection: "row",
  paddingHorizontal: spacing.sm,
  ...Platform.select({
    android: {
      marginLeft: spacing.sm,
    },
  }),
}
const $itemText: TextStyle = {
  fontSize: 15,
  margin: 2,
}
const $autoCompleteTextStyle: TextStyle = {
  fontSize: 15,
  margin: 2,
  color: colors.text
}