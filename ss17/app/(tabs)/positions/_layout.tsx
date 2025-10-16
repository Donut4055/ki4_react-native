import { Stack } from "expo-router";

export default function PositionLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Quản lý Vị trí" }} />
      <Stack.Screen
        name="add"
        options={{ title: "Thêm vị trí mới", presentation: "modal" }}
      />
      <Stack.Screen name="[id]" options={{ title: "Chi tiết vị trí" }} />
      <Stack.Screen
        name="edit"
        options={{ title: "Chỉnh sửa vị trí", presentation: "modal" }}
      />
    </Stack>
  );
}
