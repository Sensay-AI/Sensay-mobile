import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { allowLanguagePrefix, DisplayLanguage, languagesNameToId } from "../utils/languages"
import i18n from "i18n-js"



function getDefaultDisplayLanguage(): DisplayLanguage {
  const i18nPrefix = (allowLanguagePrefix.includes(i18n.locale.substring(0, 2).toLowerCase())) ?
    i18n.locale.substring(0, 2)
  : "en"
  switch (i18nPrefix) {
    case "en":
      return "english"
    case "vi":
      return "vietnamese"
    case "ko":
      return "korean"
    case "ar":
      return "arabic"
  }
  return "english"
}
export const LanguageSettingModel = types
  .model("LanguageSetting")
  .props({
    displayLanguage: types.frozen<DisplayLanguage>(),
    learningLanguage: types.maybe(types.string),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get getDisplayLanguage() {
      return self.displayLanguage ? self.displayLanguage : getDefaultDisplayLanguage()
    },
    get getLearningLanguage() {
      return self.learningLanguage
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setDisplayLanguage(language: DisplayLanguage) {
      self.displayLanguage = language
    },
    setLearningLanguage(language: string) {
      if (languagesNameToId[language]) {
        self.learningLanguage = language
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface LanguageSetting extends Instance<typeof LanguageSettingModel> {}
export interface LanguageSettingSnapshotOut extends SnapshotOut<typeof LanguageSettingModel> {}
export interface LanguageSettingSnapshotIn extends SnapshotIn<typeof LanguageSettingModel> {}