// utils/auth.ts
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface JwtPayload {
  sub: string;         // User ID
  email?: string;      // User's email
  phoneNumber?: string; // User's phone number
  role?: string;       // User's role
  exp: number;         // Expiration timestamp
  iat: number;         // Issued at timestamp
}

export const getCurrentUser = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) return null;
    
    const decoded = jwtDecode<JwtPayload>(token);
    return {
      id: decoded.sub,
      email: decoded.email,
      phoneNumber: decoded.phoneNumber,
      role: decoded.role,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) return false;
    
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    
    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};