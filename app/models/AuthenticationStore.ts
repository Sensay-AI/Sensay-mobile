import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { api } from "../services/api"
import { Credentials } from "react-native-auth0"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    credential: types.frozen<Credentials>(),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    setAuthToken(value?: Credentials) {
      store.credential = value
    },
    logout() {
      store.credential = undefined
    },
    distributeAuthToken(value?: string) {
      // optionally grab the store's authToken if not passing a value
      const token = value || store.credential.accessToken;
      api.apisauce.setHeader("Authorization", `Bearer ${token}`);
    },
  }))
  .views((store) => ({
    get isAuthenticated() {
      return !!store.credential
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}

// @demo remove-file
