"use client";
import { urlFor } from "@/app/lib/sanity";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { ProductCart } from "../AddToBag";


export default function CheckOutNow({
  currency,
  description,
  image,
  name,
  price,
  price_id,
}: ProductCart) {
  const { checkoutSingleItem } = useShoppingCart();
  function buyNow(price_id: string) {
    checkoutSingleItem(price_id)
  }

  const product = {
    name,
    description,
    price,
    currency,
    image: urlFor(image).url(),
    price_id,
  };
  return (
    <Button
      variant={"secondary"}
      onClick={() => {
        buyNow(product.price_id);
      }}
    >
      Comprar agora
    </Button>
  );
}
