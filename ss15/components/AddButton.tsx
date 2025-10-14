import { FontAwesome } from "@expo/vector-icons";
import { RelativePathString, router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function AddButton() {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push("/employees/add" as RelativePathString)}
    >
      <FontAwesome
        style={{ textAlign: "center" }}
        name="plus"
        size={24}
        color="white"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#ff7300ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});