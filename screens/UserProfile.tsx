import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect, useLayoutEffect, useState } from "react";
import { Button, Image, Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { auth } from "../firebase";
import { colors } from "../style";

export default function UserProfile({ navigation }: NativeStackScreenProps<{ UserProfile: undefined }>) {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "29807453875-nfd4chrfseq05v7f9e32gqok7dencnbp.apps.googleusercontent.com",
  });

  const [user, setUser] = useState(auth.currentUser);

  if (Platform.OS == "ios") {
    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Button title="Done" onPress={() => navigation.pop()} />
        ),
      });
    });
  }

  useEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response.params,
        credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then(() => setUser(auth.currentUser));
    }
  }, [response]);

  return (
    <SafeAreaView style={styles.profileModal}>
      <View style={{ alignItems: "center", padding: 16 }}>
        { (user && user.photoURL) ?
          <Image source={{ uri: user.photoURL }} style={styles.profileImage} /> :
          <View style={styles.profileImage}></View>
        }
        <Text style={styles.userName}>{ user?.displayName ?? "Not Signed In" }</Text>
        <Text style={styles.userEmail}>{ user?.email }</Text>
      </View>

      <Button
        disabled={ !user && !request }
        title={ user ? "Sign Out" : "Sign In" }
        onPress={() => {
          if (user) auth.signOut().then(() => setUser(null));
          else promptAsync();
        }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    backgroundColor: "darkgrey",
    borderRadius: 64,
    height: 128,
    marginBottom: 16,
    width: 128,
  },

  profileModal: {
    backgroundColor: colors.backgroundSecondary,
    flex: 1,
    padding: 16,
  },

  userEmail: {
    color: colors.textSecondary,
  },

  userName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "600",
  },
});
