import { useFonts } from "expo-font";
import { Redirect, router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { NativeBaseProvider } from "native-base";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import { View, Text } from "react-native";
import { getItemAsync } from "expo-secure-store";
import { getAuth } from "../hooks/hooks";

const toastConfig = {
  successToast: ({ text1, text2 }) => (
    <View
      style={{
        width: "90%",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "#008319",
        borderRadius: 10,
      }}
    >
      <View
        style={{
          width: "80%",
          alignSelf: "center",
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontFamily: "Urbanist-SemiBold",
            fontSize: 15,
            color: "white",
          }}
        >
          {text1}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Urbanist-Regular",
            color: "white",
            marginTop: 5,
          }}
        >
          {text2}
        </Text>
      </View>
    </View>
  ),
  errorToast: ({ text1, text2 }) => (
    <View
      style={{
        width: "90%",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "rgba(179, 26, 18, 0.95)",
        borderRadius: 10,
      }}
    >
      <View
        style={{
          width: "80%",
          alignSelf: "center",
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontFamily: "Urbanist-SemiBold",
            fontSize: 15,
            color: "white",
          }}
        >
          {text1}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Urbanist-Regular",
            color: "white",
            marginTop: 5,
          }}
        >
          {text2}
        </Text>
      </View>
    </View>
  ),
  infoToast: ({ text1, text2 }) => (
    <View
      style={{
        width: "90%",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "rgba(238, 238, 238, 0.8)",
        borderRadius: 10,
      }}
    >
      <View
        style={{
          width: "80%",
          alignSelf: "center",
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontFamily: "Urbanist-SemiBold",
            fontSize: 15,
            color: "#000001",
          }}
        >
          {text1}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Urbanist-Regular",
            color: "#000001",
            marginTop: 7,
          }}
        >
          {text2}
        </Text>
      </View>
    </View>
  ),
};
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [token, isTokenLoaded] = getAuth();

  useEffect(() => {
    if (loaded && isTokenLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, token]);

  if (!loaded) {
    return null;
  }

  return (
    <NativeBaseProvider>
      {token && isTokenLoaded && <Redirect href="home" />}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(welcome)" options={{ headerShown: false }} />
      </Stack>
      <Toast config={toastConfig} />
    </NativeBaseProvider>
  );
}
