import * as React from "react"
import { Image, ImageStyle, Platform, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
import { Text } from "app/components/Text"
import { welcomeLogo } from "../utils/images"
import { useStores } from "../models"
import { Button } from "react-native-paper"

export interface SensayAiLanguageInfoTopProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  onPressText: () => void
}

/**
 * Describe your component here
 */
export const SensayAiLanguageInfoTop = observer(function SensayAiLanguageInfoTop(
  props: SensayAiLanguageInfoTopProps
) {
  const { style, onPressText } = props
  const $styles = [$container, style]
  const { languageSettingStore: { getLearningLanguage } } = useStores()

  return (
    <View style={$styles}>
      <View style={$learningLanguageContainerStyle}>
        <Button
          icon="menu-down"
          mode="text"
          style={$languageButton}
          contentStyle={$languageButtonContentStyle}
          onPress={onPressText}
        >
          <Text
            style={$learningLanguageText}
            tx={getLearningLanguage ? "structurePathway.levelSelection.learningLanguage" : "structurePathway.levelSelection.selectLearningLanguage"}
            txOptions={{ lang: getLearningLanguage }}
          />
        </Button>
      </View>
      <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}
const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  // marginBottom: spacing.xxl,
}
const $learningLanguageContainerStyle: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-start",
}
const $learningLanguageText: TextStyle = {
  fontWeight: "bold",
  color: colors.palette.primary400,
  paddingTop: Platform.OS === "ios" ? spacing.xxs : spacing.xxxs,
}
const $languageButton: ViewStyle = {
  flexWrap: "wrap",
}
const $languageButtonContentStyle: ViewStyle = {
  flexDirection: "row-reverse",
  justifyContent: "flex-end",
}