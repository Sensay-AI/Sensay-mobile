import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { api, CreateUserInput } from "../services/api"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { UserModel } from "./User"
export const UserStoreModel = types
  .model("UserStore")
  .props({
    user: types.maybe(UserModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchUser() {
      const response = await api.getUser()
      if (response.kind === "ok") {
        store.setProp("user", response.user)
      } else {
        console.tron.error(`Error fetching user : ${JSON.stringify(response)}`, [])
        store.setProp("user", undefined)
        throw new Error(`Can't fetching user data: ${JSON.stringify(response)}`)
      }
    },
    async createUser(user: CreateUserInput) {
      const response = await api.createUser(user)
      if (response.kind === "ok") {
        store.setProp("user", response.user)
      } else {
        console.tron.error(`Error creating user : ${JSON.stringify(response)}`, [])
        store.setProp("user", undefined)
        throw new Error(`Can't create user data: ${JSON.stringify(response)}`)
      }
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