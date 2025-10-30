// app/(tabs)/(contacts)/edit.tsx
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import * as yup from "yup";
import ContactForm from "../../../components/ContactForm";
import {
  useContactQuery,
  useUpdateContactMutation,
} from "../../../hooks/useContactData";
import { ContactFormData, ContactTag } from "../../../types";

const phoneRegExp = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Tên là bắt buộc")
    .min(3, "Tên phải có ít nhất 3 ký tự"),
  phone: yup
    .string()
    .required("SĐT là bắt buộc")
    .matches(phoneRegExp, "Số điện thoại không hợp lệ"),
  tag: yup.string().oneOf(Object.values(ContactTag)).required(),
});

export default function EditContactScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: contactToEdit } = useContactQuery(id);
  const updateMutation = useUpdateContactMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
    defaultValues: contactToEdit
      ? {
          name: contactToEdit.name,
          phone: contactToEdit.phone,
          tag: contactToEdit.tag,
        }
      : {
          name: "",
          phone: "",
          tag: ContactTag.Friend,
        },
  });

  const onSubmit = async (data: ContactFormData) => {
    if (!contactToEdit) return;
    try {
      await updateMutation.mutateAsync({ id: contactToEdit.id, data });
      router.back();
    } catch (e) {}
  };

  if (!contactToEdit) {
    return (
      <View>
        <Text>Không tìm thấy liên hệ.</Text>
      </View>
    );
  }

  return (
    <ContactForm
      control={control}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      isEdit
    />
  );
}
