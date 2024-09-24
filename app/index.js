import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { getAuth } from "../hooks/hooks";
import { Redirect } from "expo-router";

const App = () => {
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

export default App;

const styles = StyleSheet.create({});
