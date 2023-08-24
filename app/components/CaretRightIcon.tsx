import { ButtonAccessoryProps } from "./Button"
import { Icon } from "./Icon"
import { colors } from "../theme"
import React from "react"

export const CaretRightIcon = (props: ButtonAccessoryProps) => (
  <Icon
    containerStyle={props.style}
    size={props.pressableState.pressed ? 20 : 30}
    color={props.pressableState.pressed && colors.palette.neutral400 || colors.tint}
    icon="caretRight"
  />
)