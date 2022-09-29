import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useLayoutEffect } from "react";
import { FlatList, Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import IconButton from "../../components/IconButton";
import Touchable from "../../components/Touchable";
import { useAppSelector } from "../../hooks";
import { colors } from "../../style";
import { ShopListStackParamList } from "./Navigator";

export default function ShopList({ navigation }: NativeStackScreenProps<ShopListStackParamList, "ShopList">) {
  const items = useAppSelector((state) => state.shopItems.shopItems);

  useLayoutEffect(() => {
    navigation.setOptions({
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
      <FlatList
        data={items}
        keyExtractor={(_, i) => i.toString()}
        style={{ paddingTop: (Platform.OS == "ios") ? 16 : 0 }}
        renderItem={({ item }) => (
          <Touchable style={styles.listItem}>
            <Text style={[styles.listItemLabel]}>{ item.label }</Text>
          </Touchable>
        )} />
      <StatusBar style="auto"/>
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

  textInput: {
    borderColor: "grey",
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
  },
});
  