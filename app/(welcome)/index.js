import React from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import assets from "../../assets/assets";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const Welcome = () => {
  const goToLogin = () => {
    router.navigate("home");
  };

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <ImageBackground source={assets.background2} style={styles.wrapper}>
        <StatusBar style="light" />
        <LinearGradient
          colors={[
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.5)",
          ]}
          style={styles.blur}
        >
          <Text style={styles.welcome}>Welcome</Text>
          <Text style={styles.description}>
            Explore teams, join matches, and connect with cricket enthusiasts
            around you. Start your cricket adventure with Team Finder today!
          </Text>
          <View style={styles.btnWrapper}>
            <TouchableOpacity style={styles.btn} onPress={goToLogin}>
              <Text style={styles.btnText}>{"Let's Explore >"}</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  blur: {
    height: "40%",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    overflow: "hidden",
    padding: "5%",
    paddingTop: "15%",
  },
  welcome: {
    fontSize: RFValue(25),
    color: "white",
    fontWeight: "bold",
  },
  description: {
    fontSize: RFValue(15),
    color: "white",
    paddingTop: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Adjust the opacity as needed
  },
  btnWrapper: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  btn: {
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  btnText: {
    fontSize: RFValue(14),
    fontWeight: "bold",
  },
});
