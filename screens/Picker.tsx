import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import { FlatList, Text } from "react-native";
import { inputStyles } from "../components/InputGroup";
import Touchable from "../components/Touchable";

export interface PickerOption {
  label: string;
  value: any;
}

export interface PickerProps {
  key: string;
  returnTo: string;
  options: PickerOption[];
  title?: string;
}

export default function Picker({ navigation, route }: NativeStackScreenProps<{ "Picker": PickerProps }, "Picker">) {
  useLayoutEffect(() => {
    navigation.setOptions({ title: route.params.title });
  });

  return (
    <FlatList
      data={route.params.options}
      keyExtractor={(item) => item.label}
      renderItem={({ item, index }) => (
        <Touchable
          style={[{
            paddingHorizontal: 14,
            paddingVertical: 12,
          }, (index != route.params.options.length - 1) ? inputStyles.notFinalInput : undefined]}

          onPress={() => {
            // @ts-expect-error FIXME: Need to figure out way to type this properly
            navigation.navigate(route.params.returnTo, { [route.params.key]: item.value });
          }}>
          <Text style={inputStyles.inputLabel}>{ item.label }</Text>
        </Touchable>
      )}/>
  );
}
