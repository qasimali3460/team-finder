import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import MatchInviteCard from "../../../components/cards/MatchInvite";
import { getReceivedMatchInvites } from "../../../services/match.service";
import { useNavigation } from "expo-router";

const ReceivedMatchInvites = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getInvites();
    });
    getInvites();
    return () => {
      unsubscribe();
    };
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
    <View style={styles.wrapper}>
      <FlatList
        data={invites}
        renderItem={({ item }) => (
          <MatchInviteCard sentByMe={false} {...item} />
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        numColumns={1}
        onRefresh={getInvites}
        refreshing={loading}
      />
    </View>
  );
};
export default ReceivedMatchInvites;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
});
