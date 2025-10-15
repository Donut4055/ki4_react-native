import { Account, toggleFavorite } from "@/redux/slice/account.slice";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

interface Props {
  account: Account;
}

export default function AccountItem({ account }: Props) {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleFavorite(account.id));
  };

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{account.name}</Text>
      </View>

      <TouchableOpacity onPress={handleToggle}>
        <FontAwesome
          name="heart"
          color={account.isFavorite ? "#f00" : "#888"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  likes: {
    color: "#555",
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
