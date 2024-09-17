import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const PasswordInput = ({
  password,
  setPassword,
  style = {},
  placeholder = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input]}
        value={password}
        placeholder={placeholder}
        secureTextEntry={!showPassword} // Hides the password when false
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={styles.icon}
        onPress={() => setShowPassword(!showPassword)}
      >
        <MaterialIcons
          name={showPassword ? "visibility" : "visibility-off"}
          size={24}
          color="#ccc"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,

    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 20,
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    border: "none",
    borderWidth: 0,
  },
});

export default PasswordInput;
