import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, ImageBackground, Platform, TextStyle, View, ViewStyle } from "react-native"
import { Button, ListItem, Screen, SensayAiLanguageInfoTop } from "app/components"
import { MainTabScreenProps } from "../../navigators/MainTabNavigator"
import { colors, spacing } from "../../theme"
import { uploadImageBackground } from "../../utils/images"
import { TxKeyPath } from "../../i18n"
import { Asset, launchCamera, launchImageLibrary } from "react-native-image-picker"
import { useStores } from "../../models"

const IMAGE_UPLOAD_BUTTON_DATA: ImageUploadButtonMetadata[] = [
  {
    buttonOptionText: "imageLessonScreen.uploadImage.chooseFromGalleryOption",
    disable: false,
    type: "chooseFromGallery",
  },
  {
    buttonOptionText: "imageLessonScreen.uploadImage.uploadImageOption",
    disable: false,
    type: "takeAPhoto",
  },
  {
    buttonOptionText: "imageLessonScreen.uploadImage.showUploadHistoryOption",
    disable: false,
    type: "chooseFromHistory",
  },
]
type UploadImageType = "chooseFromGallery" | "takeAPhoto" | "chooseFromHistory"

interface ImageUploadButtonMetadata {
  buttonOptionText: TxKeyPath,
  disable: boolean
  type: UploadImageType
}

interface UploadImageButtonOptionItem {
  item: ImageUploadButtonMetadata
  handleOnPress?: (type: UploadImageType) => Promise<void>
}

const SelectImageButtonListItem: FC<UploadImageButtonOptionItem> = ({ item, handleOnPress }) => {
  return (
    <View>
      <Button
        style={item.disable ? $disabledButton : $button}
        disabled={item.disable}
        tx={item.buttonOptionText}
        textStyle={$buttonText}
        // RightAccessory={rightIcon}
        onPress={() => handleOnPress(item.type)}
      />
    </View>
  )
}

function getAndroidFileURI(uri: string): string {
  if (uri.startsWith("file://")) return uri
  return "file://" + uri
}

export const ImageLessonUploadImageScreen: FC<MainTabScreenProps<"ImageLesson">> = observer(
  function ImageLessonUploadImageScreen(
    _props,
  ) {
    const { navigation } = _props
    const { imageLessonStore: { uploadImage } } = useStores()

    const uploadImageFileFromImage = async (asset: Asset) => {
      const imageFile = asset
      await uploadImage(
        imageFile.fileName,
        imageFile.type,
        Platform.OS === "android" ? getAndroidFileURI(imageFile.uri) : imageFile.uri,
      )
    }

    const launchImageLibraryPicker = async () => {
      const result = await launchImageLibrary({
        mediaType: "photo",
      })
      await uploadImageFileFromImage(result.assets[0])
    }

    const launchUserPhoneCamera = async () => {
      const result = await launchCamera({
        mediaType: "photo",
      })
      await uploadImageFileFromImage(result.assets[0])
    }
    const handleOnPress = async (type: UploadImageType) => {
      switch (type) {
        case "chooseFromGallery":
          return await launchImageLibraryPicker()
        case "takeAPhoto":
          return await launchUserPhoneCamera()
        case "chooseFromHistory":
          return navigation.push("UploadImageHistory")
      }
    }

    return (
      <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$root}>
        <SensayAiLanguageInfoTop onPressText={() => navigation.push("MainTab", { screen: "HomePage" })} />
        <ListItem
          tx={"imageLessonScreen.uploadImage.introduction"}
          containerStyle={$introductionContainer} />
        <ImageBackground source={uploadImageBackground} resizeMode="cover" style={$imageBackground}>
          <FlatList<ImageUploadButtonMetadata>
            contentContainerStyle={$flatListContentContainer}
            data={IMAGE_UPLOAD_BUTTON_DATA}
            keyExtractor={(item) => item.buttonOptionText}
            renderItem={({ item }) => (
              <SelectImageButtonListItem {...{ item, handleOnPress }} />
            )}
          />
        </ImageBackground>
      </Screen>
    )
  })

const $root: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
  flex: 1,
}
const $introductionContainer: ViewStyle = {
  backgroundColor: colors.palette.primary200,
  paddingVertical: spacing.xxs,
  paddingHorizontal: spacing.md,
  borderRadius: 20,
  marginTop: spacing.sm,
  marginHorizontal: spacing.xxs,
  marginBottom: spacing.sm,
}
const $imageBackground: ViewStyle = {
  height: "100%",
  borderRadius: 20,
  padding: spacing.xs,
  paddingTop: spacing.xl,
}
const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
}
const $button: ViewStyle = {
  backgroundColor: colors.palette.neutral700,
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 20,
  marginHorizontal: 10,
  marginBottom: spacing.sm,
}
const $disabledButton: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 20,
  marginHorizontal: 10,
  marginBottom: spacing.sm,
}
const $buttonText: TextStyle = {
  fontWeight: "bold",
  color: colors.palette.primary400,
}
