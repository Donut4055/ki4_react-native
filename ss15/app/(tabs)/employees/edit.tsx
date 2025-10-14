import { updateEmployee } from "@/apis/employee.apis";
import { Employee, EmployeeUpdateRequest } from "@/interfaces/employee.interface";
import { axiosInstance } from "@/utils/axios-instance";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function EditEmployee() {
  const { id } = useLocalSearchParams();
  const [employee, setEmployee] = useState<EmployeeUpdateRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const resp = await axiosInstance.get(`employees/${id}`);
        setEmployee(resp.data.data ?? resp.data);
      } catch (error) {
        Alert.alert("Lỗi", "Không tải được dữ liệu nhân viên!");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (key: keyof Employee, value: string) => {
    if (!employee) return;
    setEmployee({ ...employee, [key]: value });
  };

  const handleSave = async () => {
    if (!employee) return;
    setSaving(true);
    try {
      await updateEmployee(Number(Array.isArray(id) ? id[0] : id), employee);
      Alert.alert("Thành công", "Cập nhật thông tin nhân viên thành công!");
      router.push("/employees");
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Không thể cập nhật thông tin nhân viên!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (!employee) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy nhân viên</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Chỉnh sửa nhân viên</Text>

      <TextInput
        style={styles.input}
        placeholder="Mã nhân viên"
        value={employee.employeeCode}
        onChangeText={(t) => handleChange("employeeCode", t)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tên nhân viên"
        value={employee.employeeName}
        onChangeText={(t) => handleChange("employeeName", t)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ngày sinh (YYYY-MM-DD)"
        value={employee.dateBirth}
        onChangeText={(t) => handleChange("dateBirth", t)}
      />

      <Text style={styles.label}>Giới tính</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={employee.gender}
          onValueChange={(value) => handleChange("gender", value)}
        >
          <Picker.Item label="Nam" value="MALE" />
          <Picker.Item label="Nữ" value="FEMALE" />
          <Picker.Item label="Khác" value="OTHER" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={employee.phoneNumber}
        onChangeText={(t) => handleChange("phoneNumber", t)}
        keyboardType="phone-pad"
      />

      <Button
        title={saving ? "Đang lưu..." : "Lưu thay đổi"}
        onPress={handleSave}
        disabled={saving}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
  },
});
