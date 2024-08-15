import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { teamMembers } from "../../../constants/players.constant";
import PlayerCard from "../../../components/cards/PlayerCard";
import { getMyTeamMembers } from "../../../services/team.service";
import { useState } from "react";

const Players = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMembers();
  }, []);

  const getMembers = () => {
    setLoading(true);
    getMyTeamMembers()
      .then((response) => {
        setMembers(response?.data?.data ?? []);
      })
      .finally(() => setLoading(false));
  };
  return (
    <View>
      <FlatList
        data={members}
        renderItem={({ item, index }) => (
          <PlayerCard {...item} isLast={index === members.length - 1} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        numColumns={2}
        onRefresh={() => getMembers()}
        refreshing={loading}
      />
    </View>
  );
};
export default Players;

const styles = StyleSheet.create({});
