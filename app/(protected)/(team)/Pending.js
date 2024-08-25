import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { teamMembers } from "../../../constants/players.constant";
import PendingPlayer from "../../../components/cards/PendingPlayer";
import { cancelInvite, getSentInvites } from "../../../services/team.service";
import Toast from "react-native-toast-message";
import TeamMembersContext from "../../../hooks/teamMembers";
import { theme } from "native-base";

const Players = () => {
  const { invites, getInvites, loading } = useContext(TeamMembersContext);

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
      {invites.length > 0 && (
        <FlatList
          data={invites}
          renderItem={({ item }) => (
            <PendingPlayer onCancel={handleCancelInvite} {...item} />
          )}
          keyExtractor={(item) => item.inviteId}
          contentContainerStyle={styles.list}
          numColumns={1}
          onRefresh={getInvites}
          refreshing={loading}
        />
      )}

      {loading && invites?.length === 0 && (
        <View style={styles.emptyWrapper}>
          <Text style={styles.loadingMsg}>Loading please wait</Text>
        </View>
      )}
      {!loading && invites?.length === 0 && (
        <View style={styles.emptyWrapper}>
          <Text style={styles.loadingMsg}>
            No pending invites for your team
          </Text>
        </View>
      )}
    </View>
  );
};
export default Players;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingMsg: {
    color: "grey",
  },
});
