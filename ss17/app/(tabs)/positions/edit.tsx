import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import PositionForm from "../../../components/PositionForm";
import { usePositions } from "../../../hooks/usePositions";

export default function EditPositionScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const positionId = Number(id);
  const { getPositionById, updatePosition, loading } = usePositions();

  const position = getPositionById(positionId);

  const handleUpdatePosition = async (data: any) => {
    if (position) {
      // Giữ lại id và createdAt không đổi
      await updatePosition({ ...position, ...data });
      if (router.canGoBack()) {
        router.back();
      }
    }
  };

  if (loading) return <ActivityIndicator size="large" />;
  if (!position)
    return <Text style={styles.errorText}>Không tìm thấy vị trí.</Text>;

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <PositionForm
        onSubmit={handleUpdatePosition}
        initialValues={{
          positionName: position.positionName,
          description: position.description,
          positionStatus: position.positionStatus,
        }}
        submitButtonText="Cập nhật"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  errorText: { textAlign: "center", marginTop: 50, fontSize: 18, color: "red" },
});
