import React, { FC, ReactNode, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextInput, TouchableOpacity, View, ViewStyle, ImageStyle, TextStyle, ActivityIndicator } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { AutoImage, Button, Screen, Snackbar, Text } from "app/components"
import { colors, spacing } from "../theme"
import { Formik } from "formik"
import * as yup from "yup"
import { Country, CountryCode } from "react-native-country-picker-modal"
import DatePicker from "react-native-date-picker"
import { launchImageLibrary } from "react-native-image-picker"
import { CountryPicker } from "react-native-country-picker-modal/lib/CountryPicker"
import SectionedMultiSelect from "react-native-sectioned-multi-select"
import { MaterialIcons } from "@expo/vector-icons"
import { items as languages, languagesAssociateById, languagesNameToId } from "../utils/languages"
import { translate } from "../i18n"
import { IconButton } from "react-native-paper"
import { useAuth0 } from "react-native-auth0"
import { genders } from "../utils/genders"
import { useStores } from "../models"
import PhoneInput from "react-native-phone-number-input"
import { useSelectedLanguages } from "../utils/useSelectedLanguages"
import { notEmpty } from "../utils/notEmpty"

interface UpdateProfileScreenProps extends NativeStackScreenProps<AppStackScreenProps<"UpdateProfile">> {
}

const DEFAULT_DATE_OF_BIRTH = new Date(1999, 0, 1)

const MIN_DATE_OF_BIRTH = new Date(1900, 0, 1)

export const UpdateProfileScreen: FC<UpdateProfileScreenProps> = observer(function UpdateProfileScreen(_props) {
  // Pull in one of our MST stores
  const {
    userStore: { updateUser, createUser, isUser, user, fetchUser },
  } = useStores()

  // Pull in navigation via hook
  const { navigation } = _props
  // @ts-ignore
  const [countryCode, setCountryCode] = useState<CountryCode>(isUser ? JSON.parse(user.country).cca2 : "")
  const [openDateOfBirthPicker, setOpenDateOfBirthPicker] = useState(false)
  const [openPhoneInput, setOpenPhoneInput] = useState(false)
  const defaultLanguages = isUser ? user.language.split(",").map((name) => languagesNameToId[name]).filter(notEmpty) : []
  const [selectedLanguages, setSelectedLanguages] = useSelectedLanguages(defaultLanguages)
  const [isLoading, setIsLoading] = React.useState(false)

  function getGender(genderEnumName: string) {
    return genders[0].children
      .find(gender => gender.gender === genderEnumName)
  }

  const [selectedGender, setSelectedGender] = useState(isUser ? getGender(user.gender).name : "")
  const [snackBarVisible, setSnackBarVisible] = React.useState(false)
  const [snackBarText, setSnackBarText] = React.useState("")
  const [retryLabel, setRetryLabel] = React.useState("")
  const onToggleSnackBar = () => setSnackBarVisible(!snackBarVisible)
  const onDismissSnackBar = () => setSnackBarVisible(false)
  const { user: userAuth0 } = useAuth0()
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
        (value) => ((isUser && !openPhoneInput) || phoneInput.current?.isValidNumber(value)),
      )
      .required(translate("updateProfileScreen.validation.phoneNumberRequire")),
  })

  function getNotUniqueErrorSnackBarText(responseData: string): string {
    if (responseData.includes("duplicate") && responseData.includes("user_info_phone_number_key"))
      return translate("updateProfileScreen.validation.duplicatedPhoneNumber")
    if (responseData.includes("duplicate") && responseData.includes("user_info_email_key"))
      return translate("updateProfileScreen.validation.duplicatedEmail")
    return "UNKNOWN"
  }

  function updateUserForm(values: {
    picture: string,
    email: string,
    fullName: string,
    dateOfBirth: Date,
    country: string,
    languages: string[],
    nickName: string,
    phoneNumber: string,
    gender: number,
    pictureUri: string
  }) {
    setIsLoading(true)
    updateUser({
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
      .then(res => {
        if (res.kind === "ok") {
          // @ts-ignore
          navigation.goBack()
        } else {
          handlingApiErrorResponse(res)
        }
      })
      .catch((err) => {
        handlingCatchingRuntimeError(err)
      })
      .finally(() => setIsLoading(false))
    setIsLoading(false)
  }

  function handlingApiErrorResponse(res: { kind: "timeout"; temporary: true } | {
    kind: "cannot-connect";
    temporary: true
  } | {
    kind: "server";
    data?: ""
  } | { kind: "unauthorized" } | { kind: "forbidden" } | { kind: "not-found" } | { kind: "rejected" } | {
    kind: "unknown";
    temporary: true
  } | { kind: "bad-data" } | { kind: "not-unique-error"; data?: "" }) {
    if (res.kind === "not-unique-error") {
      const reason = getNotUniqueErrorSnackBarText(res.data)
      setSnackBarText(`WARNING!! Can't create, reason: ${reason}`)
    } else {
      setSnackBarText(`api error, kind: ${res.kind}`)
    }
    setRetryLabel(translate("updateProfileScreen.snackBar.retryLabel"))
    onToggleSnackBar()
  }

  function handlingCatchingRuntimeError(err: any) {
    onToggleSnackBar()
    setSnackBarText(`ERROR!!`)
    setRetryLabel(translate("updateProfileScreen.snackBar.retryLabel"))
    console.error(err)
  }

  function createUserForm(values: {
    picture: string,
    email: string,
    fullName: string,
    dateOfBirth: Date,
    country: string,
    languages: string[],
    nickName: string,
    phoneNumber: string,
    gender: number,
    pictureUri: string
  }) {
    setIsLoading(true)
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
      .then(res => {
        if (res.kind === "ok") {
          // @ts-ignore
          navigation.push("Welcome")
        } else {
          handlingApiErrorResponse(res)
        }
      })
      .catch((err) => {
        handlingCatchingRuntimeError(err)
      })
      .finally(() => setIsLoading(false))
    setIsLoading(false)
  }

  useEffect(() => {
    ;(async function load() {
      await fetchUser()
    })()
    console.log(defaultLanguages)

  }, [])

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
      KeyboardAvoidingViewProps={{ behavior: "padding" }}>
      {navigation.canGoBack() && <View>
        <View>
          <IconButton icon="keyboard-backspace" size={30}
                      onPress={() => navigation.goBack()} />
        </View>
      </View>}
      {userAuth0 && <Formik
        initialValues={
          {
            picture: isUser ? user.picture : userAuth0.picture,
            email: isUser ? user.email : userAuth0.email,
            fullName: isUser ? user.full_name : userAuth0.name,
            dateOfBirth: isUser ? new Date(user.date_of_birth) : undefined,
            country: isUser ? user.country : "",
            languages: isUser ? user.language.split(",") : [],
            nickName: isUser ? user.nickname : userAuth0.nickname,
            phoneNumber: isUser ? user.phone_number : "",
            gender: isUser ? getGender(user.gender).id : 0,
            pictureUri: isUser ? user.picture : userAuth0.picture,
          }
        }
        validationSchema={emailValidationSchema}
        onSubmit={(values) => {
          if (isUser) {
            updateUserForm(values)
            return
          }
          createUserForm(values)
        }}
      >
        {({
            handleSubmit,
            handleChange,
            handleBlur,
            errors,
            values,
            setFieldValue,
          }) => {
          const submitForm = () => handleSubmit()
          return (
            <View style={$container}>
              <View style={$avatarContainer}>
                <AutoImage
                  style={$avatar}
                  source={{ uri: values.pictureUri }}
                />
                <TouchableOpacity style={$changeAvatarButton} onPress={async () => {
                  const result = await launchImageLibrary({
                    mediaType: "photo",
                  })
                  await setFieldValue("picture", result.assets[0].base64)
                  await setFieldValue("pictureUri", result.assets[0].uri)
                }}>
                  <Text style={$changeAvatarButtonText} tx={"updateProfileScreen.changeAvatar"}></Text>
                </TouchableOpacity>
              </View>

              <View style={$form}>
                <Text style={$label} tx={"updateProfileScreen.email"}></Text>
                <TextInput
                  autoCapitalize="none"
                  style={$textInput}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                <Text style={$error}>{errors.email}</Text>

                <Text style={$label} tx={"updateProfileScreen.name"}></Text>
                <TextInput
                  style={$textInput}
                  value={values.fullName}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                />
                <Text style={$error}>{errors.fullName}</Text>

                <Text style={$label} tx={"updateProfileScreen.nickName"}></Text>
                <TextInput
                  style={$textInput}
                  value={values.nickName}
                  onChangeText={handleChange("nickName")}
                  onBlur={handleBlur("nickName")}
                />
                <Text style={$error}>{errors.nickName}</Text>

                <Text style={$label} tx={"updateProfileScreen.dateOfBirth"}></Text>
                <Button onPress={() => setOpenDateOfBirthPicker(true)} style={$dateOfBirthPicker}>
                  {values?.dateOfBirth?.toLocaleDateString() || "MM/DD/YYYY"}
                </Button>
                <DatePicker
                  mode="date"
                  modal
                  open={openDateOfBirthPicker}
                  date={values?.dateOfBirth || DEFAULT_DATE_OF_BIRTH}
                  onConfirm={(date) => {
                    setOpenDateOfBirthPicker(false)
                    handleChange("dateOfBirth")
                    setFieldValue("dateOfBirth", date).then(r => console.debug(r))
                  }
                  }
                  onCancel={() => {
                    setOpenDateOfBirthPicker(false)
                  }}
                />
                <Text style={$error}>{errors.dateOfBirth as ReactNode}</Text>

                <Text style={$label} tx={"updateProfileScreen.country"}></Text>
                <View style={$countryPickerContainer}>
                  <CountryPicker
                    {...{
                      countryCode,
                      withFilter: true,
                      withFlag: true,
                      withCountryNameButton: true,
                      withEmoji: true,
                      onSelect: (country: Country) => {
                        setCountryCode(country.cca2)
                        setFieldValue("country", JSON.stringify(country)).then(r => console.debug(r))
                      },
                      withCallingCode: true,
                      placeholder: "Click to select your nationality",
                    }}
                  />
                </View>
                <Text style={$error}>{errors.country as ReactNode}</Text>

                {!isUser &&
                  <View>
                    <Text style={$label} tx={"updateProfileScreen.phoneNumber"}></Text>
                    <PhoneInput
                      containerStyle={$phoneNumberContainer}
                      defaultCode={countryCode}
                      ref={phoneInput}
                      layout="first"
                      onChangeFormattedText={(text) => {
                        setFieldValue("phoneNumber", text).then(r => console.debug(r))
                      }}
                      withDarkTheme
                      withShadow
                    />
                    <Text style={$error}>{errors.phoneNumber as ReactNode}</Text>
                  </View>
                }
                {isUser &&
                  <View>
                    <Text style={$label} tx={"updateProfileScreen.phoneNumber"}></Text>
                    {openPhoneInput && <PhoneInput
                      containerStyle={$phoneNumberContainer}
                      defaultCode={countryCode}
                      ref={phoneInput}
                      layout="first"
                      onChangeFormattedText={(text) => {
                        setFieldValue("phoneNumber", text).then(r => console.debug(r))
                      }}
                      withDarkTheme
                      withShadow
                    /> || <Button onPress={() => setOpenPhoneInput(true)} style={$dateOfBirthPicker}>
                      {values.phoneNumber}
                    </Button>}

                    <Text style={$error}>{errors.phoneNumber as ReactNode}</Text>
                  </View>
                }

                <Text style={$label} tx={"updateProfileScreen.yourLanguage"}></Text>
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
                    console.log(items)
                    setFieldValue("languages", items.map(item => languagesAssociateById[item.toString()])).then(r => console.debug(r))
                  }}
                  selectedItems={selectedLanguages}
                  expandDropDowns={true}
                />
                <Text style={$error}>{errors.languages as ReactNode}</Text>

                <Text style={$label} tx={"updateProfileScreen.gender.header"}></Text>
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
                    setFieldValue("gender", genderItem.id).then(r => console.debug(r))
                    setSelectedGender(genderItem.name)
                  }}
                  selectText={selectedGender}
                  expandDropDowns={true}
                  single={true}
                />
                <Text style={$error}>{errors.gender as ReactNode}</Text>
                <Snackbar
                  style={$snackBar}
                  visible={snackBarVisible}
                  onToggleSnackBar={onToggleSnackBar}
                  onDismissSnackBar={onDismissSnackBar}
                  actionLabel={retryLabel}
                  actionOnPress={submitForm}
                  snackBarText={snackBarText}
                />
                {isLoading && <ActivityIndicator />}
                {!isLoading && <TouchableOpacity style={$button} onPress={submitForm} disabled={isLoading}>
                  <Text style={$buttonText}>Submit</Text>
                </TouchableOpacity>}


              </View>
            </View>
          )
        }}
      </Formik>}
      {!userAuth0 && <Text>!!! Not logged in</Text>}
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
  color: colors.error,
  alignSelf: "center",
}

const $dateOfBirthPicker: ViewStyle = {
  justifyContent: "flex-start",
}

const $countryPickerContainer: ViewStyle = {
  borderColor: colors.border,
  borderWidth: 1,
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}

const $phoneNumberContainer: ViewStyle = {
  width: "100%",
}

const $selectBox: ViewStyle = {
  borderColor: colors.border,
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

const $textInput: TextStyle = {
  borderColor: colors.border,
  borderWidth: 1,
  borderRadius: 5,
  padding: 10,
  fontSize: 18,
  color: colors.text,
}

const $buttonText: TextStyle = {
  color: colors.text,
  fontSize: 18,
}
const $label: TextStyle = {
  marginTop: 5,
}

const $form: ViewStyle = {
  width: "80%",
}

const $changeAvatarButtonText: TextStyle = {
  color: colors.palette.accent500,
  fontSize: 18,
}

const $changeAvatarButton: ViewStyle = {
  marginTop: 10,
}

const $snackBar: ImageStyle = {
  width: "100%",
  paddingTop: 0,
}

