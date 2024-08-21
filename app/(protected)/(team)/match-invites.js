import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { matchInvites, teamMembers } from "../../../constants/players.constant";
import PendingPlayer from "../../../components/cards/PendingPlayer";
import { StatusBar } from "native-base";
import ScreenHeader from "../../../components/tiles/profile/ScreenHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import MatchInviteCard from "../../../components/cards/MatchInvite";
import { getReceivedMatchInvites } from "../../../services/match.service";

const Players = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getInvites();
  }, []);

  const getInvites = () => {
    setLoading(true);
    getReceivedMatchInvites()
      .then((response) => {
        setInvites(response?.data?.data ?? []);
      })
      .finally(() => setLoading(false));
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <ScreenHeader title="Match Invites" />
      <FlatList
        data={invites}
        renderItem={({ item }) => <MatchInviteCard {...item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        numColumns={1}
        onRefresh={getInvites}
        refreshing={loading}
      />
    </SafeAreaView>
  );
};
export default Players;

const styles = StyleSheet.create({});
