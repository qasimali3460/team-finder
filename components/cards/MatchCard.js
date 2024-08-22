import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { router } from "expo-router";
import { defaultPlayerImage } from "../../constants/players.constant";
import { Button, ChevronRightIcon } from "native-base";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment/moment";

const MatchCard = ({
  _id,
  myTeamName,
  myProfilePicture,
  myCoverPhoto,
  myTeamId,
  otherTeamName,
  otherProfilePicture,
  otherCoverPhoto,
  otherTeamId,
  location,
  overs,
  matchDate,
}) => {
  const goToTeam = () => {
    router.navigate({ pathname: "team", params: { teamId: _id } });
  };

  return (
    <View onPress={goToTeam} style={styles.card}>
      <View style={styles.dateWrapper}>
        <LinearGradient
          colors={["hsla(318, 44%, 51%, 1)", "hsla(347, 94%, 48%, 1)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.dateInnerWrapper}
        >
          <Text style={styles.date}>
            {moment(matchDate).format("MMM DD, YY")}
          </Text>
        </LinearGradient>
      </View>
      <View style={styles.teamsWrapper}>
        <View style={styles.team}>
          <View style={styles.imgWrapper}>
            <Image style={styles.img} source={{ uri: myProfilePicture }} />
            <Text numberOfLines={1} style={styles.teamName}>
              {myTeamName}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.vs}>VS</Text>
          <Text style={styles.overs}>{overs} Overs</Text>
        </View>
        <View style={styles.team}>
          <View style={styles.imgWrapper}>
            <Image style={styles.img} source={{ uri: otherProfilePicture }} />
            <Text numberOfLines={1} style={styles.teamName}>
              {otherTeamName}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.detail}>
        <Text style={styles.location}>{location}</Text>
      </View>
    </View>
  );
};

export default MatchCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 4,
    marginTop: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    paddingBottom: 20,
    elevation: 3,
    backgroundColor: "white",
    overflow: "hidden",
  },
  dateWrapper: { paddingBottom: 10, alignSelf: "center" },
  dateInnerWrapper: {
    padding: 4,
  },
  date: {
    color: "white",
  },
  teamsWrapper: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  team: { flex: 1 },
  imgWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  teamName: {
    fontWeight: "bold",
    fontSize: RFValue(18),
    marginTop: 10,
  },
  vs: {
    fontWeight: "bold",
    fontSize: RFValue(30),
  },
  overs: {
    fontSize: RFValue(10),
    color: "hsla(347, 94%, 48%, 1)",
  },
  detail: {},
  location: {
    fontSize: RFValue(12),
    paddingHorizontal: 40,
    textAlign: "center",
    color: "grey",
    marginTop: 10,
  },
});
