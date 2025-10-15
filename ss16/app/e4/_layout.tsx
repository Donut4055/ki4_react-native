import { Stack } from "expo-router";
import React from "react";

export default function E4Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Bài 4" }} />
    </Stack>
  );
}
