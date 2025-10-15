import { Stack } from "expo-router";
import React from "react";

export default function E1Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Bài 1" }} />
    </Stack>
  );
}
