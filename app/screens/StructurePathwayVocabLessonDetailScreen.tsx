import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, TextStyle, View, ViewStyle } from "react-native"
import { Icon, ListItem, Screen, Text } from "app/components"
import { colors, spacing } from "../theme"
import { StructurePathwayStackScreenProps } from "../navigators/MainTabNavigator"
import { useStores } from "../models"
import { fetch } from "react-native-fetch-api"

interface StructurePathwayVocabLessonDetailScreenProps extends StructurePathwayStackScreenProps<"DetailVocabLesson"> {
}

export const StructurePathwayVocabLessonDetailScreen: FC<StructurePathwayVocabLessonDetailScreenProps> = observer(function StructurePathwayVocabLessonDetailScreen(
  _props,
) {
  const { navigation, route } = _props
  const {
    languageSettingStore: { getLearningLanguage, getDisplayLanguage },
    authenticationStore: { accessToken }, } = useStores()
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
    const utf8Decoder = new TextDecoder("utf-8")
    const reader = response.body.getReader()
    let { value: chunk, done: readerDone } = await reader.read()
    chunk = chunk ? utf8Decoder.decode(chunk) : ""
    const newline = /\r?\n/gm
    let startIndex = 0
    while (true) {
      const result = newline.exec(chunk)
      if (!result) {
        if (readerDone) break
        const remainder = chunk.substr(startIndex);
        ({ value: chunk, done: readerDone } = await reader.read())
        chunk = remainder + (chunk ? utf8Decoder.decode(chunk) : "")
        startIndex = newline.lastIndex = 0
        continue
      }
      yield chunk.substring(startIndex, result.index)
      startIndex = newline.lastIndex
    }
    if (startIndex < chunk.length) {
      // Last line didn't end in a newline char
      yield chunk.substr(startIndex)
    }
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
      const res = oldString.charAt(oldString.length - 1);
      if (res==="\",") {
        return oldString.substring(0, oldString.length-2);
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
      })
  }

  useEffect(() => {
    onSendChat()
  }, [])

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
      <View style={$backButtonContainerStyle}>
        <Icon
          size={30}
          color={colors.tint}
          onPress={() => navigation.goBack()}
          icon="back"
          containerStyle={$backIcon}
        />
        <View style={$titleContainerStyle}>
          <Text
            style={$title}
            preset="heading"
            tx={"structurePathway.vocabLesson.title"}
            txOptions={{ lang: getLearningLanguage, level: route.params.level }}
          />
        </View>
      </View>
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
          {loading && <Text>Fetching data...</Text>}
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
const $title: TextStyle = {
  marginBottom: spacing.lg,
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
const $backIcon: ViewStyle = {
  paddingTop: spacing.xxs,
}