import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const PathwayVocabLessonCategoryModel = types
  .model("PathwayVocabLessonCategory")
  .props({
    user_id: types.string,
    id: types.number,
    category_name: types.string
  })
  .actions(withSetPropAction)
export interface PathwayVocabLessonCategory extends Instance<typeof PathwayVocabLessonCategoryModel> {}
export interface PathwayVocabLessonCategorySnapshotOut extends SnapshotOut<typeof PathwayVocabLessonCategoryModel> {}
export interface PathwayVocabLessonCategorySnapshotIn extends SnapshotIn<typeof PathwayVocabLessonCategoryModel> {}