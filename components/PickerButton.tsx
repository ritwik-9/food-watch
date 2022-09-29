import { FontAwesome5 } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { PickerProps } from "../screens/Picker";
import { colors } from "../style";
import { inputStyles } from "./InputGroup";

export default function PickerButton<T extends { "Picker": PickerProps }>({ current, navigation, picker }: { current: string, navigation: NativeStackNavigationProp<T>, picker: PickerProps }) {
  return (
    <TouchableOpacity onPress={() => navigation.push("Picker", picker)}>
      <View style={[inputStyles.inputRow, { paddingVertical: 12 }]}>
        <Text style={inputStyles.inputLabel}>{ picker.title }</Text>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Text style={{ color: colors.textSecondary, fontSize: 16 }}>{ current }</Text>
          <FontAwesome5 name="chevron-right" size={14} style={{ color: colors.textTertiary, marginLeft: 8 }} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
