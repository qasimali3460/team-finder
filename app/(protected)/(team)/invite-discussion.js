import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
  Alert,
} from "react-native";
import assets from "../../../assets/assets";
import { RFValue } from "react-native-responsive-fontsize";
import { getInviteMessages } from "../../../services/match.service";
import { getSocket } from "../../../hooks/hooks";
import { Icon, Input, StatusBar, TextField } from "native-base";
import EmojiPicker from "rn-emoji-keyboard";
import { useRoute } from "@react-navigation/native";
import ScreenHeader from "../../../components/tiles/profile/ScreenHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const DiscussionWidget = () => {
  const [socket] = getSocket();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [inviteId, setInviteId] = useState(null);
  const flatListRef = useRef();
  const myRouter = useRoute();

  useEffect(() => {
    const { inviteId } = myRouter.params;
    if (inviteId) {
      setInviteId(inviteId);
      getInviteMessages(inviteId).then((response) => {
        setComments(response?.data);
      });
    }
  }, []);

  useEffect(() => {
    if (socket && inviteId && !done) {
      setDone(true);
      socket.emit("joinRoom", { matchInvitationId: inviteId });

      socket.on("chatMessage", (response) => {
        if (response?.message) {
          setComments((prevValue) => [...prevValue, response?.message]);
        }
      });
    }
  }, [socket, inviteId, comments, done]);

  // Scroll to the end when the keyboard is opened
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setTimeout(() => {
          flatListRef.current.scrollToEnd({ animated: true });
        }, 500);
      }
    );

    return () => {
      keyboardDidShowListener.remove(); // Cleanup the listener on unmount
    };
  }, []);

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setNewComment("");
      socket.emit(
        "chatMessage",
        {
          message: newComment,
          matchInvitationId: inviteId,
        },
        (response) => {
          if (response?.message) {
            setComments([...comments, response?.message]);
          }
        }
      );
    }
  };

  const onEmojiSelect = (emoji) => {
    setNewComment(newComment + emoji?.emoji);
  };

  const renderComment = ({ item }) => {
    const isMine = item.myMessage ?? false;
    return (
      <View
        style={[
          styles.commentItem,
          isMine ? styles.myComment : styles.otherComment,
        ]}
      >
        {!isMine && (
          <Image
            source={{ uri: item.fromTeamProfilePicture }}
            style={styles.avatar}
          />
        )}
        <View style={styles.commentTextWrapper}>
          <Text style={styles.commentText}>{item.message}</Text>
        </View>
        {isMine && (
          <Image
            source={{ uri: item.fromTeamProfilePicture }}
            style={styles.avatar}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.wrapper}>
        <StatusBar barStyle={"dark-content"} />
        <ScreenHeader title="Invite Discussion" />

        <View style={styles.commentSection}>
          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={(item) => item._id.toString()}
            contentContainerStyle={styles.commentList}
            onContentSizeChange={() => {
              if (comments.length > 0) {
                flatListRef.current.scrollToEnd({ animated: true });
              }
            }}
            ref={flatListRef}
          />
        </View>

        <View style={styles.commentInputWrapper}>
          <EmojiPicker
            onEmojiSelected={onEmojiSelect}
            open={open}
            onClose={() => setOpen(false)}
          />
          <Input
            borderRadius={50}
            placeholder="Start typing..."
            flex={1}
            onEndEditing={() => {
              handleAddComment();
            }}
            onFocus={() => {
              setTimeout(() => {
                flatListRef.current.scrollToEnd({ animated: true });
              }, 500);
            }}
            InputLeftElement={
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Icon
                  as={<MaterialIcons name="emoji-emotions" />}
                  size={6}
                  ml="2"
                  color="muted.300"
                />
              </TouchableOpacity>
            }
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity
            onPress={handleAddComment}
            style={styles.sendButton}
          >
            <MaterialIcons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DiscussionWidget;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  titleWrapper: {
    alignItems: "center",
  },
  detailTitle: {
    fontSize: RFValue(20),
    fontWeight: "bold",
  },
  commentSection: {
    flex: 1,
    paddingHorizontal: 10,
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
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  commentInput: {
    flex: 1,
  },
  sendButton: {
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
    backgroundColor: "#007bff",
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
