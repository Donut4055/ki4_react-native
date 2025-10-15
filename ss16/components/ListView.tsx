import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

interface Item {
  id: number;
  name: string;
}

export default function ListView({ data }: { data: Item[] }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      )}
      contentContainerStyle={{ padding: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "red",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
});
