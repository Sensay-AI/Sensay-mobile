import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import {
  Button, EmptyState, Snackbar, // @demo remove-current-line
  Text,
} from "../components"
import { isRTL, translate } from "../i18n"
import { useStores } from "../models" // @demo remove-current-line
import { AppStackScreenProps } from "../navigators" // @demo remove-current-line
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { useAuth0 } from "react-native-auth0"
import { useHeader } from "../utils/useHeader"

const welcomeLogo = require("../../assets/images/app-icon-all.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {
}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
  _props, // @demo remove-current-line
) {
  const { navigation } = _props
  const {
    authenticationStore: { logout: logOutAuth },
    userStore,
  } = useStores()
  const { clearSession } = useAuth0()

  const [isLoading, setIsLoading] = React.useState(false)
  const [isConnect, setIsConnect] = React.useState(true)
  const [snackBarVisible, setSnackBarVisible] = React.useState(false)
  const [snackBarText, setSnackBarText] = React.useState("")
  const onToggleSnackBar = () => setSnackBarVisible(!snackBarVisible)
  const onDismissSnackBar = () => setSnackBarVisible(false)

  function goNext() {
    navigation.navigate("Demo", { screen: "DemoShowroom" })
  }

  function goCreateProfile() {
    navigation.push("UpdateProfile")
  }

  const logOutApp = () => {
    clearSession({})
      .then(_ => {
        logOutAuth()
        userStore.logOut()
      })
      .catch(error => {
        console.log(error)
        console.log("Log out cancel")
      })
  }

  useHeader(
    {
      rightTx: "common.logOut",
      onRightPress: logOutApp,
    },
    [logOutApp],
  )

  async function fetchingUser() {
    setIsLoading(true)
    await userStore.fetchUser().then((res) => {
      if (res.kind === "cannot-connect") {
        setIsConnect(false)
        setSnackBarText(translate("welcomeScreen.snackBar.cantConnect"))
        onToggleSnackBar()
        return
      }
      if (res.kind === "ok") {
        setIsConnect(true)
      }
    })
      .catch((err) => {
        console.log("fetch user err: ", err)
      })
      .finally(() => setIsLoading(false))
    setIsLoading(false)
  }

  useEffect(() => {
    ;(async function load() {
      await fetchingUser()
    })()
  }, [userStore])

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={$container}>
      <View style={$topContainer}>
        {!isConnect &&
          <View>
            <EmptyState
              preset="generic"
              buttonOnPress={fetchingUser}
              ImageProps={{ resizeMode: "contain" }}
            />
            <Snackbar
              style={$snackBar}
              visible={snackBarVisible}
              onToggleSnackBar={onToggleSnackBar}
              onDismissSnackBar={onDismissSnackBar}
              snackBarText={snackBarText}
            /></View>
        }
        {isConnect &&
          <View>
            <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
            {userStore.user && <Text
              testID="welcome-heading"
              style={$welcomeHeading}
              text={translate("welcomeScreen.helloUser", { userName: userStore.user.full_name })}
              preset="heading"
            ></Text>}

            <Text tx="welcomeScreen.exciting" preset="subheading" />
            <Image style={$welcomeFace} source={welcomeFace} resizeMode="contain" />
          </View>}
      </View>

      {isConnect && <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Text tx="welcomeScreen.postscript" size="md" />
        {
          userStore.isUser && <Button
            testID="next-screen-button"
            preset="reversed"
            tx="welcomeScreen.letsGo"
            onPress={goNext}
          /> || !isLoading && (<Button
            testID="next-screen-sign-up-button"
            preset="reversed"
            tx="welcomeScreen.createProfile"
            onPress={goCreateProfile}
          />)
        }
      </View>}
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
  bottom: -120,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
  textAlign: "center",
}

const $snackBar: ImageStyle = {
  width: "100%",
  paddingTop: spacing.xxxxl,
}