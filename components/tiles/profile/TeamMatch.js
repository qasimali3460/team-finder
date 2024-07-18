import { StyleSheet, Text, View, Image } from "react-native";
import assets from "../../../assets/assets";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

const TeamMatch = ({ title1, logo1, title2, logo2 }) => {
  return (
    <View style={styles.mainWrapper}>
      <View style={styles.outerWrapper}>
        <View style={styles.wrapper}>
          <Image source={{ uri: logo1 }} style={styles.img} />
          <Text style={styles.title}>{title1}</Text>
        </View>
        <Text style={styles.vs}>VS</Text>
        <View style={styles.wrapper}>
          <Image source={{ uri: logo1 }} style={styles.img} />
          <Text style={styles.title}>{title1}</Text>
        </View>
      </View>
      <Text>{new Date().toDateString()} at Jinnah stadium</Text>
    </View>
  );
};

export default TeamMatch;

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    height: 300,
    marginTop: 10,
    paddingTop: 50,
    backgroundColor: "white",
  },
  outerWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    height: 200,
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  wrapper: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  img: {
    width: 80,
    height: 80,
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
  vs: {
    fontWeight: "bold",
    fontSize: RFValue(15),
  },
});
