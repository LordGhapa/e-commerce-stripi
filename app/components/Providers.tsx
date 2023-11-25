"use client"
import { ReactNode } from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

export default function CartProvider({ children }: { children: ReactNode }) {
  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_KEY as string}
      successUrl="https://stripe-loja.vercel.app/stripe/success"
      cancelUrl="https://stripe-loja.vercel.app/stripe/error"
      currency="BRL"
      billingAddressCollection={false}
      shouldPersist={true}
      language="pt-BR"
    >
      {children}
    </USCProvider>
  );
}
