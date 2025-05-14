import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import SortSelect from "@/components/SortSelect";
import { ProductsContext } from "@/contexts/ProductsContext";
import type { Product } from "lib/types";
import type { GetServerSidePropsContext } from "next";
import { useContext, useEffect } from "react";
import getProducts from "routes/getProducts";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queries = ctx.query;
  const data = await getProducts(queries);
  return { props: { products: data.products } };
}

// TODO: IMPLEMENTAR ORDENAÇÃO POR PREÇO E ESTRELAS
export default function HomePage({ products }: { products: Product[] }) {
  const productsContext = useContext(ProductsContext);

  useEffect(() => productsContext.updateProducts(products), [products]);

  return (
    <>
      <SearchBar />
      <SortSelect />
      <div className="mt-10 flex flex-wrap gap-20">
        {productsContext.products.map((product) => (
          <ProductCard product={product} key={product.name} />
        ))}
        <div className="flex w-full justify-center gap-2 p-5">
          <Button>Anterior</Button>
          <Button>Próximo</Button>
        </div>
      </div>
    </>
  );
}
