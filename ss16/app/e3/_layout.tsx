import { Stack } from "expo-router";
import React from "react";

export default function E3Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Bài 3" }} />
    </Stack>
  );
}
