import React, { useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";

import { Picker } from "@react-native-picker/picker";
import { ScrollView, StatusBar } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../../../components/tiles/profile/ScreenHeader";

const CricketScoreScreen = () => {
  const [overs, setOvers] = useState(3);
  const [inning1, setInning1] = useState(Array(overs).fill([]));

  const [inning2, setInning2] = useState(Array(overs).fill([]));
  const [selectedInning, setSelectedInning] = useState(1);
  const [selectedOver, setSelectedOver] = useState(1);
  const [selectedBall, setSelectedBall] = useState(1);

  const handleScore = (runs) => {
    if (selectedInning === 1) {
      const updatedInning1 = JSON.parse(JSON.stringify(inning1));
      console.log(String(selectedOver - 1));
      updatedInning1[String(selectedOver - 1)][String(selectedBall - 1)] = runs;
      console.log("updatedInning1: ", updatedInning1);
      setInning1(updatedInning1);
    } else {
      const updatedInning2 = [...inning2];
      updatedInning2[selectedOver - 1][selectedBall] = runs;
      setInning2(updatedInning2);
    }
  };

  const renderOver = (overData, overIndex) => (
    <View key={overIndex} style={styles.overContainer}>
      <Text style={styles.overText}>Over {overIndex + 1}</Text>
      <FlatList
        horizontal
        data={overData}
        renderItem={({ item, index }) => (
          <Text key={index} style={styles.ballText}>
            {item === undefined ? "-" : item}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* <ScreenHeader title={"Scoreboard"} /> */}
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView>
        <ScrollView style={{ paddingBottom: 50 }}>
          <View style={styles.container}>
            {selectedInning === 1 && (
              <>
                <Text style={styles.title}>Inning 1</Text>
                {inning1.map((overData, index) => renderOver(overData, index))}
              </>
            )}

            {selectedInning === 2 && (
              <>
                <Text style={styles.title}>Inning 2</Text>
                {inning2.map((overData, index) => renderOver(overData, index))}
              </>
            )}

            <View style={styles.selectionContainer}>
              <Text>Select Inning:</Text>
              <Picker
                selectedValue={selectedInning}
                onValueChange={(itemValue) => setSelectedInning(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Inning 1" value={1} />
                <Picker.Item label="Inning 2" value={2} />
              </Picker>

              <Text>Select Over:</Text>
              <Picker
                selectedValue={selectedOver}
                onValueChange={(itemValue) => setSelectedOver(itemValue)}
                style={styles.picker}
              >
                {Array.from({ length: overs }).map((_, i) => (
                  <Picker.Item key={i} label={`Over ${i + 1}`} value={i + 1} />
                ))}
              </Picker>

              <Text>Select Ball:</Text>
              <Picker
                selectedValue={selectedBall}
                onValueChange={(itemValue) => setSelectedBall(itemValue)}
                style={styles.picker}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <Picker.Item key={i} label={`Ball ${i + 1}`} value={i + 1} />
                ))}
              </Picker>
            </View>

            <View style={styles.buttonContainer}>
              {["0", "1", "2", "3", "4", "6", "WK", "NB", "W"].map((runs) => (
                <Button
                  key={runs}
                  title={`${runs}`}
                  onPress={() => handleScore(runs)}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
  },
  overContainer: {
    marginBottom: 20,
  },
  overText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ballText: {
    fontSize: 16,
    marginHorizontal: 4,
  },
  selectionContainer: {
    marginVertical: 20,
    flex: 1,
    backgroundColor: "green",
  },
  picker: {
    height: 50,
    width: 150,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CricketScoreScreen;
