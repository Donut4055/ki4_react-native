import { deleteEmployee } from "@/apis/employee.apis";
import { EmployeeResponse } from "@/interfaces/employee.interface";
import { FontAwesome } from "@expo/vector-icons";
import { RelativePathString, router } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface EmployeeItemProps {
  item: EmployeeResponse;
}

export default function EmployeeItem({ item }: EmployeeItemProps) {
  const handleViewDetail = () => {
    router.push(`/employees/${item.id}` as RelativePathString);
  };

  const handleEdit = () => {
    router.push(`employees/edit?id=${item.id}` as RelativePathString);
  };

  const handleDelete = (id: number) => {
    Alert.alert("Xác nhận xoá", "Bạn có chắc muốn xoá?", [
      {
        style: "cancel",
        onPress: () => console.log("Cancel"),
      },
      {
        style: "destructive",
        onPress: async () => {
          await deleteEmployee(id);
          router.push("/employees")
        },
      },
    ]);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={handleViewDetail}
    >
      <View style={styles.left}>
        <Text style={styles.name}>{item.employeeName}</Text>
        <Text style={styles.position}>{item.positionName}</Text>
      </View>

      <View style={styles.right}>
        <TouchableOpacity style={styles.iconButton} onPress={handleEdit}>
          <FontAwesome name="edit" size={20} color="#007bff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleDelete(item.id)}
        >
          <FontAwesome name="trash" size={20} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  left: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  position: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },
  code: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  phone: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    padding: 5,
  },
});
