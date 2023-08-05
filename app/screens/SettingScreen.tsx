import React, { FC } from "react"
import { Linking, TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing } from "../theme"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import { useAuth0 } from "react-native-auth0"

function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
}

export const SettingScreen: FC<DemoTabScreenProps<"Setting">> = function SettingScreen(
  _props,
) {
  const {
    authenticationStore: { logout: logOutAuth  },
    userStore: { logOut: logOutUser },
  } = useStores()
  const { clearSession } = useAuth0()

  const logOutApp = async () => {
    try {
      console.log("Log out")
      await clearSession()
      logOutAuth()
      logOutUser()
    } catch (e) {
      console.log("Log out cancelled")
    }
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Text
        style={$reportBugsLink}
        tx="settingScreen.reportBugs"
        onPress={() => openLinkInBrowser("https://github.com/infinitered/ignite/issues")}
      />
      <Text style={$title} preset="heading" tx="settingScreen.title" />
      <View style={$buttonContainer}>
        <Button style={$button} tx="common.logOut" onPress={logOutApp} />
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.xxl,
}

const $reportBugsLink: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.lg,
  alignSelf: isRTL ? "flex-start" : "flex-end",
}


const $button: ViewStyle = {
  marginBottom: spacing.xs,
}

const $buttonContainer: ViewStyle = {
  marginBottom: spacing.md,
}

