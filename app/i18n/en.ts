const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out", // @demo remove-current-line
  },
  welcomeScreen: {
    postscript:
      "Discover SensayAI, your AI-powered language learning app. Personalized lessons, interactive exercises, and global community. Master languages effortlessly. Start today!",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
    letsGo: "Let's go!",
    helloUser: "Hello, {{userName}}!",
    createProfile: "Create profile",
    snackBar: {
      cantConnect: "Can't connect, our server currently have some trouble!"
    }
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: "must be a valid email address.",
    blankText: "can't be blank",
    emailLength: "must be at least 6 characters"
  },
  loginScreen: {
    signIn: "Sign In",
    signUp: "Sign Up?",
    forgotPassword: "Forgot Password",
    enterDetails:
      "Enter your details below to unlock top secret info. You'll never guess what we've got waiting. Or maybe you will; it's not rocket science here.",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Password",
    emailFieldPlaceholder: "Enter your email address",
    passwordFieldPlaceholder: "Super secret password here",
    tapToSignIn: "Log In",
    hint: "Hint: you can use any email address and your favorite password :)",
    continueWithFacebook: "Continue with Facebook",
    continueWithGoogle: "Continue with Google",
    continueWithApple: "Continue with Apple",
  },
  updateProfileScreen: {
    changeAvatar: "Change avatar",
    email: "Email Address",
    name: "Name",
    nickName: "Nick name",
    dateOfBirth: "Date of Birth (MM/DD/YYYY)",
    country: "Country",
    countryPlaceholder: "Click here to select your nationality",
    phoneNumber: "Phone number",
    yourLanguage: "Your language",
    languageListHeader: "Languages (you can select more than one)",
    userName: "Your user name",
    gender: {
      header: "Gender",
      male: "Male",
      female: "Female",
      other: "Other",
      preferNotToSay: "I'm prefer not to say",
    },
    validation: {
      email: "Please enter a valid email",
      emailRequire: "*Email Address is Required",
      duplicatedEmail: "This email is already registered, please change",
      fullNameRequire: "*Full name is Required",
      dateOfBirthRequire: "*Date of birth is required",
      minDateOfBirth: "Please select a day after 1/1/1900",
      countryRequire: "*Country is Required",
      languagesRequire: "*Languages is Required",
      minLanguages: "Must have at least 1 language selected",
      nickNameRequire: "*Nick name is Required",
      genderRequire: "*Gender is Required",
      phoneNumberValid: "Please enter a valid phone number",
      phoneNumberRequire: "*Phone number is Required",
      duplicatedPhoneNumber: "This phone number is already registered, please change"
    },
    snackBar: {
      updateSuccess: "Update profile success",
      retryLabel: "Retry",
    }
  },
  homePage: {
    displayLanguage: "Display language:",
    learningLanguage: "Learning:",
    selectLearningLanguage: "Select a Language to Learn:",
    countrySpeakingThatLanguage: "Country speaking {{lang}}",
  },
  demoNavigator: {
    componentsTab: "Components",
    settingTab: "Setting",
    communityTab: "Community",
    podcastListTab: "Podcast",
    overviewTab: "Overview",
    statisticsTab: "Statistics",
    devicesTab: "Devices",
    settingsTab: "Settings",
    homeTab: "Home"
  },
  settingScreen: {
    title: "Setting",
    reportBugs: "Report Bugs",
    editProfile: "Edit Profile",
    giveFeedback: "Give Feedback",
  },
}

export default en
export type Translations = typeof en
