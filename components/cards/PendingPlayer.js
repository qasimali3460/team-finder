import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { router } from "expo-router";

const PendingPlayerCard = ({ name, role, image, id }) => {
  const goToProfile = () => {
    router.navigate("profile");
  };

  const cancelInvite = () => {
    Alert.alert("Confirm", "Confirm want to cancel invite ?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => n.log("OK Pressed") },
    ]);
  };

  return (
    <TouchableOpacity onPress={goToProfile} style={styles.card}>
      <View style={styles.imgWrapper}>
        <Image source={image} style={styles.img} />
      </View>
      <View style={styles.detail}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>
      <View style={styles.cancelWrapper}>
        <TouchableOpacity onPress={cancelInvite}>
          <Text style={styles.cancel}>cancel</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default PendingPlayerCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    margin: 4,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    overflow: "hidden",
    height: RFValue(80),
    paddingHorizontal: 10,
  },
  name: {
    fontSize: RFValue(20),
    fontWeight: "bold",
  },
  role: {
    fontSize: RFValue(14),
    color: "#888",
  },
  imgWrapper: {
    width: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 50,
    height: 50,
    objectFit: "cover",
    borderRadius: 50,
  },
  detail: {
    padding: 10,
    flex: 3,
    justifyContent: "center",
  },
  cancelWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  cancel: {
    color: "#D40A0C",
  },
});
