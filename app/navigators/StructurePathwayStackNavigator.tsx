import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import { colors } from "../theme"
import {
  StructurePathwayLevelScreen, StructurePathwayVocabLessonDetailFromHistoryScreen,
  StructurePathwayVocabLessonDetailScreen,
  StructurePathwayVocabLessonScreen,
} from "../screens"
import React from "react"

export type StructurePathwayStackParamList = {
  StructurePathwaySelectLessonAndLevel: undefined
  VocabLesson: { level: number }
  DetailVocabLesson: { query: string, level: number }
  DetailVocabLessonFromHistory: { categoryName: string, level: number, categoryId: number, isFromDetailScreen: boolean }
}

export type StructurePathwayStackScreenProps<T extends keyof StructurePathwayStackParamList> = NativeStackScreenProps<
  StructurePathwayStackParamList,
  T
>

const Stack = createNativeStackNavigator<StructurePathwayStackParamList>()
export const StructurePathwayStack = observer(function StructurePathwayStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName={"StructurePathwaySelectLessonAndLevel"}
    >
      <Stack.Screen name="StructurePathwaySelectLessonAndLevel"
                    component={StructurePathwayLevelScreen} />
      <Stack.Screen name="VocabLesson"
                    component={StructurePathwayVocabLessonScreen} />
      <Stack.Screen name="DetailVocabLesson"
                    component={StructurePathwayVocabLessonDetailScreen} />
      <Stack.Screen name="DetailVocabLessonFromHistory"
                    component={StructurePathwayVocabLessonDetailFromHistoryScreen} />
    </Stack.Navigator>
  )
})