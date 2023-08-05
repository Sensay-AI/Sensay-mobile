import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import {
  Button, // @demo remove-current-line
  Text,
} from "../components"
import { isRTL, translate } from "../i18n"
import { useStores } from "../models" // @demo remove-current-line
import { AppStackScreenProps } from "../navigators" // @demo remove-current-line
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { useAuth0 } from "react-native-auth0"
import { useHeader } from "../utils/useHeader"

const welcomeLogo = require("../../assets/images/sensay-welcome-logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {
}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
  _props, // @demo remove-current-line
) {
  const { navigation } = _props
  const {
    authenticationStore: { logout: logOutAuth },
    userStore: { logOut: logOutUser, user, isUser },
  } = useStores()
  const { clearSession } = useAuth0()
  function goNext() {
    navigation.navigate("Demo", { screen: "DemoShowroom" })
  }

   const logOutApp = () => {
    try {
      console.log("Log out")
      clearSession()
      logOutAuth()
      logOutUser()
    } catch (e) {
      console.log("Log out cancelled")
    }
  }

  useHeader(
    {
      rightTx: "common.logOut",
      onRightPress: logOutApp,
    },
    [logOutApp],
  )

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
        {user && <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          text={translate("welcomeScreen.helloUser", { userName: user.full_name })}
          preset="heading"
        ></Text>}

        <Text tx="welcomeScreen.exciting" preset="subheading" />
        <Image style={$welcomeFace} source={welcomeFace} resizeMode="contain" />
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Text tx="welcomeScreen.postscript" size="md" />
        {
          isUser && <Button
            testID="next-screen-button"
            preset="reversed"
            tx="welcomeScreen.letsGo"
            onPress={goNext}
          />
        }
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
}
const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
  textAlign: "center",
}
