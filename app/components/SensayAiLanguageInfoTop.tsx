import * as React from "react"
import { Image, ImageStyle, Platform, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
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
  onPressIcon?: () => void
  isIconOnTopRight?: boolean
}

/**
 * Describe your component here
 */
export const SensayAiLanguageInfoTop = observer(function SensayAiLanguageInfoTop(
  props: SensayAiLanguageInfoTopProps,
) {
  const { style, onPressText, isIconOnTopRight, onPressIcon } = props
  const $styles = [$container, style]
  const { languageSettingStore: { getLearningLanguage } } = useStores()

  return (
    <View style={$styles}>

      <View style={$topContainer}>
        <View style={$learningLanguageContainerStyle}>
          <Button
            icon="menu-down"
            mode="text"
            style={$languageButton}
            contentStyle={$languageButtonContentStyle}
            onPress={onPressText}
            buttonColor={colors.palette.primary100}
          >
            <Text
              style={$learningLanguageText}
              tx={getLearningLanguage ? "structurePathway.levelSelection.learningLanguage" : "structurePathway.levelSelection.selectLearningLanguage"}
              txOptions={{ lang: getLearningLanguage }}
            />
          </Button>
        </View>
        {isIconOnTopRight &&
            <TouchableOpacity onPress={onPressIcon} style={$rightWelcomeLogoStyle}>
              <Image style={$welcomeLogoTopRight} source={welcomeLogo} resizeMode="contain" />
            </TouchableOpacity>
        }
      </View>
      {!isIconOnTopRight &&
        <TouchableOpacity onPress={onPressIcon}>
          <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
        </TouchableOpacity>
      }
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}
const $topContainer: ViewStyle = {
  flexDirection: "row",
  gap: spacing.xxxl + spacing.md
}
const $rightWelcomeLogoStyle: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "flex-end",
  // marginLeft: spacing.xxxl
}
const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  // marginBottom: spacing.xxl,
}
const $welcomeLogoTopRight: ImageStyle = {
  height: 40,
  width: "100%",
  marginRight: spacing.md,
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