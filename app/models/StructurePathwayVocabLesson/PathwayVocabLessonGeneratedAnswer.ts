import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { PathwayVocabLessonGeneratedQATranslationModel } from "./PathwayVocabLessonGeneratedQATranslation"

/**
 * Model description here for TypeScript hints.
 */
export const PathwayVocabLessonGeneratedAnswerModel = types
  .model("PathwayVocabLessonGeneratedAnswer")
  .props({
    id:  types.number,
    is_correct: types.boolean,
    created_at: types.string,
    question_id:   types.number,
    answer_text:  types.string,
    updated_at:  types.string,
    language_id:  types.number,
    translations: types.array(PathwayVocabLessonGeneratedQATranslationModel)
  })
  .actions(withSetPropAction)
export interface PathwayVocabLessonGeneratedAnswer extends Instance<typeof PathwayVocabLessonGeneratedAnswerModel> {}
export interface PathwayVocabLessonGeneratedAnswerSnapshotOut extends SnapshotOut<typeof PathwayVocabLessonGeneratedAnswerModel> {}
export interface PathwayVocabLessonGeneratedAnswerSnapshotIn extends SnapshotIn<typeof PathwayVocabLessonGeneratedAnswerModel> {}
