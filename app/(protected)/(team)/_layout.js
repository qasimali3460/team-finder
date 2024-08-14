import React from "react";
import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="team"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="edit-team"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="team-members"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="match-invites"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="match-invite-detail"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="matches"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="my-invites"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
