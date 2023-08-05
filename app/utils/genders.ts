import { translate } from "../i18n"

export const genders = [
    // this is the parent or 'item'
    {
      name: "Genders Selection",
      id: 10,
      // these are the children or 'sub items'
      children: [
        {
          "name": translate("updateProfileScreen.gender.male"),
          "gender": "male",
          "id": 1,
        },
        {
          "name": translate("updateProfileScreen.gender.female"),
          "gender": "female",
          "id": 0,
        },
        {
          "name": translate("updateProfileScreen.gender.other"),
          "gender": "other",
          "id": 2,
        },
        {
          "name": translate("updateProfileScreen.gender.preferNotToSay"),
          "gender": "preferNotToSay",
          "id": 3,
        },
      ],
    },
  ]