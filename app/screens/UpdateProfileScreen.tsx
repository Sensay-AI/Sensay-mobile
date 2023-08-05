import React, { FC, ReactNode, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextInput, TouchableOpacity, View, ViewStyle, ImageStyle, TextStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { AutoImage, Button, Screen, Text } from "app/components"
import { colors, spacing } from "../theme"
import { Formik } from "formik"
import * as yup from "yup"
import { Country, CountryCode } from "react-native-country-picker-modal"
import DatePicker from "react-native-date-picker"
import { launchImageLibrary } from "react-native-image-picker"
import { CountryPicker } from "react-native-country-picker-modal/lib/CountryPicker"
import SectionedMultiSelect from "react-native-sectioned-multi-select"
import { MaterialIcons } from "@expo/vector-icons"
import { items as languages } from "../utils/languages"
import { translate } from "../i18n"
import { IconButton } from "react-native-paper"
import { useAuth0 } from "react-native-auth0"
import { genders } from "../utils/genders"
import { useStores } from "../models"
import PhoneInput from "react-native-phone-number-input"

interface UpdateProfileScreenProps extends NativeStackScreenProps<AppStackScreenProps<"UpdateProfile">> {
}

const DEFAULT_DATE_OF_BIRTH = new Date(1999, 0, 1)

const MIN_DATE_OF_BIRTH = new Date(1900, 0, 1)

export const UpdateProfileScreen: FC<UpdateProfileScreenProps> = observer(function UpdateProfileScreen(_props) {
  // Pull in one of our MST stores
  const {
    userStore: { isUser, createUser },
  } = useStores()

  // Pull in navigation via hook
  const { navigation } = _props

  const [countryCode, setCountryCode] = useState<CountryCode>("FR")
  const [openDateOfBirthPicker, setOpenDateOfBirthPicker] = useState(false)
  const [selectedLanguages, setSelectedLanguages] = useState([])
  const [selectedGender, setSelectedGender] = useState("")

  const languagesIdToName: { [key: string]: string } = languages[0].children.reduce((acc, item) => {
    acc[item.id] = item.name
    return acc
  }, {})
  const { user } = useAuth0()
  const phoneInput = useRef<PhoneInput>(null)
  const emailValidationSchema = yup.object().shape({
    picture: yup
      .string()
      .notRequired(),
    email: yup
      .string()
      .email(translate("updateProfileScreen.validation.email"))
      .required(translate("updateProfileScreen.validation.emailRequire")),
    fullName: yup
      .string()
      .required(translate("updateProfileScreen.validation.fullNameRequire")),
    dateOfBirth: yup
      .date()
      .required(translate("updateProfileScreen.validation.dateOfBirthRequire"))
      .min(MIN_DATE_OF_BIRTH, translate("updateProfileScreen.validation.minDateOfBirth")),
    country: yup
      .object()
      .json()
      .required(translate("updateProfileScreen.validation.countryRequire")),
    languages: yup
      .array()
      .min(1, translate("updateProfileScreen.validation.minLanguages"))
      .required(translate("updateProfileScreen.validation.languagesRequire")),
    nickName: yup
      .string()
      .required(translate("updateProfileScreen.validation.nickNameRequire")),
    gender: yup
      .number()
      .oneOf([0, 1, 2, 3])
      .required(translate("updateProfileScreen.validation.genderRequire")),
    phoneNumber: yup
      .string()
      .test(
        "is-valid-phone-number",
        translate("updateProfileScreen.validation.phoneNumberValid"),
        (value) => phoneInput.current?.isValidNumber(value),
      )
      .required(translate("updateProfileScreen.validation.phoneNumberRequire")),
  })


  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
      KeyboardAvoidingViewProps={{ behavior: "padding" }}>
      {navigation.canGoBack() && isUser && <View>
        <View>
          <IconButton icon="keyboard-backspace" size={20}
                      onPress={() => navigation.goBack()} />
        </View>
      </View>}
      {user && <Formik
        initialValues={

        {
          picture: user.picture,
          email: user.email,
          fullName: user.name,
          dateOfBirth: DEFAULT_DATE_OF_BIRTH,
          country: "",
          languages: [],
          nickName: user.nickname,
          phoneNumber: "",
          gender: 0,
          pictureUri: user.picture,
        }

      }
        validationSchema={emailValidationSchema}
        onSubmit={(values) => {
          createUser({
              "full_name": values.fullName,
              "email": values.email,
              "country": values.country.toString(),
              "language": values.languages.toString(),
              "phone_number": values.phoneNumber,
              "nickname": values.nickName,
              "date_of_birth": values.dateOfBirth.toLocaleDateString("sv"),
              "gender": values.gender,
              "picture": values.picture,
            },
          )          // @ts-ignore
            .then(_ => navigation.push("Welcome"))
            .catch((err) => console.log("err: ", err))
        }}
      >
        {({
            handleSubmit,
            handleChange,
            handleBlur,
            errors,
            values,
            setFieldValue,
          }) => (
          <View style={$container}>
            <View style={$avatarContainer}>
              <AutoImage
                style={$avatar}
                source={{ uri: values.pictureUri }}
              />
              <TouchableOpacity style={styles.changeAvatarButton} onPress={async () => {
                const result = await launchImageLibrary({
                  mediaType: "photo",
                })
                setFieldValue("picture", result.assets[0].base64)
                setFieldValue("pictureUri", result.assets[0].uri)

              }}>
                <Text style={styles.changeAvatarButtonText} tx={"updateProfileScreen.changeAvatar"}></Text>
              </TouchableOpacity>
            </View>

            <View style={styles.form}>
              <Text style={styles.label} tx={"updateProfileScreen.email"}></Text>
              <TextInput
                autoCapitalize="none"
                style={styles.input}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              <Text style={$error}>{errors.email}</Text>

              <Text style={styles.label} tx={"updateProfileScreen.name"}></Text>
              <TextInput
                style={styles.input}
                value={values.fullName}
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
              />
              <Text style={$error}>{errors.fullName}</Text>

              <Text style={styles.label} tx={"updateProfileScreen.nickName"}></Text>
              <TextInput
                style={styles.input}
                value={values.nickName}
                onChangeText={handleChange("nickName")}
                onBlur={handleBlur("nickName")}
              />
              <Text style={$error}>{errors.nickName}</Text>

              <Text style={styles.label} tx={"updateProfileScreen.dateOfBirth"}></Text>
              <Button onPress={() => setOpenDateOfBirthPicker(true)} style={$dateOfBirthPicker}>
                {values.dateOfBirth !== DEFAULT_DATE_OF_BIRTH && values.dateOfBirth.toLocaleDateString() || "MM/DD/YYYY"}
              </Button>
              <DatePicker
                mode="date"
                modal
                open={openDateOfBirthPicker}
                date={values.dateOfBirth}
                onConfirm={(date) => {
                  setOpenDateOfBirthPicker(false)
                  handleChange("dateOfBirth")
                  setFieldValue("dateOfBirth", date)
                }
                }
                onCancel={() => {
                  setOpenDateOfBirthPicker(false)
                }}
              />
              <Text style={$error}>{errors.dateOfBirth as ReactNode}</Text>

              <Text style={styles.label} tx={"updateProfileScreen.country"}></Text>
              <View style={$countryPickerContainer}>
                <CountryPicker
                  {...{
                    countryCode: countryCode,
                    withFilter: true,
                    withFlag: true,
                    withCountryNameButton: true,
                    withEmoji: true,
                    onSelect: (country: Country) => {
                      setCountryCode(country.cca2)
                      setFieldValue("country", JSON.stringify(country))
                    },
                    withCallingCode: true,
                    placeholder: "",
                  }}
                />
              </View>
              <Text style={$error}>{errors.country as ReactNode}</Text>

              <Text style={styles.label} tx={"updateProfileScreen.phoneNumber"}></Text>
              <PhoneInput
                // containerStyle={$phoneNumberContainer}
                ref={phoneInput}
                defaultValue={""}
                layout="first"
                onChangeFormattedText={(text) => {
                  setFieldValue("phoneNumber", text)
                }}
                withDarkTheme
                withShadow
                autoFocus
                containerStyle={$phoneNumberContainer}
              />
              <Text style={$error}>{errors.phoneNumber as ReactNode}</Text>

              <Text style={styles.label} tx={"updateProfileScreen.yourLanguage"}></Text>
              <SectionedMultiSelect
                styles={{ selectToggle: $selectBox }}
                items={languages}
                // @ts-ignore
                IconRenderer={MaterialIcons}
                uniqueKey="id"
                subKey="children"
                showDropDowns={true}
                readOnlyHeadings={true}
                onSelectedItemsChange={(items) => {
                  setSelectedLanguages(items)
                  handleChange("languages")
                  setFieldValue("languages", items.map(item => languagesIdToName[item.toString()]))
                }}
                selectedItems={selectedLanguages}
                expandDropDowns={true}
              />
              <Text style={$error}>{errors.languages as ReactNode}</Text>

              <Text style={styles.label} tx={"updateProfileScreen.gender.header"}></Text>
              <SectionedMultiSelect
                styles={{ selectToggle: $selectBox }}
                items={genders}
                // @ts-ignore
                IconRenderer={MaterialIcons}
                uniqueKey="id"
                subKey="children"
                showDropDowns={true}
                readOnlyHeadings={true}
                onSelectedItemsChange={(items) => {
                  handleChange("gender")
                  const genderItem = genders[0].children
                    .find(gender => gender.id === items[0])
                  setFieldValue("gender", genderItem.id)
                  setSelectedGender(genderItem.name)
                }}
                selectText={selectedGender}
                expandDropDowns={true}
                single={true}
              />
              <Text style={$error}>{errors.gender as ReactNode}</Text>
              <TouchableOpacity style={$button} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>}
      {!user && <Text>Not logged in</Text>}

    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xl,
  paddingHorizontal: spacing.lg,
}

const $container: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

const $avatarContainer: ViewStyle = {
  marginTop: 20,
  alignItems: "center",
}

const $avatar: ImageStyle = {
  width: 100,
  height: 100,
  borderRadius: 50,
}

const $error: TextStyle = {
  color: "red",
  alignSelf: "center",
}

const $dateOfBirthPicker: ViewStyle = {
  justifyContent: "flex-start",
}

const $countryPickerContainer: ViewStyle = {
  borderColor: "#ccc",
  borderWidth: 1,
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}

const $phoneNumberContainer: ViewStyle = {
  width: "100%",
}

const $selectBox: ViewStyle = {
  borderColor: "#ccc",
  borderWidth: 1,
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}

const $button: ViewStyle = {
  marginTop: 20,
  backgroundColor: colors.palette.accent500,
  borderRadius: 5,
  paddingVertical: 10,
  paddingHorizontal: 20,
  justifyContent: "center",
  alignItems: "center",
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "80%",
  },
  label: {
    marginTop: 5,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  buttonText: {
    color: colors.text,
    fontSize: 18,
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    color: colors.palette.accent500,
    fontSize: 18,
  },
  error: {
    color: "red",
    alignSelf: "center",
  },
}
