import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeScreen from '../screens/Home';
import ProductsScreen from '../screens/Products';
import AccountScreen from '../screens/Account';
import ProductDetailScreen from '../screens/ProductDetail';
import ProductFormScreen from '../screens/ProductForm';
// Types
type RootStackParamList = {
  MainTabs: undefined;
  ProductDetail: { id: string };
  ProductForm: { productId?: string };
};

type ProductsStackParamList = {
  ProductsList: undefined;
  ProductDetail: { id: string };
  ProductForm: { productId?: string };
};

type TabParamList = {
  Home: undefined;
  Products: undefined;
  Account: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const ProductsStack = createNativeStackNavigator<ProductsStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Products Stack Navigator
function ProductsStackScreen() {
  return (
    <ProductsStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <ProductsStack.Screen 
        name="ProductsList" 
        component={ProductsScreen} 
        options={{ title: 'Sản phẩm' }}
      />
      <ProductsStack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen} 
        options={{ title: 'Chi tiết sản phẩm' }}
      />
      <ProductsStack.Screen 
        name="ProductForm" 
        component={ProductFormScreen} 
        options={{ title: 'Thêm/Sửa sản phẩm' }}
      />
    </ProductsStack.Navigator>
  );
}

// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Products') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Trang chủ' }} />
      <Tab.Screen name="Products" component={ProductsStackScreen} options={{ title: 'Sản phẩm' }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{ title: 'Tài khoản' }} />
    </Tab.Navigator>
  );
}

// Main Navigation
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen 
          name="ProductDetail" 
          component={ProductDetailScreen} 
          options={{ 
            headerShown: true,
            title: 'Chi tiết sản phẩm' 
          }}
        />
        <Stack.Screen 
          name="ProductForm" 
          component={ProductFormScreen} 
          options={{ 
            headerShown: true,
            title: 'Thêm/Sửa sản phẩm' 
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
