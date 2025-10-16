import { getAllPosition } from "@/apis/position.api";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { usePositions } from "../../../hooks/usePositions";
import { Position } from "../../../types";

export default function PositionListScreen() {
  const router = useRouter();
  const { deletePosition, togglePositionStatus } = usePositions();

  const {
    data: positions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["positions"],
    queryFn: getAllPosition,
  });

  const handleDeletePress = (id: number) => {
    Alert.alert("Xóa vị trí", "Bạn có chắc chắn muốn xóa vị trí này?", [
      { text: "Hủy", style: "cancel" },
      { text: "Xóa", onPress: () => deletePosition(id), style: "destructive" },
    ]);
  };

  const renderItem = ({ item }: { item: Position }) => {
    const isActive = item.positionStatus === "ACTIVE";
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => router.push(`/positions/${item.id}`)}
      >
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.positionName}</Text>
          <Text
            style={{
              color: isActive ? "#2F855A" : "#C53030",
              fontWeight: "bold",
            }}
          >
            {isActive ? "Đang hoạt động" : "Không hoạt động"}
          </Text>
        </View>
        <View style={styles.actions}>
          <Switch
            trackColor={{ false: "#767577", true: "#63B3ED" }}
            thumbColor={isActive ? "#3182CE" : "#f4f3f4"}
            onValueChange={() => togglePositionStatus(item.id)}
            value={isActive}
          />
          {/* --- NÚT CHỈNH SỬA ĐÃ ĐƯỢC THÊM VÀO ĐÂY --- */}
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() =>
              router.push({
                pathname: "/positions/edit",
                params: { id: item.id },
              })
            }
          >
            <Ionicons name="pencil-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
          {/* ------------------------------------------- */}
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => handleDeletePress(item.id)}
          >
            <Ionicons name="trash-outline" size={24} color="#E53E3E" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (isError) {
    return <Text>Đã có lỗi xảy ra khi tải dữ liệu.</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/positions/add")}>
              <Ionicons name="add-circle" size={32} color="#38A169" />
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList
        data={Array.isArray(positions?.data) ? positions.data : []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Chưa có vị trí nào.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  itemContainer: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  itemInfo: { flex: 1, marginRight: 10 },
  itemName: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  actions: { flexDirection: "row", alignItems: "center" },
  emptyText: { textAlign: "center", marginTop: 50, fontSize: 16 },
});
