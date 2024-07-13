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
} from "react-native";
import assets from "../../assets/assets";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";
import { router } from "expo-router";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement your login logic here
    console.log("Login button pressed!");
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
              placeholder="Enter your username"
              keyboardType="default"
              autoCapitalize="none"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
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
