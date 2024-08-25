import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getUpcomingMatches } from "../../../services/match.service";
import MatchCard from "../../../components/cards/MatchCard";

const UpcomingMatches = ({ teamId }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMatches();
  }, []);

  const getMatches = () => {
    setLoading(true);
    getUpcomingMatches(teamId)
      .then((response) => {
        setMatches(response?.data?.data ?? []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={matches}
        renderItem={({ item }) => (
          <MatchCard {...item} {...(teamId ? { myTeamOwner: false } : {})} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        numColumns={1}
        onRefresh={() => getMatches()}
        refreshing={loading}
      />
    </View>
  );
};
export default UpcomingMatches;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
