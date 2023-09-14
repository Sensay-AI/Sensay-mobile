import { Translations } from "./en"

const fr: Translations = {
  common: {
    ok: "D'accord!",
    cancel: "Annuler",
    back: "Retourner",
    logOut: "Se Déconnecter",
    fetchingData: "Récupération des données...",
  },
  welcomeScreen: {
    postscript:
      "Découvrez SensayAI, votre application d'apprentissage des langues basée sur l'IA. Cours personnalisés, exercices interactifs et communauté mondiale. Maîtrisez les langues sans effort. Commencez dès aujourd'hui !",
    readyForLaunch: "Votre application est presque prête à être lancée!",
    exciting: "(oh, c'est excitant!)",
    letsGo: "Allons-y!",
    helloUser: "Bonjour, {{userName}}!",
    createProfile: "Créer un profil",
    snackBar: {
      cantConnect: "Impossible de se connecter. Notre serveur rencontre des problème !"
    }
  },
  errorScreen: {
    title: "Quelque chose s'est mal passé !",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RÉINITIALISER L'APPLICATION",
    traceTitle: "Error from %{name} stack",
  },
  emptyStateComponent: {
    generic: {
      heading: "Eh bien... c'est dommage",
      content: "Aucune donnée trouvée pour l'instant. Essayez de cliquer sur le bouton pour actualiser ou recharger l'application.",
      button: "Essayer à nouveau",
    },
    imageCaptionStarter: {
      heading: "Aucune image trouvée. Erreur",
      content: "Essayez de cliquer à nouveau sur le bouton pour choisir une image.",
      button: "Essayer à nouveau!",
    },
  },
  errors: {
    invalidEmail: "Vous devez entrer une adresse email valide.",
    blankText: "Voici un champ obligatoire.",
    emailLength: "L'adresse e-mail doit comporter au moins 6 caractères."
  },
  loginScreen: {
    signIn: "Se connecter",
    signUp: "S'inscrire",
    forgotPassword: "Mot de passe oublié",
    enterDetails:
      "Entrez vos informations ci-dessous pour débloquer des informations top secrètes. Vous ne devinerez jamais ce que nous avons en réserve. Ou peut-être que si ; ce n'est pas de la science-fiction ici.",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Mot de passe",
    emailFieldPlaceholder: "Veuillez saisir votre adresse e-mail.",
    passwordFieldPlaceholder: "Mot de passe",
    tapToSignIn: "Se connecter",
    hint: "Hint: Vous pouvez utiliser n'importe quelle adresse e-mail et votre mot de passe préféré :)",
    continueWithFacebook: "Continuer avec Facebook",
    continueWithGoogle: "Continuer avec Google",
    continueWithApple: "Continuer avec Apple",
  },
  updateProfileScreen: {
    changeAvatar: "Changer l'avatar",
    email: "Adresse e-mail",
    name: "Nom",
    nickName: "Pseudo",
    dateOfBirth: "Date de naissance (MM/DD/YYYY)",
    country: "Pays",
    countryPlaceholder: "Cliquez ici pour sélectionner votre nationalité.",
    phoneNumber: "Numéro de téléphone",
    yourLanguage: "Votre langue",
    languageListHeader: "Langues (vous pouvez en sélectionner plusieurs)",
    userName: "Votre nom d'utilisateur",
    gender: {
      header: "Genre",
      male: "Homme",
      female: "Femme",
      other: "Autre",
      preferNotToSay: "Je préfère ne pas répondre.",
    },
    validation: {
      email: "Veuillez entrer une adresse e-mail valide.",
      emailRequire: "*L'adresse e-mail est obligatoire.",
      duplicatedEmail: "Cet e-mail est déjà enregistré. Veuillez utiliser une autre adresse e-mail.",
      fullNameRequire: "*Le nom complet est obligatoire.",
      dateOfBirthRequire: "*La date de naissance est obligatoire.",
      minDateOfBirth: "Veuillez sélectionner une date après le 1er janvier 1900.",
      countryRequire: "*Le pays est obligatoire.",
      languagesRequire: "*Les langues sont obligatoires.",
      minLanguages: "Vous devez sélectionner au moins une langue.",
      nickNameRequire: "*Le pseudonyme est obligatoire.",
      genderRequire: "*Le genre est requis.",
      phoneNumberValid: "Veuillez entrer un numéro de téléphone valide.",
      phoneNumberRequire: "*Le numéro de téléphone est obligatoire.",
      duplicatedPhoneNumber: "Ce numéro de téléphone est déjà enregistré. Veuillez utiliser un numéro différent."
    },
    snackBar: {
      updateSuccess: "Mise à jour du profil réussie.",
      retryLabel: "Réessayer",
    }
  },
  homePage: {
    displayLanguage: "Langue d'affichage:",
    learningLanguage: "Apprentissage:",
    selectLearningLanguage: "Sélectionnez une langue à apprendre:",
    countrySpeakingThatLanguage: "Langue parlée dans le pays {{lang}}",
    startStructurePathway: "Commencer à apprendre {{lang}} avec des leçons structurées",
    imageLesson: "Commencer à apprendre {{lang}} avec des leçons en images"
  },
  structurePathway: {
    levelSelection: {
      learningLanguage: "Apprentissage: {{lang}}",
      selectLearningLanguage: "Cliquez ici pour sélectionner la langue que vous souhaitez apprendre.!",
      vocab1: "Vocabulaire Facile",
      grammar1: "Grammaire Facile",
      writing1: "Écriture Facile",
      reading1: "Lecture Facile",
      listening1: "Écoute Facile",
      speaking1: "Expression Facile",
      quest1: "Quiz 1",
      grammar2: "Grammaire Intermédiaire",
      vocab2: "Vocabulaire Intermédiaire",
      writing2: "Écriture Avancé",
      vocab3: "Vocabulaire Avancé",
    },
    vocabLesson: {
      title: "{{lang}} Vocabulaire {{level}} Leçon",
      enterTheContext: "Veuillez entrer le contexte que vous souhaitez apprendre.",
      autoCompletePlaceholderLoading: "Chargement de la leçon...",
      autoCompletePlaceholderAfterLoading: "Entrez un contexte que vous souhaitez apprendre.",
      contextTitle: "Contexte: {{context}}",
      seeTranslation: "Voir la traduction",
      pleaseWait: "Chargement. Veuillez patienter..",
      noHistoryFound: "Aucun historique trouvé pour ce contexte: {{context}} dans L'historique de votre apprentissage {{lang}}, \n Cliquez ici pour générer une nouvelle leçon avec un context: {{context}} à apprendre {{lang}}!!",
    },
  },
  imageLessonScreen: {
    uploadImage: {
      introduction: "Téléchargez une image ou choisissez-en une dans la bibliothèque. Obtenez une leçon personnalisée en quelques secondes !",
      uploadImageOption: "Prenez une photo.",
      chooseFromGalleryOption: "Choisissez depuis votre galerie.",
      showUploadHistoryOption: "Sélectionnez depuis mon historique de téléchargements d'images.",
    },
    uploadImageHistory: {
      title: "Historique des téléchargements de leçons en images",
    },
    captionGenerationStarter: {
      title: "Leçon en images",
      pleaseWait: "Chargement de la légende de l'image. Veuillez patienter..",
      vocabLessonEasy: "Commencer une leçon de vocabulaire facile avec cette image.",
      vocabLessonIntermediate: "Commencer une leçon de vocabulaire intermédiaire avec cette image.",
      vocabLessonAdvanced: "Commencer une leçon de vocabulaire avancé avec cette image."
    },
  },

  demoNavigator: {
    componentsTab: "Composants",
    settingTab: "Paramètres",
    podcastListTab: "Podcast",
    overviewTab: "Aperçu",
    statisticsTab: "Statistiques",
    devicesTab: "Dispositifs",
    settingsTab: "Paramètres",
    homeTab: "Home",
    structurePathway: "Pathway",
    imageLesson: "Images",
  },
  settingScreen: {
    title: "Paramètres",
    reportBugs: "Signaler des bogues",
    editProfile: "Editer le profile",
    giveFeedback: "Donner votre avis",
  },
}

export default fr
