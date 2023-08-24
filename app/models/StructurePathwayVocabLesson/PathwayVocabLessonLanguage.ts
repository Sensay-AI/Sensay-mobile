import { types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

export const PathwayVocabLessonLanguageModel = types
  .model("PathwayVocabLessonLanguage")
  .props(
    {
      id: types.identifierNumber,
      language_name: types.string,
    },
  ).actions(withSetPropAction)
