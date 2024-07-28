import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import PlayerInfo from "@/components/tiles/profile/PlayerInfo";
import { AirbnbRating } from "react-native-ratings";
import TeamTile from "../../../components/tiles/profile/TeamTile";
import TeamMatch from "../../../components/tiles/profile/TeamMatch";
import TimelineCalendarScreen from "../../../components/input/timeline";

const teams = [
  {
    title: "Multan Sultan",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMSYerJFUDA_P0_YKm0tizI0kogAj6wXxzWQ&s",
  },
  {
    title: "Lahore Qalander",
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
  const handleGoBack = () => {
    router.back();
  };

  const editProfile = () => {
    router.navigate("edit-team");
  };

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <StatusBar barStyle={"light-content"} />
        <View style={styles.profileWrapper}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backIcon}>
            <AntDesign name="arrowleft" size={20} color="white" />
          </TouchableOpacity>
          <View style={styles.picWrapper}>
            <Image
              source={{
                uri: "https://media.licdn.com/dms/image/sync/D5627AQFXZbWf9v3nDw/articleshare-shrink_800/0/1712261825109?e=2147483647&v=beta&t=t5DfAaQ-4ZX1bazhoh1MXNxJoFZuNzyLJP9nXOIfc7E",
              }}
              style={styles.pic}
            />
          </View>
          <View style={styles.infoWrapper}>
            <View style={styles.teamWrapper}>
              <Image
                style={styles.teamLogo}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnuSx2cKVOcF8WXVHLHF2VbM-_nJnGj-654g&s",
                }}
              />
            </View>
            <View style={styles.nameWrapper}>
              <View style={{ alignItems: "flex-start" }}>
                <Text style={styles.name}>Sialkot Team</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={4}
                  showRating={false}
                  size={20}
                />
              </View>
              <TouchableOpacity style={styles.follow} onPress={editProfile}>
                <Text style={styles.followText}>Edit Team</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.otherInfo}>
          <Text style={styles.detailTitle}>Team Detail</Text>
          <View>
            <PlayerInfo title={"Location"} value="Sialkot, Punjab" />
          </View>
        </View>
        <View style={[styles.otherInfo, { marginTop: 20 }]}>
          <Text style={styles.detailTitle}>Schedule</Text>
          <View style={styles.teamsSection}>
            <TimelineCalendarScreen />
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
    backgroundColor: "yellow",
    position: "relative",
  },
  picWrapper: {
    flex: 1,
    overflow: "hidden",
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
    backgroundColor: "white",
  },
  detailTitle: {
    fontSize: RFValue(20),
    fontWeight: "bold",
  },
  teamsSection: {
    flex: 1,
    marginTop: 10,
  },
  otherTeamWrapper: {
    width: "50%",
    marginTop: 20,
  },
});
