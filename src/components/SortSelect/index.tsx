import { ProductsContext } from "@/contexts/ProductsContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import getProducts from "routes/getProducts";

export default function SortSelect() {
  const router = useRouter();
  const productsContext = useContext(ProductsContext);

  const handleSelectSort = async (query: string) => {
    const queries = { ...router.query, sort: query };
    router.replace(router.pathname, { query: queries }, { shallow: true });
    const data = await getProducts(queries);
    productsContext.updateProducts(data.products);
  };

  return (
    <div className="m-2 mt-5 flex justify-end">
      <select
        className="rounded-md border-neutral-200 bg-neutral-100 p-3"
        onChange={(e) => handleSelectSort(e.target.value)}
        defaultValue={router.query.sort || "default"}
      >
        <option disabled value="default">
          Filtrar por
        </option>
        <option value="byPriceAsc">Preço - Asc</option>
        <option value="byPriceDesc">Preço - Desc</option>
        <option value="byStarsAsc">Estrelas - Asc</option>
        <option value="byStarsDesc">Estrelas - Desc</option>
      </select>
    </div>
  );
}
