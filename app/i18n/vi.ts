const vi = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out", // @demo remove-current-line
  },
  welcomeScreen: {
    postscript:
      "Chào mừng đến với SensayAI, ứng dụng học ngôn ngữ trí tuệ nhân tạo! Bài học cá nhân, bài tập tương tác, cộng đồng toàn cầu. Thông thạo ngôn ngữ dễ dàng. Bắt đầu ngay!",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
    letsGo: "Let's go!",
    helloUser: "Xin chào, {{userName}}!"
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
    invalidEmail: "Địa chỉ email không hợp lệ.",
    blankText: "Không được bỏ trống.",
    emailLength: "địa chỉ email phải ít nhất 6 kí tự."
  },
  loginScreen: {
    signIn: "Đăng nhập",
    signUp: "Đăng Ký?",
    forgotPassword: "Quên mật khẩu",
    enterDetails:
      "Enter your details below to unlock top secret info. You'll never guess what we've got waiting. Or maybe you will; it's not rocket science here.",
    emailFieldLabel: "Tên đăng nhập",
    passwordFieldLabel: "Mật khẩu",
    emailFieldPlaceholder: "Nhập địa chỉ email của bạn",
    passwordFieldPlaceholder: "Nhập mật khẩu của bạn",
    tapToSignIn: "Đăng Nhập",
    hint: "Hint: bạn đã đăng nhập không thành công 2 lần, vui lòng kiểm tra lại email và mật khẩu",
    continueWithFacebook: "Tiếp tục với Facebook",
    continueWithGoogle: "Tiếp tục với Google",
    continueWithApple: "Tiếp tục với Apple",
  },
  updateProfileScreen: {
    changeAvatar: "Đổi ảnh đại diện",
    email: "Địa chỉ Email",
    name: "Tên đầy đủ",
    nickName: "Nick name",
    phoneNumber: "Số điện thoại",

    dateOfBirth: "Ngày tháng năm sinh (MM/DD/YYYY)",
    country: "Quốc tịch",
    yourLanguage: "Ngôn ngữ bản xứ của bạn",
    userName: "Tên đăng nhập",

    gender: {
      header: "Giới tính",
      male: "Nam",
      female: "Nữ",
      other: "Khác",
      preferNotToSay: "Tôi không muốn chia sẻ thông tin này",
    },
    validation: {
      email: "Vui lòng nhập địa chỉ email hợp lệ",
      emailRequire: "*Địa chỉ Email là bắt buộc",
      minLanguages: "Bạn phải chọn ít nhất 1 ngôn ngữ"
    }
  },
  demoNavigator: {
    componentsTab: "Components",
    settingTab: "Tuỳ chỉnh",
    communityTab: "Community",
    podcastListTab: "Podcast",
    overviewTab: "Tổng quan",
    statisticsTab: "Thống kê",
    devicesTab: "Thiết bị",
    settingsTab: "Cài đặt",
  },
  overviewScreen: {
    todayEnergy: "Sản lượng hôm nay (kWh)",
    monthEnergy: "Sản lượng tháng này(kWh)",
    yearEnergy: "Sản lượng năm nay (kWh)",
    totalEnergy: "Tổng Sản lượng (kWh)",
    todayRevenue: "Doanh thu hôm nay",
    monthRevenue: "Doanh thu tháng này",
    yearRevenue: "Doanh thu năm nay",
    totalRevenue: "Tổng Doanh thu",
    carbonOffset: "Đã giảm thiểu CO2 (Tons)",
    currentPower: "Công suất hiện tại (kW)",
    basicInfoMenuItem: "Basic Information"
  },
  demoCommunityScreen: {
    title: "Connect with the community",
    tagLine:
      "Plug in to Infinite Red's community of React Native engineers and level up your app development with us!",
    joinUsOnSlackTitle: "Join us on Slack",
    joinUsOnSlack:
      "Wish there was a place to connect with React Native engineers around the world? Join the conversation in the Infinite Red Community Slack! Our growing community is a safe space to ask questions, learn from others, and grow your network.",
    joinSlackLink: "Join the Slack Community",
    makeIgniteEvenBetterTitle: "Make Ignite even better",
    makeIgniteEvenBetter:
      "Have an idea to make Ignite even better? We're happy to hear that! We're always looking for others who want to help us build the best React Native tooling out there. Join us over on GitHub to join us in building the future of Ignite.",
    contributeToIgniteLink: "Contribute to Ignite",
    theLatestInReactNativeTitle: "The latest in React Native",
    theLatestInReactNative: "We're here to keep you current on all React Native has to offer.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Chain React Conference",
    hireUsTitle: "Hire Infinite Red for your next project",
    hireUs:
      "Whether it's running a full project or getting teams up to speed with our hands-on training, Infinite Red can help with just about any React Native project.",
    hireUsLink: "Send us a message",
  },
  demoShowroomScreen: {
    jumpStart: "Components to jump start your project!",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "Via `tx` Prop",
    demoViaSpecifiedTxProp: "Via `{{prop}}Tx` Prop",
  },
  demoDebugScreen: {
    howTo: "HOW TO",
    title: "Debug",
    tagLine:
      "Congratulations, you've got a very advanced React Native app template here.  Take advantage of this boilerplate!",
    reactotron: "Send to Reactotron",
    reportBugs: "Report Bugs",
    demoList: "Demo List",
    demoPodcastList: "Demo Podcast List",
    androidReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running, run adb reverse tcp:9090 tcp:9090 from your terminal, and reload the app.",
    iosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    macosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    webReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    windowsReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
  },
  demoPodcastListScreen: {
    title: "React Native Radio episodes",
    onlyFavorites: "Only Show Favorites",
    favoriteButton: "Favorite",
    unfavoriteButton: "Unfavorite",
    accessibility: {
      cardHint:
        "Double tap to listen to the episode. Double tap and hold to {{action}} this episode.",
      switch: "Switch on to only show favorites",
      favoriteAction: "Toggle Favorite",
      favoriteIcon: "Episode not favorited",
      unfavoriteIcon: "Episode favorited",
      publishLabel: "Published {{date}}",
      durationLabel: "Duration: {{hours}} hours {{minutes}} minutes {{seconds}} seconds",
    },
    noFavoritesEmptyState: {
      heading: "This looks a bit empty",
      content:
        "No favorites have been added yet. Tap the heart on an episode to add it to your favorites!",
    },
  },
  // @demo remove-block-end
}

export default vi
export type Translations = typeof vi
