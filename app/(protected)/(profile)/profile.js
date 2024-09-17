import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
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
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserAllTeams } from "../../../services/team.service";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [overlay, setOverlay] = useState(true);
  const [currentUserId] = currentSession();
  const [otherUserId, setOtherUserId] = useState(null);
  const [teams, setTeams] = useState([]);
  const myRoute = useRoute();

  const editProfile = () => {
    router.navigate("edit-profile");
  };

  const totalAge = useMemo(() => {
    let age = "";
    if (profile?.dob && moment(new Date(profile?.dob)).isValid()) {
      age = moment().diff(moment(new Date(profile?.dob)), "year");
    }
    return age;
  }, [profile]);

  const navigation = useNavigation();

  useEffect(() => {
    if (otherUserId) {
      getUserAllTeams(otherUserId).then((response) => {
        setTeams(response?.data?.data);
      });
    }
  }, [otherUserId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleProfile();
    });
    handleProfile();

    return () => {
      unsubscribe();
    };
  }, [currentUserId]);

  const handleProfile = () => {
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
      setOverlay(true);
      if (isMine) {
        getMyProfile()
          .then((response) => {
            const profile = response?.data?.data;
            setProfile(profile);
            setOtherUserId(profile?.user?._id);
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
        setOtherUserId(userId);
        getOtherUserProfile(userId)
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
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <StatusBar barStyle={"dark-content"} />
        <ScreenHeader title={"User Profile"} />
        <Spinner visible={overlay} textContent={"Loading..."} textStyle={{}} />
        <ProfileImage
          uri={profile?.profilePicture}
          cover={profile?.coverPhoto}
          readOnly={true}
        />
        <View style={styles.editWrapper}>
          {currentUserId && otherUserId && otherUserId === currentUserId && (
            <Button style={styles.editBtn} onPress={editProfile}>
              Edit Profile
            </Button>
          )}
        </View>
        <View style={styles.otherInfo}>
          <Text style={styles.detailTitle}>Player Detail</Text>
          <View>
            <PlayerInfo title={"Name"} value={profile?.user?.name ?? ""} />
            <PlayerInfo
              title={"Age"}
              value={totalAge ? `${totalAge} Years` : ""}
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
                  <TeamTile title={team.title} logo={team.profilePicture} />
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
