import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { GeneralApiProblem } from "../../services/api/apiProblem"
import { api } from "../../services/api"
import { PathwayVocabLessonCategoryModel, PathwayVocabLessonCategorySnapshotIn } from "./PathwayVocabLessonCategory"
import {
  PathwayVocabLessonDetailFromHistoryModel,
  PathwayVocabLessonDetailFromHistorySnapshotIn,
} from "./PathwayVocabLessonDetailFromHistory"

/**
 * Model description here for TypeScript hints.
 */
export const PathwayVocabLessonModel = types
  .model("PathwayVocabLesson")
  .props({
    categories: types.maybe(types.array(PathwayVocabLessonCategoryModel)),
    lessonDetailFromHistory: types.maybe(types.array(PathwayVocabLessonDetailFromHistoryModel)),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get vocabLessonCategoryHistory() {
      return self.categories
    },
    get vocabLessonDetailFromHistory() {
      return self.lessonDetailFromHistory
    },
  }))
  .actions((self) => ({
    async fetchCategory(): Promise<{ kind: "ok"; categories: PathwayVocabLessonCategorySnapshotIn[] } | GeneralApiProblem> {
      const response = await api.getPathWayVocabLessonCategory()
      if (response.kind === "ok") {
        self.setProp("categories", response.categories)
      } else {
        console.tron.error(`Error fetching user : ${JSON.stringify(response)}`, [])
        self.setProp("categories", undefined)
      }
      return response
    },
    async fetchCategoryHistoryDetail(
      categoryId: number,
      learningLanguage: string,
    ): Promise<{ kind: "ok"; lessonDetail: PathwayVocabLessonDetailFromHistorySnapshotIn[] } | GeneralApiProblem> {
      const response = await api.getPathWayVocabLessonCategoryHistoryDetail(categoryId,learningLanguage)
      if (response.kind === "ok") {
        self.setProp("lessonDetailFromHistory", response.lessonDetail)
      } else {
        console.tron.error(`Error fetching user : ${JSON.stringify(response)}`, [])
        self.setProp("lessonDetailFromHistory", undefined)
      }
      return response
    },
  }))

export interface PathwayVocabLesson extends Instance<typeof PathwayVocabLessonModel> {
}

export interface PathwayVocabLessonSnapshotOut extends SnapshotOut<typeof PathwayVocabLessonModel> {
}

export interface PathwayVocabLessonSnapshotIn extends SnapshotIn<typeof PathwayVocabLessonModel> {
}