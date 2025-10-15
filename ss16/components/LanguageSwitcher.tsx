import { toggleLanguage } from "@/redux/slice/language.slice";
import { RootState } from "@/redux/store";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { translations } from "../utils/translations";

export default function LanguageSwitcher() {
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.language.current);

  const t = translations[lang];

  const handleToggle = () => {
    dispatch(toggleLanguage());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{t.greeting}</Text>
      <Text style={styles.description}>{t.description}</Text>

      <TouchableOpacity style={styles.button} onPress={handleToggle}>
        <Text style={styles.buttonText}>{t.button}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
