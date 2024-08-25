import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  Button,
  ScrollView,
  StatusBar,
  TextArea,
  TextField,
} from "native-base";
import { RFValue } from "react-native-responsive-fontsize";
import { teamTypes } from "../../../constants/players.constant";
import ProfileImage from "../../../components/input/profile-image";
import ScreenHeader from "../../../components/tiles/profile/ScreenHeader";
import Toast from "react-native-toast-message";
import Spinner from "react-native-loading-spinner-overlay";
import { getMyTeam, updateMyTeam } from "../../../services/team.service";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";

const EditTeam = () => {
  const [img, setImg] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [cover, setCover] = useState("");
  const [coverFile, setCoverFile] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [teamType, setTeamType] = useState("Tape ball");
  const [loading, setLoading] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const updateTeam = async () => {
    const formData = new FormData();
    formData.append("teamName", name);
    formData.append("address", address);
    formData.append("description", description);
    formData.append("teamType", teamType);

    if (imgFile) {
      formData.append("profilePicture", imgFile);
    }
    if (coverFile) {
      formData.append("coverPhoto", coverFile);
    }
    if (location?.coords?.longitude) {
      formData.append("longitude", location?.coords?.longitude);
    }
    if (location?.coords?.latitude) {
      formData.append("latitude", location?.coords?.latitude);
    }

    setLoading(true);
    updateMyTeam(formData)
      .then((response) => {
        Toast.show({
          type: "successToast",
          text1: "Team",
          text2: "Team updated succesfully.",
          position: "top",
        });
      })
      .catch((e) => {
        console.log("e: ", e);
        const errorMessage =
          e?.response?.data?.message || e?.response?.data || "Failed to update";
        if (errorMessage) {
          Toast.show({
            type: "errorToast",
            text1: "Team update error",
            text2: errorMessage,
            position: "top",
          });
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setOverlay(true);
    getMyTeam()
      .then((response) => {
        console.log("response: ", response?.data?.data);
        const team = response?.data?.data;
        setName(team?.teamName);
        setAddress(team?.address);
        setTeamType(team?.teamType);
        setCover(team?.coverPhoto);
        setImg(team?.profilePicture);
        setDescription(team?.description);
      })
      .finally(() => setOverlay(false));
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView style={styles.wrapper}>
        <Spinner visible={overlay} textContent={"Loading..."} textStyle={{}} />
        <StatusBar barStyle={"dark-content"} />
        <ScreenHeader title={"Edit Profile"} />
        <ProfileImage
          uri={img}
          setUri={setImg}
          cover={cover}
          setCover={setCover}
          setImgFile={setImgFile}
          setCoverFile={setCoverFile}
          readOnly={false}
        />
        <View style={styles.inputWrapper}>
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldTitle}>Name</Text>
            <TextField
              value={name}
              onChangeText={(value) => setName(value)}
              placeholder="Enter team name"
              name="name"
            />
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldTitle}>Description</Text>
            <TextArea
              h={20}
              placeholder="Tell us about your team"
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldTitle}>Address</Text>
            <TextField
              value={address}
              onChangeText={(value) => setAddress(value)}
              placeholder="Enter your team address"
              name="address"
            />
          </View>

          <View style={[styles.fieldWrapper, { paddingTop: 10 }]}>
            <Text style={styles.fieldTitle}>Team Type</Text>
            <Picker
              selectedValue={teamType}
              onValueChange={(itemValue) => setTeamType(itemValue)}
              style={styles.picker}
            >
              {teamTypes.map((type) => (
                <Picker.Item label={type} value={type} />
              ))}
            </Picker>
          </View>
          <View style={[styles.fieldWrapper, { marginTop: 20 }]}>
            <Button
              onPress={updateTeam}
              isLoading={loading}
              disabled={loading}
              isLoadingText="Please Wait"
            >
              Updates Team
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditTeam;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  inputWrapper: {
    marginTop: 50,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  fieldTitle: {
    fontSize: RFValue(15),
    fontWeight: "500",
    marginBottom: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
  },
  fieldWrapper: {},
});
