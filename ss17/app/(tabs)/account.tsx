import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/532422004_800880659484273_8020360210845954477_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=rxuLCLtHIdUQ7kNvwGAuGoM&_nc_oc=AdnBlFq4ZU8qqVdkirL4CAYvWT9tssWcBBHmWHSkT4fSVi5_XETLXj5Yquw52RP9ajI&_nc_zt=23&_nc_ht=scontent.fhan14-2.fna&_nc_gid=vHSbV-m2EHncCwiRiWw_2A&oh=00_AffY8Lpw4WtlKtqZQHd5F5Pb9cVTVn7VxL7EGYahVSf8NQ&oe=68F385CE",
          }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>Ngọ Văn Quý</Text>
        <Text style={styles.userEmail}>ngovanquy@example.com</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="person-circle-outline" size={24} color="#4A5568" />
          <Text style={styles.menuText}>Chỉnh sửa hồ sơ</Text>
          <FontAwesome5 name="chevron-right" size={16} color="#A0AEC0" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings-outline" size={24} color="#4A5568" />
          <Text style={styles.menuText}>Cài đặt</Text>
          <FontAwesome5 name="chevron-right" size={16} color="#A0AEC0" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={24} color="#4A5568" />
          <Text style={styles.menuText}>Thông báo</Text>
          <FontAwesome5 name="chevron-right" size={16} color="#A0AEC0" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.menuItem, styles.logoutButton]}>
        <Ionicons name="log-out-outline" size={24} color="#E53E3E" />
        <Text
          style={[styles.menuText, { color: "#E53E3E", fontWeight: "bold" }]}
        >
          Đăng xuất
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#EDF2F7",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
    color: "#2D3748",
  },
  userEmail: {
    fontSize: 16,
    color: "#718096",
    marginTop: 5,
  },
  menu: {
    marginTop: 20,
  },
  menuItem: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF2F7",
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 18,
    color: "#2D3748",
  },
  logoutButton: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: "#EDF2F7",
  },
});
