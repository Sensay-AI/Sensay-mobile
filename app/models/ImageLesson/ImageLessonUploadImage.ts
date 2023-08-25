import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const ImageLessonUploadImageModel = types
  .model("ImageLessonUploadImage")
  .props({
    full_url: types.maybe(types.string),
    s3_bucket_path_key: types.maybe(types.string),
    last_modified: types.maybe(types.string),
  })
  .actions(withSetPropAction)
export interface ImageLessonUploadImage extends Instance<typeof ImageLessonUploadImageModel> {}
export interface ImageLessonUploadImageSnapshotOut extends SnapshotOut<typeof ImageLessonUploadImageModel> {}
export interface ImageLessonUploadImageSnapshotIn extends SnapshotIn<typeof ImageLessonUploadImageModel> {}