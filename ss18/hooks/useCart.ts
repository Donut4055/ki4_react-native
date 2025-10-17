import { useCallback, useEffect } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ApiError extends Error {
  response?: {
    status: number;
    data?: any;
  };
}
import {
  updateItemQuantity,
  removeAllItemsFromCart,
  setCartItems,
} from "@/store/cartSlice";
import {
  addToCart as apiAddToCart,
  getCart,
  updateCartItem as apiUpdateCartItem,
  removeFromCart as apiRemoveFromCart,
  clearCart as apiClearCart,
} from "@/services/api";
import { useFocusEffect } from "@react-navigation/native";

interface ApiError extends Error {
  response?: {
    status: number;
    data?: any;
  };
}

export const useCart = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector(
    (state: RootState) => state.cart
  );

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [])
  );

  const loadCart = useCallback(async (showError = true) => {
  try {
    const cart = await getCart();
    dispatch(
      setCartItems({
        items: cart.cartItems.map((item) => ({
          id: item.id,
          productId: item.productId,
          name: item.productName,
          price: item.price,
          quantity: item.quantity,
          image: item.imageUrl || "",
        })),
        total: cart.totalAmount,
        totalItems: cart.totalItems,
      })
    );
    return true;
  } catch (error: unknown) {
    console.error("Failed to load cart:", error);
    if (showError) {
      if (error && typeof error === "object" && "response" in error) {
        const apiError = error as ApiError;
        if (apiError.response?.status !== 404) {
          Alert.alert("Lỗi", "Không thể tải giỏ hàng");
        }
      } else {
        Alert.alert("Lỗi", "Đã xảy ra lỗi không xác định");
      }
    }
    return false;
  }
}, [dispatch]);

const addToCart = async (
  productId: number | { id: number; name?: string; price?: number; image?: string }, 
  quantity: number = 1
) => {
  try {
    const actualProductId = typeof productId === 'number' ? productId : productId.id;
    
    if (!actualProductId) {
      Alert.alert("Lỗi", "Không tìm thấy ID sản phẩm");
      return false;
    }
    
    await apiAddToCart({ productId: actualProductId, quantity });

    await loadCart(false);

    Alert.alert("Thành công", "Đã thêm sản phẩm vào giỏ hàng");
    return true;
  } catch (error) {
    console.error("Error adding to cart:", error);
    let errorMessage = "Không thể thêm sản phẩm vào giỏ hàng";
    
    if (error && typeof error === 'object' && 'response' in error) {
      const apiError = error as ApiError;
      if (apiError.response?.status === 429) {
        errorMessage = "Bạn đang thực hiện quá nhiều yêu cầu. Vui lòng thử lại sau ít phút.";
      } else if (apiError.response?.data?.message) {
        errorMessage = apiError.response.data.message;
      }
    }
    
    Alert.alert("Lỗi", errorMessage);
    return false;
  }
};

  const updateCartItem = async (cartItemId: number, quantity: number) => {
    try {
      if (quantity < 1) {
        await removeFromCart(cartItemId);
        return false;
      }

      await apiUpdateCartItem(cartItemId, quantity);

      dispatch(updateItemQuantity({ id: cartItemId, quantity }));

      await loadCart(false);

      return true;
    } catch (error) {
      console.error("Error updating cart item:", error);
      Alert.alert("Lỗi", "Không thể cập nhật số lượng sản phẩm");
      return false;
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    try {
      await apiRemoveFromCart(cartItemId);

      await loadCart(false);

      Alert.alert("Thành công", "Đã xoá sản phẩm khỏi giỏ hàng");
      return true;
    } catch (error) {
      console.error("Error removing from cart:", error);
      Alert.alert("Lỗi", "Không thể xoá sản phẩm khỏi giỏ hàng");
      return false;
    }
  };

  const clearCart = async () => {
    try {
      await apiClearCart();

      dispatch(removeAllItemsFromCart());

      Alert.alert("Thành công", "Đã xoá toàn bộ giỏ hàng");
      return true;
    } catch (error) {
      console.error("Error clearing cart:", error);
      Alert.alert("Lỗi", "Không thể xoá giỏ hàng");
      return false;
    }
  };

  const getItemQuantity = (productId: number): number => {
    const item = items.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  };

  return {
    items,
    totalQuantity,
    totalAmount,
    addToCart,
    removeFromCart,
    updateItemQuantity: updateCartItem,
    clearCart,
    getItemQuantity,
    loadCart,
  };
};

export default useCart;
