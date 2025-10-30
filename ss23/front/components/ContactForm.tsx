// components/ContactForm.tsx
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ContactFormData, ContactTag } from "../types";

interface ContactFormProps {
  control: Control<ContactFormData>;
  errors: FieldErrors<ContactFormData>;
  onSubmit: () => void;
  isEdit?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
  control,
  errors,
  onSubmit,
  isEdit,
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.label}>Tên liên hệ</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="words"
            />
          )}
        />
        {errors.name && (
          <Text style={styles.errorText}>{errors.name.message}</Text>
        )}

        <Text style={styles.label}>Số điện thoại</Text>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="phone-pad"
            />
          )}
        />
        {errors.phone && (
          <Text style={styles.errorText}>{errors.phone.message}</Text>
        )}

        <Text style={styles.label}>Thẻ (Tag)</Text>
        <Controller
          control={control}
          name="tag"
          render={({ field: { onChange, value } }) => (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
              >
                <Picker.Item label="Gia đình" value={ContactTag.Family} />
                <Picker.Item label="Bạn bè" value={ContactTag.Friend} />
                <Picker.Item label="Đồng nghiệp" value={ContactTag.Colleague} />
                <Picker.Item label="Khác" value={ContactTag.Other} />
              </Picker>
            </View>
          )}
        />

        <View style={styles.buttonContainer}>
          <Button title={isEdit ? "Cập nhật" : "Thêm mới"} onPress={onSubmit} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default ContactForm;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  label: { fontSize: 16, marginBottom: 8, color: "#333", fontWeight: "500" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderRadius: 6,
    marginBottom: 5,
    backgroundColor: "#f9f9f9",
  },
  errorText: { color: "red", marginBottom: 15, fontSize: 12 },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
  },
  buttonContainer: { marginTop: 25 },
});
