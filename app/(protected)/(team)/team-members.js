import * as React from "react";
import { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  Pressable,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { Box, useColorModeValue } from "native-base";
import ScreenHeader from "../../../components/tiles/profile/ScreenHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import Players from "../../../components/teams/Players";
import { FontAwesome } from "@expo/vector-icons";
import InviteUser from "./invite-user";
import RBSheet from "react-native-raw-bottom-sheet";
import TeamMembersContext from "../../../hooks/teamMembers";
import { getSentInvites } from "../../../services/team.service";
import Pending from "../../../components/teams/Pending";

const initialLayout = {
  width: Dimensions.get("window").width,
};

const renderScene = SceneMap({
  first: Players,
  second: Pending,
});

function Tabs() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [routes] = useState([
    {
      key: "first",
      title: "Active",
    },
    {
      key: "second",
      title: "Pending",
    },
  ]);

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          const color =
            index === i
              ? useColorModeValue("#000", "#e5e5e5")
              : useColorModeValue("#1f2937", "#a1a1aa");
          const borderColor =
            index === i
              ? "cyan.500"
              : useColorModeValue("coolGray.200", "gray.400");
          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              cursor="pointer"
            >
              <Pressable
                onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    color,
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <TabView
      navigationState={{
        index,
        routes,
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

export default () => {
  const bottomSheetRef = useRef();

  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getInvites();
  }, []);

  const getInvites = () => {
    setLoading(true);
    getSentInvites()
      .then((response) => {
        setInvites(response?.data?.invites ?? []);
      })
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar barStyle={"dark-content"} />
        <ScreenHeader
          title="Team members"
          showDone={true}
          doneIcon={<FontAwesome name="user-plus" size={24} color="black" />}
          handleDone={() => {
            bottomSheetRef.current.open();
          }}
        />
        <RBSheet
          RBSheet
          ref={bottomSheetRef}
          draggable
          dragOnContent
          height={400}
          customStyles={{
            container: styles.sheetContainer,
          }}
        >
          <InviteUser
            refreshInvites={getInvites}
            closeDialog={() => {
              bottomSheetRef.current.close?.();
            }}
          />
        </RBSheet>
        <TeamMembersContext.Provider value={{ invites, loading, getInvites }}>
          <Tabs />
        </TeamMembersContext.Provider>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  list: {
    paddingBottom: 16,
  },
  itemContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sheetContainer: { borderTopLeftRadius: 50, borderTopRightRadius: 50 },
});
