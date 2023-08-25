import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
import { Text } from "app/components/Text"
import { Icon } from "./Icon"
import { TxKeyPath } from "../i18n"
import i18n from "i18n-js"

export interface TitleWithBackButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  onPressBackButton: () => void
  title: TxKeyPath
  txOptions?: i18n.TranslateOptions
}

/**
 * Describe your component here
 */
export const TitleWithBackButton = observer(function TitleWithBackButton(props: TitleWithBackButtonProps) {
  const { style, onPressBackButton, title, txOptions } = props
  const $styles = [$backButtonContainerStyle, style]

  return (
      <View style={$styles}>
        <Icon
          size={30}
          color={colors.tint}
          onPress={onPressBackButton}
          icon="back"
          containerStyle={$backIcon}
        />
        <View style={$titleContainerStyle}>
          <Text
            style={$title}
            preset="heading"
            tx={title}
            txOptions={txOptions}
          />
        </View>
      </View>
  )
})
const $titleContainerStyle: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-start",
  alignContent: "flex-start",
}
const $backButtonContainerStyle: ViewStyle = {
  flexDirection: "row",
}
const $title: TextStyle = {
  marginBottom: spacing.lg,
}
const $backIcon: ViewStyle = {
  paddingTop: spacing.xxs,
}
