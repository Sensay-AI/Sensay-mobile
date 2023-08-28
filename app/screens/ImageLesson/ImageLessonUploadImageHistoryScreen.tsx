import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  FlatList,
  View,
  ViewStyle,
  ImageStyle,
  ActivityIndicator,
  Easing, Animated, TouchableOpacity,
} from "react-native"
import { Screen, TitleWithBackButton } from "app/components"
import { ImageLessonStackScreenProps } from "../../navigators/ImageLessonStackNavigator"
import { spacing } from "../../theme"
import { useStores } from "../../models"
import { useMap } from "../../utils/useMap"

interface ImageLessonUploadImageHistoryScreenProps extends ImageLessonStackScreenProps<"UploadImageHistory"> {
}

export const ImageLessonUploadImageHistoryScreen: FC<ImageLessonUploadImageHistoryScreenProps> = observer(function ImageLessonUploadImageHistoryScreen(
  _props,
) {
  const { navigation } = _props
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)
  const [lastS3Key, setLastS3Key] = useState("")
  const {
    imageLessonStore: { fetchUploadImageHistory, selectImageFromImageHistory, uploadImageHistoryData },
  } = useStores()
  const [opacity] = useState(new Animated.Value(0)) // Initial opacity is set to 0
  const fadeDuration = 1200 // Animation duration in milliseconds

  const initMap = new Map<string, boolean>()

  if (uploadImageHistoryData) {
    try {
      uploadImageHistoryData.forEach(image => {
        initMap.set(image.s3_bucket_path_key, false)
      })
    } catch (e) {
      console.error(e)
    }
  }

  const [isImageWithIdPress, isImageWithIdPressActions]
    = useMap(initMap)

  useEffect(() => {
    setLoading(true)
    fetchUploadImageHistory().then((value) => {

      if (value.kind === "ok" && value.imageUploads.length > 0) {
        const items = value.imageUploads.map((v, i) => {
          return { id: i, src: v.full_url, s3_key_path: v.s3_bucket_path_key, datetime: v.last_modified }
        }).sort((a, b) => {
          const dateA = new Date(a.datetime);
          const dateB = new Date(b.datetime);
          return -(dateA.getTime() - dateB.getTime());
        })
        setDataSource(items)
        setLoading(false)
      }
    })
      .catch(e => console.error(e))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Screen contentContainerStyle={$root} preset="fixed" safeAreaEdges={["top"]}>
      <TitleWithBackButton
        title={"imageLessonScreen.uploadImageHistory.title"}
        onPressBackButton={() => navigation.push("UploadImage")}
      />
      {loading && <ActivityIndicator />}
      {!loading && <View>
        <FlatList
          data={dataSource}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: "column", margin: 1 } as ViewStyle}>
              <TouchableOpacity onPress={() => {
                selectImageFromImageHistory({
                  full_url: item.src,
                  s3_bucket_path_key: item.s3_key_path,
                  last_modified: item.datetime,
                })
                isImageWithIdPressActions.set(item.s3_key_path, true)
                setLastS3Key(item.s3_key_path)
                // Animate the fade-in effect
                opacity.setValue(0)
                Animated.timing(opacity, {
                  toValue: 1, // Final opacity: 1
                  duration: fadeDuration,
                  easing: Easing.out(Easing.exp),
                  useNativeDriver: true,
                }).start()
                isImageWithIdPressActions.set(lastS3Key, false)
                navigation.push("CaptionGenerationStarter")
              }
              }>
                <Animated.Image
                  style={
                    isImageWithIdPress.get(item.s3_key_path) ?
                      { ...$imageThumbnail, opacity } :
                      $imageThumbnail
                  }
                  source={{ uri: item.src }}
                />
              </TouchableOpacity>
            </View>
          )}
          // Setting the number of column
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>}
    </Screen>
  )
})

const $root: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
const $imageThumbnail: ImageStyle = {
  justifyContent: "center",
  alignItems: "center",
  height: 100,
}
