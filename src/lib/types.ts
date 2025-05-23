export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  rating: { stars: number; reviews: number };
  createdAt: Date;
}

export interface IProductsContext {
  products: Product[];
  updateProducts: (products: Product[]) => void;
}
