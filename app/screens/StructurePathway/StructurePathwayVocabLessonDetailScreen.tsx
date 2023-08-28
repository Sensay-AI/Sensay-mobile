import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { ListItem, Screen, Text, TitleWithBackButton } from "app/components"
import { colors, spacing } from "../../theme"
import { useStores } from "../../models"
import { fetch } from "react-native-fetch-api"
import { StructurePathwayStackScreenProps } from "../../navigators/StructurePathwayStackNavigator"
import { handleSteamData } from "../../utils/handleSteamData"
import { levelNumberToText } from "../../utils/stringHelper"

interface StructurePathwayVocabLessonDetailScreenProps extends StructurePathwayStackScreenProps<"DetailVocabLesson"> {
}

export const StructurePathwayVocabLessonDetailScreen: FC<StructurePathwayVocabLessonDetailScreenProps> = observer(function StructurePathwayVocabLessonDetailScreen(
  _props,
) {
  const { navigation, route } = _props
  const {
    languageSettingStore: { getLearningLanguage, getDisplayLanguage },
    authenticationStore: { accessToken },
    imageLessonStore: { currentSelectedImage },
  } = useStores()
  const [lesson, setLesson] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSeeTranslation, setIsSeeTranslation] = useState(false)

  async function* fetchData() {
    setLoading(true)
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}lesson/vocabulary/question`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          "category": route.params.query,
          "level": route.params.level,
          "translated_language": getDisplayLanguage,
          "learning_language": getLearningLanguage,
          "num_questions": 5,
          "num_answers": 4,
        }),
        reactNative: { textStreaming: true },
      },
    )
    yield* handleSteamData(response)
    setLoading(false)
  }

  const onSendChat = async () => {
    setLesson("")
    let isLessonAppear = false
    let isQuestionAppear = false
    let tempLine = ""
    let lineCount = 0
    const searchValueOfLesson = "\"lesson\":"
    for await (const line of fetchData()) {
      console.debug(line)
      tempLine = line
      if (line.includes(searchValueOfLesson)) {
        isLessonAppear = !isLessonAppear
        lineCount++
        console.debug("first line", line)
        console.debug("lineCount:", lineCount)
      }
      if (line.includes("questions")) {
        isQuestionAppear = !isQuestionAppear
      }
      if (isLessonAppear && !isQuestionAppear) {
        setLesson(oldString => {
          const processedLine = lineCount === 1 ? line.replace(searchValueOfLesson, "").replace("\"", "").trimStart() : line
          return oldString + processedLine
        })
      }
    }
    setLesson(oldString => {
      const res = oldString.charAt(oldString.length - 1)
      if (res === "\",") {
        return oldString.substring(0, oldString.length - 2)
      }
      return oldString
    })
    const message = JSON.parse(tempLine.substring(tempLine.indexOf("{"), tempLine.length).replaceAll("'", "\""))
    navigation.push(
      "DetailVocabLessonFromHistory",
      {
        categoryName: route.params.query,
        level: route.params.level,
        categoryId: message.category_id,
        isFromDetailScreen: true,
        isFromImageLesson: route.params.isFromImageLesson,
      })
  }

  useEffect(() => {
    onSendChat()
  }, [])

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
      <TitleWithBackButton
        title={"structurePathway.vocabLesson.title"}
        txOptions={{ lang: getLearningLanguage, level: levelNumberToText[route.params.level] }}
        onPressBackButton={() => navigation.push("VocabLesson", { level: route.params.level })}
      />

      {route.params.isFromImageLesson && <Image
        source={{ uri: currentSelectedImage.full_url }}
        resizeMode={"cover"}
        style={{ width: "100%", height: undefined, aspectRatio: 1} as ImageStyle}
      />}

      {!loading && <ActivityIndicator />}

      {loading && <View>
        <View style={$backButtonContainerStyle}>
          <Text
            tx={"structurePathway.vocabLesson.contextTitle"}
            txOptions={{ context: route.params.query }}
            style={$contextTitle}
          />
        </View>
        <View style={$titleContainerStyle}>
          {loading && <Text tx={"common.fetchingData"} />}
          {loading && <ActivityIndicator />}
        </View>

        <View>
          <ListItem
            text={lesson}
            bottomSeparator={true}
            containerStyle={$lessonContainer} />
          <View style={$reloadIcon}>
            <Text
              tx={"structurePathway.vocabLesson.pleaseWait"}
              onPress={() => setIsSeeTranslation(!isSeeTranslation)}
              style={$pleaseWaitText}
            />
          </View>
          {loading && <ActivityIndicator />}
        </View>
      </View>}
    </Screen>
  )
})

const $screenContainer: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
const $backButtonContainerStyle: ViewStyle = {
  flexDirection: "row",
}
const $titleContainerStyle: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignContent: "center",
}
const $contextTitle: TextStyle = {
  paddingLeft: spacing.md,
}
const $pleaseWaitText: TextStyle = {
  fontSize: 12,
}
const $reloadIcon: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "flex-end",
  paddingRight: spacing.md,
}
const $lessonContainer: ViewStyle = {
  backgroundColor: colors.palette.primary200,
  paddingVertical: 8,
  paddingHorizontal: spacing.md,
  borderRadius: 20,
  marginHorizontal: 10,
  marginBottom: spacing.sm,
}