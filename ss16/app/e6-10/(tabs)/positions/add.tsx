import { createPosition } from "@/apis/position.apis";
import PositionForm from "@/components/PositionForm";
import { PositionRequest } from "@/interfaces/position.interface";
import { AppDispatch } from "@/redux/store";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

export default function AddPositionScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddPosition = async (data: Omit<PositionRequest, "id">) => {
    await dispatch(createPosition(data));
    if (router.canGoBack()) {
      router.push("/e6-10/positions");
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <PositionForm
        onSubmit={handleAddPosition}
        submitButtonText="Thêm vị trí"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
});
