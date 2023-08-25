import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "./Settings/AuthenticationStore" // @demo remove-current-line
import { EpisodeStoreModel } from "./EpisodeStore"
import { UserStoreModel } from "./Settings/UserStore"
import { LanguageSettingModel } from "./Settings/LanguageSetting"
import { PathwayVocabLessonModel } from "./StructurePathwayVocabLesson/PathwayVocabLesson"
import { ImageLessonModel } from "./ImageLesson/ImageLesson" // @demo remove-current-line

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  episodeStore: types.optional(EpisodeStoreModel, {}), // @demo remove-current-line
  userStore: types.optional(UserStoreModel, {}),
  languageSettingStore: types.optional(LanguageSettingModel, {}),
  pathwayVocabLessonStore: types.optional(PathwayVocabLessonModel, {}),
  imageLessonStore: types.optional(ImageLessonModel, {})
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
