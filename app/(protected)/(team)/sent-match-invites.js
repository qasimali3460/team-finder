import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import MatchInviteCard from "../../../components/cards/MatchInvite";
import { getSentMatchInvites } from "../../../services/match.service";

const SentMatchInvites = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getInvites();
  }, []);

  const getInvites = () => {
    setLoading(true);
    getSentMatchInvites()
      .then((response) => {
        setInvites(response?.data?.data ?? []);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={invites}
        renderItem={({ item }) => <MatchInviteCard sentByMe={true} {...item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        numColumns={1}
        onRefresh={getInvites}
        refreshing={loading}
      />
    </View>
  );
};
export default SentMatchInvites;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
});
