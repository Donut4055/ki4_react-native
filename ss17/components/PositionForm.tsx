import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Position, PositionStatuses } from "../types";

type FormData = Omit<Position, "id" | "createdAt">;

interface PositionFormProps {
  onSubmit: (data: FormData) => void;
  initialValues?: FormData;
  submitButtonText?: string;
}

export default function PositionForm({
  onSubmit,
  initialValues = {
    positionName: "",
    description: "",
    positionStatus: "ACTIVE",
  },
  submitButtonText = "Lưu",
}: PositionFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: initialValues,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên vị trí</Text>
      <Controller
        control={control}
        rules={{ required: "Tên vị trí không được để trống" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Ví dụ: Lập trình viên"
            autoCapitalize="words"
          />
        )}
        name="positionName"
      />
      {errors.positionName && (
        <Text style={styles.error}>{errors.positionName.message}</Text>
      )}

      <Text style={styles.label}>Mô tả</Text>
      <Controller
        control={control}
        rules={{ required: "Mô tả không được để trống" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, { height: 100 }]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Nhập mô tả chi tiết"
            multiline
          />
        )}
        name="description"
      />
      {errors.description && (
        <Text style={styles.error}>{errors.description.message}</Text>
      )}

      <Text style={styles.label}>Trạng thái</Text>
      <Controller
        control={control}
        name="positionStatus"
        render={({ field: { onChange, value } }) => (
          <View style={styles.pickerContainer}>
            <Picker selectedValue={value} onValueChange={onChange}>
              {PositionStatuses.map((status) => (
                <Picker.Item
                  key={status}
                  label={
                    status === "ACTIVE" ? "Đang hoạt động" : "Không hoạt động"
                  }
                  value={status}
                />
              ))}
            </Picker>
          </View>
        )}
      />

      <View style={styles.buttonContainer}>
        <Button
          title={submitButtonText}
          onPress={handleSubmit(onSubmit)}
          color="#3182CE"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 5, marginTop: 15, fontWeight: "500" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    textAlignVertical: "top",
  },
  pickerContainer: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5 },
  error: { color: "red", marginTop: 5 },
  buttonContainer: { marginTop: 30 },
});
