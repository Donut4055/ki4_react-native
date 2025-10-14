export interface LoginRequest {
  phoneNumber: string;
  password: string;
  deviceId: string;
  isRemembered: boolean;
}

export interface RegisterRequest {
  phoneNumber: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  deviceId: string;
}
