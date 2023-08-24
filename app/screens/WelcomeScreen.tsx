import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { ActivityIndicator, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import {
  Button, EmptyState, Snackbar,
  Text,
} from "../components"
import { isRTL, translate } from "../i18n"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { useAuth0 } from "react-native-auth0"
import { useHeader } from "../utils/useHeader"
import { welcomeFace, welcomeLogo } from "../utils/images"


interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {
}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
  _props,
) {
  const { navigation } = _props
  const {
    authenticationStore: { logout: logOutAuth },
    userStore,
  } = useStores()
  const { clearSession } = useAuth0()

  const [isLoading, setIsLoading] = React.useState(false)
  const [isConnect, setIsConnect] = React.useState(true)
  const [canCreatProfile, setCanCreatProfile] = React.useState(false)
  const [snackBarVisible, setSnackBarVisible] = React.useState(false)
  const [snackBarText, setSnackBarText] = React.useState("")
  const onToggleSnackBar = () => setSnackBarVisible(!snackBarVisible)
  const onDismissSnackBar = () => setSnackBarVisible(false)

  function goNext() {
    navigation.navigate("MainTab", { screen: "HomePage" })
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
      if (res.kind !== "ok") {
        setIsConnect(false)
        setSnackBarText(translate("welcomeScreen.snackBar.cantConnect"))
        onToggleSnackBar()

        if (res.kind === "forbidden") {
          logOutAuth()
          userStore.logOut()
        }

        if (res.kind === "not-found") {
          console.log("res.kind ","not found")
          setIsConnect(true)
          setCanCreatProfile(true)
          return
        }

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
            {isLoading && <ActivityIndicator />}
            {!isLoading && <EmptyState
              preset="generic"
              buttonOnPress={fetchingUser}
              ImageProps={{ resizeMode: "contain" }}
            />}
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
        {isLoading && <ActivityIndicator />}
        {
          userStore.isUser && <Button
            testID="next-screen-button"
            preset="reversed"
            tx="welcomeScreen.letsGo"
            onPress={goNext}
          /> || !isLoading && canCreatProfile && (<Button
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