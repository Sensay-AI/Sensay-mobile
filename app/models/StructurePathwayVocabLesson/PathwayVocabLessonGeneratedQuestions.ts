import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { PathwayVocabLessonGeneratedAnswerModel } from "./PathwayVocabLessonGeneratedAnswer"
import { PathwayVocabLessonGeneratedQATranslationModel } from "./PathwayVocabLessonGeneratedQATranslation"

/**
 * Model description here for TypeScript hints.
 */
export const PathwayVocabLessonGeneratedQuestionsModel = types
  .model("PathwayVocabLessonGeneratedQuestions")
  .props({
    id:  types.number,
    created_at: types.string,
    language_id:  types.number,
    prompt_id:  types.number,
    question_text: types.string,
    answers: types.array(PathwayVocabLessonGeneratedAnswerModel),
    translations: types.array(PathwayVocabLessonGeneratedQATranslationModel),
  })
  .actions(withSetPropAction)
export interface PathwayVocabLessonGeneratedQuestions extends Instance<typeof PathwayVocabLessonGeneratedQuestionsModel> {
}

export interface PathwayVocabLessonGeneratedQuestionsSnapshotOut extends SnapshotOut<typeof PathwayVocabLessonGeneratedQuestionsModel> {
}

export interface PathwayVocabLessonGeneratedQuestionsSnapshotIn extends SnapshotIn<typeof PathwayVocabLessonGeneratedQuestionsModel> {
}