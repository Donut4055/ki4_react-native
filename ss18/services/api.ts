import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const API_BASE_URL = 'https://nest-api-public.ixe-agent.io.vn/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('authToken');
      router.replace('/(auth)/login');
    }
    return Promise.reject(error);
  }
);

export interface LoginCredentials {
  phoneNumber: string;
  password: string;
  deviceId: string;
  isRemembered: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

export interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  status: string;
  dateOfBirth: string | null;
  address: string | null;
  gender: string;
  role: {
    id: number;
    roleCode: string;
    roleName: string;
    description: string;
    createdAt: string;
  };
}

export interface LoginData {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export type LoginResponse = ApiResponse<LoginData>;

export const login = async (credentials: {
  phoneNumber: string;
  password: string;
  deviceId?: string;
  isRemembered?: boolean;
}): Promise<LoginResponse> => {
  try {
    const payload = {
      phoneNumber: credentials.phoneNumber,
      password: credentials.password,
      deviceId: credentials.deviceId || '123456',
      isRemembered: credentials.isRemembered ?? true,
    };

    const response = await api.post<LoginResponse>('/auths/login', payload);
    
    if (response.data.data.accessToken) {
      await AsyncStorage.setItem('authToken', response.data.data.accessToken);
    }
    if (response.data.data.refreshToken) {
      await AsyncStorage.setItem('refreshToken', response.data.data.refreshToken);
    }
    
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

declare module 'axios' {
  interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

export interface ProductImage {
  id: number;
  url: string;
  publicId: string;
}

export interface Category {
  id: number;
  categoryName: string;
  categoryStatus: string;
  categoryDescription: string;
}

export interface Product {
  id: number;
  productCode: string;
  productName: string;
  price: number;
  priceFull: string;
  productStatus: string;
  description: string;
  category: Category;
  images: ProductImage[];
  createdAt: string;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<{ data: Product[] }>('/products/all');
    
    if (!response.data || !Array.isArray(response.data.data)) {
      console.error('[API] Invalid response format:', response.data);
      throw new Error('Invalid response format from server');
    }
    
    return response.data.data;
    
  } catch (error: any) {
    console.error('[API] Error in getProducts:', {
      message: error.message,
      response: error.response?.data || 'No response data',
      status: error.response?.status,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      }
    });
    
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await api.get<{ data: Product }>(`/products/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface CartResponse {
  id: number;
  userId: number;
  totalAmount: number;
  totalAmountFull: string;
  totalItems: number;
  cartItems: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export const getCart = async (): Promise<CartResponse> => {
  try {
    const response = await api.get<{ data: CartResponse }>('/carts');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export interface AddToCartPayload {
  productId: number;
  quantity: number;
}

export const addToCart = async (payload: AddToCartPayload): Promise<CartResponse> => {
  try {
    const requestData = {
      productId: Number(payload.productId),
      quantity: Math.max(1, Math.floor(Number(payload.quantity)))
    };
    
    const response = await api.post<{ data: CartResponse }>('/carts/add', requestData);
    
    return response.data.data;
  } catch (error: any) {
    console.error('Error adding to cart:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data
      }
    });
    
    if (error.response) {
      if (error.response.status === 400) {
        console.error('Validation error details:', error.response.data);
        throw new Error(error.response.data?.message || 'Dữ liệu không hợp lệ');
      }
      if (error.response.status === 401) {
        throw new Error('Vui lòng đăng nhập để thêm vào giỏ hàng');
      }
    }
    
    throw error;
  }
};

export const updateCartItem = async (itemId: number, quantity: number): Promise<CartResponse> => {
  try {
    const validatedQuantity = Math.max(1, Math.floor(Number(quantity)));
    const token = await AsyncStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('Vui lòng đăng nhập để cập nhật giỏ hàng');
    }

    const response = await api.put<{ data: CartResponse }>(
      `/carts/items/${itemId}`,
      { quantity: validatedQuantity },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    return response.data.data;
  } catch (error: any) {
    console.error('Error updating cart item:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });

    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('authToken');
      router.replace('/(auth)/login');
      throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại');
    }

    throw new Error(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật giỏ hàng');
  }
};

export const removeFromCart = async (itemId: number): Promise<CartResponse> => {
  try {
    const response = await api.delete<{ data: CartResponse }>(`/carts/items/${itemId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

export const clearCart = async (): Promise<CartResponse> => {
  try {
    const response = await api.delete<{ data: CartResponse }>('/carts/clear');
    return response.data.data;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

export default api;
