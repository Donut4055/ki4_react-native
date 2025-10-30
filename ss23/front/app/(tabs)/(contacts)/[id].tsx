// app/(tabs)/(contacts)/[id].tsx
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import {
  useContactQuery,
  useToggleBlockContactMutation,
} from "../../../hooks/useContactData";
import { ContactTag } from "../../../types";

const getTagColor = (tag: ContactTag) => {
  switch (tag) {
    case ContactTag.Family:
      return "#FF3B30";
    case ContactTag.Friend:
      return "#34C759";
    case ContactTag.Colleague:
      return "#007AFF";
    default:
      return "#8E8E93";
  }
};

export default function ContactDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: contact } = useContactQuery(id);
  const toggleMutation = useToggleBlockContactMutation();
  const [isBlocked, setIsBlocked] = useState(contact?.isBlocked || false);

  // Cập nhật state của switch nếu data chung thay đổi
  useEffect(() => {
    setIsBlocked(contact?.isBlocked || false);
  }, [contact]);

  const onToggleSwitch = async () => {
    if (!contact) return;
    const newState = !isBlocked;
    setIsBlocked(newState);
    try {
      await toggleMutation.mutateAsync(contact.id);
      Alert.alert(
        newState ? "Đã chặn" : "Đã bỏ chặn",
        `${contact.name} đã được ${
          newState ? "thêm vào" : "xóa khỏi"
        } danh sách đen.`
      );
    } catch (e) {
      setIsBlocked(!newState);
    }
  };

  if (!contact) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Không tìm thấy liên hệ.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{contact.name[0].toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.phone}>{contact.phone}</Text>
        <Text
          style={[
            styles.tag,
            {
              color: getTagColor(contact.tag),
              borderColor: getTagColor(contact.tag),
            },
          ]}
        >
          {contact.tag}
        </Text>

        <View style={styles.divider} />

        <View style={styles.blockRow}>
          <Text style={styles.blockLabel}>Chặn liên hệ này</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#FF3B30" }}
            thumbColor={"#f4f3f4"}
            onValueChange={onToggleSwitch}
            value={isBlocked}
          />
        </View>
        <Text style={styles.blockDescription}>
          Các cuộc gọi và tin nhắn từ số này sẽ bị chặn và không thông báo cho
          bạn.
        </Text>
      </View>
    </SafeAreaView>
  );
}

// ... Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  content: { padding: 20, alignItems: "center" },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarText: { fontSize: 48, color: "white", fontWeight: "300" },
  name: { fontSize: 26, fontWeight: "600", marginBottom: 5 },
  phone: { fontSize: 20, color: "#555", marginBottom: 15 },
  tag: {
    fontSize: 14,
    fontWeight: "500",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderRadius: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    width: "100%",
    marginVertical: 30,
  },
  blockRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  blockLabel: { fontSize: 16, fontWeight: "500" },
  blockDescription: {
    fontSize: 13,
    color: "#8E8E93",
    marginTop: 8,
    width: "100%",
  },
  errorText: { textAlign: "center", marginTop: 50, fontSize: 18, color: "red" },
});
