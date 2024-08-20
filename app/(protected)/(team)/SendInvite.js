import { StyleSheet, Text, View, ScrollView, Platform } from "react-native";
import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Picker } from "@react-native-picker/picker";
import { Button, TextArea, TextField } from "native-base";
import DatePicker from "../../../components/input/datepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Sendinvite = ({ loading, onSubmit, onClose }) => {
  const [type, setType] = useState("Tape ball");
  const [overs, setOvers] = useState(20);
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(new Date());

  const submit = () => {
    onSubmit(date, type, overs, location, message);
  };

  return (
    <ScrollView style={styles.wrapper}>
      <KeyboardAwareScrollView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.headerWrapper}>
          <Text style={styles.headerTitle}>Send Invite</Text>
        </View>
        <View>
          <View style={[styles.fieldWrapper]}>
            <Text style={styles.fieldTitle}>Match date</Text>
            <DatePicker date={date} setDate={setDate} />
          </View>
          <View style={[styles.fieldWrapper, { paddingTop: 20 }]}>
            <Text style={styles.fieldTitle}>Overs</Text>
            <TextField
              value={String(overs)}
              onChangeText={(value) => setOvers(value)}
              placeholder="Enter overs"
              name="overs"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldTitle}>Location</Text>
            <TextField
              value={location}
              onChangeText={(value) => setLocation(value)}
              placeholder="Enter ground location"
              name="overs"
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.fieldWrapper]}>
            <Text style={styles.fieldTitle}>Match Type</Text>

            <Picker
              selectedValue={type}
              onValueChange={(itemValue) => setType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label={"Tape ball"} value={"Tape ball"} />
              <Picker.Item label={"Hard ball"} value={"Hard ball"} />
            </Picker>
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldTitle}>Message</Text>

            <TextArea
              h={20}
              placeholder="Say something "
              value={message}
              onChangeText={setMessage}
            />
          </View>

          <View style={styles.btnWrapper}>
            <Button
              colorScheme={"secondary"}
              style={{ flex: 1 }}
              onPres={onClose}
            >
              Close
            </Button>
            <Button
              onPress={submit}
              isLoading={loading}
              disabled={loading || !date || !location || !overs}
              isLoadingText="Please Wait"
              style={{ flex: 1 }}
            >
              Send
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default Sendinvite;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
  },
  headerWrapper: {
    alignItems: "center",
    paddingTop: 15,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: RFValue(18),
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
  btnWrapper: {
    flexDirection: "row",
    paddingTop: 20,
    gap: 10,
  },
});
