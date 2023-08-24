import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import {
  HomePageScreen,
  SettingScreen,
  StructurePathwayLevelScreen,
  StructurePathwayVocabLessonDetailFromHistoryScreen,
  StructurePathwayVocabLessonDetailScreen,
  StructurePathwayVocabLessonScreen,
} from "../screens"
import { DemoPodcastListScreen } from "../screens/DemoPodcastListScreen"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"

export type MainTabParamList = {
  Setting: undefined
  DemoPodcastList: undefined
  HomePage: undefined
  StructurePathway: NavigatorScreenParams<StructurePathwayStackParamList>
}
export type StructurePathwayStackParamList = {
  StructurePathwaySelectLessonAndLevel: undefined
  VocabLesson: {level : number}
  DetailVocabLesson: {query : string, level: number}
  DetailVocabLessonFromHistory: {categoryName : string, level: number, categoryId: number, isFromDetailScreen: boolean}
}

export type StructurePathwayStackScreenProps<T extends keyof StructurePathwayStackParamList> = NativeStackScreenProps<
  StructurePathwayStackParamList,
  T
>
/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  StructurePathwayStackScreenProps<keyof StructurePathwayStackParamList>,
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
  >
>

const Tab = createBottomTabNavigator<MainTabParamList>()

const Stack = createNativeStackNavigator<StructurePathwayStackParamList>()

const DebugIcon = ({ focused }) => (
  <Icon icon="settings" color={focused && colors.tint} size={30} />
)
const HomeIcon = ({ focused }) => (
  <Icon icon="home" color={focused && colors.tint} size={30} />
)

const StructurePathwayIcon = ({ focused }) => (
  <Icon icon="pathway" color={focused && colors.tint} size={30} />
)

const PodcastIcon = ({ focused }) => (
  <Icon icon="podcast" color={focused && colors.tint} size={30} />
)

const StructurePathwayStack = observer(function StructurePathwayStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName={"StructurePathwaySelectLessonAndLevel"}
    >
      <Stack.Screen name="StructurePathwaySelectLessonAndLevel" component={StructurePathwayLevelScreen} />
      <Stack.Screen name="VocabLesson" component={StructurePathwayVocabLessonScreen} />
      <Stack.Screen name="DetailVocabLesson" component={StructurePathwayVocabLessonDetailScreen} />
      <Stack.Screen name="DetailVocabLessonFromHistory" component={StructurePathwayVocabLessonDetailFromHistoryScreen} />
    </Stack.Navigator>
  )
})

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
