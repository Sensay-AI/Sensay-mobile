import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Snackbar as BaseSnackbar } from 'react-native-paper';

export interface SnackbarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  visible: boolean,
  onToggleSnackBar: () => void,
  onDismissSnackBar: () => void,
  actionLabel?: string,
  actionOnPress?: () => void,
  snackBarText: string,
  duration?: Duration
}
export type Duration = 4000 | 7000 | 10000;
export   const DURATION_SHORT = 4000;
export const DURATION_MEDIUM = 7000;
export const DURATION_LONG = 10000;
/**
 * Describe your component here
 */
export const Snackbar = observer(function Snackbar(props: SnackbarProps) {
  const { style, duration, snackBarText, actionOnPress, actionLabel, onDismissSnackBar,visible } = props
  const $styles = [$container, style]


  return (
    <View style={$styles}>
      <BaseSnackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: actionLabel,
          onPress: actionOnPress,
        }}
        duration={duration || DURATION_SHORT}
      >
        {snackBarText}
      </BaseSnackbar>
    </View>
  );
})

const $container: ViewStyle = {
  flex: 1,
  justifyContent: 'space-between',
}
