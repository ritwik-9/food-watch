import { Platform, PlatformColor, StyleSheet, View } from "react-native";
import { colors } from "../style";

export default function InputGroup({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <View style={inputStyles.inputGroup}>
      { children }
    </View>
  );
}

export const inputStyles = StyleSheet.create({
  inputGroup: Platform.select({
    ios: {
      backgroundColor: PlatformColor("systemBackground"),
      borderRadius: 8,
      marginHorizontal: 16,
      marginVertical: 24,
      paddingHorizontal: 16,
    },
    
    default: {
      marginHorizontal: 24,
      marginVertical: 16,
    },
  }),

  inputLabel: {
    color: colors.text,
    fontSize: 16,
  },

  inputRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },

  notFinalInput: Platform.select({
    ios: {
      borderColor: PlatformColor("separator"),
      borderBottomWidth: .5,
    },
    
    default: {},
  }),

  textInput: Platform.select({
    ios: {
      color: colors.text,
      fontSize: 16,
      paddingVertical: 12,
    },

    default: {
      borderColor: "grey",
      borderBottomWidth: 1.5,
      fontSize: 16,
      marginBottom: 16,
      paddingVertical: 8,
    },
  }),
});
