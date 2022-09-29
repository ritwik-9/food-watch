import { GestureResponderEvent, Platform, StyleProp, TouchableOpacity, TouchableNativeFeedback, View, ViewStyle } from "react-native";

interface TouchableProps {
  children: JSX.Element | JSX.Element[];
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

export default function Touchable({ children, onPress, style }: TouchableProps) {
  return (Platform.OS == "android")
    ? <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#BDBDBD", false)} onPress={onPress}><View style={style}>{ children }</View></TouchableNativeFeedback>
    : <TouchableOpacity style={style} onPress={onPress}>{ children }</TouchableOpacity>;
}
