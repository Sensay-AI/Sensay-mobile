const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out",
    fetchingData: "Fetching data...",
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
    traceTitle: "Error from %{name} stack",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
    imageCaptionStarter: {
      heading: "No image found Error",
      content: "Try clicking the button to choose image again.",
      button: "Let's try again!",
    },
  },
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
    startStructurePathway: "Start Learning {{lang}} with Structure Pathway Lessons",
    imageLesson: "Start Learning {{lang}} with Image Lessons"
  },
  structurePathway: {
    levelSelection: {
      learningLanguage: "Learning: {{lang}}",
      selectLearningLanguage: "Click here to select language you want to learn!",
      vocab1: "Vocab Easy",
      grammar1: "Grammar Easy",
      writing1: "Writing Easy",
      reading1: "Reading Easy",
      listening1: "Listening Easy",
      speaking1: "Speaking Easy",
      quest1: "Quest 1",
      grammar2: "Grammar Intermediate",
      vocab2: "Vocab Intermediate",
      writing2: "Writing Advanced",
      vocab3: "Vocab Advanced",
    },
    vocabLesson: {
      title: "{{lang}} Vocab {{level}} Lesson",
      enterTheContext: "Choose or enter the context you want to learn",
      autoCompletePlaceholderLoading: "Loading data...",
      autoCompletePlaceholderAfterLoading: "Enter a context you want to learn",
      contextTitle: "Context: {{context}}",
      seeTranslation: "See Translation",
      pleaseWait: "Please wait a little bit for loading the questions and translation.",
      noHistoryFound: "No history found for context: {{context}} in your learning {{lang}} history, \n Click here to generate new lesson with context: {{context}} to learn {{lang}}!!",
    },
  },
  imageLessonScreen: {
    uploadImage: {
      introduction: "Upload an image or choose one from the library. Get a personalized lesson in seconds!",
      uploadImageOption: "Take a photo",
      chooseFromGalleryOption: "Choose from your Gallery!",
      showUploadHistoryOption: "Select from my image upload history",
    },
    uploadImageHistory: {
      title: "Image Lesson Upload History",
    },
    captionGenerationStarter: {
      title: "Image Lesson",
      pleaseWait: "Please wait a little bit for loading the image caption.",
      vocabLessonEasy: "Start Easy Vocab Lesson with this Image",
      vocabLessonIntermediate: "Start Intermediate Vocab Lesson with this Image",
      vocabLessonAdvanced: "Start Advanced Vocab Lesson with this Image"
    },
  },

  demoNavigator: {
    componentsTab: "Components",
    settingTab: "Setting",
    podcastListTab: "Podcast",
    overviewTab: "Overview",
    statisticsTab: "Statistics",
    devicesTab: "Devices",
    settingsTab: "Settings",
    homeTab: "Home",
    structurePathway: "Pathway",
    imageLesson: "Images",
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
