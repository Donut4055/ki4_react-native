import { axiosInstance } from "@/utils/axios-instance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RelativePathString, router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Main() {
  const [loading, setLoading] = useState(true);

  const refreshToken = async () => {
    const refresh = await AsyncStorage.getItem("REFRESH_TOKEN");
    if (!refresh) throw new Error("No refresh token");

    const res = await axiosInstance.post(`/auths/refresh-token`, {
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
      <Button
        title="Bài 1"
        onPress={() => router.push("/e1" as RelativePathString)}
      />
      <Button
        title="Bài 2"
        onPress={() => router.push("/e2" as RelativePathString)}
      />
      <Button
        title="Bài 3"
        onPress={() => router.push("/e3" as RelativePathString)}
      />
      <Button
        title="Bài 4"
        onPress={() => router.push("/e4" as RelativePathString)}
      />
      <Button
        title="Bài 5"
        onPress={() => router.push("/e5" as RelativePathString)}
      />
      <Button
        title="Bài 6 - 10"
        onPress={() => router.push("/e6-10" as RelativePathString)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    flexDirection: "column",
  },
});
