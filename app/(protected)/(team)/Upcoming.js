import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getUpcomingMatches } from "../../../services/match.service";
import MatchCard from "../../../components/cards/MatchCard";

const UpcomingMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMatches();
  }, []);

  const getMatches = () => {
    setLoading(true);
    getUpcomingMatches()
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
        data={[...matches, ...matches, ...matches, ...matches]}
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
export default UpcomingMatches;

const styles = StyleSheet.create({});
