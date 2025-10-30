export interface BaseResponse<T> {
  data: T[];
  status: number;
  message: string;
}

export interface SingleResponse<T> {
  data: T;
  status: number;
  message: string;
}
