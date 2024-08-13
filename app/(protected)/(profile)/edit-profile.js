import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Button, ScrollView, StatusBar, TextField } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";
import {
  battingStyles,
  bowlingStyles,
  preferredRoles,
} from "../../../constants/players.constant";
import DatePicker from "../../../components/input/datepicker";
import ProfileImage from "../../../components/input/profile-image";
import ScreenHeader from "../../../components/tiles/profile/ScreenHeader";
import { getMyProfile, updateMyProfile } from "../../../services/user.service";
import Toast from "react-native-toast-message";
import Spinner from "react-native-loading-spinner-overlay";

const EditProfile = () => {
  const [img, setImg] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [cover, setCover] = useState("");
  const [coverFile, setCoverFile] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [battingStyle, setBattingStyle] = useState("");
  const [bowlingStyle, setBowlingStyle] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const updateUser = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("prefferedRole", role);
    formData.append("battingStyle", battingStyle);
    formData.append("bowlingStyle", bowlingStyle);
    formData.append("dob", new Date(dateOfBirth).toLocaleString());
    if (imgFile) {
      formData.append("profilePicture", imgFile);
    }
    if (coverFile) {
      formData.append("coverPhoto", coverFile);
    }

    // formData.append("coverPhoto", cover);
    setLoading(true);
    updateMyProfile(formData)
      .then((response) => {
        Toast.show({
          type: "successToast",
          text1: "Profile",
          text2: "Profile updated succesfully.",
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
            text1: "Profile update error",
            text2: errorMessage,
            position: "top",
          });
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setOverlay(true);
    getMyProfile()
      .then((response) => {
        const profile = response?.data?.data;
        setName(profile?.user?.name);
        setLocation(profile?.location);
        setRole(profile?.prefferedRole);
        setBowlingStyle(profile?.bowlingStyle);
        setBattingStyle(profile?.battingStyle);
        setImg(profile?.profilePicture);
        setDateOfBirth(new Date(profile?.dob));
        setCover(profile?.coverPhoto);
      })
      .finally(() => setOverlay(false));
  }, []);

  return (
    <ScrollView style={styles.wrapper}>
      <Spinner visible={overlay} textContent={"Loading..."} textStyle={{}} />
      <SafeAreaView style={{ backgroundColor: "white" }}>
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
              placeholder="Enter your name"
              name="name"
            />
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldTitle}>Location</Text>
            <TextField
              value={location}
              onChangeText={(value) => setLocation(value)}
              placeholder="Enter your location"
              name="location"
            />
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldTitle}>Date Of Birth</Text>
            <DatePicker date={dateOfBirth} setDate={setDateOfBirth} />
          </View>
          <View style={[styles.fieldWrapper, { paddingTop: 10 }]}>
            <Text style={styles.fieldTitle}>Prefferred Role</Text>
            <Picker
              selectedValue={role}
              onValueChange={(itemValue) => setRole(itemValue)}
              style={styles.picker}
            >
              {preferredRoles.map((role) => (
                <Picker.Item label={role} value={role} />
              ))}
            </Picker>
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldTitle}>Batting Style</Text>
            <Picker
              selectedValue={battingStyle}
              onValueChange={(itemValue, itemIndex) =>
                setBattingStyle(itemValue)
              }
              style={styles.picker}
            >
              {battingStyles.map((role) => (
                <Picker.Item label={role} value={role} />
              ))}
            </Picker>
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldTitle}>Bowling Style</Text>
            <Picker
              selectedValue={bowlingStyle}
              onValueChange={(itemValue, itemIndex) =>
                setBowlingStyle(itemValue)
              }
              style={styles.picker}
            >
              {bowlingStyles.map((role) => (
                <Picker.Item label={role} value={role} />
              ))}
            </Picker>
          </View>
          <View style={styles.fieldWrapper}>
            <Button
              onPress={updateUser}
              isLoading={loading}
              disabled={loading}
              isLoadingText="Please Wait"
            >
              Updates Profile
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default EditProfile;

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
