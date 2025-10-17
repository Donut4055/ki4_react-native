import { useQuery } from '@tanstack/react-query';
import { getProducts, type Product } from '@/services/api';

export const useProducts = () => {
  const { data, error, isLoading, isError } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return { 
    data: data || [], 
    error, 
    isLoading, 
    isError 
  };
};