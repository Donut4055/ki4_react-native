import { getPosition, updatePosition } from "@/apis/position.apis";
import PositionForm from "@/components/PositionForm";
import { AppDispatch, RootState } from "@/redux/store";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function EditPositionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const positionId = Number(id);

  const position = useSelector((state: RootState) => state.position.selected);

  const handleUpdatePosition = async (data: any) => {
  if (position) {
    await dispatch(updatePosition({ 
      id: positionId,  
      position: data   
    }));
    if (router.canGoBack()) {
      router.push("/e6-10/positions");
    }
  }
};

  useEffect(() => {
    dispatch(getPosition(positionId));
  }, [positionId, dispatch]);

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
