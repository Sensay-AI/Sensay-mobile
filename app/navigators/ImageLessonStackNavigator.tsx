import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import { colors } from "../theme"
import {
  ImageLessonCaptionGenerationStarterScreen,
  ImageLessonUploadImageHistoryScreen,
  ImageLessonUploadImageScreen,
  StructurePathwayVocabLessonDetailFromHistoryScreen,
  StructurePathwayVocabLessonDetailScreen,
} from "../screens"
import React from "react"


export type ImageLessonStackParamList = {
  UploadImage: undefined
  UploadImageHistory: undefined
  CaptionGenerationStarter: undefined
  DetailVocabLesson: { query: string, level: number, isFromImageLesson?: boolean }
  DetailVocabLessonFromHistory: { categoryName: string, level: number, categoryId: number, isFromDetailScreen: boolean, isFromImageLesson?: boolean }
}
export type ImageLessonStackScreenProps<T extends keyof ImageLessonStackParamList> = NativeStackScreenProps<
  ImageLessonStackParamList,
  T
>

const Stack = createNativeStackNavigator<ImageLessonStackParamList>()
export const ImageLessonStack = observer(function ImageLessonStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName={"UploadImage"}
    >
      <Stack.Screen name="UploadImage"
                    component={ImageLessonUploadImageScreen} />
      <Stack.Screen name="UploadImageHistory"
                    component={ImageLessonUploadImageHistoryScreen} />
      <Stack.Screen name="CaptionGenerationStarter"
                    component={ImageLessonCaptionGenerationStarterScreen} />
      <Stack.Screen name="DetailVocabLesson"
                    component={StructurePathwayVocabLessonDetailScreen} />
      <Stack.Screen name="DetailVocabLessonFromHistory"
                    component={StructurePathwayVocabLessonDetailFromHistoryScreen} />
    </Stack.Navigator>
  )
})