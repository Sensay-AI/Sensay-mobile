import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import {
  Button as IgniteButton, Icon, LanguageMenu,
  Screen,
} from "../components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { IconButton } from "react-native-paper"
import { Credentials, useAuth0 } from "react-native-auth0"
import { useStores } from "../models"
import { useForceUpdate } from "../utils/useForceUpdate"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {
}
const SENSAYAI_LOGO = require("../../assets/images/sensay-ai-login-logo.png")

type SocialConnectionTypes = "google-oauth2" | "facebook" | "apple"
export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const forceUpdate = useForceUpdate();
  const {
    authenticationStore: { setAuthToken, distributeAuthToken },
  } = useStores()
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

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
      KeyboardAvoidingViewProps={{ behavior: "padding" }}
    >
      <View style={$topButtonGroupContainerStyle}>
        <LanguageMenu  forceUpdateHook={forceUpdate}/>
        <View style={$settingIconButtonContainerStyle}>
          <IconButton icon="cog" size={20} onPress={() => console.log("Pressed")} />
        </View>
      </View>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={SENSAYAI_LOGO } resizeMode="contain" />
      </View>
      <View style={$loginButtonContainerStyle}>
        <IgniteButton
          testID="login-facebook-button"
          tx="loginScreen.continueWithFacebook"
          style={$tapButtonWithFacebook}
          preset="reversed"
          onPress={loginWithFacebook}
          LeftAccessory={(_) => <Icon icon="facebook" containerStyle={{ paddingRight: 15 } as ViewStyle} />}
        ></IgniteButton>

        <IgniteButton
          testID="login-google-button"
          tx="loginScreen.continueWithGoogle"
          textStyle={{ color: colors.text } as TextStyle}
          style={$tapButtonWithGoogle}
          preset="reversed"
          onPress={loginWithGoogle}
          LeftAccessory={(_) => <Icon icon="google" containerStyle={{ paddingRight: 15 } as ViewStyle} />}
        ></IgniteButton>

        <IgniteButton
          testID="login-apple-button"
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