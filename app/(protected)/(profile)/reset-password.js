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
import assets from "../../../assets/assets";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";
import { router } from "expo-router";
import { Button } from "native-base";
import { resetPassword } from "../../../services/auth.service";
import Toast from "react-native-toast-message";
import { deleteItemAsync } from "expo-secure-store";
import PasswordInput from "../../../components/input/passowrd";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setLoading(true);
    resetPassword(password)
      .then(async () => {
        deleteItemAsync("token");
        Toast.show({
          type: "successToast",
          text1: "Password Reset",
          text2: "Password reset successfully. Please Login",
          position: "top",
        });
        setPassword("");
        setRePassword("");
        router.replace({
          pathname: "login",
        });
      })
      .catch((e) => {
        const errorMessage = e?.response?.data?.message ?? "Failed to login";
        if (errorMessage) {
          Toast.show({
            type: "errorToast",
            text1: "Password reset error",
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
            <Text style={styles.loginHere}>Reset Password</Text>
            <PasswordInput
              placeholder="Enter your new password"
              autoCapitalize="none"
              password={password}
              setPassword={setPassword}
            />
            <PasswordInput
              placeholder="ReEnter your new password"
              autoCapitalize="none"
              password={rePassword}
              setPassword={setRePassword}
            />
            <Button
              onPress={reset}
              isLoading={loading}
              isDisabled={
                !password || !rePassword || password !== rePassword || loading
              }
              isLoadingText="Please Wait"
            >
              Reset Password
            </Button>
            <View style={styles.register}>
              <TouchableOpacity onPress={() => router.navigate("login")}>
                <Text style={styles.already}>Back to login ?</Text>
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
    justifyContent: "space-between",
    flex: 1,
  },
  already: {
    color: "navy",
  },
});

export default ResetPassword;
