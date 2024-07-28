import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { matchInvites, teamMembers } from "../../../constants/players.constant";
import PendingPlayer from "../../../components/cards/PendingPlayer";
import { StatusBar } from "native-base";
import ScreenHeader from "../../../components/tiles/profile/ScreenHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import MatchInviteCard from "../../../components/cards/MatchInvite";

const Players = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <ScreenHeader title="Match Invites" />
      <FlatList
        data={matchInvites}
        renderItem={({ item }) => <MatchInviteCard {...item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        numColumns={1}
      />
    </SafeAreaView>
  );
};
export default Players;

const styles = StyleSheet.create({});
