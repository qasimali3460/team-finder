import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const DatePicker = ({ date, setDate }) => {
  const handleChange = (e, selectedDate) => {
    setDate(selectedDate);
  };
  const showDatePickerHandler = async () => {
    try {
      DateTimePickerAndroid.open({
        value: date,
        onChange: handleChange,
      });
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Enter your date of birth"
        value={date?.toDateString?.()}
        style={styles.input}
        editable={false}
      />
      <TouchableOpacity onPress={showDatePickerHandler} style={styles.icon}>
        <FontAwesome name="calendar" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: "black",
  },
  icon: {
    padding: 5,
  },
});
