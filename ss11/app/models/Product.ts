export type ProductStatus = 'not_selling' | 'selling' | 'stopped';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export const productStatusMap = {
  not_selling: 'Chưa bán',
  selling: 'Đang bán',
  stopped: 'Ngừng bán'
};
