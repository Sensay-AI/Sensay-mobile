import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import {
  HomePageScreen, SettingScreen,
} from "../screens"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import {
  StructurePathwayStack,
  StructurePathwayStackParamList,
  StructurePathwayStackScreenProps,
} from "./StructurePathwayStackNavigator"
import { ImageLessonStack, ImageLessonStackParamList, ImageLessonStackScreenProps } from "./ImageLessonStackNavigator"

export type MainTabParamList = {
  Setting: undefined
  HomePage: undefined
  StructurePathway: NavigatorScreenParams<StructurePathwayStackParamList>
  ImageLesson: NavigatorScreenParams<ImageLessonStackParamList>
}
/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    ImageLessonStackScreenProps<keyof ImageLessonStackParamList>,
    CompositeScreenProps<
      StructurePathwayStackScreenProps<keyof StructurePathwayStackParamList>,
      CompositeScreenProps<
        BottomTabScreenProps<MainTabParamList, T>,
        AppStackScreenProps<keyof AppStackParamList>
      >
    >
  >

const Tab = createBottomTabNavigator<MainTabParamList>()


const DebugIcon = ({ focused }) => (
  <Icon icon="settings" color={focused && colors.tint} size={30} />
)
const HomeIcon = ({ focused }) => (
  <Icon icon="home" color={focused && colors.tint} size={30} />
)

const StructurePathwayIcon = ({ focused }) => (
  <Icon icon="pathway" color={focused && colors.tint} size={30} />
)

const ImageLessonIcon = ({ focused }) => (
  <Icon icon="imageGallery" color={focused && colors.tint} size={30} />
)


export function MainTabNavigator() {
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
        name="StructurePathway"
        component={StructurePathwayStack}
        options={{
          tabBarLabel: translate("demoNavigator.structurePathway"),
          tabBarIcon: StructurePathwayIcon,
        }}
      />

      <Tab.Screen
        name="ImageLesson"
        component={ImageLessonStack}
        options={{
          tabBarLabel: translate("demoNavigator.imageLesson"),
          tabBarIcon: ImageLessonIcon,
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
