import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { getAuth } from "../hooks/hooks";
import { Redirect } from "expo-router";

const index = () => {
  const [token, isTokenLoaded] = getAuth();

  if (!isTokenLoaded) {
    return <Text>Loading</Text>;
  }

  return (
    <View>
      {token ? <Redirect href={"(protected)"} /> : <Redirect href={"(auth)"} />}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
