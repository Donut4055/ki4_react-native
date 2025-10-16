import { CreatePosition, UpdatePosition } from "@/types";
import axiosInstance from "@/utils/axiosInstance";

// Gọi API lấy danh sách vị trí
export const getAllPosition = async () => {
  const response = await axiosInstance.get("positions");

  // Trả về cho phía store để xử lý
  return response.data;
};

// Gọi API lấy thông tin chi tiết của vị trí
export const getPositionDetail = async (id: number) => {
  const response = await axiosInstance.get(`positions/${id}`);
  return response.data;
};

// Hàm xóa thông tin vị trí theo id
export const deletePositionById = async (id: number) => {
  const response = await axiosInstance.delete(`positions/${id}`);

  return response.data;
};

// Hàm thêm mới vị trí
export const createPosition = async (createPosition: CreatePosition) => {
  const response = await axiosInstance.post("positions", createPosition);

  return response.data;
};

// Hàm cập nhật vị trí
export const updatePositionById = async (
  updatePositionById: UpdatePosition,
  id: number
) => {
  const response = await axiosInstance.put(
    `positions/${id}`,
    updatePositionById
  );

  return response.data;
};
