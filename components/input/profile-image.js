import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const ProfileImage = ({
  uri,
  setUri,
  setImgFile,
  cover,
  setCover,
  setCoverFile,
  readOnly = true,
}) => {
  const defaultImage =
    "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";
  const openImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      console.log(result);

      const file = {
        uri: result?.assets[0].uri,
        type:
          Platform.OS == "android"
            ? result?.assets[0].mimeType
            : result?.assets[0].type,
        name: result?.assets[0].fileName,
        // size: result?.assets[0].fileSize
      };

      console.log("file now is: ", file);
      if (!result.cancelled) {
        setUri(result?.assets?.[0]?.uri);
        setImgFile(file);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const openCoverImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        height: 300,
      });

      const file = {
        uri: result?.assets[0].uri,
        type:
          Platform.OS == "android"
            ? result?.assets[0].mimeType
            : result?.assets[0].type,
        name: result?.assets[0].fileName,
        // size: result?.assets[0].fileSize
      };

      if (!result.cancelled) {
        setCover(result?.assets?.[0]?.uri);
        setCoverFile(file);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.imgOuter}>
      <View style={{ flex: 1 }}>
        <Image
          source={{
            uri: cover,
          }}
          style={styles.coverPhoto}
        />
        {!readOnly && (
          <TouchableOpacity
            onPress={openCoverImagePicker}
            style={[
              styles.cameraWrapper,
              { right: null, left: 10, bottom: 10 },
            ]}
          >
            <FontAwesome
              style={styles.imgUpdate}
              name="camera"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.profileWrapper}>
        <View style={styles.imgWrapper}>
          <View style={styles.imgInner}>
            <Image
              style={styles.img}
              source={{ uri: uri ? uri : defaultImage }}
            />
          </View>
          {!readOnly && (
            <TouchableOpacity
              onPress={openImagePicker}
              style={styles.cameraWrapper}
            >
              <FontAwesome
                style={styles.imgUpdate}
                name="camera"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  imgWrapper: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  img: {
    objectFit: "cover",
    width: 150,
    height: 150,
  },
  imgUpdate: {},
  imgInner: {
    flex: 1,
    overflow: "hidden",
    borderWidth: 2,
    borderRadius: 100,
    borderColor: "#e7e7e7",
    backgroundColor: "white",
  },
  cameraWrapper: {
    backgroundColor: "black",
    position: "absolute",
    padding: 10,
    borderRadius: 20,
    bottom: -10,
    right: 30,
    zIndex: 1,
  },
  imgOuter: {
    height: 200,
    backgroundColor: "grey",
  },
  coverPhoto: {
    width: "100%",
    height: 200,
  },
  profileWrapper: {
    position: "absolute",
    right: 0,
    bottom: -50,
  },
  updateCoverBtn: {
    position: "absolute",
    left: 0,
    bottom: 0,
  },
});
