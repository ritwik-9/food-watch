import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Platform, useColorScheme } from "react-native";
import { Provider } from "react-redux";
import "./firebase";
import PantryNavigator from "./screens/Pantry/Navigator";
import ShopListNavigator from "./screens/ShopList/Navigator";
import store from "./store";

export type RootTabParamList = {
  PantryNavigator: undefined;
  ShopListNavigator: undefined;
};

const Tabs = createBottomTabNavigator<RootTabParamList>();

const tabIcons: Record<keyof RootTabParamList, keyof (typeof Ionicons)["glyphMap"]> = {
  PantryNavigator: "home",
  ShopListNavigator: "cart",
};

const materialTabIcons: Record<keyof RootTabParamList, keyof (typeof MaterialIcons)["glyphMap"]> = {
  PantryNavigator: "home",
  ShopListNavigator: "shopping-cart",
};

export default function App() {
  const scheme = useColorScheme();

  return (
    <Provider store={store}>
      <NavigationContainer theme={(scheme == "dark") ? DarkTheme : DefaultTheme}>
        <Tabs.Navigator
          initialRouteName="PantryNavigator"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarHideOnKeyboard: true,

            tabBarIcon: ({ color, size = 24 }: { color: string, size?: number }) => {
              if (Platform.OS == "android") return <MaterialIcons color={color} name={materialTabIcons[route.name]} size={size} />;
              else return <Ionicons color={color} name={tabIcons[route.name]} size={size} />;
            },

            tabBarIconStyle: (Platform.OS == "android") ? {
              flex: 0,
              height: 26,
            } : undefined,
            
            tabBarItemStyle: { justifyContent: "center" },
          })}>

          <Tabs.Screen component={PantryNavigator} name="PantryNavigator" options={{ tabBarLabel: "Pantry" }} />
          <Tabs.Screen component={ShopListNavigator} name="ShopListNavigator" options={{ tabBarLabel: "Shopping List" }} />
        </Tabs.Navigator>
      </NavigationContainer>
    </Provider>
  ); 
}
