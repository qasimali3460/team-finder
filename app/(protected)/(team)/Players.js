import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { teamMembers } from "../../../constants/players.constant";
import PlayerCard from "../../../components/cards/PlayerCard";

const Players = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={teamMembers}
        renderItem={({ item }) => <PlayerCard {...item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        numColumns={2}
      />
    </View>
  );
};
export default Players;

const styles = StyleSheet.create({});
