import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { teamMembers } from "../../../constants/players.constant";
import PendingPlayer from "../../../components/cards/PendingPlayer";
import { cancelInvite, getSentInvites } from "../../../services/team.service";
import Toast from "react-native-toast-message";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getInvites();
  }, []);

  const getInvites = () => {
    setLoading(true);
    getSentInvites()
      .then((response) => {
        setPlayers(response?.data?.invites ?? []);
      })
      .finally(() => setLoading(false));
  };

  const handleCancelInvite = (inviteId) => {
    cancelInvite(inviteId)
      .then(() => {
        Toast.show({
          type: "successToast",
          text1: "Invite",
          text2: "Invite canceled succesfully",
          position: "top",
        });
      })
      .finally(() => {
        getInvites();
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={players}
        renderItem={({ item }) => (
          <PendingPlayer onCancel={handleCancelInvite} {...item} />
        )}
        keyExtractor={(item) => item.inviteId}
        contentContainerStyle={styles.list}
        numColumns={1}
        onRefresh={getSentInvites}
        refreshing={loading}
      />
    </View>
  );
};
export default Players;

const styles = StyleSheet.create({});
