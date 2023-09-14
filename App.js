// This is the entry point if you run `yarn expo:start`
// If you run `yarn ios` or `yarn android`, it'll use ./index.js instead.
import App from "./app/app.tsx"
import React from "react"
import { registerRootComponent } from "expo"
import { LogBox, Platform } from "react-native"
import * as SplashScreen from "expo-splash-screen"

SplashScreen.preventAutoHideAsync()

LogBox.ignoreLogs([/^.*$/]); // Ignore log notification by message
LogBox.ignoreAllLogs(true);

function IgniteApp() {
  return <App hideSplashScreen={SplashScreen.hideAsync} />
}

if (Platform.OS !== "web") {
  registerRootComponent(IgniteApp)
}

export default IgniteApp
