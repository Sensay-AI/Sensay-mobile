import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { Menu, MenuItem } from "./Menu"
import { Button } from "react-native-paper"
import i18n from "i18n-js"
import { useStores } from "../models"
import { allowLanguagePrefix } from "../utils/languages"

export interface LanguageMenuProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  forceUpdateHook?: any
}

/**
 * Describe your component here
 */
export const LanguageMenu = observer(function LanguageMenu(props: LanguageMenuProps) {
  const { style, forceUpdateHook } = props
  const $styles = [$container, style]
  const [languageMenuVisible, setLanguageMenuVisible] = React.useState(false)
  const openLanguageMenu = () => setLanguageMenuVisible(true)
  const closeLanguageMenu = () => setLanguageMenuVisible(false)
  const {
    languageSettingStore: { setDisplayLanguage },
  } = useStores()
  const languageMenuItems = [
    new MenuItem("vietnamese", () => {
      i18n.locale = "vi"
      setDisplayLanguage("vietnamese")
      forceUpdateHook()
      closeLanguageMenu()
    }),
    new MenuItem("english", () => {
      i18n.locale = "en"
      setDisplayLanguage("english")
      forceUpdateHook()
      closeLanguageMenu()
    }),
    new MenuItem("korean", () => {
      i18n.locale = "ko"
      setDisplayLanguage("korean")
      forceUpdateHook()
      closeLanguageMenu()
    }),
    new MenuItem("arabic", () => {
      i18n.locale = "ar"
      setDisplayLanguage("arabic")
      forceUpdateHook()
      closeLanguageMenu()
    }),
  ]
  return (
    <View style={$styles}>
      <Menu
        visible={languageMenuVisible}
        setVisible={setLanguageMenuVisible}
        onDismiss={closeLanguageMenu}
        menuItems={languageMenuItems}
        anchor={
          <Button icon="menu-down" mode="text" style={$languageButton}
                  contentStyle={$languageButtonContentStyle}
                  onPress={openLanguageMenu}
          >
            <Text> {allowLanguagePrefix.includes(i18n.locale.substring(0, 2).toLowerCase()) && i18n.locale.substring(0, 2) || "en"}   </Text>
          </Button>
        }></Menu>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $languageButton: ViewStyle = {
  flexWrap: "wrap",
}

const $languageButtonContentStyle: ViewStyle = {
  flexDirection: "row-reverse",
  justifyContent: "flex-end",
}
