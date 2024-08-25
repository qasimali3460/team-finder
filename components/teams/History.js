import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getHistoryMatches } from "../../services/match.service";
import MatchCard from "../cards/MatchCard";

const HistoryMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMatches();
  }, []);

  const getMatches = () => {
    setLoading(true);
    getHistoryMatches()
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
        renderItem={({ item }) => <MatchCard {...item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        numColumns={1}
        onRefresh={() => getMatches()}
        refreshing={loading}
      />
    </View>
  );
};
export default HistoryMatches;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
