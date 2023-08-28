import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import {
  ImageBackground,
  ViewStyle,
  View,
  TextStyle,
  FlatList,
} from "react-native"
import { Button, ButtonAccessoryProps, Icon, Screen, SensayAiLanguageInfoTop } from "app/components"
import { MainTabScreenProps } from "../../navigators/MainTabNavigator"
import { colors, spacing } from "../../theme"
import { stonePath } from "../../utils/images"
import { TxKeyPath } from "../../i18n"
import { useStores } from "../../models"
import { notEmpty } from "../../utils/notEmpty"


type LessonType = "vocab" | "grammar" | "writing" | "reading" | "listening" | "speaking" | "quest"

interface LessonMetadata {
  lessonName: TxKeyPath,
  disable: boolean
  level?: number,
  type: LessonType
}

interface LessonItem {
  item: LessonMetadata
  sectionIndex: number
  handleNavigateLesson?: (type: LessonType, level: number) => void
}

function mapIndexToPattern(n: number) {
  return n % 4 === 3 ? 1 : n % 4
}

const DATA: LessonMetadata[] = [
  {
    lessonName: "structurePathway.levelSelection.vocab1",
    disable: false,
    type: "vocab",
    level: 1,
  },
  {
    lessonName: "structurePathway.levelSelection.vocab2",
    disable: false,
    type: "vocab",
    level: 2,
  },
  {
    lessonName: "structurePathway.levelSelection.vocab3",
    disable: false,
    type: "vocab",
    level: 3,
  },
  {
    lessonName: "structurePathway.levelSelection.grammar1",
    disable: true,
    type: "grammar",
    level: 2,
  },
  {
    lessonName: "structurePathway.levelSelection.writing1",
    disable: true,
    type: "writing",
    level: 1,
  },
  {
    lessonName: "structurePathway.levelSelection.reading1",
    disable: true,
    type: "reading",
    level: 1,
  },
  {
    lessonName: "structurePathway.levelSelection.listening1",
    disable: true,
    type: "listening",
    level: 1,
  },
  {
    lessonName: "structurePathway.levelSelection.speaking1",
    disable: true,
    type: "speaking",
    level: 1,
  },
  {
    lessonName: "structurePathway.levelSelection.quest1",
    disable: true,
    type: "quest",
    level: 1,
  },
  {
    lessonName: "structurePathway.levelSelection.grammar2",
    disable: true,
    type: "grammar",
    level: 2,
  },
  {
    lessonName: "structurePathway.levelSelection.writing2",
    disable: true,
    type: "writing",
    level: 2,
  },
]
const VocabIcon = (props: ButtonAccessoryProps) => (
  <Icon
    containerStyle={props.style}
    size={props.pressableState.pressed ? 30 : 20}
    color={props.pressableState.pressed && colors.tint || colors.palette.neutral400}
    icon="vocab"
  />
)
const GrammarIcon = (props: ButtonAccessoryProps) => (
  <Icon
    containerStyle={props.style}
    size={props.pressableState.pressed ? 30 : 20}
    color={props.pressableState.pressed && colors.tint || colors.palette.neutral400}
    icon="grammar"
  />
)
const WritingIcon = (props: ButtonAccessoryProps) => (
  <Icon
    containerStyle={props.style}
    size={props.pressableState.pressed ? 30 : 20}
    color={props.pressableState.pressed && colors.tint || colors.palette.neutral400}
    icon="writing"
  />
)
const ReadingIcon = (props: ButtonAccessoryProps) => (
  <Icon
    containerStyle={props.style}
    size={props.pressableState.pressed ? 30 : 20}
    color={props.pressableState.pressed && colors.tint || colors.palette.neutral400}
    icon="reading"
  />
)
const SpeakingIcon = (props: ButtonAccessoryProps) => (
  <Icon
    containerStyle={props.style}
    size={props.pressableState.pressed ? 30 : 20}
    color={props.pressableState.pressed && colors.tint || colors.palette.neutral400}
    icon="speaking"
  />
)
const ListeningIcon = (props: ButtonAccessoryProps) => (
  <Icon
    containerStyle={props.style}
    size={props.pressableState.pressed ? 30 : 20}
    color={props.pressableState.pressed && colors.tint || colors.palette.neutral400}
    icon="listening"
  />
)
const QuestIcon = (props: ButtonAccessoryProps) => (
  <Icon
    containerStyle={props.style}
    size={props.pressableState.pressed ? 30 : 20}
    color={props.pressableState.pressed && colors.tint || colors.palette.neutral400}
    icon="quest"
  />
)

function iconFactory(type: LessonType) {
  switch (type) {
    case "vocab":
      return VocabIcon
    case "grammar":
      return GrammarIcon
    case "writing":
      return WritingIcon
    case "reading":
      return ReadingIcon
    case "listening":
      return ListeningIcon
    case "speaking":
      return SpeakingIcon
    case "quest":
      return QuestIcon
  }
}

const SelectLevelButtonListItem: FC<LessonItem> = ({ item, sectionIndex, handleNavigateLesson }) => {
  let containerStyle: ViewStyle
  switch (mapIndexToPattern(sectionIndex)) {
    case 0:
      containerStyle = $riverContainerStart
      break
    case 1:
      containerStyle = $riverContainerMiddle
      break
    case 2:
      containerStyle = $riverContainerEnd
      break
  }
  const rightIcon = iconFactory(item.type)
  return (
    <View style={containerStyle}>
      <Button
        style={item.disable ? $disabledButton : $button}
        disabled={item.disable}
        tx={item.lessonName}
        textStyle={$buttonText}
        RightAccessory={rightIcon}
        onPress={() => handleNavigateLesson(item.type, item.level)}
      />
    </View>
  )
}
export const StructurePathwayLevelScreen: FC<MainTabScreenProps<"StructurePathway">> = observer(function StructurePathwayLevelScreen(
  _props,
) {
  const { languageSettingStore: { getLearningLanguage } } = useStores()
  const { navigation } = _props
  const handleNavigateLesson = (type: LessonType, level = 1) => {
    navigation.push("VocabLesson", { level })
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
      <SensayAiLanguageInfoTop
        onPressText={() => navigation.push("MainTab", { screen: "HomePage" })}
        isIconOnTopRight={true}
      />
      {
        notEmpty(getLearningLanguage) &&
        <View style={$imageBackgroundContainer}>
          <ImageBackground source={stonePath} resizeMode="stretch" style={$imageBackground}>
            <FlatList<LessonMetadata>
              contentContainerStyle={$flatListContentContainer}
              data={DATA}
              keyExtractor={(item) => item.lessonName}
              renderItem={({ item, index: sectionIndex }) => (
                <SelectLevelButtonListItem {...{ item, sectionIndex, handleNavigateLesson }} />
              )}
            />
          </ImageBackground>
        </View>
      }
    </Screen>
  )
})

const $screenContainer: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
  flex: 1,
}
const $imageBackgroundContainer: ViewStyle = {
  flex: 1,
}

const $imageBackground: ViewStyle = {
  flex: 1,
  height: "100%",
}
const $riverContainerStart: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-start",
  borderRadius: 20,
  paddingVertical: spacing.md,
}
const $riverContainerMiddle: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  borderRadius: 20,
  paddingVertical: spacing.md,
}
const $riverContainerEnd: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-end",
  borderRadius: 20,
  paddingVertical: spacing.md,
}
const $button: ViewStyle = {
  backgroundColor: colors.palette.neutral700,
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 20,
  marginHorizontal: 10,
}
const $disabledButton: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 20,
  marginHorizontal: 10,
}
const $buttonText: TextStyle = {
  fontWeight: "bold",
  color: colors.palette.primary400,
}
const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
}