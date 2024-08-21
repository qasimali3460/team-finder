// Profile.js

import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import PlayerInfo from "../../../components/tiles/profile/Info";
import assets from "../../../assets/assets";
import { Button } from "native-base";
import ScreenHeader from "../../../components/tiles/profile/ScreenHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import DiscussionWidget from "./DiscussionWidget";
import { useRoute } from "@react-navigation/native";
import { getInviteMessages } from "../../../services/match.service";

const MatchInviteDetail = () => {
  const myRoute = useRoute();
  const {
    inviteId,
    teamName,
    profilePicture,
    location,
    date,
    matchType,
    overs,
  } = myRoute.params;

  return (
    <ScrollView>
      <SafeAreaView style={styles.wrapper}>
        <StatusBar barStyle={"dark-content"} />
        <ScreenHeader title="Invite Detail" />
        <View style={styles.profileWrapper}>
          <View style={styles.picWrapper}>
            <Image source={{ uri: profilePicture }} style={styles.pic} />
          </View>
        </View>
        <View style={styles.otherInfo}>
          <View style={styles.detailWrapper}>
            <Text style={styles.detailTitle}></Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.detailTitle}>Detail</Text>
            </View>
            <View style={styles.action}>
              <Button size={"sm"} variant={"ghost"}>
                Accept
              </Button>
              <Button size={"sm"} variant={"ghost"} colorScheme={"secondary"}>
                Decline
              </Button>
            </View>
          </View>
          <View>
            <PlayerInfo title={"Match Type"} value={matchType} />
            <PlayerInfo title={"Overs"} value={overs} />
            <PlayerInfo title={"Team Name"} value={teamName} />
            <PlayerInfo title={"Location"} value={location} />
            <PlayerInfo title={"Date"} value={date} />
          </View>
        </View>
        <View style={[styles.otherInfo, { marginTop: 20 }]}>
          <DiscussionWidget inviteId={inviteId} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default MatchInviteDetail;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  profileWrapper: {
    height: 500,
    flex: 1,
    position: "relative",
  },
  picWrapper: {
    flex: 1,
    overflow: "hidden",
  },
  pic: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  blur: {
    flex: 1,
  },
  infoWrapper: {
    width: "100%",
    height: 80,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    position: "absolute",
    bottom: 0,
    flex: 1,
    flexDirection: "row",
  },
  nameWrapper: {
    flex: 7,
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: RFValue(20),
    fontWeight: "bold",
  },
  age: {
    fontSize: RFValue(12),
  },
  teamWrapper: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  teamLogo: {
    width: 50,
    height: 50,
    borderRadius: 200,
  },
  follow: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  followText: {
    fontWeight: "bold",
  },
  backIcon: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    padding: 5,
  },
  otherInfo: {
    padding: 10,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: "white",
    marginTop: -50,
    overflow: "hidden",
  },
  detailTitle: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    flex: 1,
  },
  teamsSection: {
    flex: 1,
    marginTop: 10,
  },
  otherTeamWrapper: {
    width: "50%",
    marginTop: 20,
  },
  detailWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  action: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});
