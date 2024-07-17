import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { ScrollView, StatusBar, TextField } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";
import { preferredRoles } from "../../../constants/Players";
import DatePicker from "../../../components/input/datepicker";
import ProfileImage from "../../../components/input/profile-image";
import ScreenHeader from "../../../components/tiles/profile/ScreenHeader";

const EditProfile = () => {
  const [img, setImg] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  return (
    <ScrollView style={styles.wrappper}>
      <SafeAreaView>
        <StatusBar barStyle={"dark-content"} />
        <ScreenHeader />
        <View style={styles.imgOuter}>
          <ProfileImage uri={img} setUri={setImg} />
        </View>
        <View style={styles.inputWrapper}>
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldTitle}>Name</Text>
            <TextField placeholder="Enter your name" name="name" />
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldTitle}>Location</Text>
            <TextField placeholder="Enter your location" name="location" />
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldTitle}>Date Of Birth</Text>
            <DatePicker date={dateOfBirth} setDate={setDateOfBirth} />
          </View>
          <View style={[styles.fieldWrapper, { paddingTop: 10 }]}>
            <Text style={styles.fieldTitle}>Prefferred Role</Text>
            <Picker
              selectedValue={"java"}
              onValueChange={(itemValue, itemIndex) => {}}
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
              selectedValue={"java"}
              onValueChange={(itemValue, itemIndex) => {}}
              style={styles.picker}
            >
              {preferredRoles.map((role) => (
                <Picker.Item label={role} value={role} />
              ))}
            </Picker>
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldTitle}>Bowling Style</Text>
            <Picker
              selectedValue={"java"}
              onValueChange={(itemValue, itemIndex) => {}}
              style={styles.picker}
            >
              {preferredRoles.map((role) => (
                <Picker.Item label={role} value={role} />
              ))}
            </Picker>
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
  imgOuter: {
    height: 300,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  inputWrapper: {
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
});
