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
import { router, useNavigation } from "expo-router";
import PlayerInfo from "@/components/tiles/profile/Info";
import TeamTile from "../../../components/tiles/profile/TeamTile";
import {
  getMyProfile,
  getOtherUserProfile,
} from "../../../services/user.service";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";
import { currentSession } from "../../../hooks/hooks";
import ProfileImage from "../../../components/input/profile-image";
import ScreenHeader from "../../../components/tiles/profile/ScreenHeader";
import { Button } from "native-base";
import { useRoute } from "@react-navigation/native";

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
  const [currentUserId] = currentSession();
  const myRoute = useRoute();

  const editProfile = () => {
    router.navigate("edit-profile");
  };

  useEffect(() => {
    if (currentUserId) {
      let userId = null;
      let isMine = true;
      if (myRoute.params.userId) {
        userId = myRoute.params.userId;
        if (userId !== currentUserId) {
          isMine = false;
        }
      } else {
        userId = currentUserId;
      }
      console.log(userId, isMine, currentUserId);
      setOverlay(true);
      if (isMine) {
        getMyProfile()
          .then((response) => {
            const profile = response?.data?.data;
            console.log("profile: ", profile);
            setProfile(profile);
          })
          .catch((e) => {
            console.log("e: ", e);
            Toast.show({
              type: "errorToast",
              text1: "Profile error",
              text2: "Failed to fetch profile",
              position: "top",
            });
          })
          .finally(() => setOverlay(false));
      } else {
        getOtherUserProfile(userId)
          .then((response) => {
            console.log("response: ", response);
            const profile = response?.data?.data;
            setProfile(profile);
          })
          .catch((e) => {
            console.log("e: ", e);
            Toast.show({
              type: "errorToast",
              text1: "Profile error",
              text2: "Failed to fetch profile",
              position: "top",
            });
          })
          .finally(() => setOverlay(false));
      }
    }
  }, [currentUserId]);

  return (
    <ScrollView>
      <SafeAreaView>
        <StatusBar barStyle={"dark-content"} />
        <ScreenHeader title={"User Profile"} />
        <Spinner visible={overlay} textContent={"Loading..."} textStyle={{}} />
        <ProfileImage
          uri={profile?.profilePicture}
          cover={profile?.coverPhoto}
          readOnly={true}
        />
        <View style={styles.editWrapper}>
          <Button style={styles.editBtn} onPress={editProfile}>
            Edit Profile
          </Button>
        </View>
        <View style={styles.otherInfo}>
          <Text style={styles.detailTitle}>Player Detail</Text>
          <View>
            <PlayerInfo
              title={"Age"}
              value={new Date(profile?.dob).toLocaleDateString()}
            />
            <PlayerInfo title={"Location"} value={profile?.location} />
            <PlayerInfo
              title={"Preferred Role"}
              value={profile?.prefferedRole}
            />
            <PlayerInfo title={"Batting style"} value={profile?.battingStyle} />
            <PlayerInfo title={"Bowling style"} value={profile?.bowlingStyle} />
          </View>
        </View>
        <View style={[styles.otherInfo, { marginTop: 20 }]}>
          <Text style={styles.detailTitle}>Teams</Text>
          <View style={styles.teamsSection}>
            {teams.map((team, key) => {
              return (
                <View key={key} style={styles.otherTeamWrapper}>
                  <TeamTile title={team.title} logo={team.logo} />
                </View>
              );
            })}
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
