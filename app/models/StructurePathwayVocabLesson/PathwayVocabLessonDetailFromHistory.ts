import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { PathwayVocabLessonGeneratedQuestionsModel } from "./PathwayVocabLessonGeneratedQuestions"
import { PathwayVocabLessonGeneratedLessonTranslationModel } from "./PathwayVocabLessonGeneratedLessonTranslation"
import { PathwayVocabLessonLanguageModel } from "./PathwayVocabLessonLanguage"

/**
 * Model description here for TypeScript hints.
 */


export const PathwayVocabLessonDetailFromHistoryModel = types
  .model("PathwayVocabLessonDetailFromHistory")
  .props({
    id: types.number,
    prompt: types.string,
    created_at: types.string,
    updated_at: types.string,
    category_id: types.number,
    level: types.number,
    language_id: types.number,
    questions: types.array(PathwayVocabLessonGeneratedQuestionsModel),
    language: types.maybe(PathwayVocabLessonLanguageModel),
    translations: types.array(PathwayVocabLessonGeneratedLessonTranslationModel)
  })
  .actions(withSetPropAction)

export interface PathwayVocabLessonDetailFromHistory extends Instance<typeof PathwayVocabLessonDetailFromHistoryModel> {
}

export interface PathwayVocabLessonDetailFromHistorySnapshotOut extends SnapshotOut<typeof PathwayVocabLessonDetailFromHistoryModel> {
}

export interface PathwayVocabLessonDetailFromHistorySnapshotIn extends SnapshotIn<typeof PathwayVocabLessonDetailFromHistoryModel> {
}