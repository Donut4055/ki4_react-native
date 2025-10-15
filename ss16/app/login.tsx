import { axiosInstance } from "@/utils/axios-instance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import { RelativePathString, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

export interface LoginRequest {
  phoneNumber: string;
  password: string;
  deviceId: string;
  isRemembered: boolean;
}

export default function Login() {
  const [form, setForm] = useState<LoginRequest>({
    phoneNumber: "",
    password: "",
    deviceId: "",
    isRemembered: false,
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

  const handleChange = (key: keyof LoginRequest, value: string | boolean) => {
    setForm({ ...form, [key]: value });
  };

  const validate = () => {
    if (!form.phoneNumber || !form.password) {
      Alert.alert("Lỗi", "Vui lòng nhập số điện thoại và mật khẩu!");
      return false;
    }
    if (!/^[0-9]{9,11}$/.test(form.phoneNumber)) {
      Alert.alert("Lỗi", "Số điện thoại không hợp lệ!");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      const response = await axiosInstance.post("/auths/login", form);
      const { statusCode, data, message } = response.data;

      if (statusCode === 200) {
        const { accessToken, user } = data;

        await AsyncStorage.setItem("ACCESS_TOKEN", accessToken);
        await AsyncStorage.setItem("USER", JSON.stringify(user));

        if (form.isRemembered) {
          await AsyncStorage.setItem(
            "REMEMBERED_CREDENTIALS",
            JSON.stringify({
              phoneNumber: form.phoneNumber,
              password: form.password,
            })
          );
        } else {
          await AsyncStorage.removeItem("REMEMBERED_CREDENTIALS");
        }

        Alert.alert("Thành công", "Đăng nhập thành công!");
        router.replace("/" as RelativePathString);
      } else {
        Alert.alert("Đăng nhập thất bại", message || "Sai thông tin đăng nhập");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      Alert.alert("Lỗi", "Không thể kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadRemembered = async () => {
      const saved = await AsyncStorage.getItem("REMEMBERED_CREDENTIALS");
      if (saved) {
        const creds = JSON.parse(saved);
        setForm((prev) => ({
          ...prev,
          phoneNumber: creds.phoneNumber,
          password: creds.password,
          isRemembered: true,
        }));
      }
    };
    loadRemembered();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.login}>
        <Text style={styles.text}>Đăng nhập</Text>

        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          keyboardType="phone-pad"
          value={form.phoneNumber}
          onChangeText={(text) => handleChange("phoneNumber", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
        />

        <View style={styles.switch}>
          <Switch
            value={form.isRemembered}
            onValueChange={(value) => handleChange("isRemembered", value)}
          />
          <Text>Ghi nhớ đăng nhập</Text>
        </View>

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="small" color="#ff7300ff" />
          ) : (
            <Button title="Đăng nhập" onPress={handleLogin} color="#ff7300ff" />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
  },
  login: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
    gap: 15,
  },
  text: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  switch: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
  },
  registerLink: {
    marginTop: 15,
    alignItems: "center",
  },
  linkText: {
    color: "#ff7300ff",
    fontSize: 15,
  },
});
