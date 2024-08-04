import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

const Info = ({ title, value }) => {
  return (
    <View style={styles.infoWrapper}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.valuesWrapper}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  infoWrapper: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderBottomWidth: 1,
    marginTop: 15,
  },
  title: {
    maxWidth: 200,
    flexWrap: "wrap",
    overflow: "hidden",
    flex: 1,
    fontWeight: "bold",
    fontSize: RFValue(16),
  },
  valuesWrapper: {
    alignItems: "flex-end",
    flex: 2,
  },
  value: {
    flex: 1,
    fontSize: RFValue(14),
  },
});
