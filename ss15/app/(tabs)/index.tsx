import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const BASE_URL = "https://nest-api-public.ixe-agent.io.vn/api/v1";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const refreshToken = async () => {
    const refresh = await AsyncStorage.getItem("REFRESH_TOKEN");
    if (!refresh) throw new Error("No refresh token");

    const res = await axios.post(`${BASE_URL}/auths/refresh-token`, {
      refreshToken: refresh,
    });

    const { accessToken, refreshToken: newRefresh } = res.data.data;
    await AsyncStorage.multiSet([
      ["ACCESS_TOKEN", accessToken],
      ["REFRESH_TOKEN", newRefresh],
    ]);
    return accessToken;
  };

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("ACCESS_TOKEN");
      if (!token) {
        router.replace("/login");
        return;
      }

      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        console.log("Access token expired. Trying to refresh...");
        try {
          const newToken = await refreshToken();
          console.log("Token refreshed:", newToken);
        } catch (e) {
          console.warn("Refresh token failed:", e);
          await AsyncStorage.multiRemove([
            "ACCESS_TOKEN",
            "REFRESH_TOKEN",
            "USER",
          ]);
          router.replace("/login");
        }
      }
    } catch (err) {
      console.error("Error checking token:", err);
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Đang kiểm tra phiên đăng nhập...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trang chủ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
