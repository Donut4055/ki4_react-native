import { Stack } from "expo-router";
import React from "react";

export default function E5Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Bài 5" }} />
    </Stack>
  );
}
