import {
  getDocs,
  collection,
  where,
  query,
  orderBy,
  Query,
  type DocumentData,
} from "@firebase/firestore";
import { db } from "lib/firebase";
import type { NextApiRequest, NextApiResponse } from "next";

// TODO: Criar a paginação
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const hasQueries = Object.keys(req.query).length > 0;
    //  RETORNA TODOS OS PRODUTOS
    if (!hasQueries) getAllProducts(res);

    // RETORNA OS PRODUTOS FILTRADOS (name, price, stars, reviews)
    if (hasQueries) getProductsByFilter(req, res);
  } catch (err) {
    return res.status(500).send("failed to fetch products");
  }
}

async function getAllProducts(res: NextApiResponse) {
  const querySnapshot = await getDocs(query(collection(db, "products")));
  const products = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt.toMillis(),
    };
  });

  return res.status(200).json({ products });
}

async function getProductsByFilter(req: NextApiRequest, res: NextApiResponse) {
  try {
    const productsRef = collection(db, "products");
    const { name, sort } = req.query;

    let q: Query<DocumentData, DocumentData>;
    // FILTRO POR NOME
    if (name) {
      q = query(
        productsRef,
        where("searchTerms", "array-contains", req.query.name),
      );
    }

    // FILTRO POR PREÇO MENOR PARA MAIOR
    if (sort === "byPriceAsc") {
      q = query(q || productsRef, orderBy("price", "asc"));
    }
    // FILTRO POR PREÇO MAIOR PARA MENOR
    if (sort === "byPriceDesc") {
      q = query(q || productsRef, orderBy("price", "desc"));
    }
    // FILTRO POR ESTRELAS MENOR PARA MAIOR
    if (sort === "byStarsAsc") {
      q = query(q || productsRef, orderBy("rating.stars", "asc"));
    }
    // FILTRO POR PREÇO MAIOR PARA MENOR
    if (sort === "byStarsDesc") {
      q = query(q || productsRef, orderBy("rating.stars", "desc"));
    }

    const querySnapshot = await getDocs(q);

    const filteredProduct = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      return data;
    });

    if (filteredProduct.length > 0) {
      return res.status(200).json({ products: filteredProduct });
    } else {
      return res
        .status(200)
        .json({ products: [], message: "Nenhum produto encontrado" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("failed to fetch products");
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
