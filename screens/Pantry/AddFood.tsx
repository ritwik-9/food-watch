import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useLayoutEffect, useState } from "react";
import { Button, Platform, PlatformColor, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import DateInput from "../../components/DateInput";
import InputGroup, { inputStyles } from "../../components/InputGroup";
import PickerButton from "../../components/PickerButton";
import items from "../../features/items";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FoodCategory, FOOD_CATEGORY_LABELS } from "../../model/FoodCategory";
import { FoodItem } from "../../model/FoodItem";
import { colors } from "../../style";
import Picker, { PickerOption, PickerProps } from "../Picker";
import { PantryStackParamList } from "./Navigator";

type StackParamList = {
  Details: { category?: FoodCategory, existing?: number }
  Picker: PickerProps;
}

function Details({ navigation, route }: NativeStackScreenProps<StackParamList, "Details">) {
  let item: FoodItem | undefined = undefined;

  if (route.params.existing != undefined) item = useAppSelector((state) => state.items.items)[route.params.existing];

  const dispatch = useAppDispatch();

  const [label, setLabel] = useState((item) ? item.label : ""),
    [expires, setExpires] = useState((item) ? new Date(item.expires) : new Date()),
    [category, setCategory] = useState((item) ? item.category : FoodCategory.Carbohydrate),
    [notes, setNotes] = useState((item) ? item.notes : undefined),
    [quantity, setQuantity] = useState((item) ? item.quantity : undefined);

  useEffect(() => {
    if (route.params?.category) setCategory(route.params.category);
  }, [route.params?.category]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft() {
        return Platform.OS == "ios" ? (
          <Button title="Cancel" onPress={() => navigation.goBack()} />
        ) : undefined;
      },
  
      headerRight() {
        return (
          <Button
            title="Done"
            disabled={!expires || !label || !category}
            onPress={() => {
              const newItem: FoodItem = { category, expires: expires.toISOString(), label, notes, quantity, remaining: 1 };

              if (route.params.existing != undefined) dispatch(items.actions.update([route.params.existing, newItem]));
              else dispatch(items.actions.add(newItem));

              navigation.goBack();
            }} />
        );
      },

      title: `${(item) ? "Edit" : "Add"} Food`,
    });
  });

  const options: PickerOption[] = Object.values(FoodCategory).map((cat) => ({ label: FOOD_CATEGORY_LABELS[cat], value: cat }));

  return (
    <SafeAreaView style={styles.modalView}>
      <InputGroup>
        <TextInput style={[inputStyles.textInput, inputStyles.notFinalInput]} placeholder="Name" value={label} onChangeText={setLabel} />

        <TextInput style={[inputStyles.textInput, inputStyles.notFinalInput]} placeholder="Quantity" value={quantity} onChangeText={setQuantity} />
        
        <View style={[inputStyles.inputRow, inputStyles.notFinalInput]}>
          <Text style={inputStyles.inputLabel}>Expiry Date</Text>
          <DateInput value={expires} onUpdate={setExpires} />
        </View>

        <PickerButton current={FOOD_CATEGORY_LABELS[category]} navigation={navigation} picker={{ key: "category", options, returnTo: "Details", title: "Category" }} />
      </InputGroup>

      <InputGroup>
        <TextInput style={[inputStyles.textInput, { minHeight: 160, marginVertical: 8 }]} placeholder="Notes" placeholderTextColor={colors.textSecondary} multiline={true} textAlignVertical="top" value={notes} onChangeText={setNotes} />
      </InputGroup>
    </SafeAreaView>
  );
}

export default function AddFood({ route }: NativeStackScreenProps<PantryStackParamList, "AddFood">) {
  const Stack = createNativeStackNavigator<StackParamList>();

  return (
    <Stack.Navigator initialRouteName="Details">
      <Stack.Screen
        name="Details"
        component={Details}
        initialParams={{ existing: route.params?.existing }}
        options={{ headerTransparent: (Platform.OS == "ios") }} />

      <Stack.Screen name="Picker" component={Picker} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create( {
  modalView: {
    backgroundColor: (Platform.OS == "ios") ? PlatformColor("secondarySystemBackground") : "#fff",
    flex: 1,
  },
});
