import Slider from "@react-native-community/slider";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import { Alert, Button, Platform, Text, View } from "react-native";
import items from "../../features/items";
import { getItemStyle, isExpired } from "../../model/FoodItem";
import { useAppDispatch, useAppSelector } from "../../hooks";
import FoodCategoryIcon from "../../components/FoodCategoryIcon";
import { inputStyles } from "../../components/InputGroup";
import { FOOD_CATEGORY_COLOURS, FOOD_CATEGORY_LABELS } from "../../model/FoodCategory";
import { PantryStackParamList } from "./Navigator";
import { colors } from "../../style";
import IconButton from "../../components/IconButton";
import shopItems from "../../features/shopItems";

export default function FoodDetail({ navigation, route }: NativeStackScreenProps<PantryStackParamList, "FoodDetail">) {
  const foodItems = useAppSelector((state) => state.items.items);
  const dispatch = useAppDispatch();

  const item = foodItems[route.params.item];

  const updateRemaining = (newValue: number) => {
    if (newValue != item.remaining) {
      dispatch(items.actions.update([route.params.item, Object.assign({}, item, { remaining: newValue })]));
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight() {
        if (Platform.OS == "android") {
          return (
            <IconButton icon="pencil" material="edit" onPress={() => navigation.push("AddFood", { existing: route.params.item })} />
          );
        } else {
          return (
            <Button title="Edit" onPress={() => navigation.push("AddFood", { existing: route.params.item })} />
          );
        }
      },
    });
  });

  return (
    <View style={{ backgroundColor: colors.background, flex: 1, padding: 16 }}>
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: "600", marginBottom: 12 }}>{ item.label }</Text>
      <Text style={[{ color: colors.text }, getItemStyle(item), { fontSize: 14, paddingVertical: 2 }]}>{isExpired(item) ? "Expired" : "Expires"} on { new Date(item.expires).toLocaleDateString() }</Text>
      
      { item.quantity &&
        <Text style={{ color: colors.textSecondary, fontSize: 14,  paddingVertical: 2 }}>{ item.quantity }</Text>
      }

      <View style={[inputStyles.inputRow, (item.quantity || item.notes) ? inputStyles.notFinalInput : undefined]}>
        <Text style={{ color: colors.text }}>Category</Text>

        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Text style={{ color: FOOD_CATEGORY_COLOURS[item.category!].primary }}>{ FOOD_CATEGORY_LABELS[item.category!] }</Text>
          <FoodCategoryIcon category={item.category!} size={16} style={{ marginLeft: 8 }} />
        </View>
      </View>

      { item.quantity &&
        <View style={[inputStyles.inputRow, (item.notes) ? inputStyles.notFinalInput : undefined]}>
          <Text style={{ color: colors.text, marginRight: 16, marginVertical: 16 }}>Remaining</Text>

          <Slider
            maximumValue={1}
            minimumValue={0}
            onSlidingComplete={updateRemaining}
            step={.125}
            style={{ flex: 1 }}
            value={item.remaining} />
        </View>
      }

      { item.notes &&
        <View style={{ paddingVertical: 8 }}>
          <Text style={{ marginBottom: 4 }}>Notes</Text>
          <Text style={{ color: "grey" }}>{item.notes}</Text>
        </View>
      }

      <Button title="Remove" onPress={() => {

        Alert.alert("Add to Shopping List", "Would you like to add this item to your shopping list?", [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => dispatch(shopItems.actions.add({ category: item.category, label: item.label })),
            style: "default",
          },
        ]);
        
        dispatch(items.actions.remove(route.params.item)) && navigation.pop();
      }} />
    </View>
  );
}
