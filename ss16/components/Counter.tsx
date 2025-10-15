import { decrease, increase, reset } from "@/redux/slice/counter.slice";
import { RootState } from "@/redux/store";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Counter() {
  const result = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();
  const handleIncrease = () => {
    dispatch(increase());
  };
  const handleDecrease = () => {
    dispatch(decrease());
  };

  const handleReset = () => {
    dispatch(reset());
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{result}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Increase" onPress={handleIncrease} />
        <Button title="Decrease" onPress={handleDecrease} />
      </View>
      <Button title="Reset" onPress={() => handleReset()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 120,
    fontWeight: "bold",
    margin: 20,
  },
  buttonContainer: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
});
