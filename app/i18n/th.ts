import { Translations } from "./en"

const th: Translations = {
  common: {
    ok: "ตกลง!",
    cancel: "ยกเลิก",
    back: "กลับ",
    logOut: "ออกจากระบบ",
    fetchingData: "กำลังดึงข้อมูล...",
  },
  welcomeScreen: {
    postscript:
      "ค้นพบ SensayAI แอปเรียนภาษาที่มีพลังปัญญาประดิษฐ์ของคุณ บทเรียนส่วนตัว แบบฝึกหัดแบบอินเทอร์แอคทีฟ และชุมชนโลก หลักสูตรที่ปรับให้เหมาะกับคุณ สำรวจภาษาได้อย่างง่ายดาย ลองตอนนี้!",
    readyForLaunch: "แอปพลิเคชันของคุณพร้อมใช้งานเกือบแล้ว!",
    exciting: "(โอ้วว นี่น่าตื่นเต้นมาก!)",
    letsGo: "ไปเริ่มเลย!",
    helloUser: "สวัสดี, {{userName}}!",
    createProfile: "สร้างโปรไฟล์",
    snackBar: {
      cantConnect: "ไม่สามารถเชื่อมต่อ เซิร์ฟเวอร์ของเรามีปัญหาบางประการ!"
    }
  },
  errorScreen: {
    title: "เกิดข้อผิดพลาด!",
    friendlySubtitle:
      "นี่คือหน้าจอที่ผู้ใช้ของคุณจะเห็นในโปรดักชันเมื่อเกิดข้อผิดพลาด คุณจะต้องปรับแต่งข้อความนี้ (อยู่ที่ `app/i18n/en.ts`) และอาจจะรูปแบบการจัดวางด้วย (`app/screens/ErrorScreen`) หากคุณต้องการลบออกทั้งหมด ตรวจสอบ `app/app.tsx` สำหรับคอมโพเนนต์ <ErrorBoundary>.",
    reset: "รีเซ็ตแอปพลิเคชัน",
    traceTitle: "ข้อผิดพลาดจากสแต็ก %{name}",
  },
  emptyStateComponent: {
    generic: {
      heading: "ว่างเปล่ามาก... เศร้ามาก",
      content: "ไม่พบข้อมูลใด ๆ ลองคลิกที่ปุ่มเพื่อรีเฟรชหรือโหลดแอปพลิเคชันอีกครั้ง",
      button: "ลองอีกครั้ง",
    },
    imageCaptionStarter: {
      heading: "ข้อผิดพลาดในการค้นหารูปภาพ",
      content: "ลองคลิกที่ปุ่มเพื่อเลือกรูปภาพอีกครั้ง",
      button: "ลองอีกครั้ง!",
    },
  },
  errors: {
    invalidEmail: "ต้องเป็นที่อยู่อีเมลที่ถูกต้อง",
    blankText: "ไม่สามารถเว้นว่างได้",
    emailLength: "ต้องมีอย่างน้อย 6 ตัวอักษร"
  },
  loginScreen: {
    signIn: "เข้าสู่ระบบ",
    signUp: "ลงทะเบียน",
    forgotPassword: "ลืมรหัสผ่าน",
    enterDetails:
      "กรอกรายละเอียดของคุณด้านล่างเพื่อปลดล็อกข้อมูลความลับระดับสูง คุณจะไม่เดาได้เลยว่าเรามีอะไรรออยู่ หรือบางทีคุณอาจเดาได้ ไม่ใช่เรื่องยากที่นี่",
    emailFieldLabel: "อีเมล",
    passwordFieldLabel: "รหัสผ่าน",
    emailFieldPlaceholder: "ใส่ที่อยู่อีเมลของคุณ",
    passwordFieldPlaceholder: "รหัสผ่านลับซ่อนอยู่ที่นี่",
    tapToSignIn: "เข้าสู่ระบบ",
    hint: "เคล็ดลับ: คุณสามารถใช้ที่อยู่อีเมลใด ๆ และรหัสผ่านที่คุณชื่นชอบ :)",
    continueWithFacebook: "ดำเนินการต่อด้วย Facebook",
    continueWithGoogle: "ดำเนินการต่อด้วย Google",
    continueWithApple: "ดำเนินการต่อด้วย Apple",
  },
  updateProfileScreen: {
    changeAvatar: "เปลี่ยนรูปโปรไฟล์",
    email: "ที่อยู่อีเมล",
    name: "ชื่อ",
    nickName: "ชื่อเล่น",
    dateOfBirth: "วันเกิด (MM/DD/YYYY)",
    country: "ประเทศ",
    countryPlaceholder: "คลิกที่นี่เพื่อเลือกสัญชาติของคุณ",
    phoneNumber: "หมายเลขโทรศัพท์",
    yourLanguage: "ภาษาของคุณ",
    languageListHeader: "ภาษา (คุณสามารถเลือกมากกว่า 1 ภาษา)",
    userName: "ชื่อผู้ใช้ของคุณ",
    gender: {
      header: "เพศ",
      male: "ชาย",
      female: "หญิง",
      other: "อื่น ๆ",
      preferNotToSay: "ฉันไม่ต้องการบอก"
    },
    validation: {
      email: "โปรดใส่อีเมลที่ถูกต้อง",
      emailRequire: "*ต้องระบุที่อยู่อีเมล",
      duplicatedEmail: "อีเมลนี้ถูกลงทะเบียนแล้ว โปรดเปลี่ยน",
      fullNameRequire: "*ต้องระบุชื่อเต็ม",
      dateOfBirthRequire: "*ต้องระบุวันเกิด",
      minDateOfBirth: "โปรดเลือกวันหลังจาก 1/1/1900",
      countryRequire: "*ต้องระบุประเทศ",
      languagesRequire: "*ต้องระบุภาษา",
      minLanguages: "ต้องเลือกอย่างน้อย 1 ภาษา",
      nickNameRequire: "*ต้องระบุชื่อเล่น",
      genderRequire: "*ต้องระบุเพศ",
      phoneNumberValid: "โปรดใส่หมายเลขโทรศัพท์ที่ถูกต้อง",
      phoneNumberRequire: "*ต้องระบุหมายเลขโทรศัพท์",
      duplicatedPhoneNumber: "หมายเลขโทรศัพท์นี้ถูกลงทะเบียนแล้ว โปรดเปลี่ยน"
    },
    snackBar: {
      updateSuccess: "อัปเดตโปรไฟล์สำเร็จ",
      retryLabel: "ลองใหม่",
    }
  },
  homePage: {
    displayLanguage: "ภาษาที่แสดง:",
    learningLanguage: "การเรียนรู้:",
    selectLearningLanguage: "เลือกภาษาที่จะเรียน:",
    countrySpeakingThatLanguage: "ประเทศที่พูด {{lang}}",
    startStructurePathway: "เริ่มการเรียน {{lang}} ด้วยบทเรียนแบบโครงสร้าง",
    imageLesson: "เริ่มการเรียน {{lang}} ด้วยบทเรียนภาพ"
  },
  structurePathway: {
    levelSelection: {
      learningLanguage: "การเรียนรู้: {{lang}}",
      selectLearningLanguage: "คลิกที่นี่เพื่อเลือกภาษาที่คุณต้องการเรียน!",
      vocab1: "คำศัพท์ง่าย",
      grammar1: "ไวยากรณ์ง่าย",
      writing1: "เขียนง่าย",
      reading1: "อ่านง่าย",
      listening1: "ฟังง่าย",
      speaking1: "พูดง่าย",
      quest1: "ภารกิจ 1",
      grammar2: "ไวยากรณ์ปานกลาง",
      vocab2: "คำศัพท์ปานกลาง",
      writing2: "เขียนขั้นสูง",
      vocab3: "คำศัพท์ขั้นสูง",
    },
    vocabLesson: {
      title: "บทเรียนคำศัพท์ {{lang}} ระดับ {{level}}",
      enterTheContext: "เลือกหรือป้อนบริบทที่คุณต้องการเรียนรู้",
      autoCompletePlaceholderLoading: "กำลังโหลดข้อมูล...",
      autoCompletePlaceholderAfterLoading: "ป้อนบริบทที่คุณต้องการเรียนรู้",
      contextTitle: "บริบท: {{context}}",
      seeTranslation: "ดูคำแปล",
      pleaseWait: "โปรดรอสักครู่สำหรับการโหลดคำถามและการแปล",
      noHistoryFound: "ไม่พบประวัติสำหรับบริบท: {{context}} ในประวัติการเรียนรู้ {{lang}} ของคุณ \n คลิกที่นี่เพื่อสร้างบทเรียนใหม่กับบริบท: {{context}} เพื่อเรียนรู้ {{lang}}!!",
    },
  },
  imageLessonScreen: {
    uploadImage: {
      introduction: "อัปโหลดรูปภาพหรือเลือกหนึ่งในคลังของคุณ เรียนรู้ด้วยบทเรียนที่กำหนดเพียงไม่กี่วินาที!",
      uploadImageOption: "ถ่ายรูป",
      chooseFromGalleryOption: "เลือกจากคลังรูปของคุณ!",
      showUploadHistoryOption: "เลือกจากประวัติการอัปโหลดรูปภาพของฉัน",
    },
    uploadImageHistory: {
      title: "ประวัติการอัปโหลดบทเรียนรูปภาพ",
    },
    captionGenerationStarter: {
      title: "บทเรียนรูปภาพ",
      pleaseWait: "โปรดรอสักครู่สำหรับการโหลดคำอธิบายของรูปภาพ",
      vocabLessonEasy: "เริ่มบทเรียนคำศัพท์ง่ายด้วยรูปนี้",
      vocabLessonIntermediate: "เริ่มบทเรียนคำศัพท์ระดับกลางด้วยรูปนี้",
      vocabLessonAdvanced: "เริ่มบทเรียนคำศัพท์ระดับสูงด้วยรูปนี้"
    },
  },

  demoNavigator: {
    componentsTab: "คอมโพเนนต์",
    settingTab: "การตั้งค่า",
    podcastListTab: "พอดคาสต์",
    overviewTab: "ภาพรวม",
    statisticsTab: "สถิติ",
    devicesTab: "อุปกรณ์",
    settingsTab: "การตั้งค่า",
    homeTab: "หน้าแรก",
    structurePathway: "โครงสร้าง",
    imageLesson: "รูปภาพ",
  },
  settingScreen: {
    title: "การตั้งค่า",
    reportBugs: "รายงานข้อบกพร่อง",
    editProfile: "แก้ไขโปรไฟล์",
    giveFeedback: "ให้ข้อเสนอแนะ",
  },
}


export default th