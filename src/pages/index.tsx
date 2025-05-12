import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import type { Product } from "lib/types";
import getProducts from "routes/getProducts";

export async function getServerSideProps(ctx) {
  const queries = ctx.query;
  let products: Product[] = [];

  products = await getProducts({ searchParams: queries });

  return { props: { ...products } };
}
// TODO: IMPLEMENTAR BUSCA POR NOME OU PALAVRAS CHAVES
// TODO: IMPLEMENTAR ORDENÇÃO POR PREÇO E ESTRELAS
export default function Page({ products }: { products: Product[] }) {
  return (
    <>
      <SearchBar />
      <div className="mt-10 flex flex-wrap gap-20">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
        <div className="flex w-full justify-center gap-2 p-5">
          <Button>Anterior</Button>
          <Button>Próximo</Button>
        </div>
      </div>
    </>
  );
}
