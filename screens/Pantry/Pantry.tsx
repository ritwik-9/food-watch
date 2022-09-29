import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useLayoutEffect, useState } from "react";
import { FlatList, GestureResponderEvent, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FoodItem, getItemStyle, isExpired } from "../../model/FoodItem";
import { useAppSelector } from "../../hooks";
import { FoodCategory, FOOD_CATEGORY_COLOURS, FOOD_CATEGORY_LABELS } from "../../model/FoodCategory";
import FoodCategoryIcon from "../../components/FoodCategoryIcon";
import FloatingButton from "../../components/FloatingButton";
import IconButton from "../../components/IconButton";
import Touchable from "../../components/Touchable";
import { colors } from "../../style";
import { PantryStackParamList } from "./Navigator";

function filterItems(items: FoodItem[], category?: FoodCategory): FoodItem[] {
  if (!category) return items;
  else return items.filter((item) => item.category == category);
}

function sortItems(items: FoodItem[]): FoodItem[] {
  return [...items].sort((a, b) => new Date(a.expires).getTime() - new Date(b.expires).getTime());
}

function FoodCategoryButton({ active = false, category, onPress }: { active: boolean, category: FoodCategory, onPress: (event: GestureResponderEvent) => void }) {
  const colours = FOOD_CATEGORY_COLOURS[category];

  return (
    <TouchableOpacity onPress={onPress} style={{ alignItems: "center" }}>
      <FoodCategoryIcon category={category} invert={active} style={{ margin: 8 }} />
      <Text style={{ color: colours.primary, fontSize: 12, marginBottom: 4 }}>{ FOOD_CATEGORY_LABELS[category] }</Text>
    </TouchableOpacity>
  );
}

export default function Pantry({ navigation }: NativeStackScreenProps<PantryStackParamList>) {
  const items = useAppSelector((state) => state.items.items);

  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | undefined>(undefined);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (Platform.OS == "ios") ? () => (
        <IconButton icon="add" onPress={() => navigation.push("AddFood")} />
      ) : undefined,

      headerLeft: () => {
        return (
          <View style={{ paddingRight: (Platform.OS == "android") ? 32 : 0 }}>
            <IconButton icon="person-circle-outline" material="account-circle" onPress={() => navigation.navigate("UserProfile")} />
          </View>
        );
      },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.listContainer}>
      <View>
        <ScrollView horizontal contentContainerStyle={{ padding: 8 }} pinchGestureEnabled={false}>
          {Object.values(FoodCategory).map((cat) => (
            <FoodCategoryButton active={cat == selectedCategory} category={cat} onPress={() => setSelectedCategory((cat == selectedCategory) ? undefined : cat)} key={cat} />
          ))}
        </ScrollView>
      </View>

      {
        filterItems(sortItems(items), selectedCategory).length == 0
          ? <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
            <Text style={{ color: colors.textSecondary }}>There's nothing in this category yet.</Text>
          </View>
          : <FlatList
            data={filterItems(sortItems(items), selectedCategory)}
            keyExtractor={(_, i) => i.toString()}
            
            ListEmptyComponent={() => (
              <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
                <Text style={{ color: colors.textSecondary }}>There's nothing in this category yet.</Text>
              </View>
            )}

            renderItem={({ item }) => (
              <Touchable style={styles.listItem} onPress={() => navigation.navigate("FoodDetail", { item: items.indexOf(item) })}>
                <Text style={styles.listItemLabel}>{ item.label }</Text>
                <Text style={[styles.listItemLabel, styles.listItemExpiry, getItemStyle(item)]}>{isExpired(item) ? "Expired" : "Expires"} on { new Date(item.expires).toLocaleDateString() }</Text>
              </Touchable>
            )} />
      }

      <FloatingButton onPress={() => navigation.push("AddFood")}>
        <MaterialIcons name="add" color="white" size={24} />
      </FloatingButton>

      <StatusBar style="auto" />
    </SafeAreaView>  
  );
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: colors.backgroundSecondary,
    flex: 1,
  },
  
  listItem: {
    backgroundColor: colors.background,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  listItemLabel: {
    color: colors.text,
  },

  listItemExpiry: {
    fontSize: 12,
  },
});
