import { GestureResponderEvent, Platform, PlatformColor, StyleSheet, TouchableNativeFeedback, View } from "react-native";

interface FloatingButtonProps {
  /** The content to render in the FloatingButton. */
  children: JSX.Element;
  /** An event handler triggered when the FloatingButton is pressed. */
  onPress: (event: GestureResponderEvent) => void;
}

/**
 * A simple floating action button based on the Material Design Guidelines, which only renders on Android.
 */
export default function FloatingButton({ children, onPress }: FloatingButtonProps) {
  if (Platform.OS == "android") {
    return (
      <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground(24)} onPress={onPress}>
        <View style={styles.floatingButton}>
          { children }
        </View>
      </TouchableNativeFeedback>
    );
  } else return null;
}

const styles = StyleSheet.create({
  floatingButton: {
    alignItems: "center",
    backgroundColor: PlatformColor("@android:color/holo_blue_dark"),
    borderRadius: 28,
    bottom: 16,
    elevation: 4,
    height: 56,
    justifyContent: "center",
    position: "absolute",
    right: 16,
    width: 56,
  },
});
