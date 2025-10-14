import { createEmployee } from "@/apis/employee.apis";
import { Employee } from "@/interfaces/employee.interface";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function AddEmployee() {
  const [employee, setEmployee] = useState<Employee>({
    employeeCode: "",
    employeeName: "",
    employeeStatus: "WORKING",
    address: "",
    dateBirth: "",
    gender: "MALE",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (key: keyof Employee, value: string) => {
    setEmployee({ ...employee, [key]: value });
  };

  const handleSubmit = async () => {
    if (!employee.employeeCode || !employee.employeeName) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập mã và tên nhân viên");
      return;
    }

    try {
      await createEmployee(employee);
      Alert.alert("Thành công", "Thêm nhân viên thành công!");
      router.push("/employees");
    } catch (error: any) {
      console.error(error);
      Alert.alert("Lỗi", "Không thể thêm nhân viên!");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Thêm nhân viên</Text>

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
        placeholder="Địa chỉ"
        value={employee.address}
        onChangeText={(t) => handleChange("address", t)}
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
        placeholder="Email"
        value={employee.email}
        onChangeText={(t) => handleChange("email", t)}
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={employee.phoneNumber}
        onChangeText={(t) => handleChange("phoneNumber", t)}
        keyboardType="phone-pad"
      />

      <Button title="Thêm nhân viên" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
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
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
  },
});
