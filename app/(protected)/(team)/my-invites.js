import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  acceptInvite,
  cancelInvite,
  getMyInvites,
  getSentInvites,
} from "../../../services/team.service";
import Toast from "react-native-toast-message";
import { Button, Modal, StatusBar } from "native-base";
import ScreenHeader from "../../../components/tiles/profile/ScreenHeader";
import PendingInviteCard from "../../../components/cards/PendingInvite";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";

const Players = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [invite, setInvite] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getInvites();
  }, []);

  const getInvites = () => {
    setLoading(true);
    getMyInvites()
      .then((response) => {
        setInvites(response?.data?.invites ?? []);
      })
      .finally(() => setLoading(false));
  };

  const handleAcceptInvite = (inviteId) => {
    setOpen(false);
    acceptInvite(inviteId)
      .then(() => {
        Toast.show({
          type: "successToast",
          text1: "Invite",
          text2: "Invite accepted succesfully",
          position: "top",
        });
      })
      .finally(() => {
        getInvites();
      });
  };

  const handleCancelInvite = (inviteId) => {
    setOpen(false);
    cancelInvite(inviteId)
      .then(() => {
        Toast.show({
          type: "successToast",
          text1: "Invite",
          text2: "Invite canceled succesfully",
          position: "top",
        });
      })
      .finally(() => {
        getInvites();
      });
  };

  const viewInvite = (invite) => {
    setInvite(invite);
    setOpen(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <ScreenHeader title="My Invites" />
      <FlatList
        data={invites}
        renderItem={({ item }) => (
          <PendingInviteCard viewInvite={() => viewInvite(item)} {...item} />
        )}
        keyExtractor={(item) => item.inviteId}
        contentContainerStyle={styles.list}
        numColumns={1}
        onRefresh={getInvites}
        refreshing={loading}
      />
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Modal.Content maxWidth={"95%"} height={1000} maxHeight={"80%"}>
          <View style={styles.closeWrapper}>
            <View style={{ flex: 2, alignItems: "flex-end" }}>
              <Text style={{ fontSize: RFValue(14), fontWeight: "bold" }}>
                Invite detail
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.detailWrapper}>
            <View style={styles.logoWrapper}>
              <Image
                source={{ uri: invite?.profilePicture }}
                style={styles.teamlogo}
              />
            </View>
            <View style={styles.teamNameWrapper}>
              <Text style={styles.teamName}>{invite?.teamName}</Text>
            </View>
            <ScrollView style={styles.messageWrapper}>
              <Text style={styles.message}>{invite?.message}</Text>
            </ScrollView>
            <View style={styles.btnGroup}>
              <Button
                style={styles.btn}
                onPress={() => handleAcceptInvite(invite?.inviteId)}
              >
                Accept
              </Button>
              <Button
                style={styles.btn}
                colorScheme={"secondary"}
                onPress={() => handleCancelInvite(invite?.inviteId)}
              >
                Reject
              </Button>
            </View>
          </View>
        </Modal.Content>
      </Modal>
    </View>
  );
};
export default Players;

const styles = StyleSheet.create({
  detailWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  closeWrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: "row",
  },
  logoWrapper: {
    alignItems: "center",
  },
  teamlogo: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    borderRadius: 100,
  },
  teamNameWrapper: {
    alignItems: "center",
  },
  teamName: {
    fontSize: RFValue(20),
    textAlign: "center",
  },
  message: {
    fontSize: RFValue(12),
    fontWeight: "400",
    color: "#606060",
  },
  messageWrapper: {
    marginBottom: 50,
    marginTop: 40,
  },
  btnGroup: {
    flexDirection: "row",
    gap: 20,
  },
  btn: {
    flex: 1,
  },
});
