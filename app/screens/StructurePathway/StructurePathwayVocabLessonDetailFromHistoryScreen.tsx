import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, CaretRightIcon, Icon, ListItem, Screen, Text, TitleWithBackButton } from "app/components"
import { colors, spacing } from "../../theme"
import { useStores } from "../../models"
import { useMap } from "../../utils/useMap"
import { StructurePathwayStackScreenProps } from "../../navigators/StructurePathwayStackNavigator"
import { levelNumberToText } from "../../utils/stringHelper"

interface StructurePathwayVocabLessonDetailScreenProps extends StructurePathwayStackScreenProps<"DetailVocabLessonFromHistory"> {
}

export const StructurePathwayVocabLessonDetailFromHistoryScreen: FC<StructurePathwayVocabLessonDetailScreenProps> = observer(function StructurePathwayVocabLessonDetailScreenFromHistory(
  _props,
) {
  const { navigation, route } = _props
  const {
    languageSettingStore: { getLearningLanguage },
    pathwayVocabLessonStore: { fetchCategoryHistoryDetail, vocabLessonDetailFromHistory },
    imageLessonStore: { currentSelectedImage },
  } = useStores()
  const [loading, setLoading] = useState(false)
  const [isSeeTranslation, setIsSeeTranslation] = useState(false)

  const initMap = new Map<number, boolean>()

  if (vocabLessonDetailFromHistory) {
    try {
      vocabLessonDetailFromHistory
        .find(item => item.difficulty_level_id === route.params.level)
        .questions.forEach(question => {
        question.answers.forEach(answer => {
          initMap.set(answer.id, false)
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  const [isAnswerWithIdPress, isAnswerWithIdPressActions]
    = useMap(initMap)

  const getAnswerStyleWhenPress = (isCorrect: boolean) => {
    if (isCorrect) return $answerCorrectStyle
    return $answerWrongStyle
  }

  function loadLesson() {
    return async () => {
      setLoading(true)
      await fetchCategoryHistoryDetail(route.params.categoryId, getLearningLanguage)
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchCategoryHistoryDetail(route.params.categoryId, getLearningLanguage)
    setLoading(false)
  }, [])

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
      <TitleWithBackButton
        title={"structurePathway.vocabLesson.title"}
        txOptions={{ lang: getLearningLanguage, level: levelNumberToText[route.params.level] }}
        onPressBackButton={() => {
          if (route.params.isFromDetailScreen && !route.params.isFromImageLesson) {
            return navigation.push("VocabLesson", { level: route.params.level })
          }
          if (route.params.isFromImageLesson) {
            return navigation.push("UploadImage")
          }
          return navigation.goBack()
        }}
      />
      {route.params.isFromImageLesson && <Image
        source={{ uri: currentSelectedImage.full_url }}
        resizeMode={"cover"}
        style={{ width: "100%", height: undefined, aspectRatio: 1} as ImageStyle}
      />}
      <View style={$contextAndReloadContainerStyle}>
        <View style={$contextTitleContainerStyle}>
          <Text
            tx={"structurePathway.vocabLesson.contextTitle"}
            txOptions={{ context: route.params.categoryName }}
            style={$contextTitle}
          />
        </View>
        <View style={$reloadIcon}>
          <Icon
            size={30}
            color={colors.tint}
            onPress={loadLesson()}
            icon="reload"
          />
        </View>
      </View>
      <View style={$titleContainerStyle}>
        {loading && <Text tx={"common.fetchingData"}/>}
        {loading && <ActivityIndicator />}
      </View>

      {vocabLessonDetailFromHistory?.length > 0 && !loading &&
        <View>
          <ListItem
            text={isSeeTranslation ?
              vocabLessonDetailFromHistory.find(item => item.difficulty_level_id === route.params.level)?.translations[0].translated_text
              : vocabLessonDetailFromHistory.find(item => item.difficulty_level_id === route.params.level)?.prompt
          }
            bottomSeparator={true}
            containerStyle={$lessonContainer} />
          <View style={$seeTranslationContainer}>
            <Text
              tx={"structurePathway.vocabLesson.seeTranslation"}
              onPress={() => setIsSeeTranslation(!isSeeTranslation)}
            />
          </View>

          {vocabLessonDetailFromHistory
            .find(item => item.difficulty_level_id === route.params.level)
            ?.questions
            .map((question, inx) =>
            <View key={`${question.id}-${question.prompt_id}`}>
              <ListItem
                text={`${inx + 1}) ${isSeeTranslation ? question.translations[0].translated_text : question.question_text}`}
                bottomSeparator={false} key={question.id} />
              {question.answers.map(answer => {
                  return <ListItem
                    text={isSeeTranslation ? answer.translations[0].translated_text : answer.answer_text}
                    bottomSeparator={false}
                    key={answer.id}
                    containerStyle={
                      isAnswerWithIdPress.get(answer.id) ?
                        getAnswerStyleWhenPress(answer.is_correct) :
                        $answerNormalStyle
                    }
                    onPress={() => {
                      isAnswerWithIdPressActions.set(answer.id, true)
                    }}
                    textStyle={$buttonText}
                  />
                },
              )
              }
              <View style={$seeTranslationContainer}>
                <Text
                  tx={"structurePathway.vocabLesson.seeTranslation"}
                  onPress={() => setIsSeeTranslation(!isSeeTranslation)}
                />
              </View>
            </View>,
          )
          }
        </View>
      }

      {vocabLessonDetailFromHistory?.length === 0 && !loading &&
        <View>
          {!loading && <Button
            style={$button}
            tx={"structurePathway.vocabLesson.noHistoryFound"}
            txOptions={{ lang: getLearningLanguage, context: route.params.categoryName }}
            textStyle={$buttonText}
            LeftAccessory={CaretRightIcon}
            onPress={() => navigation.push("DetailVocabLesson", {
              level: route.params.level,
              query: route.params.categoryName,
            })}
          />}
          {loading && <ActivityIndicator />}
        </View>}

    </Screen>
  )
})

const $screenContainer: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
const $contextAndReloadContainerStyle: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing.md,
}
const $titleContainerStyle: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-start",
  alignContent: "flex-start",
}
const $answerNormalStyle: ViewStyle = {
  backgroundColor: colors.palette.neutral600,
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 20,
  marginHorizontal: 10,
  marginBottom: spacing.sm,
}
const $answerWrongStyle: ViewStyle = {
  backgroundColor: colors.palette.angry500,
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 20,
  marginHorizontal: 10,
  marginBottom: spacing.sm,
}
const $answerCorrectStyle: ViewStyle = {
  backgroundColor: colors.palette.primary700,
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 20,
  marginHorizontal: 10,
  marginBottom: spacing.sm,
}
const $lessonContainer: ViewStyle = {
  backgroundColor: colors.palette.primary200,
  paddingVertical: 8,
  paddingHorizontal: spacing.md,
  borderRadius: 20,
  marginHorizontal: 10,
  marginBottom: spacing.sm,
}
const $buttonText: TextStyle = {
  fontWeight: "bold",
  color: colors.palette.neutral100,
}
const $reloadIcon: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "flex-end",
}
const $seeTranslationContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "flex-end",
  paddingRight: spacing.md,
}
const $contextTitleContainerStyle: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-start",
  flex: 12,
}
const $contextTitle: TextStyle = {
  paddingLeft: spacing.md,
}
const $button: ViewStyle = {
  backgroundColor: colors.palette.neutral700,
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 20,
  marginHorizontal: 10,
}