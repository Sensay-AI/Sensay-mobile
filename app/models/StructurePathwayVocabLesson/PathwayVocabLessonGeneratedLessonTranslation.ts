import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { PathwayVocabLessonLanguageModel } from "./PathwayVocabLessonLanguage"

/**
 * Model description here for TypeScript hints.
 */
export const PathwayVocabLessonGeneratedLessonTranslationModel = types
  .model("PathwayVocabLessonGeneratedLessonTranslation")
  .props({
    id: types.number,
    translated_language_id:  types.number,
    prompt_id: types.maybe(types.number),
    translated_text: types.string,
    translated_language: types.maybe(PathwayVocabLessonLanguageModel)
  })
  .actions(withSetPropAction)
export interface PathwayVocabLessonGeneratedLessonTranslation extends Instance<typeof PathwayVocabLessonGeneratedLessonTranslationModel> {}
export interface PathwayVocabLessonGeneratedLessonTranslationSnapshotOut extends SnapshotOut<typeof PathwayVocabLessonGeneratedLessonTranslationModel> {}
export interface PathwayVocabLessonGeneratedLessonTranslationSnapshotIn extends SnapshotIn<typeof PathwayVocabLessonGeneratedLessonTranslationModel> {}