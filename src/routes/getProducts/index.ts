import type { Product } from "lib/types";

export default async function getProducts({
  searchParams,
}: {
  searchParams?: URLSearchParams;
}): Promise<Product[]> {
  const query = new URLSearchParams(searchParams).toString();

  console.log(query);
  const data = await fetch("http://localhost:3000/api/products?" + query)
    .then((res) => res.json())
    .then((data) => data);

  return { ...data };
}
