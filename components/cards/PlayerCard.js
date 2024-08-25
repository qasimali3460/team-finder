import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { router } from "expo-router";

const PlayerCard = ({
  user: { name },
  userDetails: { profilePicture, prefferedRole },
  isLast,
}) => {
  const goToProfile = () => {
    router.navigate({ pathname: "profile", params: { userId: _id } });
  };
  return (
    <TouchableOpacity
      onPress={goToProfile}
      style={[styles.card, { flex: isLast ? 0.5 : 1 }]}
    >
      <View style={styles.imgWrapper}>
        <Image source={{ uri: profilePicture }} style={styles.img} />
      </View>
      <View style={styles.detail}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{prefferedRole}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlayerCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    margin: 4,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    overflow: "hidden",
    height: RFValue(200),
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
    flex: 1,
    height: RFValue(100),
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  detail: {
    padding: 10,
  },
});
