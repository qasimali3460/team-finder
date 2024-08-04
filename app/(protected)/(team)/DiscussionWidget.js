import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import assets from "../../../assets/assets";
import { RFValue } from "react-native-responsive-fontsize";

const DiscussionWidget = () => {
  const [comments, setComments] = useState([
    {
      text: "Hello",
      id: 1,
      isMine: true,
    },
    {
      text: "Hello",
      id: 2,
      isMine: false,
    },
    {
      text: "Hello",
      id: 3,
      isMine: true,
    },
    {
      text: "Yar agr ap log available ho iss date pr to a jana hm bi free ha iss din match khylny k liya",
      id: 4,
      isMine: true,
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([
        ...comments,
        { id: Date.now(), text: newComment, isMine: true },
      ]);
      setNewComment("");
    }
  };

  const renderComment = ({ item }) => {
    const isMine = item.isMine; // Assuming there's a flag to identify if the comment is mine
    return (
      <View
        style={[
          styles.commentItem,
          isMine ? styles.myComment : styles.otherComment,
        ]}
      >
        {!isMine && <Image source={assets.illustr1} style={styles.avatar} />}
        <View style={styles.commentTextWrapper}>
          <Text style={styles.commentText}>{item.text}</Text>
        </View>
        {isMine && <Image source={assets.background1} style={styles.avatar} />}
      </View>
    );
  };

  return (
    <>
      <View style={styles.titleWrapper}>
        <Text style={styles.detailTitle}>Discussion</Text>
      </View>
      <View style={styles.commentSection}>
        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.commentList}
        />
      </View>
      <View style={styles.commentInputWrapper}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity onPress={handleAddComment} style={styles.sendButton}>
          <AntDesign name="arrowright" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DiscussionWidget;

const styles = StyleSheet.create({
  titleWrapper: {
    alignItems: "center",
  },
  detailTitle: {
    fontSize: RFValue(20),
    fontWeight: "bold",
  },
  commentSection: {
    marginTop: 10,
    minHeight: 300,
  },
  commentList: {
    paddingBottom: 20,
  },
  commentItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  commentInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
  },
  sendButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  commentItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,
  },
  myComment: {
    backgroundColor: "#e1ffc7",
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  otherComment: {
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  commentTextWrapper: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
  },
  commentText: {
    fontSize: 14,
  },
});
