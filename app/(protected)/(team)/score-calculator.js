import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { Button, TextField } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import ScreenHeader from "../../../components/tiles/profile/ScreenHeader";
import RBSheet from "react-native-raw-bottom-sheet";
import { FontAwesome5 } from "@expo/vector-icons";
import { getInning, saveInning } from "../../../services/match.service";
import { RFValue } from "react-native-responsive-fontsize";

const CricketScoreScreen = () => {
  const [overs, setOvers] = useState(0);
  const [inning1, setInning1] = useState(Array(overs).fill([]));
  const [inning2, setInning2] = useState(Array(overs).fill([]));
  const [selectedInning, setSelectedInning] = useState(1);
  const [selectedOver, setSelectedOver] = useState(1);
  const [selectedBall, setSelectedBall] = useState(1);
  const [meta, setMeta] = useState(null);
  const bottomSheetRef = useRef();
  const route = useRoute();

  useEffect(() => {
    if (route.params && route.params) {
      const { matchId, team1, team2, overs } = route.params;
      setMeta({
        matchId,
        team1,
        team2,
      });
      setOvers(overs);
      setInning1(Array(parseInt(overs)).fill([]));
      setInning2(Array(parseInt(overs)).fill([]));
      getInning(matchId).then((response) => {
        if (response?.data?.data) {
          const data = response?.data?.data;
          if (data.innings?.[0]) {
            setInning1(data.innings[0]?.overs);
          }
          if (data.innings?.[1]) {
            setInning2(data.innings[1]?.overs);
          }
        }
      });
    }
  }, []);

  const handleScore = (runs) => {
    if (selectedInning === 1) {
      const updatedInning1 = JSON.parse(JSON.stringify(inning1));
      updatedInning1[String(selectedOver - 1)][String(selectedBall - 1)] = runs;
      setInning1(updatedInning1);
    } else {
      const updatedInning2 = JSON.parse(JSON.stringify(inning2));
      updatedInning2[String(selectedOver - 1)][String(selectedBall - 1)] = runs;
      setInning2(updatedInning2);
    }
    setSelectedBall(Math.min(6, selectedBall + 1));
  };

  const handleSubmit = () => {
    console.log({ meta, selectedInning, completed: isAllBallsFilled() });
    const selectedInningData = selectedInning === 1 ? inning1 : inning2;
    saveInning(
      selectedInningData,
      selectedInning === 1 ? meta.team1 : meta.team2,
      meta.matchId,
      selectedInning
    );
  };

  const isAllBallsFilled = () => {
    const selectedInningData = selectedInning === 1 ? inning1 : inning2;
    return selectedInningData.every((over) => over.length === 6);
  };

  const handleOpen = () => {
    bottomSheetRef?.current?.open?.();
  };

  const handleClose = () => {
    bottomSheetRef?.current?.close?.();
  };

  const renderOver = (overData, overIndex) => {
    const styles = StyleSheet.create({
      overContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 10,
      },
      overText: {
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 10,
      },
      ballText: {
        fontSize: RFValue(15),
        padding: 5,
        borderRadius: 5,
        color: "white",
        marginHorizontal: 5,
        paddingHorizontal: 10,
      },
      scoreText: {
        backgroundColor: "green",
      },
      wideText: {
        backgroundColor: "yellow",
        color: "black",
      },
      wicketText: {
        backgroundColor: "red",
      },
    });

    return (
      <View key={overIndex} style={styles.overContainer}>
        <View>
          <Text style={styles.overText}>Over {overIndex + 1}</Text>
          <FlatList
            horizontal
            data={overData}
            renderItem={({ item, index }) => {
              let ballTextStyles = [styles.ballText];
              if (item === "WK") {
                ballTextStyles.push(styles.wicketText);
              } else if (item === "W" || item === "NB") {
                ballTextStyles.push(styles.wideText);
              } else if (item.match(/\d+/)) {
                ballTextStyles.push(styles.scoreText);
              }
              return (
                <Text key={index} style={ballTextStyles}>
                  {item === undefined ? "-" : item}
                </Text>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  };

  console.log("inning2: ", inning2);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScreenHeader
        title={"Scoreboard"}
        doneIcon={
          <TouchableOpacity onPress={handleOpen}>
            <FontAwesome5 name="baseball-ball" size={24} />
          </TouchableOpacity>
        }
        showDone={true}
      />
      <StatusBar barStyle={"dark-content"} />
      <ScrollView>
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
        </View>
      </ScrollView>

      <View style={styles.btnStyle}>
        <Button
          colorScheme={"primary"}
          isDisabled={!isAllBallsFilled()}
          onPress={handleSubmit}
        >
          Save
        </Button>
      </View>

      <RBSheet
        RBSheet
        ref={bottomSheetRef}
        draggable
        dragOnContent
        height={500}
        // onClose={() => bottomSheetRef.current.close()}
        customStyles={{
          container: styles.sheetContainer,
        }}
      >
        <View style={{ padding: 10, flex: 1 }}>
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
              <Button key={runs} onPress={() => handleScore(runs)}>
                {runs}
              </Button>
            ))}
          </View>

          <View style={styles.btnStyle}>
            <Button
              colorScheme={"primary"}
              onPress={() => bottomSheetRef.current.close()}
            >
              Done
            </Button>
          </View>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    // marginVertical: 20,
    flex: 1,
  },
  picker: {
    height: 50,
    width: 150,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scrollContainer: {
    paddingBottom: 50,
    flex: 1,
  },
  btnStyle: {
    // flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  sheetContainer: { borderTopLeftRadius: 50, borderTopRightRadius: 50 },
});

export default CricketScoreScreen;
