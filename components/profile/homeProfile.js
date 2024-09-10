import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { getMyProfile } from "../../services/user.service";
import { AntDesign } from "@expo/vector-icons";
import { deleteItemAsync } from "expo-secure-store";
import Toast from "react-native-toast-message";
import assets from "../../assets/assets";
import { ImageBackground } from "react-native-web";
import { defaultPlayerImage } from "../../constants/players.constant";
import { useToast } from "native-base";

const HomeProfile = ({ setTeamOnboarded }) => {
  const [profile, setProfile] = useState(null);
  const navigation = useNavigation();
  const toast = useToast();

  const handleProfile = () => {
    getMyProfile()
      .then((response) => {
        const profile = response?.data?.data;
        if (!profile.isOnboarded) {
          toast.show({
            description: "Update your profile",
          });
          router.navigate("edit-profile");
        }
        setTeamOnboarded(profile?.isTeamOnboarded ?? false);
        console.log("profile?.isTeamOnboarded: ", profile?.isTeamOnboarded);
        console.log("setTeamOnboarded: ", setTeamOnboarded);
        setProfile(profile);
      })
      .catch((e) => {
        console.log("e: ", e);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleProfile();
    });
    handleProfile();

    return () => {
      unsubscribe();
    };
  }, []);

  const goToProfile = () => {
    router.navigate("profile");
  };

  const logout = () => {
    deleteItemAsync("token");
    Toast.show({
      type: "errorToast",
      text1: "session expired",
      text2: "Please login again",
      position: "top",
    });
    router.navigate("(auth)/login");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.detail}>
        <Text style={styles.username}>{profile?.user?.name}</Text>
        <Text style={styles.email}>{profile?.user?.phoneNumber}</Text>
      </View>
      <View style={styles.profileLink}>
        <TouchableOpacity onPress={goToProfile} style={styles.picBtn}>
          <Image
            source={{ uri: profile?.profilePicture ?? defaultPlayerImage }}
            style={styles.pic}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <AntDesign name="logout" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: StatusBar.currentHeight + 20,
    left: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  email: {
    fontSize: 14,
    color: "#fff",
  },
  detail: {
    flex: 1,
  },
  profileLink: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  picBtn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "grey",
  },
  pic: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
