import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import assets from "../../assets/assets";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { RFValue } from "react-native-responsive-fontsize";
import HomeProfile from "../../components/profile/homeProfile";

const tiles = [
  {
    name: "Find Team",
    icon: assets.search,
    path: "find-teams",
    colors: ["hsla(159, 82%, 55%, 1)", "hsla(206, 98%, 48%, 1)"],
    team: true,
  },
  {
    name: "Matches",
    icon: assets.matches,
    path: "matches",
    colors: ["hsla(318, 44%, 51%, 1)", "hsla(347, 94%, 48%, 1)"],
  },
  {
    name: "My Team",
    icon: assets.cricket,
    path: "team",
    colors: ["hsla(318, 44%, 51%, 1)", "hsla(347, 94%, 48%, 1)"],
  },
  {
    name: "Team Members",
    icon: assets.teamMembers,
    path: "team-members",
    colors: ["hsla(270, 94%, 25%, 1)", "hsla(158, 94%, 49%, 1)"],
    team: true,
  },
  {
    name: "Match Invites",
    icon: assets.invites,
    path: "match-invites",
    colors: ["hsla(52, 43%, 55%, 1)", "hsla(51, 33%, 75%, 1)"],
    team: true,
  },
  {
    name: "My Invites",
    icon: assets.invites,
    path: "my-invites",
    colors: ["hsla(52, 43%, 55%, 1)", "hsla(51, 33%, 75%, 1)"],
  },
];

const handlePress = (path) => {
  router.navigate(path);
};

const HomeScreen = () => {
  const [teamOnboarded, setTeamOnboarded] = useState(true);

  return (
    <View style={styles.container}>
      <Image source={assets.home} style={styles.backgroundImage} />
      <HomeProfile setTeamOnboarded={setTeamOnboarded} />
      <View style={styles.logoContainer}>
        <Image source={assets.logo1} style={styles.logo} />
      </View>

      <View style={styles.tilesContainer}>
        {tiles.map((tile, index) => {
          const isDisabled = tile.team && !teamOnboarded;
          return (
            <TouchableOpacity
              onPress={() => handlePress(tile.path)}
              key={index}
              style={[styles.tile, { opacity: isDisabled ? 0.3 : 1 }]}
              disabled={isDisabled}
            >
              <LinearGradient
                colors={tile.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.iconWrapper}
              >
                <Image source={tile.icon} style={styles.tileIcon} />
              </LinearGradient>
              <Text style={styles.tileText}>
                {tile.name}
                {isDisabled}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    position: "absolute",
    top: 100,
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 50,
    objectFit: "contain",
  },
  tilesContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    alignContent: "flex-end",
    flex: 1,
    paddingBottom: 100,
  },
  tile: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    marginBottom: 20,
  },
  iconWrapper: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 60,
    height: 60,
    padding: 10,
  },
  tileIcon: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  tileText: {
    fontSize: RFValue(14),
    color: "#fff",
    paddingTop: 5,
    fontWeight: "500",
  },
});

export default HomeScreen;
