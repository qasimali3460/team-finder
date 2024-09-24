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
import { Badge, Button, VStack } from "native-base";
import ScreenHeader from "../../../components/tiles/profile/ScreenHeader";
// import DiscussionWidget from "./DiscussionWidget";
import { useRoute } from "@react-navigation/native";
import {
  acceptMatchInvite,
  cancelMatchInvite,
  declineMatchInvite,
  getInviteMessages,
  getMessagesCount,
} from "../../../services/match.service";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

const MatchInviteDetail = () => {
  const myRoute = useRoute();
  const [count, setCount] = useState(0);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const {
    inviteId,
    teamName,
    profilePicture,
    coverPhoto,
    location,
    date,
    matchType,
    overs,
    sentByMe,
  } = myRoute.params;

  const goToChat = () => {
    router.navigate({ pathname: "invite-discussion", params: { inviteId } });
  };

  const cancelInvite = () => {
    Alert.alert("Confirm", "Confirm want to cancel invite ?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => onCancel?.() },
    ]);
  };

  const onCancel = () => {
    setCancelLoading(true);
    cancelMatchInvite(inviteId)
      .then((response) => {
        Toast.show({
          type: "successToast",
          text1: "Invite",
          text2: "Invite canceled successfully",
          position: "top",
        });
        router.back();
      })
      .catch((e) => {
        const errorMessage =
          e?.response?.data?.message ?? "Failed to cancel invite";
        if (errorMessage) {
          Toast.show({
            type: "errorToast",
            text1: "Invite error",
            text2: errorMessage,
            position: "top",
          });
        }
      })
      .finally(() => setCancelLoading(false));
  };

  const declineInvite = () => {
    Alert.alert("Confirm", "Confirm want to decline invite ?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => onDecline?.() },
    ]);
  };

  const onDecline = () => {
    setCancelLoading(true);
    declineMatchInvite(inviteId)
      .then((response) => {
        Toast.show({
          type: "successToast",
          text1: "Invite",
          text2: "Invite declined successfully",
          position: "top",
        });
        router.back();
      })
      .catch((e) => {
        const errorMessage =
          e?.response?.data?.message ?? "Failed to declient invite";
        if (errorMessage) {
          Toast.show({
            type: "errorToast",
            text1: "Invite error",
            text2: errorMessage,
            position: "top",
          });
        }
      })
      .finally(() => setCancelLoading(false));
  };

  const acceptInvite = () => {
    Alert.alert("Confirm", "Confirm want to accept invite ?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => onAccept?.() },
    ]);
  };

  const onAccept = () => {
    setAcceptLoading(true);
    acceptMatchInvite(inviteId)
      .then((response) => {
        Toast.show({
          type: "successToast",
          text1: "Invite",
          text2: "Invite accepted successfully. A match has been scheduled",
          position: "top",
        });
        router.back();
      })
      .catch((e) => {
        const errorMessage =
          e?.response?.data?.message ?? "Failed to accept invite";
        if (errorMessage) {
          Toast.show({
            type: "errorToast",
            text1: "Invite error",
            text2: errorMessage,
            position: "top",
          });
        }
      })
      .finally(() => setAcceptLoading(false));
  };

  useEffect(() => {
    getMessagesCount(inviteId).then((response) => {
      setCount(response?.data);
    });
  }, []);

  return (
    <View style={styles.outerWrapper}>
      <SafeAreaView style={styles.wrapper}>
        <ScreenHeader
          title="Invite Detail"
          doneIcon={
            <TouchableOpacity
              onPress={goToChat}
              style={{ position: "relative" }}
            >
              <AntDesign name="message1" size={24} />
              {count > 0 && (
                <View style={styles.badgeWrapper}>
                  <Text style={styles.badgeTxt}>{count}</Text>
                </View>
              )}
            </TouchableOpacity>
          }
          showDone={true}
        />
        <ScrollView>
          <View style={styles.profileWrapper}>
            <View style={styles.coverWrapper}>
              <Image source={{ uri: coverPhoto }} style={styles.cover} />
            </View>

            <View style={styles.picWrapper}>
              <Image source={{ uri: profilePicture }} style={styles.pic} />
            </View>
          </View>
          <View style={styles.otherInfo}>
            <View style={styles.detailWrapper}>
              <View style={styles.action}>
                {sentByMe == "true" ? (
                  <Button
                    size={"sm"}
                    variant={"solid"}
                    colorScheme={"secondary"}
                    isLoading={cancelLoading}
                    isLoadingText="Caneling"
                    onPress={cancelInvite}
                  >
                    Cancel
                  </Button>
                ) : (
                  <>
                    <Button
                      size={"sm"}
                      variant={"solid"}
                      colorScheme={"secondary"}
                      isLoading={cancelLoading}
                      isLoadingText="Rejecting"
                      onPress={declineInvite}
                    >
                      Decline
                    </Button>
                    <Button
                      size={"sm"}
                      variant={"solid"}
                      isLoading={acceptLoading}
                      isLoadingText="Accepting"
                      onPress={acceptInvite}
                    >
                      Accept
                    </Button>
                  </>
                )}
              </View>
            </View>
            <View>
              <PlayerInfo title={"Team Name"} value={teamName} />
              <PlayerInfo title={"Location"} value={location} />
              <PlayerInfo title={"Match Type"} value={matchType} />
              <PlayerInfo title={"Overs"} value={overs} />
              <PlayerInfo title={"Date"} value={date} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MatchInviteDetail;

const styles = StyleSheet.create({
  outerWrapper: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  profileWrapper: {
    height: 200,
    flex: 1,
    position: "relative",
  },
  coverWrapper: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "grey",
  },
  cover: {
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
    justifyContent: "flex-end",
  },
  action: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  badgeWrapper: {
    position: "absolute",
    backgroundColor: "#6f86d5",
    right: -10,
    paddingHorizontal: 5,
    borderRadius: 50,
  },
  badgeTxt: {
    color: "white",
    fontSize: RFValue(12),
  },
  picWrapper: {
    marginTop: -50,
    paddingLeft: 5,
    zIndex: 1,
    width: "50%",
  },
  pic: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: "grey",
  },
});
