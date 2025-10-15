import AccountItem from "@/components/AccountItem";
import { RootState } from "@/redux/store";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function E4Place() {
  const accounts = useSelector((state: RootState) => state.accounts);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách tài khoản</Text>
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AccountItem account={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
