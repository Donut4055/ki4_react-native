// app/(tabs)/(contacts)/index.tsx
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect, useMemo, useState } from "react";
import {
  Button,
  ListRenderItem,
  Modal,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useContactsQuery,
  useDeleteContactMutation,
} from "../../../hooks/useContactData";
import { Contact, ContactSection, ContactTag } from "../../../types";

// --- Helper functions ---
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

// Hàm xử lý data cho SectionList
const processContacts = (
  contacts: Contact[],
  query: string
): ContactSection[] => {
  const normalizedQuery = query.toLowerCase();

  // 1. Lọc theo tên hoặc SĐT VÀ chưa bị chặn
  const filtered = contacts.filter(
    (c) =>
      !c.isBlocked &&
      (c.name.toLowerCase().includes(normalizedQuery) ||
        c.phone.includes(normalizedQuery))
  );

  // 2. Nhóm theo chữ cái đầu
  const groups = filtered.reduce((acc, contact) => {
    const letter = contact.name[0].toUpperCase();
    if (!acc[letter]) {
      acc[letter] = [];
    }
    acc[letter].push(contact);
    return acc;
  }, {} as Record<string, Contact[]>);

  // 3. Chuyển thành định dạng SectionList
  return Object.keys(groups)
    .sort()
    .map((letter) => ({
      title: letter,
      data: groups[letter].sort((a, b) => a.name.localeCompare(b.name)),
    }));
};
// --- Hết Helper ---

export default function ContactListScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const {
    data: contactsData,
    isLoading,
    isError,
    refetch,
  } = useContactsQuery();
  const deleteMutation = useDeleteContactMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null
  );

  // Giả lập refresh khi quay lại tab
  const [refresh, setRefresh] = React.useState(0);
  useFocusEffect(
    React.useCallback(() => {
      setRefresh((r) => r + 1); // Cập nhật lại state để re-render
    }, [])
  );

  // Sử dụng useMemo để tối ưu việc lọc và nhóm
  const contactSections = useMemo(() => {
    const contacts: Contact[] = contactsData ?? [];
    return processContacts(contacts, searchQuery);
  }, [contactsData, searchQuery, refresh]);

  // Thêm nút "Thêm mới" (+) vào header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Danh bạ",
      headerRight: () => (
        <TouchableOpacity onPress={() => router.push("/(tabs)/(contacts)/add")}>
          <Ionicons
            name="add-circle"
            size={30}
            color="#007AFF"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, router]);

  // --- Các hàm xử lý giao diện (UI-only) ---
  const openDeleteModal = (id: string) => {
    setSelectedContactId(id);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (selectedContactId) {
      try {
        await deleteMutation.mutateAsync(selectedContactId);
        await refetch();
      } catch (e) {
        // ignore, error UI có thể bổ sung nếu cần
      }
    }
    setModalVisible(false);
    setSelectedContactId(null);
  };

  // Component render item cho SectionList
  const renderContactItem: ListRenderItem<Contact> = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => router.push(`/(tabs)/(contacts)/${item.id}`)}
    >
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPhone}>{item.phone}</Text>
        <View style={styles.tagContainer}>
          <Text
            style={[
              styles.itemTag,
              {
                color: getTagColor(item.tag),
                borderColor: getTagColor(item.tag),
              },
            ]}
          >
            {item.tag}
          </Text>
        </View>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(tabs)/(contacts)/edit",
              params: { id: item.id },
            })
          }
        >
          <Ionicons name="pencil" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openDeleteModal(item.id)}
          style={{ marginLeft: 15 }}
        >
          <Ionicons name="trash" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Ionicons name="people" size={40} color="#ccc" />
          <Text style={styles.emptyText}>Đang tải danh bạ...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Ionicons name="alert-circle" size={40} color="#ff3b30" />
          <Text style={styles.emptyText}>Không thể tải danh bạ</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#8E8E93"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm theo tên hoặc SĐT..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <SectionList
        sections={contactSections}
        keyExtractor={(item) => item.id}
        renderItem={renderContactItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={50} color="#ccc" />
            <Text style={styles.emptyText}>Danh bạ trống</Text>
          </View>
        }
      />

      {/* Modal xác nhận xóa */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Bạn có chắc chắn muốn xóa liên hệ này?
            </Text>
            <View style={styles.modalButtons}>
              <Button title="Hủy" onPress={() => setModalVisible(false)} />
              <Pressable style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>Xóa</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ... Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: { marginRight: 8 },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#f4f4f8",
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "600" },
  itemPhone: { fontSize: 14, color: "#555", marginTop: 2 },
  tagContainer: { flexDirection: "row", marginTop: 4 },
  itemTag: {
    fontSize: 12,
    fontWeight: "500",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 6,
  },
  itemActions: { flexDirection: "row" },
  emptyContainer: { alignItems: "center", marginTop: 50 },
  emptyText: { fontSize: 16, color: "#aaa", marginTop: 10 },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: { marginBottom: 20, textAlign: "center", fontSize: 16 },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    marginLeft: 15,
  },
  deleteButtonText: { color: "white", fontWeight: "bold", textAlign: "center" },
});
