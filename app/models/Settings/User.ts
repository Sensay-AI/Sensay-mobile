import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
/**
 * This represents a User of Sensay AI app.
 */
export const UserModel = types
  .model("User")
  .props({
    user_id: types.identifier,
    full_name: types.string,
    phone_number: types.string,
    language: types.string,
    date_of_birth: types.string,
    picture: types.maybeNull(types.string),
    created_at: types.string,
    email: types.string,
    id: types.number,
    nickname: types.string,
    gender: types.string,
    country: types.string,
    updated_at: types.string,
  })
  .actions(withSetPropAction)

export interface User extends Instance<typeof UserModel> {
}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {
}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {
}