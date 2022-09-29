import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import UserProfile from "../UserProfile";
import AddFood from "./AddFood";
import FoodDetail from "./FoodDetail";
import Pantry from "./Pantry";

export type PantryStackParamList = {
  AddFood: { existing?: number } | undefined;
  FoodDetail: { item: number };
  Pantry: undefined;
  UserProfile: undefined;
};

const Stack = createNativeStackNavigator<PantryStackParamList>();

export default function Navigator() {
  return (
    <Stack.Navigator initialRouteName="Pantry">
      <Stack.Screen
        name="Pantry"
        options={{ headerLargeTitle: true }}
        component={Pantry} />
      <Stack.Screen
        name="AddFood"
        options={{ headerShown: false, presentation: "modal" }}
        component={AddFood} />
      <Stack.Screen
        name="FoodDetail"
        options={{ title: "Food Details" }}
        component={FoodDetail} />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerTransparent: (Platform.OS == "ios"), presentation: "modal", title: "" }} />
    </Stack.Navigator>
  );
}
