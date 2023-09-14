import { Translations } from "./en"

const ja: Translations = {
  common: {
    ok: "OK!",
    cancel: "キャンセル",
    back: "戻る",
    logOut: "ログアウト",
    fetchingData: "データを取得中...",
  },
  welcomeScreen: {
    postscript:
      "SensayAIを発見しましょう。AIパワードの言語学習アプリです。パーソナライズされたレッスン、インタラクティブな演習、グローバルコミュニティがあります。言語を楽にマスターしましょう。今すぐ始めましょう！",
    readyForLaunch: "アプリ、もうすぐローンチの準備ができています！",
    exciting: "（おっ、これはワクワクするものです！）",
    letsGo: "さあ、始めましょう！",
    helloUser: "こんにちは、{{userName}}さん！",
    createProfile: "プロフィールを作成",
    snackBar: {
      cantConnect: "接続できません。サーバーに一時的な問題が発生しています！"
    }
  },
  errorScreen: {
    title: "何かがおかしいです！",
    friendlySubtitle:
      "これは、エラーが発生したときに本番環境でユーザーが見る画面です。このメッセージ（`app/i18n/en.ts`にある）とおそらくレイアウトもカスタマイズする必要があります（`app/screens/ErrorScreen`）。これを完全に削除したい場合は、<ErrorBoundary>コンポーネントに関して`app/app.tsx`を確認してください。",
    reset: "アプリをリセット",
    traceTitle: "%{name}スタックからのエラー",
  },
  emptyStateComponent: {
    generic: {
      heading: "何もありません...とても悲しい",
      content: "まだデータが見つかりません。ボタンをクリックしてリフレッシュまたはアプリを再読み込みしてみてください。",
      button: "もう一度試してみましょう",
    },
    imageCaptionStarter: {
      heading: "画像が見つかりません エラー",
      content: "ボタンをクリックして画像を再選択してみてください。",
      button: "もう一度試してみましょう！",
    },
  },
  errors: {
    invalidEmail: "有効なメールアドレスである必要があります。",
    blankText: "空白にできません",
    emailLength: "少なくとも6文字である必要があります"
  },
  loginScreen: {
    signIn: "サインイン",
    signUp: "サインアップ",
    forgotPassword: "パスワードを忘れた方",
    enterDetails:
      "トップシークレット情報を解除するには、以下の詳細を入力してください。待っているものは想像もつかないかもしれません。または、あなたはおそらくそれを推測するでしょう。ここではロケット科学ではありません。",
    emailFieldLabel: "メールアドレス",
    passwordFieldLabel: "パスワード",
    emailFieldPlaceholder: "メールアドレスを入力してください",
    passwordFieldPlaceholder: "ここにスーパーシークレットパスワードを入力してください",
    tapToSignIn: "ログイン",
    hint: "ヒント：お好きなメールアドレスとお気に入りのパスワードを使用できます :)",
    continueWithFacebook: "Facebookで続行",
    continueWithGoogle: "Googleで続行",
    continueWithApple: "Appleで続行",
  },
  updateProfileScreen: {
    changeAvatar: "アバターを変更",
    email: "メールアドレス",
    name: "名前",
    nickName: "ニックネーム",
    dateOfBirth: "生年月日（MM/DD/YYYY）",
    country: "国",
    countryPlaceholder: "国籍を選択するにはここをクリックしてください",
    phoneNumber: "電話番号",
    yourLanguage: "あなたの言語",
    languageListHeader: "言語（複数選択可能）",
    userName: "ユーザー名",
    gender: {
      header: "性別",
      male: "男性",
      female: "女性",
      other: "その他",
      preferNotToSay: "言いたくない"
    },
    validation: {
      email: "有効なメールアドレスを入力してください",
      emailRequire: "*メールアドレスは必須です",
      duplicatedEmail: "このメールアドレスは既に登録されています。変更してください",
      fullNameRequire: "*フルネームは必須です",
      dateOfBirthRequire: "*生年月日は必須です",
      minDateOfBirth: "1900年1月1日以降の日付を選択してください",
      countryRequire: "*国は必須です",
      languagesRequire: "*言語は必須です",
      minLanguages: "少なくとも1つの言語を選択してください",
      nickNameRequire: "*ニックネームは必須です",
      genderRequire: "*性別は必須です",
      phoneNumberValid: "有効な電話番号を入力してください",
      phoneNumberRequire: "*電話番号は必須です",
      duplicatedPhoneNumber: "この電話番号は既に登録されています。変更してください"
    },
    snackBar: {
      updateSuccess: "プロフィールを更新しました",
      retryLabel: "再試行",
    }
  },
  homePage: {
    displayLanguage: "表示言語：",
    learningLanguage: "学習中：",
    selectLearningLanguage: "学習する言語を選択：",
    countrySpeakingThatLanguage: "{{lang}}を話す国",
    startStructurePathway: "{{lang}}を構造パスウェイレッスンで学び始める",
    imageLesson: "{{lang}}をイメージレッスンで学び始める"
  },
  structurePathway: {
    levelSelection: {
      learningLanguage: "学習中：{{lang}}",
      selectLearningLanguage: "学習したい言語を選択するにはここをクリックしてください",
      vocab1: "単語（簡単）",
      grammar1: "文法（簡単）",
      writing1: "ライティング（簡単）",
      reading1: "リーディング（簡単）",
      listening1: "リスニング（簡単）",
      speaking1: "スピーキング（簡単）",
      quest1: "クエスト 1",
      grammar2: "文法（中級）",
      vocab2: "単語（中級）",
      writing2: "ライティング（上級）",
      vocab3: "単語（上級）",
    },
    vocabLesson: {
      title: "{{lang}}語彙{{level}}レッスン",
      enterTheContext: "学習したい文脈を選択または入力してください",
      autoCompletePlaceholderLoading: "データを読み込んでいます...",
      autoCompletePlaceholderAfterLoading: "学習したい文脈を入力してください",
      contextTitle: "文脈：{{context}}",
      seeTranslation: "翻訳を見る",
      pleaseWait: "質問と翻訳の読み込みには少し時間がかかる場合があります。",
      noHistoryFound: "学習履歴に文脈: {{context}} が見つかりませんでした。\n {{context}} の新しいレッスンを生成するにはここをクリックして{{lang}}を学ぶための文脈を選択してください！！",
    },
  },
  imageLessonScreen: {
    uploadImage: {
      introduction: "画像をアップロードするか、ライブラリから選択してください。数秒でパーソナライズされたレッスンを受けることができます！",
      uploadImageOption: "写真を撮る",
      chooseFromGalleryOption: "ギャラリーから選ぶ",
      showUploadHistoryOption: "私の画像アップロード履歴から選択する",
    },
    uploadImageHistory: {
      title: "画像レッスンのアップロード履歴",
    },
    captionGenerationStarter: {
      title: "画像レッスン",
      pleaseWait: "画像のキャプションを読み込むのに少し時間がかかる場合があります。",
      vocabLessonEasy: "この画像で簡単な語彙レッスンを開始",
      vocabLessonIntermediate: "この画像で中級語彙レッスンを開始",
      vocabLessonAdvanced: "この画像で上級語彙レッスンを開始"
    },
  },

  demoNavigator: {
    componentsTab: "コンポーネント",
    settingTab: "設定",
    podcastListTab: "ポッドキャスト",
    overviewTab: "概要",
    statisticsTab: "統計",
    devicesTab: "デバイス",
    settingsTab: "設定",
    homeTab: "ホーム",
    structurePathway: "ストラクチャーパスウェイ",
    imageLesson: "イメージ",
  },
  settingScreen: {
    title: "設定",
    reportBugs: "バグを報告",
    editProfile: "プロフィールを編集",
    giveFeedback: "フィードバックを提供",
  },
}


export default ja