import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const PathwayVocabLessonGeneratedQATranslationModel = types
  .model("PathwayVocabLessonGeneratedQATranslation")
  .props({
    translated_text: types.string,
    id:  types.number,
    translated_language_id:  types.number,
  })
  .actions(withSetPropAction)
export interface PathwayVocabLessonGeneratedQATranslation extends Instance<typeof PathwayVocabLessonGeneratedQATranslationModel> {}
export interface PathwayVocabLessonGeneratedTranslationSnapshotOut extends SnapshotOut<typeof PathwayVocabLessonGeneratedQATranslationModel> {}
export interface PathwayVocabLessonGeneratedTranslationSnapshotIn extends SnapshotIn<typeof PathwayVocabLessonGeneratedQATranslationModel> {}
