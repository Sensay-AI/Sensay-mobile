import { translate } from "../i18n"
import { CountryCode } from "react-native-country-picker-modal"

export const items = [
  // this is the parent or 'item'
  {
    name: translate("updateProfileScreen.languageListHeader"),
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        "name": "English",
        "id": 1,
        "countryCode": "us"
      },
      {
        "name": "Vietnamese",
        "id": 2,
        "countryCode": "vn"
      },
      {
        "name": "Spanish",
        "id": 3,
        "countryCode": "es"
      },
      {
        "name": "Traditional Chinese",
        "id": 4,
        "countryCode": "cn"
      },
      {
        "name": "Arabic",
        "id": 5,
        "countryCode": "sa"
      },
      {
        "name": "French",
        "id": 6,
        "countryCode": "fr"
      },
      {
        "name": "Russian",
        "id": 7,
        "countryCode": "ru"
      },
      {
        "name": "German",
        "id": 8,
        "countryCode": "de"
      },
      {
        "name": "Japanese",
        "id": 9,
        "countryCode": "jp"
      },
      {
        "name": "Portuguese",
        "id": 10,
        "countryCode": "pt"
      },
      {
        "name": "Korean",
        "id": 11,
        "countryCode": "kr"
      },
      {
        "name": "Italian",
        "id": 12,
        "countryCode": "it"
      },
      {
        "name": "Turkish",
        "id": 13,
        "countryCode": "tr"
      },
      {
        "name": "Dutch",
        "id": 14,
        "countryCode": "nl"
      },
      {
        "name": "Polish",
        "id": 15,
        "countryCode": "pl"
      },
      {
        "name": "Thai",
        "id": 16,
        "countryCode": "th"
      },
      {
        "name": "Swedish",
        "id": 17,
        "countryCode": "se"
      },
      {
        "name": "Indonesian",
        "id": 18,
        "countryCode": "id"
      },
      {
        "name": "Greek",
        "id": 19,
        "countryCode": "gr"
      },
      {
        "name": "Czech",
        "id": 20,
        "countryCode": "cz"
      },
      {
        "name": "Danish",
        "id": 21,
        "countryCode": "dk"
      },
      {
        "name": "Finnish",
        "id": 22,
        "countryCode": "fi"
      },
      {
        "name": "Norwegian",
        "id": 23,
        "countryCode": "no"
      },
      {
        "name": "Hungarian",
        "id": 24,
        "countryCode": "hu"
      },
      {
        "name": "Hebrew",
        "id": 25,
        "countryCode": "il"
      },
      {
        "name": "Slovak",
        "id": 26,
        "countryCode": "sk"
      },
      {
        "name": "Croatian",
        "id": 27,
        "countryCode": "hr"
      },
      {
        "name": "Romanian",
        "id": 28,
        "countryCode": "ro"
      },
      {
        "name": "Ukrainian",
        "id": 29,
        "countryCode": "ua"
      },
      {
        "name": "Bulgarian",
        "id": 30,
        "countryCode": "bg"
      },
      {
        "name": "Slovenian",
        "id": 31,
        "countryCode": "si"
      },
      {
        "name": "Serbian",
        "id": 32,
        "countryCode": "rs"
      },
      {
        "name": "Lithuanian",
        "id": 33,
        "countryCode": "lt"
      },
      {
        "name": "Latvian",
        "id": 34,
        "countryCode": "lv"
      },
      {
        "name": "Estonian",
        "id": 35,
        "countryCode": "ee"
      },
      {
        "name": "Georgian",
        "id": 36,
        "countryCode": "ge"
      },
      {
        "name": "Armenian",
        "id": 37,
        "countryCode": "am"
      },
      {
        "name": "Bengali",
        "id": 38,
        "countryCode": "bd"
      },
      {
        "name": "Hindi",
        "id": 39,
        "countryCode": "in"
      },
      {
        "name": "Urdu",
        "id": 40,
        "countryCode": "pk"
      },
      {
        "name": "Tamil",
        "id": 41,
        "countryCode": "lk"
      },
      {
        "name": "Burmese",
        "id": 48,
        "countryCode": "mm"
      },
      {
        "name": "Khmer",
        "id": 49,
        "countryCode": "kh"
      },
      {
        "name": "Lao",
        "id": 50,
        "countryCode": "la"
      },
      {
        "name": "Tagalog",
        "id": 53,
        "countryCode": "ph"
      },
      {
        "name": "Malay",
        "id": 54,
        "countryCode": "my"
      },
      {
        "name": "Swahili",
        "id": 56,
        "countryCode": "tz"
      },
      {
        "name": "Amharic",
        "id": 57,
        "countryCode": "et"
      },
      {
        "name": "Hausa",
        "id": 58,
        "countryCode": "ng"
      },
      {
        "name": "Zulu",
        "id": 61,
        "countryCode": "za"
      },
      {
        "name": "Sesotho",
        "id": 63,
        "countryCode": "ls"
      },
      {
        "name": "Somali",
        "id": 64,
        "countryCode": "so"
      },
      {
        "name": "Chichewa",
        "id": 65,
        "countryCode": "mw"
      },
      {
        "name": "Tigrinya",
        "id": 68,
        "countryCode": "er"
      },
      {
        "name": "Akan",
        "id": 70,
        "countryCode": "gh"
      },
      {
        "name": "Haitian Creole",
        "id": 72,
        "countryCode": "ht"
      },
      {
        "name": "Fijian",
        "id": 73,
        "countryCode": "fj"
      },
      {
        "name": "Tongan",
        "id": 74,
        "countryCode": "to"
      },
      {
        "name": "Samoan",
        "id": 75,
        "countryCode": "ws"
      },
      {
        "name": "Maori",
        "id": 76,
        "countryCode": "nz"
      },
      {
        "name": "Marshallese",
        "id": 77,
        "countryCode": "mh"
      },
      {
        "name": "Chamorro",
        "id": 79,
        "countryCode": "gu"
      },
      {
        "name": "Palauan",
        "id": 80,
        "countryCode": "pw"
      },
      {
        "name": "Inuktitut",
        "id": 82,
        "countryCode": "ca"
      },
      {
        "name": "Tswana",
        "id": 88,
        "countryCode": "bw"
      },
      {
        "name": "Wolof",
        "id": 90,
        "countryCode": "sn"
      },
      {
        "name": "Swazi",
        "id": 94,
        "countryCode": "sz"
      }
    ]
  }
];

export const languagesAssociateById: { [key: string]: { "name": string, "id": string, "countryCode":string } } = items[0].children.reduce((acc, item) => {
  acc[item.id] = { "name": item.name, "id": item.id, "countryCode": item.countryCode}
  return acc
}, {})

export const languagesNameToId: { [key: string]: number } = Object.keys(languagesAssociateById).reduce((ret, key) => {
  ret[languagesAssociateById[key].name] = +key
  return ret
}, {})

export const languagesCountryCodeToId: { [key: string]: number } = Object.keys(languagesAssociateById).reduce((ret, key) => {
  ret[languagesAssociateById[key].countryCode] = +key
  return ret
}, {})

export const acceptLanguageCountryCode= items[0].children.map(lang => lang.countryCode.toUpperCase()) as CountryCode[]

export type DisplayLanguage = "vietnamese" | "english" | "korean" | "arabic"
export const allowLanguagePrefix = ["en", "vi", "ko", "ar"]
