import { StyleSheet, Text, View } from "react-native";
import React from "react";

const PlayerInfo = ({ title, value }) => {
  return (
    <View style={styles.infoWrapper}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default PlayerInfo;

const styles = StyleSheet.create({
  infoWrapper: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderBottomWidth: 1,
    marginTop: 15,
  },
  title: {},
  value: {},
});
