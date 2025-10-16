import { createPosition } from "@/apis/position.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet } from "react-native";
import PositionForm from "../../../components/PositionForm";
import { Position } from "../../../types";

export default function AddPositionScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Sử dụng useMution để ghi dữ liệu
  const { mutate, isPending } = useMutation({
    mutationFn: createPosition,
    onSuccess: (data) => {
      // Lưu dữ liệu liệu vào cache
      queryClient.invalidateQueries({
        queryKey: ["positions"],
      });

      // Hiển thị thông báo
      Alert.alert("Thành công", data.message);

      // Chuyển trang
      if (router.canGoBack()) {
        router.back();
      }
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        Alert.alert("Cảnh báo", error?.response?.data?.message);
      }
    },
  });

  const handleAddPosition = async (
    data: Omit<Position, "id" | "createdAt">
  ) => {
    // Truyền dữ liệu vào trong useMutation
    mutate(data);
  };

  if (isPending) {
    return <ActivityIndicator size={"large"} />;
  }

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
