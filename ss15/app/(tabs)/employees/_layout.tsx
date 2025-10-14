import AddButton from "@/components/AddButton";
import { Stack } from "expo-router";
import React from "react";

export default function EmployeeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Danh sách nhân viên",
          headerRight() {
            return <AddButton />;
          },
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          title: "Thêm nhân viên",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Chi tiết nhân viên",
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: "Chỉnh sửa nhân viên",
        }}
      />
    </Stack>
  );
}
