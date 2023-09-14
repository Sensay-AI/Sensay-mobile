import { Translations } from "./en"

const ar: Translations = {
  common: {
    ok: "موافق!",
    cancel: "إلغاء",
    back: "رجوع",
    logOut: "تسجيل الخروج",
    fetchingData: "جاري جلب البيانات...",
  },
  welcomeScreen: {
    postscript:
      "اكتشف SensayAI، تطبيق تعلم اللغات الخاص بك بدعم من الذكاء الاصطناعي. دروس شخصية، تمارين تفاعلية، ومجتمع عالمي. اتقن اللغات بسهولة. ابدأ اليوم!",
    readyForLaunch: "تطبيقك، جاهز تقريبًا للإطلاق!",
    exciting: "(أوه، هذا مثير للغاية!)",
    letsGo: "لنذهب!",
    helloUser: "مرحبًا، {{userName}}!",
    createProfile: "إنشاء ملف التعريف",
    snackBar: {
      cantConnect: "لا يمكن الاتصال، خادمنا يواجه حاليًا بعض المشكلات!"
    }
  },
  errorScreen: {
    title: "حدث خطأ!",
    friendlySubtitle:
      "هذه هي الشاشة التي سيراها مستخدموك في الإنتاج عند حدوث خطأ. سترغب في تخصيص هذه الرسالة (التي توجد في `app/i18n/en.ts`) وربما التصميم أيضًا (الموجود في `app/screens/ErrorScreen`). إذا كنت ترغب في إزالتها بالكامل، تحقق من `app/app.tsx` لمكون <ErrorBoundary>.",
    reset: "إعادة تعيين التطبيق",
    traceTitle: "خطأ من مكدس %{name}",
  },
  emptyStateComponent: {
    generic: {
      heading: "فارغ جدًا... حزين جدًا",
      content: "لم يتم العثور على بيانات بعد. حاول النقر على الزر للتحديث أو إعادة تحميل التطبيق.",
      button: "لنجرب مرة أخرى",
    },
    imageCaptionStarter: {
      heading: "خطأ في العثور على صورة",
      content: "حاول النقر على الزر لاختيار الصورة مرة أخرى.",
      button: "لنجرب مرة أخرى!",
    },
  },
  errors: {
    invalidEmail: "يجب أن يكون عنوان البريد الإلكتروني صالحًا.",
    blankText: "لا يمكن أن يكون فارغًا",
    emailLength: "يجب أن يتكون البريد الإلكتروني من ما لا يقل عن 6 أحرف"
  },
  loginScreen: {
    signIn: "تسجيل الدخول",
    signUp: "التسجيل",
    forgotPassword: "نسيت كلمة المرور",
    enterDetails:
      "أدخل تفاصيلك أدناه لفتح المعلومات السرية العليا. لن تخمن أبدًا ماذا لدينا في الانتظار. أو ربما ستخمن ذلك. إنها ليست فيزياء روكت هنا.",
    emailFieldLabel: "البريد الإلكتروني",
    passwordFieldLabel: "كلمة المرور",
    emailFieldPlaceholder: "أدخل عنوان البريد الإلكتروني الخاص بك",
    passwordFieldPlaceholder: "كلمة المرور السرية هنا",
    tapToSignIn: "تسجيل الدخول",
    hint: "تلميح: يمكنك استخدام أي عنوان بريد إلكتروني وكلمة مرور مفضلة لديك :)",
    continueWithFacebook: "المتابعة مع Facebook",
    continueWithGoogle: "المتابعة مع Google",
    continueWithApple: "المتابعة مع Apple",
  },
  updateProfileScreen: {
    changeAvatar: "تغيير الصورة الرمزية",
    email: "عنوان البريد الإلكتروني",
    name: "الاسم",
    nickName: "اسم العرض",
    dateOfBirth: "تاريخ الميلاد (MM/DD/YYYY)",
    country: "البلد",
    countryPlaceholder: "انقر هنا لاختيار جنسيتك",
    phoneNumber: "رقم الهاتف",
    yourLanguage: "لغتك",
    languageListHeader: "اللغات (يمكنك اختيار أكثر من واحدة)",
    userName: "اسم المستخدم الخاص بك",
    gender: {
      header: "الجنس",
      male: "ذكر",
      female: "أنثى",
      other: "آخر",
      preferNotToSay: "أفضل عدم القول"
    },
    validation: {
      email: "الرجاء إدخال عنوان بريد إلكتروني صالح",
      emailRequire: "البريد الإلكتروني مطلوب*",
      duplicatedEmail: "الفعل، يرجى تغييرههذا البريد الإلكتروني مسجل ب",
      fullNameRequire: "الاسم الكامل مطلوب*",
      dateOfBirthRequire: "تاريخ الميلاد مطلوب*",
      minDateOfBirth: "الرجاء تحديد تاريخ بعد 1/1/1900",
      countryRequire: "البلد مطلوب*",
      languagesRequire: "اللغات مطلوبة*",
      minLanguages: "يجب اختيار لغة واحدة على الأقل",
      nickNameRequire: "اسم العرض مطلوب*",
      genderRequire: "الجنس مطلوب*",
      phoneNumberValid: "الرجاء إدخال رقم هاتف صالح",
      phoneNumberRequire: "رقم الهاتف مطلوب*",
      duplicatedPhoneNumber: "هذا الرقم الهاتف مسجل بالفعل، الرجاء تغييره"
    },
    snackBar: {
      updateSuccess: "تحديث الملف الشخصي بنجاح",
      retryLabel: "إعادة المحاولة",
    }
  },
  homePage: {
    displayLanguage: "لغة العرض:",
    learningLanguage: "تعلم:",
    selectLearningLanguage: "اختر لغة للتعلم:",
    countrySpeakingThatLanguage: "البلد الذي يتحدث اللغة {{lang}}",
    startStructurePathway: "ابدأ التعلم باللغة {{lang}} مع دروس المنهجية",
    imageLesson: "ابدأ التعلم باللغة {{lang}} مع دروس الصور"
  },
  structurePathway: {
    levelSelection: {
      learningLanguage: "تعلم: {{lang}}",
      selectLearningLanguage: "انقر هنا لاختيار اللغة التي ترغب في تعلمها!",
      vocab1: "مفردات سهلة",
      grammar1: "قواعد اللغة سهلة",
      writing1: "كتابة سهلة",
      reading1: "قراءة سهلة",
      listening1: "استماع سهل",
      speaking1: "التحدث سهل",
      quest1: "مهمة 1",
      grammar2: "قواعد اللغة متوسطة",
      vocab2: "مفردات متوسطة",
      writing2: "كتابة متقدمة",
      vocab3: "مفردات متقدمة",
    },
    vocabLesson: {
      title: "درس المفردات {{lang}} المستوى {{level}}",
      enterTheContext: "اختر أو أدخل السياق الذي تريد تعلمه",
      autoCompletePlaceholderLoading: "جاري تحميل البيانات...",
      autoCompletePlaceholderAfterLoading: "أدخل السياق الذي تريد تعلمه",
      contextTitle: "السياق: {{context}}",
      seeTranslation: "عرض الترجمة",
      pleaseWait: "يرجى الانتظار قليلاً لتحميل الأسئلة والترجمة.",
      noHistoryFound: "لم يتم العثور على سجل للسياق: {{context}} في تاريخ تعلمك {{lang}}, انقر هنا لإنشاء درس جديد مع السياق: {{context}} لتعلم اللغة {{lang}}!!",
    },
  },
  imageLessonScreen: {
    uploadImage: {
      introduction: "قم بتحميل صورة أو اختر واحدة من المكتبة. احصل على درس شخصي في ثوانٍ!",
      uploadImageOption: "التقاط صورة",
      chooseFromGalleryOption: "اختيار من معرض الصور الخاص بك!",
      showUploadHistoryOption: "اختيار من تاريخ تحميل الصور الخاص بي",
    },
    uploadImageHistory: {
      title: "تاريخ تحميل دروس الصور",
    },
    captionGenerationStarter: {
      title: "درس الصور",
      pleaseWait: "الرجاء الانتظار قليلاً لتحميل وصف الصورة.",
      vocabLessonEasy: "ابدأ درس مفردات سهل مع هذه الصورة",
      vocabLessonIntermediate: "ابدأ درس مفردات متوسط مع هذه الصورة",
      vocabLessonAdvanced: "ابدأ درس مفردات متقدم مع هذه الصورة"
    },
  },

  demoNavigator: {
    componentsTab: "المكونات",
    settingTab: "الإعدادات",
    podcastListTab: "البودكاست",
    overviewTab: "نظرة عامة",
    statisticsTab: "الإحصائيات",
    devicesTab: "الأجهزة",
    settingsTab: "الإعدادات",
    homeTab: "الصفحة الرئيسية",
    structurePathway: "المسار",
    imageLesson: "الصور",
  },
  settingScreen: {
    title: "الإعدادات",
    reportBugs: "الإبلاغ عن الأخطاء",
    editProfile: "تحرير الملف الشخصي",
    giveFeedback: "تقديم ملاحظات",
  },
}
export default ar
