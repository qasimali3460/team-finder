import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import PlayerInfo from "@/components/tiles/profile/Info";
import { AirbnbRating } from "react-native-ratings";
import TeamTile from "../../../components/tiles/profile/TeamTile";
import { getMyProfile } from "../../../services/user.service";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";
import { currentUserId } from "../../../hooks/hooks";

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

  const handleGoBack = () => {
    router.back();
  };

  const editProfile = () => {
    router.navigate("edit-profile");
  };

  useEffect(() => {
    setOverlay(true);
    getMyProfile()
      .then((response) => {
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
  }, []);

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <StatusBar barStyle={"light-content"} />
        <Spinner visible={overlay} textContent={"Loading..."} textStyle={{}} />

        <View style={styles.profileWrapper}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backIcon}>
            <AntDesign name="arrowleft" size={20} color="white" />
          </TouchableOpacity>
          <View style={styles.picWrapper}>
            <Image
              source={{
                uri: profile?.coverPhoto,
              }}
              style={styles.pic}
            />
          </View>
          <View style={styles.infoWrapper}>
            <View style={styles.teamWrapper}>
              <Image
                style={styles.teamLogo}
                source={{
                  uri: profile?.profilePicture,
                }}
              />
            </View>
            <View style={styles.nameWrapper}>
              <View>
                <Text style={styles.name}>{profile?.user?.name}</Text>
              </View>
              <TouchableOpacity style={styles.follow} onPress={editProfile}>
                <Text style={styles.followText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
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
      </View>
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
    position: "relative",
  },
  picWrapper: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "grey",
  },
  pic: {
    flex: 1,
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
