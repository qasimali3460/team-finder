import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { router } from "expo-router";

const ScreenHeader = ({ handleDone, title, showDone, doneIcon }) => {
  const handleGoBack = () => {
    router.back();
  };
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={handleGoBack}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {showDone ? (
        <TouchableOpacity onPress={handleDone}>
          {doneIcon ? doneIcon : <Text style={styles.action}>Done</Text>}
        </TouchableOpacity>
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  wrapper: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: RFValue(20),
    fontWeight: "bold",
  },
  action: {
    color: "blue",
    fontSize: RFValue(15),
  },
});
