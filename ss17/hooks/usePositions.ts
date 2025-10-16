import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { Position, PositionStatus } from "../types";

const STORAGE_KEY = "@positions";

export const usePositions = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);

  const getPositions = useCallback(async () => {
    try {
      setLoading(true);
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      const positionsFromStorage =
        jsonValue != null ? JSON.parse(jsonValue) : [];
      setPositions(positionsFromStorage);
    } catch (e) {
      console.error("Lỗi khi tải danh sách vị trí:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPositions();
  }, [getPositions]);

  const savePositionsToStorage = async (positionsToSave: Position[]) => {
    try {
      const jsonValue = JSON.stringify(positionsToSave);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error("Lỗi khi lưu danh sách vị trí:", e);
    }
  };

  const addPosition = async (position: Omit<Position, "id" | "createdAt">) => {
    const newPosition: Position = {
      ...position,
      id: Date.now(), // Dùng timestamp làm id duy nhất
      createdAt: new Date().toISOString(),
    };
    const updatedPositions = [...positions, newPosition];
    setPositions(updatedPositions);
    await savePositionsToStorage(updatedPositions);
  };

  const updatePosition = async (updatedPosition: Position) => {
    const updatedPositions = positions.map((p) =>
      p.id === updatedPosition.id ? updatedPosition : p
    );
    setPositions(updatedPositions);
    await savePositionsToStorage(updatedPositions);
  };

  const deletePosition = async (id: number) => {
    const updatedPositions = positions.filter((p) => p.id !== id);
    setPositions(updatedPositions);
    await savePositionsToStorage(updatedPositions);
  };

  const getPositionById = (id: number): Position | undefined => {
    return positions.find((p) => p.id === id);
  };

  const togglePositionStatus = async (id: number) => {
    const positionToUpdate = positions.find((p) => p.id === id);
    if (positionToUpdate) {
      const newStatus: PositionStatus =
        positionToUpdate.positionStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      const updatedPosition = {
        ...positionToUpdate,
        positionStatus: newStatus,
      };
      await updatePosition(updatedPosition);
    }
  };

  return {
    positions,
    loading,
    addPosition,
    updatePosition,
    deletePosition,
    getPositionById,
    togglePositionStatus,
    refreshPositions: getPositions,
  };
};
