import { axiosInstance } from "@/utils/axios-instance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import { RelativePathString, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export interface RegisterRequest {
  phoneNumber: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  deviceId: string;
}

export default function Register() {
  const [form, setForm] = useState<RegisterRequest>({
    phoneNumber: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    deviceId: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDeviceId = async () => {
      try {
        const id =
          Device.osInternalBuildId || Device.osBuildId || "unknown-device";
        setForm((prev) => ({ ...prev, deviceId: id }));
      } catch (error) {
        console.warn("Không thể lấy deviceId:", error);
        setForm((prev) => ({ ...prev, deviceId: "unknown-device" }));
      }
    };
    getDeviceId();
  }, []);

  const handleChange = (key: keyof RegisterRequest, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const validate = (): boolean => {
    if (
      !form.phoneNumber ||
      !form.password ||
      !form.firstName ||
      !form.lastName
    ) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!");
      return false;
    }
    if (!/^[0-9]{9,11}$/.test(form.phoneNumber)) {
      Alert.alert("Lỗi", "Số điện thoại không hợp lệ!");
      return false;
    }
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      Alert.alert("Lỗi", "Email không hợp lệ!");
      return false;
    }
    if (form.password.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự!");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auths/register", form);

      if (response.data.success) {
        const { accessToken, user } = response.data.data;

        if (accessToken) {
          await AsyncStorage.setItem("ACCESS_TOKEN", accessToken);
          await AsyncStorage.setItem("USER_INFO", JSON.stringify(user));

          Alert.alert("Thành công", "Đăng ký & đăng nhập thành công!");
          router.replace("/(tabs)/index" as RelativePathString);
        } else {
          Alert.alert(
            "Thiếu token",
            "Máy chủ không trả về accessToken. Vui lòng đăng nhập lại."
          );
          router.replace("/login");
        }
      } else {
        Alert.alert("Thất bại", response.data.message || "Đăng ký thất bại.");
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert("Lỗi", "Không thể kết nối đến máy chủ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Đăng ký tài khoản</Text>

      <TextInput
        placeholder="Họ"
        style={styles.input}
        value={form.lastName}
        onChangeText={(text) => handleChange("lastName", text)}
      />

      <TextInput
        placeholder="Tên"
        style={styles.input}
        value={form.firstName}
        onChangeText={(text) => handleChange("firstName", text)}
      />

      <TextInput
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
        style={styles.input}
        value={form.phoneNumber}
        onChangeText={(text) => handleChange("phoneNumber", text)}
      />

      <TextInput
        placeholder="Email (tuỳ chọn)"
        keyboardType="email-address"
        style={styles.input}
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
      />

      <TextInput
        placeholder="Mật khẩu"
        secureTextEntry
        style={styles.input}
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Đăng ký</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/login")}>
        <Text style={styles.link}>Đã có tài khoản? Đăng nhập ngay</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#ff7300ff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    marginTop: 15,
    textAlign: "center",
    color: "#ff7300ff",
  },
});
