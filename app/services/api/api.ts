/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem" // @demo remove-current-line
import type { ApiConfig, ApiFeedResponse, UpdateUserInput } from "./api.types"
import {
  PathwayVocabCategoryResponse,
  CreateUserInput,
  UserResponse,
  PathwayVocabCategoryHistoryDetailResponse,
} from "./api.types" // @demo remove-current-line
import type { EpisodeSnapshotIn } from "../../models/Episode"
import { UserSnapshotIn } from "../../models/Settings/User"
import { toString } from "./apiHelper"
import {
  PathwayVocabLessonCategorySnapshotIn,
} from "../../models/StructurePathwayVocabLesson/PathwayVocabLessonCategory"
import {
  PathwayVocabLessonDetailFromHistorySnapshotIn,
} from "../../models/StructurePathwayVocabLesson/PathwayVocabLessonDetailFromHistory"
import { ImageLessonUploadImageSnapshotIn } from "../../models"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  // @demo remove-block-start
  /**
   * Gets a list of recent React Native Radio episodes.
   */
  async getEpisodes(): Promise<{ kind: "ok"; episodes: EpisodeSnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(
      `api.json?rss_url=https%3A%2F%2Ffeeds.simplecast.com%2FhEI_f9Dx`,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data

      // This is where we transform the data into the shape we expect for our MST model.
      const episodes: EpisodeSnapshotIn[] = rawData.items.map((raw) => ({
        ...raw,
      }))

      return { kind: "ok", episodes }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${toString(response.data)}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async getUser(): Promise<{ kind: "ok"; user: UserSnapshotIn } | GeneralApiProblem> {
    const response: ApiResponse<UserResponse> = await this.apisauce.get(`user/`)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const user: UserSnapshotIn = response.data
      return { kind: "ok", user }

    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${toString(response.data)}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async createUser(user: CreateUserInput): Promise<{ kind: "ok"; user: UserSnapshotIn } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<UserResponse> = await this.apisauce.post(
      `user/create`,
      user,
    )

    if (!response.ok || response.data.status_code) {
      const problem = getGeneralApiProblem(response)
      console.error("prob:", problem)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      // This is where we transform the data into the shape we expect for our MST model.
      const user: UserSnapshotIn = response.data
      return { kind: "ok", user }

    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${toString(response.data)}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async updateUser(user: UpdateUserInput): Promise<{ kind: "ok"; user: UserSnapshotIn } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<UserResponse> = await this.apisauce.put(
      `user/update`,
      user,
    )

    if (!response.ok || response.data.status_code) {
      const problem = getGeneralApiProblem(response)
      console.error(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      // This is where we transform the data into the shape we expect for our MST model.
      const user: UserSnapshotIn = response.data
      return { kind: "ok", user }

    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${toString(response.data)}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async getPathWayVocabLessonCategory(
    page = 1,
    size = 10,
  ): Promise<{ kind: "ok"; categories: PathwayVocabLessonCategorySnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<PathwayVocabCategoryResponse> = await this.apisauce.get(
      `lesson/vocabulary/categories`,
      { page, size },
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      console.error(response)
      if (problem) return problem
    }
    try {
      const rawData = response.data
      const categories: PathwayVocabLessonCategorySnapshotIn[] = rawData.items.map(
        (raw) => ({
          ...raw,
        }))
      return { kind: "ok", categories }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${toString(response.data)}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }


  async getPathWayVocabLessonCategoryHistoryDetail(
    categoryId: number,
    learningLanguage: string,
    page = 1,
    size = 20,
  ): Promise<{ kind: "ok"; lessonDetail: PathwayVocabLessonDetailFromHistorySnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<PathwayVocabCategoryHistoryDetailResponse> = await this.apisauce.get(
      `lesson/vocabulary/category/${categoryId}/learning_language/${learningLanguage}/questions`,
      { page, size },
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      console.error(response)
      if (problem) return problem
    }

    try {
      const rawData = response.data
      const lessonDetail: PathwayVocabLessonCategorySnapshotIn[] = rawData.items.map(
        (raw) => ({
          ...raw,
        }))
      return { kind: "ok", lessonDetail }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${toString(response.data)}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async uploadImage(
    fileName: string,
    type: string,
    uri: string
  ): Promise<{ kind: "ok"; imageUploadResult: ImageLessonUploadImageSnapshotIn } | GeneralApiProblem> {
    // make the api call
    const data = new FormData();
    // @ts-ignore
    data.append('image_file', {
      name: fileName,
      type,
      uri
    }
    );
    const headers = {
      'Content-Type': 'multipart/form-data'
    }
    const response: ApiResponse<PathwayVocabCategoryHistoryDetailResponse> = await this.apisauce.post(
      `image`,
      data,
      {headers}
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      console.error(response)
      if (problem) return problem
    }

    try {
      const imageUploadResult: ImageLessonUploadImageSnapshotIn = response.data
      return { kind: "ok", imageUploadResult }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${toString(response.data)}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async getUploadImageHistory(): Promise<{ kind: "ok"; imageUploads: ImageLessonUploadImageSnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<PathwayVocabCategoryHistoryDetailResponse> = await this.apisauce.get(
      `image`,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      console.error(response)
      if (problem) return problem
    }
    try {
      const rawData = response.data
      const imageUploads: ImageLessonUploadImageSnapshotIn[] = rawData.items.map(
        (raw) => ({
          ...raw,
        }))
      return { kind: "ok", imageUploads }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${toString(response.data)}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }


}

// Singleton instance of the API for convenience
export const api = new Api()
