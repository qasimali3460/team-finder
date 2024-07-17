import { StyleSheet, Text, View, Image } from "react-native";
import assets from "../../../assets/assets";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

const TeamTile = ({ title, logo }) => {
  return (
    <View style={styles.wrapper}>
      <Image source={{ uri: logo }} style={styles.img} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default TeamTile;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    padding: 10,
    borderColor: "green",
    borderWidth: 2,
    objectFit: "fill",
  },
  title: {
    fontWeight: "bold",
    marginTop: 5,
    fontSize: RFValue(15),
  },
});
