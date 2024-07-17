import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const ProfileImage = ({ uri, setUri }) => {
  const defaultImage =
    "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";
  const openImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        height: 300,
      });

      if (!result.cancelled) {
        setUri(result?.assets?.[0]?.uri);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.imgWrapper}>
      <View style={styles.imgInner}>
        <Image style={styles.img} source={{ uri: uri ? uri : defaultImage }} />
      </View>
      <TouchableOpacity onPress={openImagePicker} style={styles.cameraWrapper}>
        <FontAwesome
          style={styles.imgUpdate}
          name="camera"
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  imgWrapper: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  img: {
    objectFit: "cover",
    width: 200,
    height: 200,
  },
  imgUpdate: {},
  imgInner: {
    flex: 1,
    overflow: "hidden",
    borderWidth: 2,
    borderRadius: 100,
    borderColor: "#e7e7e7",
  },
  cameraWrapper: {
    backgroundColor: "black",
    position: "absolute",
    padding: 10,
    borderRadius: 20,
    bottom: 0,
    right: 30,
    zIndex: 1,
  },
});
