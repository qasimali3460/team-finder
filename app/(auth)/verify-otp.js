import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ScreenHeader from "../../components/tiles/profile/ScreenHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "native-base";
import OTPTextInput from "react-native-otp-textinput";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { verifyOtp } from "../../services/auth.service";
import { useRoute } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const myRoute = useRoute();

  const handleVerifyOtp = () => {
    setLoading(true);
    const { phoneNumber, successRoute, successMessage } = myRoute.params;
    verifyOtp(otp, phoneNumber)
      .then(async (response) => {
        Toast.show({
          type: "successToast",
          text1: "OTP Verified",
          text2: successMessage,
          position: "top",
        });
        if (successRoute === "reset-password") {
          await SecureStore.setItemAsync("token", response?.data?.token);
        }
        router.replace(successRoute);
      })
      .catch((e) => {
        const errorMessage =
          e?.response?.data?.message ?? "Failed to verify OTP";
        Toast.show({
          type: "errorToast",
          text1: "Verification error",
          text2: errorMessage,
          position: "top",
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <SafeAreaView style={styles.flexWrapper}>
      <ScreenHeader title={"Verify OTP"} />
      <View style={styles.flexWrapper}>
        <View style={styles.otpWrapper}>
          <OTPTextInput
            handleTextChange={setOtp}
            inputCount={4}
            tintColor="#3498db"
            offTintColor="#ccc"
            containerStyle={styles.otpContainer}
            textInputStyle={styles.otpInput}
          />
        </View>
        <View style={[styles.flexWrapper, styles.btnWrapper]}>
          <Button
            onPress={handleVerifyOtp}
            isLoading={loading}
            disabled={!otp || otp.length < 4 || loading}
            isLoadingText="Verifying OTP..."
          >
            Verify
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({
  flexWrapper: {
    flex: 1,
  },
  otpContainer: {
    marginBottom: 20,
  },
  otpInput: {
    borderRadius: 10,
    borderColor: "#3498db",
    borderWidth: 2,
    width: 60,
    height: 60,
  },
  btnWrapper: {
    justifyContent: "flex-end",
    paddingBottom: 50,
    paddingHorizontal: 30,
  },
  otpWrapper: {
    paddingHorizontal: 30,
    paddingTop: 50,
  },
});
