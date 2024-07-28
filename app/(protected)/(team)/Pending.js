import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { teamMembers } from "../../../constants/players.constant";
import PendingPlayer from "../../../components/cards/PendingPlayer";

const Players = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={teamMembers}
        renderItem={({ item }) => <PendingPlayer {...item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        numColumns={1}
      />
    </View>
  );
};
export default Players;

const styles = StyleSheet.create({});
