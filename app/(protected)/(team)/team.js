import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { router } from "expo-router";
import PlayerInfo from "@/components/tiles/profile/Info";
import TeamTile from "../../../components/tiles/profile/TeamTile";
import { getMyProfile } from "../../../services/user.service";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";
import { currentUserId } from "../../../hooks/hooks";
import ProfileImage from "../../../components/input/profile-image";
import ScreenHeader from "../../../components/tiles/profile/ScreenHeader";
import { Button } from "native-base";
import { getMyTeam } from "../../../services/team.service";

const teams = [
  {
    title: "Multan Sultan",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMSYerJFUDA_P0_YKm0tizI0kogAj6wXxzWQ&s",
  },
  {
    title: "Lahore Qalanders",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtlgBlQvIzJZ4u8R8lcGNlD0pyG5lUPiH9rA&s",
  },
  {
    title: "Quetta gladiators",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJdpDj05rp-pyZD2HtRgiejPk1fJ_XOqnZrQ&s",
  },
  {
    title: "Chennai super king",
    logo: "https://static.toiimg.com/thumb/msid-85232066,width-400,resizemode-4/85232066.jpg",
  },
  {
    title: "Sydney Thuders",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq84POhpj9qBmh1hsc-VzMpD-N0NZEpJKjLQ&s",
  },
];

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [overlay, setOverlay] = useState(false);
  const [userId] = currentUserId();

  const editTeam = () => {
    router.navigate("edit-team");
  };

  useEffect(() => {
    setOverlay(true);
    getMyTeam()
      .then((response) => {
        const profile = response?.data?.data;
        setProfile(profile);
      })
      .catch((e) => {
        console.log("e: ", e);
        Toast.show({
          type: "errorToast",
          text1: "Team error",
          text2: "Failed to fetch team",
          position: "top",
        });
      })
      .finally(() => setOverlay(false));
  }, []);

  return (
    <ScrollView>
      <SafeAreaView>
        <StatusBar barStyle={"dark-content"} />
        <ScreenHeader title={"Team Detail"} />
        <Spinner visible={overlay} textContent={"Loading..."} textStyle={{}} />
        <ProfileImage
          uri={profile?.profilePicture}
          cover={profile?.coverPhoto}
          readOnly={true}
        />
        <View style={styles.editWrapper}>
          <Button style={styles.editBtn} onPress={editTeam}>
            Edit Team
          </Button>
        </View>
        <View style={styles.otherInfo}>
          <Text style={styles.detailTitle}>Team Detail</Text>
          <View>
            <PlayerInfo title={"Team name"} value={profile?.teamName} />
            <PlayerInfo
              title={"Description"}
              value={
                "this is a very very long descritpion this is a very very long descritpion this is a very very long descritpion this is a very very long descritpion this is a very very long descritpion this is a very very long descritpion this is a very very long descritpion this is a very very long descritpion this is a very very long descritpion this is a very very long descritpion"
              }
            />
            <PlayerInfo title={"Address"} value={profile?.address} />
            <PlayerInfo title={"Team type"} value={profile?.teamType} />
          </View>
        </View>
        <View style={[styles.otherInfo, { marginTop: 20 }]}>
          <Text style={styles.detailTitle}>Upcoming Matches</Text>
          <View style={styles.teamsSection}>
            {/* {teams.map((team, key) => {
              return (
                <View key={key} style={styles.otherTeamWrapper}>
                  <TeamTile title={team.title} logo={team.logo} />
                </View>
              );
            })} */}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  editWrapper: {
    marginVertical: 10,
    paddingLeft: 20,
  },
  editBtn: {
    width: 100,
  },
  otherInfo: {
    padding: 10,
  },
  detailTitle: {
    fontSize: RFValue(20),
    fontWeight: "bold",
  },
  teamsSection: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  otherTeamWrapper: {
    width: "50%",
    marginTop: 20,
  },
});
