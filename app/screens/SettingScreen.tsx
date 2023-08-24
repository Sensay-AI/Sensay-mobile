import React, { FC } from "react"
import { Linking, TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { MainTabScreenProps } from "../navigators/MainTabNavigator"
import { colors, spacing } from "../theme"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import { useAuth0 } from "react-native-auth0"

function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
}

export const SettingScreen: FC<MainTabScreenProps<"Setting">> = function SettingScreen(
  _props,
) {
  const {
    authenticationStore: { logout: logOutAuth },
    userStore: { logOut: logOutUser },
  } = useStores()
  const { clearSession } = useAuth0()
  const { navigation } = _props

  const logOutApp = async () => {
    clearSession({})
      .then(_ => {
        logOutAuth()
        logOutUser()
      })
      .catch(error => {
        console.log(error)
        console.log("Log out cancel")
      })
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>

      <Text style={$title} preset="heading" tx="settingScreen.title" />

      <Text
        style={$settingTextOptions}
        tx="settingScreen.editProfile"
        onPress={() => navigation.push("UpdateProfile")}
      />
      <Text
        style={$reportBugsLink}
        tx="settingScreen.giveFeedback"
        onPress={() => openLinkInBrowser("https://docs.google.com/forms/d/e/1FAIpQLSc_jiGrDzaUurpjmtz9eYp_Dhkp4ujR7ilTPTCgFmyT6Ha-oQ/viewform")}
      />
      <View style={$buttonContainer}>
        <Button style={$button} tx="common.logOut" onPress={logOutApp} textStyle={$buttonText} />
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
  marginBottom: spacing.lg,
}

const $reportBugsLink: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.lg,
  alignSelf: isRTL ? "flex-start" : "flex-end",
}

const $settingTextOptions: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.xl,
  alignSelf: isRTL ? "flex-start" : "flex-end",
}


const $button: ViewStyle = {
  marginBottom: spacing.xs,
  backgroundColor: colors.palette.primary300, // Choose a suitable color for the button background
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 8,
  elevation: 2,
}

const $buttonContainer: ViewStyle = {
  marginBottom: spacing.md,
  marginTop: spacing.xxxxl*2,

}

const $buttonText: TextStyle = {
  color: colors.palette.neutral200, // Text color
  fontSize: 16,
  fontWeight: 'bold',
}

