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

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const goToLogin = () => {
    router.navigate("login");
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
            <Image source={assets.illustr1} style={styles.illustration} />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.registerHere}>Register Here</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              keyboardType="default"
              autoCapitalize="none"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your phone"
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
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <View style={styles.login}>
              <TouchableOpacity onPress={goToLogin}>
                <Text style={styles.already}>
                  Already Have an account ? Login
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
  registerHere: {
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
  login: {
    paddingVertical: 10,
    alignItems: "flex-end",
  },
  already: {
    color: "navy",
  },
});

export default RegisterScreen;
