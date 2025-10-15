import { Position, PositionRequest } from "@/interfaces/position.interface";
import { RootState } from "@/redux/store";
import { axiosInstance } from "@/utils/axios-instance";
import { BaseResponse, SingleResponse } from "@/utils/response-data";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

export const getAllPosition = createAsyncThunk<
  BaseResponse<Position>,
  void,
  { rejectValue: ErrorResponse }
>("positions/getAllPosition", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get("/positions");
    return res.data as BaseResponse<Position>;
  } catch (error: any) {
    if (error.response) return rejectWithValue(error.response.data);
    if (error.request)
      return rejectWithValue({
        message: "No response from server",
        error: "Network Error",
        statusCode: 0,
      });
    return rejectWithValue({
      message: error.message,
      error: "Unknown Error",
      statusCode: 0,
    });
  }
});

export const getPosition = createAsyncThunk<
  SingleResponse<Position>,
  number,
  { rejectValue: ErrorResponse }
>("positions/getPosition", async (id, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/positions/${id}`);
    return res.data as SingleResponse<Position>;
  } catch (error: any) {
    if (error.response) return rejectWithValue(error.response.data);
    if (error.request)
      return rejectWithValue({
        message: "No response from server",
        error: "Network Error",
        statusCode: 0,
      });
    return rejectWithValue({
      message: error.message,
      error: "Unknown Error",
      statusCode: 0,
    });
  }
});

export const createPosition = createAsyncThunk<
  SingleResponse<Position>,
  PositionRequest,
  { rejectValue: ErrorResponse }
>("positions/createPosition", async (position, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/positions", position);
    return res.data as SingleResponse<Position>;
  } catch (error: any) {
    if (error.response) return rejectWithValue(error.response.data);
    if (error.request)
      return rejectWithValue({
        message: "No response from server",
        error: "Network Error",
        statusCode: 0,
      });
    return rejectWithValue({
      message: error.message,
      error: "Unknown Error",
      statusCode: 0,
    });
  }
});

export const updatePosition = createAsyncThunk<
  SingleResponse<Position>,
  { id: number; position: PositionRequest },
  { rejectValue: ErrorResponse }
>("positions/updatePosition", async ({ id, position }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.put(`/positions/${id}`, position);
    return res.data as SingleResponse<Position>;
  } catch (error: any) {
    if (error.response) return rejectWithValue(error.response.data);
    if (error.request)
      return rejectWithValue({
        message: "No response from server",
        error: "Network Error",
        statusCode: 0,
      });
    return rejectWithValue({
      message: error.message,
      error: "Unknown Error",
      statusCode: 0,
    });
  }
});

export const deletePosition = createAsyncThunk<
  SingleResponse<null>,
  number,
  { rejectValue: ErrorResponse }
>("positions/deletePosition", async (id, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.delete(`/positions/${id}`);
    return res.data as SingleResponse<null>;
  } catch (error: any) {
    if (error.response) return rejectWithValue(error.response.data);
    if (error.request)
      return rejectWithValue({
        message: "No response from server",
        error: "Network Error",
        statusCode: 0,
      });
    return rejectWithValue({
      message: error.message,
      error: "Unknown Error",
      statusCode: 0,
    });
  }
});

export const togglePositionStatus = createAsyncThunk<
  SingleResponse<Position>,
  number,
  { state: RootState; rejectValue: ErrorResponse }
>(
  "positions/togglePositionStatus",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const position = state.position.data.find((p) => p.id === id);

      if (!position) {
        return rejectWithValue({
          message: "Không tìm thấy vị trí trong state",
          error: "Not Found",
          statusCode: 404,
        });
      }

      const newStatus =
        position.positionStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";

      const res = await axiosInstance.put(`/positions/${id}`, {
        ...position,
        positionStatus: newStatus,
      });

      return res.data as SingleResponse<Position>;
    } catch (error: any) {
      if (error.response) return rejectWithValue(error.response.data);
      if (error.request)
        return rejectWithValue({
          message: "No response from server",
          error: "Network Error",
          statusCode: 0,
        });
      return rejectWithValue({
        message: error.message,
        error: "Unknown Error",
        statusCode: 0,
      });
    }
  }
);
