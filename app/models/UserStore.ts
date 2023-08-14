import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { api, CreateUserInput, UpdateUserInput } from "../services/api"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { UserModel, UserSnapshotIn } from "./User"
import { GeneralApiProblem } from "../services/api/apiProblem"
export const UserStoreModel = types
  .model("UserStore")
  .props({
    user: types.maybe(UserModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchUser(): Promise<{ kind: "ok"; user: UserSnapshotIn } | GeneralApiProblem> {
      const response = await api.getUser()
      if (response.kind === "ok") {
        store.setProp("user", response.user)
      } else {
        console.tron.error(`Error fetching user : ${JSON.stringify(response)}`, [])
        store.setProp("user", undefined)
      }
      return response
    },
    async createUser(user: CreateUserInput): Promise<{ kind: "ok"; user: UserSnapshotIn } | GeneralApiProblem> {
      const response = await api.createUser(user)
      if (response.kind === "ok") {
        store.setProp("user", response.user)
      } else {
        console.tron.error(`Error creating user : ${JSON.stringify(response)}`, [])
        store.setProp("user", undefined)
      }
      return response
    },
    async updateUser(user: UpdateUserInput): Promise<{ kind: "ok"; user: UserSnapshotIn } | GeneralApiProblem> {
      const response = await api.updateUser(user)
      if (response.kind === "ok") {
        store.setProp("user", response.user)
      } else {
        console.tron.error(`Error update user info : ${JSON.stringify(response)}`, [])
      }
      return response
    },
    logOut() {
      store.user = undefined
    },
  }))
  .views((store) => ({
    get isUser() {
      return !!store.user
    },
  }))

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshot extends SnapshotOut<typeof UserStoreModel> {}