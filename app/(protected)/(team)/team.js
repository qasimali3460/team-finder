import {
  Alert,
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
import { getMyProfile } from "../../../services/user.service";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";
import { currentSession } from "../../../hooks/hooks";
import ProfileImage from "../../../components/input/profile-image";
import ScreenHeader from "../../../components/tiles/profile/ScreenHeader";
import { Button } from "native-base";
import { getMyTeam, getOtherTeamDetail } from "../../../services/team.service";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import UpcomingMatches from "./Upcoming";
import { useToast } from "native-base";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [overlay, setOverlay] = useState(false);
  const [currentUserId] = currentSession();
  const myRoute = useRoute();
  const navigation = useNavigation();
  const [currentTeamId, setCurrentTeamId] = useState(null);
  const toast = useToast();

  const editTeam = () => {
    router.navigate("edit-team");
  };

  const fetchTeam = () => {
    let teamId = null;
    if (myRoute.params.teamId) {
      teamId = myRoute.params.teamId;
    }
    setOverlay(true);
    if (!teamId) {
      getMyTeam()
        .then((response) => {
          const profile = response?.data?.data;
          if (!response?.data?.isTeamOnboarded) {
            toast.show({ description: "Add Team first" });
            editTeam();
          }
          setProfile(profile);
          setCurrentTeamId(profile?._id);
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
    } else {
      getOtherTeamDetail(teamId)
        .then((response) => {
          const profile = response?.data?.data;
          setProfile(profile);
          setCurrentTeamId(profile._id);
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
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchTeam();
    });
    fetchTeam();

    return () => {
      unsubscribe();
    };
  }, [currentUserId]);

  return (
    <SafeAreaView>
      <ScrollView style={{ paddingBottom: 50 }}>
        <StatusBar barStyle={"dark-content"} />
        <ScreenHeader title={"Team Detail"} />
        <Spinner visible={overlay} textContent={"Loading..."} textStyle={{}} />
        <ProfileImage
          uri={profile?.profilePicture}
          cover={profile?.coverPhoto}
          readOnly={true}
        />
        <View style={styles.editWrapper}>
          {profile?.user?._id === currentUserId && (
            <Button style={styles.editBtn} onPress={editTeam}>
              Edit Team
            </Button>
          )}
        </View>
        <View style={styles.otherInfo}>
          <Text style={styles.detailTitle}>Team Detail</Text>
          <View>
            <PlayerInfo title={"Team name"} value={profile?.teamName} />
            <PlayerInfo title={"Description"} value={profile?.description} />
            <PlayerInfo title={"Address"} value={profile?.address} />
            <PlayerInfo title={"Team type"} value={profile?.teamType} />
          </View>
        </View>
        <View style={[styles.otherInfo, { marginTop: 20 }]}>
          <Text style={styles.detailTitle}>Upcoming Matches</Text>
          <View style={styles.teamsSection}>
            {currentTeamId && <UpcomingMatches teamId={currentTeamId} />}
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
