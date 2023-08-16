import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { api } from "../services/api"
import { Credentials } from "react-native-auth0"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    accessToken: types.maybe(types.string),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    setAuthToken(value?: Credentials) {
      store.accessToken = value.accessToken
    },
    logout() {
      store.accessToken = undefined
    },
    distributeAuthToken(value?: string) {
      // optionally grab the store's authToken if not passing a value
      const token = value || store.accessToken;
      api.apisauce.setHeader("Authorization", `Bearer ${token}`);
    },
  }))
  .views((store) => ({
    get isAuthenticated() {
      return !!store.accessToken
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}

// @demo remove-file
