import { addRandomNumber, randomReset } from "@/redux/slice/random.slice";
import { RootState } from "@/redux/store";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function E2Layout() {
  const result = useSelector((state: RootState) => state.random);
  const dispatch = useDispatch();
  const handleRNG = () => {
    const randomNuber = Math.floor(Math.random() * 10);
    dispatch(addRandomNumber(randomNuber));
  };
  const handleReset = () => {
    dispatch(randomReset());
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách số ngẫu nhiên</Text>
      <View style={styles.place}>
        <Text style={{ textAlign: "center" }}>
          [
          {result.map((item, index) => (
            <React.Fragment key={index}>
              {item}
              {index < result.length - 1 ? ", " : ""}
            </React.Fragment>
          ))}
          ]
        </Text>
      </View>
      <Button title="Add Number" onPress={() => handleRNG()} />
      <Button title="Reset" onPress={() => handleReset()} />
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
    fontSize: 24,
    fontWeight: "bold",
  },
  place: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    width: "60%",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
