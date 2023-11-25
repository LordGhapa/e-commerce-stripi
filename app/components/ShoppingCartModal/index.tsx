"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";

export default function ShoppingCartModal() {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
    redirectToCheckout,
  } = useShoppingCart();

  async function handleCheckOutClick(e: any) {
    e.preventDefault();
    try {
      const result = await redirectToCheckout();
      if (result?.error) {
        console.log("Result ");
      }
    } catch (e) {
      console.log("ERROR em handleCheckOutClick ", e);
    }
  }

  const handleCart = () => {
    if (cartCount === 0) {
      return <h1 className="mt-6 ">Carrinho Vazio</h1>;
    }
    return (
      <>
        {Object.values(cartDetails ?? {}).map((entry) => (
          <li key={entry.id} className="flex py-6 ">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <Image
                src={entry.image as string}
                alt={entry.name}
                width={100}
                height={100}
              />
            </div>

            <div className="ml-4 flex flex-1 flex-col ">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900 ">
                  <h3>{entry.name}</h3>
                  <p className="ml-4">R${entry.price}</p>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                  {entry.description}
                </p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500 ">QTD: {entry.quantity}</p>
                <div className=" flex ">
                  <button
                    onClick={() => removeItem(entry.id)}
                    type="button"
                    className="font-medium text-primary hover:text-primary/80"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </>
    );
  };
  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="w-[90vw] sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col justify-between ">
          <div className="mt-8 flex-1 overflow-y-auto ">
            <ul className="-my-6 divide-y divide-gray-200 ">{handleCart()}</ul>
          </div>
          <div className="mb-4 border-t-gray-200 px-4 pt-6 sm:px-6">
            <div className="flex justify-between text-base  font-medium text-gray-900">
              <p>SubTotal:</p>
              <p>${totalPrice}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Frete/Taxas Calculado na Pagina de pagamento.
            </p>
            <div className="mt-6">
              <Button onClick={handleCheckOutClick} className="w-full">
                Pagamento
              </Button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500 ">
              <p>
                ou{" "}
                <button
                  onClick={() => handleCartClick()}
                  className=" font-medium text-primary hover:text-primary/80 "
                >
                  Continue as Compras
                </button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
