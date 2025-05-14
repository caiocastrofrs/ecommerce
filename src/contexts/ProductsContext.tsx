import type { Product, IProductsContext } from "lib/types";
import { createContext, useState } from "react";

export const ProductsContext = createContext({} as IProductsContext);

export function ProductsContextProvider({ children }) {
  const [products, setProducts] = useState<Product[]>([]);

  const handleProducts = (products: Product[]) => setProducts(products);

  return (
    <ProductsContext.Provider
      value={{ products, updateProducts: handleProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
