import { deletePosition, getAllPosition, togglePositionStatus } from "@/apis/position.apis";
import { Position } from "@/interfaces/position.interface";
import { AppDispatch, RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { RelativePathString, router, Stack } from "expo-router";
import React, { useEffect } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function PositionListScreen() {
  const positions = useSelector((state: RootState) => state.position.data);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeletePress = (id: number) => {
    console.log(`[Delete] Attempting to delete position with ID: ${id}`);
    Alert.alert("Xóa vị trí", "Bạn có chắc chắn muốn xóa vị trí này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        onPress: async () => {
          try {
            console.log(`[Delete] Dispatching delete action for position ID: ${id}`);
            const resultAction = await dispatch(deletePosition(id));
            
            if (deletePosition.fulfilled.match(resultAction)) {
              console.log('[Delete] Successfully deleted position:', resultAction.payload);
              dispatch(getAllPosition());
            } else if (deletePosition.rejected.match(resultAction)) {
              const error = resultAction.payload as { message?: string; error?: string } | undefined;
              Alert.alert('Lỗi', `Không thể xóa vị trí: ${error?.message || error?.error || 'Lỗi không xác định'}`);
            }
          } catch (error) {
            console.error('[Delete] Unexpected error during deletion:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi không mong muốn khi xóa vị trí');
          }
        },
        style: "destructive",
      },
    ]);
  };

  const changePositionStatus = (id: number) => {
    dispatch(togglePositionStatus(id));
  }

  useEffect(() => {
    dispatch(getAllPosition());
  }, [dispatch]);

  const renderItem = ({ item }: { item: Position }) => {
    const isActive = item.positionStatus === "ACTIVE";
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          router.push(`e6-10/positions/${item.id}` as RelativePathString)
        }
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
            onValueChange={() => changePositionStatus(item.id)}
            value={isActive}
          />
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() =>
              router.push({
                pathname: "e6-10/positions/edit" as RelativePathString,
                params: { id: item.id },
              })
            }
          >
            <Ionicons name="pencil-outline" size={24} color="#007AFF" />
          </TouchableOpacity>

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

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                router.push("/e6-10/positions/add" as RelativePathString)
              }
            >
              <Ionicons name="add-circle" size={32} color="#38A169" />
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList
        data={positions}
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
