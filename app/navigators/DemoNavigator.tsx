import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import { DemoCommunityScreen, HomePageScreen, SettingScreen } from "../screens"
import { DemoPodcastListScreen } from "../screens/DemoPodcastListScreen"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type DemoTabParamList = {
  DemoCommunity: undefined
  Setting: undefined
  DemoPodcastList: undefined
  HomePage: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<DemoTabParamList>()
const DebugIcon = ({ focused }) => (
  <Icon icon="settings" color={focused && colors.tint} size={30} />
)
const HomeIcon = ({ focused }) => (
  <Icon icon="home" color={focused && colors.tint} size={30} />
)

const CommunityIcon = ({ focused }) => (
  <Icon icon="community" color={focused && colors.tint} size={30} />
)

const PodcastIcon = ({ focused }) => (
  <Icon icon="podcast" color={focused && colors.tint} size={30} />
)

export function DemoNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePageScreen}
        options={{
          tabBarLabel: translate("demoNavigator.homeTab"),
          tabBarIcon: HomeIcon,
        }}
      />

      <Tab.Screen
        name="DemoCommunity"
        component={DemoCommunityScreen}
        options={{
          tabBarLabel: translate("demoNavigator.communityTab"),
          tabBarIcon: CommunityIcon,
        }}
      />

      <Tab.Screen
        name="DemoPodcastList"
        component={DemoPodcastListScreen}
        options={{
          tabBarAccessibilityLabel: translate("demoNavigator.podcastListTab"),
          tabBarLabel: translate("demoNavigator.podcastListTab"),
          tabBarIcon: PodcastIcon,
        }}
      />

      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarLabel: translate("demoNavigator.settingTab"),
          tabBarIcon: DebugIcon,
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}

// @demo remove-file
