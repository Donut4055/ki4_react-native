import { login as apiLogin, LoginResponse } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { router } from 'expo-router';
import { Alert } from 'react-native';

// Hàm kiểm tra token hết hạn
const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000; // Chuyển sang giây
    return payload.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

type User = {
  id: string;
  phoneNumber: string;
  name: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  role?: {
    roleCode: string;
    roleName: string;
  };
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (credentials: {
    phoneNumber: string;
    password: string;
    isRemembered?: boolean;
  }) => Promise<LoginResponse>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = useCallback(async () => {
    try {
      const [token, refreshToken] = await Promise.all([
        AsyncStorage.getItem('authToken'),
        AsyncStorage.getItem('refreshToken'),
      ]);

      // Nếu không có token hoặc refresh token
      if (!token || !refreshToken) {
        await AsyncStorage.multiRemove(['authToken', 'refreshToken', 'userData']);
        setUser(null);
        router.replace('/(auth)/login');
        setIsLoading(false);
        return;
      }

      // Kiểm tra token hết hạn
      if (isTokenExpired(token)) {
        // Nếu token hết hạn, kiểm tra refresh token
        if (isTokenExpired(refreshToken)) {
          // Nếu cả 2 đều hết hạn, đăng xuất
          Alert.alert(
            'Phiên đăng nhập đã hết hạn',
            'Vui lòng đăng nhập lại để tiếp tục',
            [{
              text: 'Đồng ý',
              onPress: async () => {
                await AsyncStorage.multiRemove(['authToken', 'refreshToken', 'userData']);
                setUser(null);
                router.replace('/(auth)/login');
              }
            }]
          );
          return;
        }
      }

      const userDataString = await AsyncStorage.getItem('userData');
      if (!userDataString) {
        await AsyncStorage.multiRemove(['authToken', 'refreshToken', 'userData']);
        setUser(null);
        router.replace('/(auth)/login');
        return;
      }

      const userData = JSON.parse(userDataString);
      setUser(userData);
    } catch (error) {
      console.error('Error checking auth status:', error);
      await AsyncStorage.multiRemove(['authToken', 'refreshToken', 'userData']);
      setUser(null);
      router.replace('/(auth)/login');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (credentials: {
    phoneNumber: string;
    password: string;
    isRemembered?: boolean;
  }): Promise<LoginResponse> => {
    try {
      setIsLoading(true);
        
      const response = await apiLogin({
        phoneNumber: credentials.phoneNumber.trim(),
        password: credentials.password.trim(),
        deviceId: "123456",
        isRemembered: credentials.isRemembered ?? true,
      });

      const responseData = response.data;


      if (!responseData || !responseData.user) {
        console.error("Invalid response structure:", responseData);
        throw new Error("No user data received from server");
      }

      const tokenPairs: [string, string][] = [
        ["authToken", responseData.accessToken],
      ];

      if (responseData.refreshToken) {
        tokenPairs.push(["refreshToken", responseData.refreshToken]);
      }

      await AsyncStorage.multiSet(tokenPairs);

      const userData = {
        id: responseData.user.phoneNumber,
        phoneNumber: responseData.user.phoneNumber,
        name: `${responseData.user.firstName} ${responseData.user.lastName}`.trim(),
        email: responseData.user.email,
        firstName: responseData.user.firstName,
        lastName: responseData.user.lastName,
        gender: responseData.user.gender,
        role: {
          roleCode: responseData.user.role.roleCode,
          roleName: responseData.user.role.roleName
        }
      };


      await AsyncStorage.setItem("userData", JSON.stringify(userData));

      setUser(userData);
      return response;
    } catch (error) {
      console.error("Login error:", error);
      await AsyncStorage.multiRemove(["authToken", "refreshToken", "userData"]);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove(["authToken", "refreshToken", "userData"]);
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
