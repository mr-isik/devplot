"use client";

import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { User } from "@supabase/supabase-js";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../globals/Loader";
import { useTheme } from "next-themes";
export interface CheckoutProps {
  user?: User;
}

export function Checkout({ user }: CheckoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resolvedTheme = useTheme();

  const [paddle, setPaddle] = useState<Paddle>();
  let priceId = searchParams.get("priceId");

  useEffect(() => {
    // Don't worry about initializing it multiple times between navigations.
    // Paddle library will be initialized as a singleton instance in a global variable.
    // Subsequent calls to `initializePaddle` will return the same instance.
    initializePaddle({
      /* @ts-ignore */
      environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT,
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
      eventCallback(event) {
        switch (event.name) {
          // Redirect to home page after checkout is closed
          case "checkout.closed":
            router.push("/");
            break;
        }
      },
    }).then((paddleInstance) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, []);

  useEffect(() => {
    // This is passed by Paddle when the customer clicks a payment method update link.
    // The link is included in payment confirmation emails.
    // The link can also be retrieved from the Paddle API in `subscription.management_urls.update_payment_method`
    // You can also manually pass the transaction ID for the same purpose.
    let transactionId = searchParams.get("_ptxn");

    if (transactionId) {
      paddle?.Checkout.open({
        settings: {
          allowLogout: false,
        },
        transactionId,
      });
      return;
    }

    // Pass the priceId as a search parameter to the checkout page.
    let priceId = searchParams.get("priceId");

    if (priceId) {
      paddle?.Checkout.open({
        settings: {
          // Prevent user from changing their email
          allowLogout: false,
          displayMode: "inline",
          frameTarget: "checkout-container",
          frameStyle: "border: none; width: 100%;",
          frameInitialHeight: 400,
          theme: resolvedTheme.theme === "dark" ? "light" : "dark",
        },
        items: [{ priceId, quantity: 1 }],
        /* @ts-ignore */
        customer: {
          // You can pass the customer email if you have it
          // You can't use it if you're passing id.
          email: user?.email,
        },
        // You can pass additional data to the subscription
        customData: {
          userId: user?.id,
        },
      });
      return;
    }

    // Redirect to the home page if no transactionId or priceId
    router.push("/");
  }, [paddle?.Checkout, searchParams]);

  return <></>;
}
