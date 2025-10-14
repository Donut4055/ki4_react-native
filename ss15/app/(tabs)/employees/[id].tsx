import { getEmployeeById } from "@/apis/employee.apis";
import { EmployeeResponse } from "@/interfaces/employee.interface";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function EmployeeDetail() {
  const { id } = useLocalSearchParams();
  const [employee, setEmployee] = useState<EmployeeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchEmployeeDetail(Number(id));
    }
  }, [id]);

  const fetchEmployeeDetail = async (empId: number) => {
    try {
      const response = await getEmployeeById(empId);
      setEmployee(response.data);
    } catch (error) {
      console.error("Error fetching employee:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!employee) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy nhân viên.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Chi tiết nhân viên</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Mã nhân viên:</Text>
        <Text style={styles.value}>{employee.employeeCode}</Text>

        <Text style={styles.label}>Tên nhân viên:</Text>
        <Text style={styles.value}>{employee.employeeName}</Text>

        <Text style={styles.label}>Số điện thoại:</Text>
        <Text style={styles.value}>{employee.phoneNumber}</Text>

        <Text style={styles.label}>Chức vụ:</Text>
        <Text style={styles.value}>{employee.positionName}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>← Quay lại</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 3,
  },
  label: {
    fontWeight: "600",
    color: "#555",
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: "#222",
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
