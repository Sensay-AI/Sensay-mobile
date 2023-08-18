import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { spacing } from "../theme"
import { useStores } from "../models"




export const DemoCommunityScreen: FC<DemoTabScreenProps<"DemoCommunity">> =
  function DemoCommunityScreen(_props) {
    const {
      languageSettingStore: {setLearningLanguage, getLearningLanguage}
    } = useStores()
    setLearningLanguage("Portuguese")
    return (
      <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
        <Text text={getLearningLanguage}></Text>

      </Screen>
    )
  }

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingHorizontal: spacing.lg,
}


// @demo remove-file
