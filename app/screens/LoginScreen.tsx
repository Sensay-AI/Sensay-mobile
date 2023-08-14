import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import {
  Button as IgniteButton, Icon,
  Menu, MenuItem,
  Screen, Text,
} from "../components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { Button, IconButton } from "react-native-paper"
import i18n from "i18n-js"
import { Credentials, useAuth0 } from "react-native-auth0"
import { SENSAYAI_LOGO } from "../utils/images"
import { useStores } from "../models"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {
}

type SocialConnectionTypes = "google-oauth2" | "facebook" | "apple"
export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {

  const [languageMenuVisible, setLanguageMenuVisible] = React.useState(false)
  const openLanguageMenu = () => setLanguageMenuVisible(true)
  const closeLanguageMenu = () => setLanguageMenuVisible(false)

  const {
    authenticationStore: { setAuthToken, distributeAuthToken },
  } = useStores()
  const languageMenuItems = [
    new MenuItem("vietnamese", () => {
      i18n.locale = "vi"
      closeLanguageMenu()
    }),
    new MenuItem("english", () => {
      i18n.locale = "en"
      closeLanguageMenu()
    }),
    new MenuItem("korean", () => {
      i18n.locale = "ko"
      closeLanguageMenu()
    }),
    new MenuItem("arabic", () => {
      i18n.locale = "ar"
      closeLanguageMenu()
    }),
  ]
  const { authorize, error, getCredentials } = useAuth0()

  async function authorizeWithSocial(connectionType: SocialConnectionTypes): Promise<void> {
    try {
      await authorize({ scope: process.env.EXPO_PUBLIC_AUTH0_AUTHORIZE_SCOPE, audience: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE, connection: connectionType })
      if (error) {
        console.log("auth0 error: ", error)
        return
      }
      const credentials: Credentials = await getCredentials()
      if (credentials) {
        setAuthToken(credentials)
        distributeAuthToken(credentials.accessToken)
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function loginWithFacebook(): Promise<void> {
    await authorizeWithSocial("facebook")
  }

  async function loginWithGoogle(): Promise<void> {
    await authorizeWithSocial("google-oauth2")
  }

  async function loginWithApple(): Promise<void> {
    await authorizeWithSocial("apple")
  }

  const allowLanguagePrefix = ["en", "vi", "ko", "ar"]
  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
      KeyboardAvoidingViewProps={{ behavior: "padding" }}
    >
      <View style={$topButtonGroupContainerStyle}>
        <View>
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
                <Text> {allowLanguagePrefix.includes(i18n.locale.substring(0, 2).toLowerCase()) && i18n.locale.substring(0, 2) || "en"} </Text>
              </Button>
            }></Menu>
        </View>
        <View style={$settingIconButtonContainerStyle}>
          <IconButton icon="cog" size={20} onPress={() => console.log("Pressed")} />
        </View>
      </View>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={{ uri: SENSAYAI_LOGO }} resizeMode="contain" />
      </View>
      <View style={$loginButtonContainerStyle}>
        <IgniteButton
          testID="login-button"
          tx="loginScreen.continueWithFacebook"
          style={$tapButtonWithFacebook}
          preset="reversed"
          onPress={loginWithFacebook}
          LeftAccessory={(_) => <Icon icon="facebook" containerStyle={{ paddingRight: 15 } as ViewStyle} />}
        ></IgniteButton>

        <IgniteButton
          testID="login-button"
          tx="loginScreen.continueWithGoogle"
          textStyle={{ color: colors.text } as TextStyle}
          style={$tapButtonWithGoogle}
          preset="reversed"
          onPress={loginWithGoogle}
          LeftAccessory={(_) => <Icon icon="google" containerStyle={{ paddingRight: 15 } as ViewStyle} />}
        ></IgniteButton>
        <IgniteButton
          testID="login-button"
          tx="loginScreen.continueWithApple"
          style={$tapButtonWithApple}
          preset="reversed"
          onPress={loginWithApple}
          LeftAccessory={(_) => <Icon icon="apple" containerStyle={{ paddingRight: 15 } as ViewStyle} />}
        ></IgniteButton>
      </View>

    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xl,
  paddingHorizontal: spacing.lg,
}

const $tapButtonWithFacebook: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: colors.facebook_logo_background_color,
  borderRadius: 10,
  width: 345,
  justifyContent: "flex-start",
}

const $tapButtonWithGoogle: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: colors.google_logo_background_color,
  borderRadius: 10,
  width: 345,
  justifyContent: "flex-start",
  // shadow definition
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.51,
  shadowRadius: 13.16,
  elevation: 20,
  overflow: "visible",
}

const $tapButtonWithApple: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: colors.apple_logo_background_color,
  borderRadius: 10,
  width: 345,
  justifyContent: "flex-start",
}

const $languageButton: ViewStyle = {
  flexWrap: "wrap",
}

const $languageButtonContentStyle: ViewStyle = {
  flexDirection: "row-reverse",
  justifyContent: "flex-end",
}
const $settingIconButtonContainerStyle: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "flex-end",
}
const $loginButtonContainerStyle: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
  marginTop: spacing.lg,
  gap: spacing.xxs,
}
const $topButtonGroupContainerStyle: ViewStyle = {
  flexDirection: "row",
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
  marginTop: spacing.xl,
}
const $welcomeLogo: ImageStyle = {
  height: 250,
  width: "100%",
  marginBottom: spacing.xxl,
}