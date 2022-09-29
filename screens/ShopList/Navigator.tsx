import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import UserProfile from "../UserProfile";
import ShopList from "./ShopList";

export type ShopListStackParamList = {
  ShopList: undefined;
  UserProfile: undefined;
};

const Stack = createNativeStackNavigator<ShopListStackParamList>();

export default function Navigator() {
  return (
    <Stack.Navigator initialRouteName="ShopList">
      <Stack.Screen
        name="ShopList"
        options={{ headerLargeTitle: true, title: "Shopping List" }}
        component={ShopList} />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerTransparent: (Platform.OS == "ios"), presentation: "modal", title: "" }} />
    </Stack.Navigator>
  );
}
