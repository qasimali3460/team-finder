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
import { Button, ChevronRightIcon } from "native-base";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const TeamCard = ({
  teamName,
  profilePicture,
  address,
  distance,
  _id,
  sendInvite,
}) => {
  const goToTeam = () => {
    router.navigate({ pathname: "team", params: { teamId: _id } });
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
        <View style={styles.nameWrapper}>
          <Text numberOfLines={1} style={styles.name}>
            {teamName}
          </Text>
          <Image
            source={{ uri: profilePicture ?? defaultPlayerImage }}
            style={styles.logo}
          />
        </View>
        <Text numberOfLines={1} style={styles.location}>
          <Ionicons size={12} name="location" /> {address}
        </Text>
        <Text numberOfLines={1} style={styles.location}>
          <MaterialCommunityIcons size={12} name="map-marker-distance" />{" "}
          {Math.round(distance)} miles away
        </Text>
      </View>
      <View style={styles.cancelWrapper}>
        <Button
          variant="ghost"
          onPress={() => sendInvite()}
          size={"sm"}
          colorScheme={"secondary"}
        >
          Invite
        </Button>
      </View>
    </TouchableOpacity>
  );
};

export default TeamCard;

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
    paddingRight: 5,
  },
  name: {
    fontSize: RFValue(15),
    fontWeight: "bold",
  },
  location: {
    fontSize: RFValue(12),
    color: "#888",
  },
  imgWrapper: {
    width: 80,
    overflow: "hidden",
  },
  img: {
    flex: 1,
    objectFit: "cover",
  },
  nameWrapper: {
    flexDirection: "row",
    gap: 5,
  },
  logo: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 30,
    objectFit: "cover",
  },
  detail: {
    paddingHorizontal: 10,
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
  wrapper: {
    flex: 1,
  },
  detailOuter: {
    flexDirection: "row",
  },
  viewContainer: {
    height: 10,
    alignItems: "flex-end",
    flex: 1,
    paddingRight: 10,
  },
});
