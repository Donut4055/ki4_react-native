import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

interface Item {
  id: number;
  name: string;
}

export default function GridView({ data }: { data: Item[] }) {
  return (
    <FlatList
      data={data}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      )}
      columnWrapperStyle={styles.row}
      contentContainerStyle={{ padding: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "red",
    flex: 1,
    margin: 5,
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
});
