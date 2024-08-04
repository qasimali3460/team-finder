// Profile.js

import React, { useState } from "react";
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
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import PlayerInfo from "../../../components/tiles/profile/Info";
import assets from "../../../assets/assets";
import { Button } from "native-base";
import ScreenHeader from "../../../components/tiles/profile/ScreenHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import DiscussionWidget from "./DiscussionWidget";

const Profile = () => {
  const handleGoBack = () => {
    router.back();
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.wrapper}>
        <StatusBar barStyle={"dark-content"} />
        <ScreenHeader title="Invite Detail" />
        <View style={styles.profileWrapper}>
          <View style={styles.picWrapper}>
            <Image source={assets.player1} style={styles.pic} />
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
            <PlayerInfo title={"Match Type"} value="50 Overs" />
            <PlayerInfo
              title={"Team Name"}
              value="Kings Eleven Daska Kings Eleven Daska Kings Eleven Daska Kings Eleven Daska"
            />
            <PlayerInfo title={"Location"} value="Sialkot, Punjab" />
            <PlayerInfo title={"Date"} value="22-08-2024" />
            <PlayerInfo title={"Time"} value="08:00 am" />
          </View>
        </View>
        <View style={[styles.otherInfo, { marginTop: 20 }]}>
          <DiscussionWidget />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  profileWrapper: {
    height: 500,
    flex: 1,
    backgroundColor: "yellow",
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
