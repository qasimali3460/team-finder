import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { router } from "expo-router";
import { defaultPlayerImage } from "../../constants/players.constant";
import { Button } from "native-base";

const PendingInviteCard = ({
  teamName,
  profilePicture,
  message,
  inviteId,
  teamId,
  viewInvite,
}) => {
  const goToTeam = () => {
    router.navigate({ pathname: "team", params: { teamId } });
  };

  return (
    <TouchableOpacity onPress={goToTeam} style={styles.card}>
      <View style={styles.imgWrapper}>
        <Image
          source={{ uri: profilePicture ?? defaultPlayerImage }}
          style={styles.img}
        />
      </View>
      <View style={styles.detail}>
        <Text numberOfLines={1} style={styles.name}>
          {teamName}
        </Text>
        <Text numberOfLines={1} style={styles.role}>
          {message}
        </Text>
      </View>
      <View style={styles.cancelWrapper}>
        <Button onPress={() => viewInvite(inviteId)} size={"xs"}>
          View
        </Button>
      </View>
    </TouchableOpacity>
  );
};

export default PendingInviteCard;

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
  role: {
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
    borderWidth: 1,
    borderColor: "grey",
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
  cancel: {
    color: "#D40A0C",
  },
});
