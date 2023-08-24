import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, CaretRightIcon, LanguageMenu, Screen, Text } from "app/components"
import { MainTabScreenProps } from "../navigators/MainTabNavigator"
import { colors, spacing } from "../theme"
import { translate } from "../i18n"
import { useStores } from "../models"
import { useForceUpdate } from "../utils/useForceUpdate"
import { CountryPicker } from "react-native-country-picker-modal/lib/CountryPicker"
import { Country, CountryCode } from "react-native-country-picker-modal"
import SectionedMultiSelect from "react-native-sectioned-multi-select"
import {
  acceptLanguageCountryCode,
  items as languages,
  languagesAssociateById,
  languagesCountryCodeToId, languagesNameToId,
} from "../utils/languages"
import { MaterialIcons } from "@expo/vector-icons"
import { useSelectedLanguages } from "../utils/useSelectedLanguages"
import { welcomeLogo } from "../utils/images"


export const HomePageScreen: FC<MainTabScreenProps<"HomePage">> = observer(function HomePageScreen(
  _props, // @demo remove-current-line
) {
  const forceUpdate = useForceUpdate()
  const { navigation } = _props

  const {
    userStore, languageSettingStore: { setLearningLanguage, getLearningLanguage },
  } = useStores()


  const [countryCode, setCountryCode] = useState<CountryCode>(
    // @ts-ignore
    getLearningLanguage ?
      languagesAssociateById[languagesNameToId[getLearningLanguage]].countryCode.toUpperCase() :
      "",
  )
  const [selectedLanguages, setSelectedLanguages] = useSelectedLanguages(
    getLearningLanguage ?
      [languagesNameToId[getLearningLanguage]] :
      [],
  )
  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
      <View>
        {userStore.user && <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          text={translate("welcomeScreen.helloUser", { userName: userStore.user.full_name })}
          preset="heading"
        ></Text>}
        <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
      </View>

      <Text style={$label} tx={"homePage.displayLanguage"} />
      <View style={$topButtonGroupContainerStyle}>
        <LanguageMenu forceUpdateHook={forceUpdate} isShowStoreDisplayLanguage={true} />
      </View>

      <Text style={$label}
            tx={selectedLanguages[0] ? "homePage.learningLanguage" : "homePage.selectLearningLanguage"} />
      <SectionedMultiSelect
        styles={{
          selectToggle: $selectBox,
          selectToggleText: { textAlign: "left" },
          searchBar: {backgroundColor: colors.palette.primary300},
          searchTextInput: { color: colors.text },
          button: {backgroundColor: colors.palette.primary300}
        }}
        items={languages}
        selectedItems={selectedLanguages}
        // @ts-ignore
        IconRenderer={MaterialIcons}
        uniqueKey="id"
        subKey="children"
        showDropDowns={false}
        readOnlyHeadings={true}
        onSelectedItemsChange={(items) => {
          setSelectedLanguages(items)
          // @ts-ignore
          setCountryCode(languagesAssociateById[items[0]].countryCode.toUpperCase())
          setLearningLanguage(languagesAssociateById[items[0]].name)
          forceUpdate()
        }}
        selectText={"Click here!"}
        expandDropDowns={true}
        single={true}
      />
      {selectedLanguages.length > 0 &&
        <View>
          <Text style={$label} tx={"homePage.countrySpeakingThatLanguage"}
                txOptions={{ lang: languagesAssociateById[selectedLanguages[0]].name }}></Text>
          <View style={$countryIconButtonContainerStyle}>
            <CountryPicker
              {...{
                countryCode,
                withFilter: true,
                withFlag: true,
                withCountryNameButton: true,
                withEmoji: true,
                onSelect: (country: Country) => {
                  setCountryCode(country.cca2)
                  const languageId = languagesCountryCodeToId[country.cca2.toLowerCase()]
                  setSelectedLanguages([languageId])
                  setLearningLanguage(languagesAssociateById[languageId].name)
                },
                placeholder: "",
                withModal: true,
                preferredCountries: ["US", "VN"],
                countryCodes: acceptLanguageCountryCode,
              }}
            />
          </View>
          <Button
            style={$button}
            tx={"homePage.startStructurePathway"}
            txOptions={{ lang: getLearningLanguage }}
            textStyle={$buttonText}
            LeftAccessory={CaretRightIcon}
            onPress={() => navigation.push("MainTab", { screen: "StructurePathway" })}
          />
        </View>
      }

    </Screen>
  )
})

const $screenContainer: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
}
const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
  textAlign: "center",
}
const $topButtonGroupContainerStyle: ViewStyle = {
  flexDirection: "row",
}
const $countryIconButtonContainerStyle: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "flex-start",
  paddingBottom: spacing.md,
}
const $selectBox: ViewStyle = {
  borderColor: colors.border,
  borderWidth: 1,
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}
const $label: TextStyle = {
  marginTop: 5,
}
const $buttonText: TextStyle = {
  fontWeight: "bold",
  color: colors.palette.primary400,
}
const $button: ViewStyle = {
  backgroundColor: colors.palette.neutral700,
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 20,
  marginHorizontal: 10,
}
