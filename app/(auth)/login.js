import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import assets from "../../assets/assets";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";
import { router } from "expo-router";
import { Button } from "native-base";
import { login } from "../../services/auth.service";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";

const LoginScreen = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    login(phone, password)
      .then(async (response) => {
        await SecureStore.setItemAsync("token", response?.data?.token);
        Toast.show({
          type: "successToast",
          text1: "Login",
          text2: "Logged in succesfully.",
          position: "top",
        });
        setPhone("");
        setPassword("");
        router.replace("(protected)");
      })
      .catch((e) => {
        const errorMessage = e?.response?.data?.message ?? "Failed to login";
        if (errorMessage) {
          Toast.show({
            type: "errorToast",
            text1: "Login error",
            text2: errorMessage,
            position: "top",
          });
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <ScrollView horizontal={false}>
        <View style={{ flex: 1 }}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Team Finder</Text>
          </View>
          <View style={styles.titleWrapper}>
            <Image source={assets.illustr2} style={styles.illustration} />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.loginHere}>Login Here</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              keyboardType="number-pad"
              autoCapitalize="none"
              value={phone}
              onChangeText={setPhone}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Button
              onPress={handleLogin}
              isLoading={loading}
              disabled={!phone || !password || loading}
              isLoadingText="Please Wait"
            >
              Login
            </Button>
            <View style={styles.register}>
              <TouchableOpacity onPress={() => router.navigate("register")}>
                <Text style={styles.already}>
                  Don't have an account? Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: RFValue(30),
  },
  illustrationWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  illustration: {
    width: "100%",
    height: "100%",
    minHeight: 300,
    objectFit: "contain",
  },
  inputWrapper: {
    flex: 1,
    padding: 20,
  },
  loginHere: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 20,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  register: {
    paddingVertical: 10,
    alignItems: "flex-end",
  },
  already: {
    color: "navy",
  },
});

export default LoginScreen;
