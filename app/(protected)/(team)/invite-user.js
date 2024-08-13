import { Button, KeyboardAvoidingView, TextArea } from "native-base";
import { useState } from "react";
import { TextInput, View, StyleSheet, Text, Keyboard } from "react-native";
import { sendInvite } from "../../../services/team.service";
import Toast from "react-native-toast-message";

const InviteUser = ({ closeDialog }) => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendInvite = () => {
    Keyboard.dismiss();

    setLoading(true);
    sendInvite(phone, message)
      .then(() => {
        closeDialog?.();
        Toast.show({
          type: "successToast",
          text1: "Invite",
          text2: "Invite sent successfully",
          position: "top",
        });
        setPhone("");
        setMessage("");
      })
      .catch((e) => {
        closeDialog?.();
        const errorMessage =
          e?.response?.data?.message ?? "Failed to send invite";
        if (errorMessage) {
          Toast.show({
            type: "errorToast",
            text1: "Invite error",
            text2: errorMessage,
            position: "top",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Invite User</Text>
      </View>
      <KeyboardAvoidingView>
        <TextInput
          style={styles.input}
          placeholder="Enter phone"
          keyboardType="number-pad"
          autoCapitalize="none"
          value={phone}
          onChangeText={setPhone}
        />
        <TextArea
          h={20}
          placeholder="Say something "
          value={message}
          onChangeText={setMessage}
        />
        <Button
          title="Send Invite"
          onPress={handleSendInvite}
          style={styles.inviteBtn}
          isLoading={loading}
          isLoadingText="Please wait"
          disabled={!phone || !message || loading}
        >
          Send Invites
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
};

export default InviteUser;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 20,
  },
  inviteBtn: {
    marginTop: 20,
  },
  container: { padding: 20 },
  titleWrapper: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
