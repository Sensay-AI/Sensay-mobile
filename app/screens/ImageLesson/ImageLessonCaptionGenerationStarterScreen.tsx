import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import {
  Button,
  CaretRightIcon, EmptyState,
  ListItem,
  Screen,
  SensayAiLanguageInfoTop, Text,
  TitleWithBackButton,
} from "app/components"
import { colors, spacing } from "../../theme"
import { MainTabScreenProps } from "../../navigators/MainTabNavigator"
import { useStores } from "../../models"
import { handleSteamData } from "../../utils/handleSteamData"
import { fetch } from "react-native-fetch-api"
import { capitalizeFirstLetter } from "../../utils/stringHelper"
import { notEmpty } from "../../utils/notEmpty"
import Config from "../../config"


interface ImageLessonCaptionGenerationStarterScreenProps extends MainTabScreenProps<"ImageLesson"> {
}

export const ImageLessonCaptionGenerationStarterScreen: FC<ImageLessonCaptionGenerationStarterScreenProps> = observer(function ImageLessonCaptionGenerationStarterScreen(
  _props,
) {
  const { navigation } = _props
  const [loading, setLoading] = useState(false)

  const [lesson, setLesson] = useState("")
  const [vocabLessonQuery, setVocabLessonQuery] = useState("")

  const {
    imageLessonStore: { currentSelectedImage },
    languageSettingStore: { getLearningLanguage, getDisplayLanguage },
    authenticationStore: { accessToken },
  } = useStores()

  async function* fetchData() {
    setLoading(true)
    const response = await fetch(`${Config.API_URL}image/caption`,
      {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          "image_bucket_path_key": currentSelectedImage.s3_bucket_path_key,
          "learning_language": getDisplayLanguage,
          "primary_language": getLearningLanguage,
        }),
        reactNative: { textStreaming: true },
      },
    )
    yield* handleSteamData(response)
    setLoading(false)
  }

  const onReceiveSteamingImageCaption = async () => {
    setLesson("")
    let lines = ""
    const notRenderCharacters = /[{},"]/g
    for await (const line of fetchData()) {
      console.debug(line)
      lines += line
      setLesson(oldString => {
        const processedLine = line.replace(notRenderCharacters, "").trimStart()
        return oldString + processedLine
      })
    }
    try {
      const fullMessage = JSON.parse(lines.substring(lines.indexOf("{"), lines.length).replaceAll("'", "\""))
      console.debug(fullMessage)
      setLesson(`${capitalizeFirstLetter(getLearningLanguage)} : ${fullMessage[getLearningLanguage]}\n${capitalizeFirstLetter(getDisplayLanguage)} : ${fullMessage[getDisplayLanguage]}`)
      setVocabLessonQuery(fullMessage[getLearningLanguage])
    } catch (e) {
      setVocabLessonQuery(lesson)
    }
  }

  useEffect(() => {
    onReceiveSteamingImageCaption()
  }, [])

  return (
    <Screen contentContainerStyle={$root} preset="scroll" safeAreaEdges={["top"]}>
      <TitleWithBackButton
        title={"imageLessonScreen.captionGenerationStarter.title"}
        onPressBackButton={() => navigation.push("UploadImage")}
      />
      <SensayAiLanguageInfoTop
        onPressText={() => navigation.push("MainTab", { screen: "HomePage" })}
        isIconOnTopRight={true}
      />
      {!currentSelectedImage &&
        <View>
          <EmptyState
            preset="generic"
            buttonOnPress={()=> navigation.goBack()}
            ImageProps={{ resizeMode: "contain" }}
          />
        </View>
      }
      {currentSelectedImage &&
      <View>
        <Image
          source={{ uri: currentSelectedImage.full_url }}
          resizeMode={"cover"}
          style={{ width: "100%", height: undefined, aspectRatio: 1, marginVertical: spacing.sm } as ImageStyle}
        />
        {loading &&
          <View style={$fetchingDataTextStyle}>
            <Text tx={"imageLessonScreen.captionGenerationStarter.pleaseWait"} />
            <ActivityIndicator />
          </View>
        }
        {
          notEmpty(lesson) && <ListItem
            text={lesson}
            bottomSeparator={true}
            containerStyle={$lessonContainer} />
        }
        {
          notEmpty(lesson) && <Button
            style={$button}
            tx={"imageLessonScreen.captionGenerationStarter.vocabLessonEasy"}
            txOptions={{ lang: getLearningLanguage }}
            textStyle={$buttonText}
            LeftAccessory={CaretRightIcon}
            onPress={() => navigation.push("DetailVocabLesson", {
              query: vocabLessonQuery || lesson,
              level: 1,
              isFromImageLesson: true
            })}
          />
        }
        {
          notEmpty(lesson) && <Button
            style={$button}
            tx={"imageLessonScreen.captionGenerationStarter.vocabLessonIntermediate"}
            txOptions={{ lang: getLearningLanguage }}
            textStyle={$buttonText}
            LeftAccessory={CaretRightIcon}
            onPress={() => navigation.push("DetailVocabLesson", {
              query: vocabLessonQuery || lesson,
              level: 2,
              isFromImageLesson: true
            })}
          />
        }
        {
          notEmpty(lesson) && <Button
            style={$button}
            tx={"imageLessonScreen.captionGenerationStarter.vocabLessonAdvanced"}
            txOptions={{ lang: getLearningLanguage }}
            textStyle={$buttonText}
            LeftAccessory={CaretRightIcon}
            onPress={() => navigation.push("DetailVocabLesson", {
              query: vocabLessonQuery || lesson,
              level: 3,
              isFromImageLesson: true
            })}
          />
        }
      </View>
      }
    </Screen>
  )
})

const $root: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
const $lessonContainer: ViewStyle = {
  backgroundColor: colors.palette.primary200,
  paddingVertical: 8,
  paddingHorizontal: spacing.md,
  borderRadius: 20,
  marginHorizontal: 10,
  marginBottom: spacing.sm,
}
const $fetchingDataTextStyle: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignContent: "center",
}
const $buttonText: TextStyle = {
  fontWeight: "bold",
  color: colors.palette.primary400,
  alignSelf: "flex-start",
  alignContent: "flex-start",
}
const $button: ViewStyle = {
  backgroundColor: colors.palette.neutral700,
  paddingVertical: 8,
  paddingHorizontal: spacing.xs,
  paddingRight: spacing.xl,
  borderRadius: 20,
  marginHorizontal: 10,
  marginBottom: spacing.sm,
  justifyContent: "flex-start"
}