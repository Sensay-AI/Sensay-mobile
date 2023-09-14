import { Translations } from "./en"

const vi: Translations = {
  common: {
    ok: "Đồng ý!",
    cancel: "Hủy",
    back: "Quay lại",
    logOut: "Đăng xuất",
    fetchingData: "Đang lấy dữ liệu...",
  },
  welcomeScreen: {
    postscript:
      "Khám phá SensayAI, ứng dụng học ngôn ngữ được hỗ trợ bởi trí tuệ nhân tạo. Bài học cá nhân hóa, bài tập tương tác và cộng đồng toàn cầu. Trở thành bậc thầy trong việc học ngôn ngữ một cách dễ dàng. Bắt đầu ngay hôm nay!",
    readyForLaunch: "Ứng dụng của bạn, gần như đã sẵn sàng ra mắt!",
    exciting: "(ôi, thật là thú vị!)",
    letsGo: "Bắt đầu!",
    helloUser: "Xin chào, {{userName}}!",
    createProfile: "Tạo hồ sơ",
    snackBar: {
      cantConnect: "Không thể kết nối, máy chủ của chúng tôi đang gặp một số vấn đề!"
    }
  },
  errorScreen: {
    title: "Có lỗi xảy ra!",
    friendlySubtitle:
      "Đây là màn hình mà người dùng của bạn sẽ thấy trong quá trình sản xuất khi có lỗi xảy ra. Bạn sẽ muốn tùy chỉnh thông báo này (nằm trong `app/i18n/en.ts`) và có thể cả bố cục (nằm trong `app/screens/ErrorScreen`) nữa. Nếu bạn muốn loại bỏ hoàn toàn màn hình này, hãy kiểm tra `app/app.tsx` cho thành phần <ErrorBoundary>.",
    reset: "ĐẶT LẠI ỨNG DỤNG",
    traceTitle: "Lỗi stack trace: %{name}",
  },
  emptyStateComponent: {
    generic: {
      heading: "Rất trống... rất buồn",
      content: "Chưa tìm thấy dữ liệu. Hãy thử nhấn nút để làm mới hoặc tải lại ứng dụng.",
      button: "Hãy thử lại",
    },
    imageCaptionStarter: {
      heading: "Lỗi không tìm thấy hình ảnh",
      content: "Hãy thử nhấn nút để chọn hình ảnh lại.",
      button: "Hãy thử lại!",
    },
  },
  errors: {
    invalidEmail: "phải là địa chỉ email hợp lệ.",
    blankText: "không thể để trống",
    emailLength: "phải có ít nhất 6 ký tự"
  },
  loginScreen: {
    signIn: "Đăng nhập",
    signUp: "Đăng ký",
    forgotPassword: "Quên mật khẩu",
    enterDetails:
      "Nhập thông tin của bạn dưới đây để mở khóa thông tin siêu bí mật. Bạn sẽ không bao giờ đoán được những gì chúng tôi đã chuẩn bị. Hoặc có thể bạn sẽ đoán được; đây không phải là vật lý học đâu.",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Mật khẩu",
    emailFieldPlaceholder: "Nhập địa chỉ email của bạn",
    passwordFieldPlaceholder: "Mật khẩu siêu bí mật ở đây",
    tapToSignIn: "Đăng nhập",
    hint: "Gợi ý: bạn có thể sử dụng bất kỳ địa chỉ email nào và mật khẩu yêu thích của bạn :)",
    continueWithFacebook: "Tiếp tục với Facebook",
    continueWithGoogle: "Tiếp tục với Google",
    continueWithApple: "Tiếp tục với Apple",
  },
  updateProfileScreen: {
    changeAvatar: "Thay đổi hình đại diện",
    email: "Địa chỉ Email",
    name: "Tên",
    nickName: "Tên gọi",
    dateOfBirth: "Ngày sinh (MM/DD/YYYY)",
    country: "Quốc gia",
    countryPlaceholder: "Nhấn vào đây để chọn quốc tịch của bạn",
    phoneNumber: "Số điện thoại",
    yourLanguage: "Ngôn ngữ của bạn",
    languageListHeader: "Ngôn ngữ (bạn có thể chọn nhiều hơn một)",
    userName: "Tên người dùng của bạn",
    gender: {
      header: "Giới tính",
      male: "Nam",
      female: "Nữ",
      other: "Khác",
      preferNotToSay: "Tôi không muốn nói"
    },
    validation: {
      email: "Vui lòng nhập một địa chỉ email hợp lệ",
      emailRequire: "*Địa chỉ Email là bắt buộc",
      duplicatedEmail: "Email này đã được đăng ký, vui lòng thay đổi",
      fullNameRequire: "*Họ và tên là bắt buộc",
      dateOfBirthRequire: "*Ngày sinh là bắt buộc",
      minDateOfBirth: "Vui lòng chọn ngày sau ngày 1/1/1900",
      countryRequire: "*Quốc gia là bắt buộc",
      languagesRequire: "*Ngôn ngữ là bắt buộc",
      minLanguages: "Phải chọn ít nhất 1 ngôn ngữ",
      nickNameRequire: "*Tên gọi là bắt buộc",
      genderRequire: "*Giới tính là bắt buộc",
      phoneNumberValid: "Vui lòng nhập số điện thoại hợp lệ",
      phoneNumberRequire: "*Số điện thoại là bắt buộc",
      duplicatedPhoneNumber: "Số điện thoại này đã được đăng ký, vui lòng thay đổi"
    },
    snackBar: {
      updateSuccess: "Cập nhật hồ sơ thành công",
      retryLabel: "Thử lại",
    }
  },
  homePage: {
    displayLanguage: "Ngôn ngữ hiển thị:",
    learningLanguage: "Đang học:",
    selectLearningLanguage: "Chọn một Ngôn ngữ để Học:",
    countrySpeakingThatLanguage: "Quốc gia nói {{lang}}",
    startStructurePathway: "Bắt đầu Học {{lang}} với Bài học Cấu trúc",
    imageLesson: "Bắt đầu Học {{lang}} với Bài học Hình ảnh"
  },
  structurePathway: {
    levelSelection: {
      learningLanguage: "Đang học: {{lang}}",
      selectLearningLanguage: "Nhấn vào đây để chọn ngôn ngữ bạn muốn học!",
      vocab1: "Từ vựng Dễ",
      grammar1: "Ngữ pháp Dễ",
      writing1: "Viết Dễ",
      reading1: "Đọc Dễ",
      listening1: "Nghe Dễ",
      speaking1: "Nói Dễ",
      quest1: "Nhiệm vụ 1",
      grammar2: "Ngữ pháp Trung cấp",
      vocab2: "Từ vựng Trung cấp",
      writing2: "Viết Nâng cao",
      vocab3: "Từ vựng Nâng cao",
    },
    vocabLesson: {
      title: "Bài học Từ vựng {{lang}} Cấp độ {{level}}",
      enterTheContext: "Chọn hoặc nhập ngữ cảnh bạn muốn học",
      autoCompletePlaceholderLoading: "Đang tải dữ liệu...",
      autoCompletePlaceholderAfterLoading: "Nhập ngữ cảnh bạn muốn học",
      contextTitle: "Ngữ cảnh: {{context}}",
      seeTranslation: "Xem Bản Dịch",
      pleaseWait: "Vui lòng đợi một chút để tải câu hỏi và dịch.",
      noHistoryFound: "Không tìm thấy lịch sử nào cho ngữ cảnh: {{context}} trong lịch sử học {{lang}} của bạn, \n Nhấn vào đây để tạo bài học mới với ngữ cảnh: {{context}} để học {{lang}}!!",
    },
  },
  imageLessonScreen: {
    uploadImage: {
      introduction: "Tải lên hình ảnh hoặc chọn một hình ảnh từ thư viện. Nhận bài học cá nhân hóa trong vài giây!",
      uploadImageOption: "Chụp ảnh",
      chooseFromGalleryOption: "Chọn từ Thư viện của bạn!",
      showUploadHistoryOption: "Chọn từ lịch sử tải ảnh của tôi",
    },
    uploadImageHistory: {
      title: "Lịch sử Tải ảnh cho Bài học Hình ảnh",
    },
    captionGenerationStarter: {
      title: "Bài học Hình ảnh",
      pleaseWait: "Vui lòng đợi một chút để tải phần mô tả hình ảnh.",
      vocabLessonEasy: "Bắt đầu Bài học Từ vựng Dễ với Hình ảnh này",
      vocabLessonIntermediate: "Bắt đầu Bài học Từ vựng Trung cấp với Hình ảnh này",
      vocabLessonAdvanced: "Bắt đầu Bài học Từ vựng Nâng cao với Hình ảnh này"
    },
  },
  demoNavigator: {
    componentsTab: "Các thành phần",
    settingTab: "Cài đặt",
    podcastListTab: "Podcast",
    overviewTab: "Tổng quan",
    statisticsTab: "Thống kê",
    devicesTab: "Thiết bị",
    settingsTab: "Cài đặt",
    homeTab: "Trang chủ",
    structurePathway: "Pathway",
    imageLesson: "Images",
  },
  settingScreen: {
    title: "Cài đặt",
    reportBugs: "Báo cáo Lỗi",
    editProfile: "Chỉnh sửa Hồ sơ",
    giveFeedback: "Đưa ra Phản hồi",
  },
}

export default vi