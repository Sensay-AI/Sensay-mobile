import { StyleProp, View, ViewStyle } from "react-native"
import { Button, Menu as BaseMenu } from "react-native-paper"
import React, { ReactElement } from "react"

export interface MenuProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  anchor?: ReactElement
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  onDismiss: () => void,
  menuItems: MenuItem []
}

export class MenuItem {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public readonly title: string,
    public readonly action: () => void
  ) {
  }
}

/**
 * Describe your component here
 */
export function Menu(props: MenuProps) {
  const { style, menuItems, anchor, visible, setVisible, onDismiss } = props
  const $styles = [$container, style]


  return (
    <View style={$styles}>
      <BaseMenu
        visible={visible}
        onDismiss={onDismiss}
        anchor={anchor || <Button onPress={() => setVisible(true)}>Show menu</Button>}
        style={$menuStyle}>
        {
          menuItems ? menuItems.map((item) => {
            return <BaseMenu.Item onPress={item.action} title={item.title} key={item.title} />
          }) : null
        }
      </BaseMenu>
    </View>
  )
}

const $container: ViewStyle = {
  justifyContent: "center",
  flexDirection: "row",
}
const $menuStyle: ViewStyle = {
  paddingTop: 30,
}
