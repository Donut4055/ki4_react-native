interface ProductImage {
  id: number;
  url: string;
  publicId: string;
}

interface Category {
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

export interface ProductListResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
