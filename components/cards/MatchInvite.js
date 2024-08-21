import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { router } from "expo-router";
import moment from "moment";

const MatchInviteCard = ({
  teamName,
  location,
  matchDate,
  profilePicture,
  _id,
  matchType,
  overs,
}) => {
  const date = useMemo(() => {
    return moment(matchDate ?? new Date()).format("MMMM Do YYYY");
  }, [matchDate]);

  const goToProfile = () => {
    router.navigate("team");
  };

  const goToInvite = () => {
    router.navigate({
      pathname: "match-invite-detail",
      params: {
        inviteId: _id,
        teamName,
        location,
        date,
        profilePicture,
        matchType,
        overs,
      },
    });
  };

  const cancelInvite = () => {};

  return (
    <View onPress={goToProfile} style={styles.card}>
      <View style={styles.imgWrapper}>
        <TouchableOpacity onPress={goToProfile}>
          <Image source={{ uri: profilePicture }} style={styles.img} />
        </TouchableOpacity>
      </View>
      <View style={styles.detail}>
        <TouchableOpacity onPress={goToProfile}>
          <Text style={styles.name} numberOfLines={1}>
            {teamName}
          </Text>
        </TouchableOpacity>
        <Text style={styles.locatioin} numberOfLines={1}>
          {location}
        </Text>
        <Text style={styles.location}>{date}</Text>
      </View>
      <View style={styles.cancelWrapper}>
        <TouchableOpacity onPress={goToInvite}>
          <Text style={styles.view}>{"View >"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MatchInviteCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    margin: 4,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    overflow: "hidden",
    height: RFValue(80),
    paddingHorizontal: 10,
  },
  name: {
    fontSize: RFValue(20),
    fontWeight: "bold",
  },
  location: {
    fontSize: RFValue(14),
    color: "#888",
  },
  imgWrapper: {
    width: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 50,
    height: 50,
    objectFit: "cover",
    borderRadius: 50,
  },
  detail: {
    padding: 10,
    flex: 3,
    justifyContent: "center",
  },
  cancelWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  view: {
    color: "green",
  },
});
