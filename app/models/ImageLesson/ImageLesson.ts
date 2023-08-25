import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { GeneralApiProblem } from "../../services/api/apiProblem"
import { api } from "../../services/api"
import { ImageLessonUploadImageModel, ImageLessonUploadImageSnapshotIn } from "./ImageLessonUploadImage"

/**
 * Model description here for TypeScript hints.
 */
export const ImageLessonModel = types
  .model("ImageLesson")
  .props({
    currentSelectedImage: types.maybe(ImageLessonUploadImageModel),
    uploadImageHistory: types.maybe(types.array(ImageLessonUploadImageModel))
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get currentSelectedImageData() {
      return self.currentSelectedImage
    },
    get uploadImageHistoryData() {
      return self.uploadImageHistory
    }
  }))
  .actions((self) => ({
    async uploadImage(
      fileName: string,
      type: string,
      uri: string
    ): Promise<{ kind: "ok"; imageUploadResult: ImageLessonUploadImageSnapshotIn } | GeneralApiProblem> {
      const response = await api.uploadImage(
        fileName,type,uri
      )
      if (response.kind === "ok") {
        self.setProp("currentSelectedImage", response.imageUploadResult)
      } else {
        console.tron.error(`Error upload image : ${JSON.stringify(response)}`, [])
        self.setProp("currentSelectedImage", undefined)
      }
      return response
    },
    async fetchUploadImageHistory(): Promise<{ kind: "ok"; imageUploads: ImageLessonUploadImageSnapshotIn[] } | GeneralApiProblem> {
      const response = await api.getUploadImageHistory()
      if (response.kind === "ok") {
        self.setProp("uploadImageHistory", response.imageUploads)
      } else {
        console.tron.error(`Error fetching upload images history : ${JSON.stringify(response)}`, [])
        self.setProp("uploadImageHistory", undefined)
      }
      return response
    },
    selectImageFromImageHistory(
      imageUpload: ImageLessonUploadImageSnapshotIn
    ) {
        self.setProp("currentSelectedImage", imageUpload)
    },
  }))

export interface ImageLesson extends Instance<typeof ImageLessonModel> {}
export interface ImageLessonSnapshotOut extends SnapshotOut<typeof ImageLessonModel> {}
export interface ImageLessonSnapshotIn extends SnapshotIn<typeof ImageLessonModel> {}