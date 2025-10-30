// app/(tabs)/(contacts)/add.tsx
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ContactForm from "../../../components/ContactForm";
import { useCreateContactMutation } from "../../../hooks/useContactData";
import { ContactFormData, ContactTag } from "../../../types";

// Regex đơn giản cho SĐT Việt Nam
const phoneRegExp = /^(0|\+84)(3|5|7|8|9)\d{8}$/;

// Định nghĩa schema validation
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

export default function AddContactScreen() {
  const router = useRouter();
  const createMutation = useCreateContactMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      tag: ContactTag.Friend,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await createMutation.mutateAsync(data);
      router.back();
    } catch (e) {}
  };

  return (
    <ContactForm
      control={control}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}
