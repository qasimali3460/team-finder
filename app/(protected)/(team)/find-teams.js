import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { getNearbyTeams } from "../../../services/team.service";
import Toast from "react-native-toast-message";
import { Icon, Input, Modal, StatusBar } from "native-base";
import ScreenHeader from "../../../components/tiles/profile/ScreenHeader";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons } from "@expo/vector-icons";
import TeamCard from "../../../components/cards/TeamCard";
import * as Location from "expo-location";
import { sendMatchInvite } from "../../../services/match.service";
import { SafeAreaView } from "react-native-safe-area-context";
import SendInvite from "../../../components/teams/SendInvite";
import RBSheet from "react-native-raw-bottom-sheet";

const FindTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [invite, setInvite] = useState(null);
  const [open, setOpen] = useState(false);
  const [team, setTeam] = useState(null);
  const [location, setLocation] = useState(null);
  const bottomSheetRef = useRef();
  const [search, setSearch] = useState();
  const [inviteLoading, setInviteLoading] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      getTeams();
    }
  }, [location, search]);

  const getTeams = () => {
    setLoading(true);
    getNearbyTeams(
      search,
      location?.coords?.longitude,
      location?.coords?.latitude
    )
      .then((response) => {
        setTeams(response?.data?.data ?? []);
      })
      .catch((e) => console.log("error big", e))
      .finally(() => setLoading(false));
  };

  const viewInvite = (invite) => {
    setInvite(invite);
    // setOpen(true);
    bottomSheetRef?.current?.open();
  };

  const handleSubmit = (date, type, overs, location, message) => {
    setInviteLoading(true);

    sendMatchInvite(invite._id, date, type, overs, location, message)
      .then((response) => {
        setOpen(false);
        bottomSheetRef?.current?.close();
        Toast.show({
          type: "successToast",
          text1: "Invite",
          text2: "Invite sent succesfully.",
          position: "top",
        });
        getTeams();
      })
      .catch((e) => {
        setOpen(false);
        bottomSheetRef?.current?.close();
        const errorMessage = e?.response?.data?.message ?? "Failed to register";
        if (errorMessage) {
          Toast.show({
            type: "errorToast",
            text1: "Register error",
            text2: errorMessage,
            position: "top",
          });
        }
      })
      .finally(() => setInviteLoading(false));
  };

  const sendInvite = () => {
    bottomSheetRef?.current?.open();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <ScreenHeader title="Find teams" />
      <View style={styles.searchWrapper}>
        <Input
          placeholder="Search Teams"
          width="100%"
          borderRadius="50"
          py="0"
          px="1"
          backgroundColor={"white"}
          fontSize="14"
          onChangeText={(text) => setSearch(text)}
          value={search}
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="search" />}
            />
          }
        />
      </View>
      <FlatList
        data={teams}
        renderItem={({ item }) => (
          <>
            <TeamCard sendInvite={() => viewInvite(item)} {...item} />
          </>
        )}
        keyExtractor={(item) => item.inviteId}
        contentContainerStyle={styles.list}
        numColumns={1}
        onRefresh={getTeams}
        refreshing={loading}
      />
      {/* <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Modal.Content maxWidth={"95%"} height={1000} maxHeight={"80%"}> */}

      <RBSheet
        RBSheet
        ref={bottomSheetRef}
        draggable
        dragOnContent
        height={600}
        // customStyles={{
        //   container: styles.sheetContainer,
        // }}
      >
        <SendInvite
          loading={inviteLoading}
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      </RBSheet>
      {/* </Modal.Content>
      </Modal> */}
    </SafeAreaView>
  );
};
export default FindTeams;

const styles = StyleSheet.create({
  detailWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  container: {
    paddingHorizontal: 8,
    flex: 1,
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
  searchWrapper: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});
