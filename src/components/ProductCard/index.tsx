import type { Product } from "lib/types";
import Image from "next/image";
import { Cart } from "../icons/Cart";
import { Heart } from "../icons/Heart";
import { useState } from "react";
import Button from "../Button";

export default function ProductCard({ product }: { product: Product }) {
  const [isFilled, setIsFilled] = useState(false);

  const handleFilledState = () => setIsFilled((prevState) => !prevState);

  return (
    <div
      className="m-2 grid w-full grid-cols-4 place-items-center gap-y-4 rounded-3xl p-3"
      key={product.id}
    >
      <Image
        src={product.image}
        className="col-span-full m-auto"
        alt="product image"
        width={150}
        height={150}
        style={{ width: "auto", height: "auto" }}
        priority
      />
      <span className="col-span-full place-self-start font-semibold text-neutral-600">
        {product.name}
      </span>
      <span className="col-span-3 place-self-start text-2xl font-bold text-green-900">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(product.price)}
      </span>
      <span className="col-start-4 text-center">
        <span className="text-xl text-amber-700">{product.rating.stars}</span> (
        {product.rating.reviews})
      </span>
      <Button classNames="col-span-3">
        Comprar <Cart />
      </Button>
      <button>
        <Heart
          classNames="text-chili-red"
          isFilled={isFilled}
          handleFilledState={handleFilledState}
        />
      </button>
    </div>
  );
}
