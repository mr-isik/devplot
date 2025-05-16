"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plan } from "@/features/plans/types";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Loader from "../globals/Loader";

interface PricingCardProps {
  plan: Plan;
  isYearly: boolean;
  index: number;
}

const currencies = [
  {
    code: "USD",
    symbol: "$",
  },
  {
    code: "TRY",
    symbol: "₺",
  },
];

export function PricingCard({ plan, isYearly, index }: PricingCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const currentPrice = plan.prices.find((price) => {
    const isYearlyPrice = price.billing_cycle.toLowerCase().includes("year");
    return isYearly ? isYearlyPrice : !isYearlyPrice;
  });

  const handlePlanClick = async (priceId: string, planId: number) => {
    try {
      setIsLoading(true);
      const checkoutLink = `/checkout?priceId=${priceId}&planId=${planId}`;
      if (checkoutLink) {
        window.location.href = checkoutLink;
      }
    } catch (error) {
      console.error("Error redirecting to checkout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentPrice) return null;

  return (
    <Card
      className={`relative overflow-hidden animate-fade-in group transition-all duration-300 justify-between flex flex-col ${
        plan.featured
          ? "border-primary/30 shadow-lg hover:shadow-xl"
          : "border-border/80 hover:shadow-md"
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Card background effects */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          plan.featured
            ? "from-primary/5 via-accent/5 to-chart-5/5"
            : "from-background to-muted"
        } opacity-30 group-hover:opacity-50 transition-opacity duration-500`}
      ></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Animated background orbs */}
      <div className="absolute -bottom-16 -right-16 size-32 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
      <div className="absolute -top-16 -left-16 size-32 rounded-full bg-gradient-to-br from-accent/20 to-transparent blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
      <div>
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              {plan.name}
            </CardTitle>

            {plan.featured && (
              <Badge
                variant="default"
                className="text-sm absolute top-2 right-2"
              >
                Most Popular
              </Badge>
            )}

            <div className="size-8 rounded-full glass dark:glass-dark backdrop-blur-md flex items-center justify-center border border-border/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="size-5 rounded-full bg-gradient-to-br from-primary to-accent opacity-80"></div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 relative z-10">
          <div className="flex items-center text-foreground relative">
            <span className="text-4xl font-bold group-hover:text-primary transition-colors">
              {currencies.find((c) => c.code === currentPrice.currency)?.symbol}
              {currentPrice.price_amount}
            </span>

            <div className="flex flex-col">
              <span className="ml-2 text-sm text-foreground/70">
                / {currentPrice.billing_cycle}
              </span>
            </div>
          </div>

          <ul className="space-y-3">
            {plan.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-center text-foreground group-hover:translate-x-1 transition-transform duration-300 opacity-80 hover:opacity-100"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <CheckCircle2 className="h-5 w-5 mr-3 flex-shrink-0 text-chart-5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </div>

      <CardFooter className="relative z-10">
        <Button
          onClick={() => handlePlanClick(currentPrice.price_id, plan.id)}
          variant={plan.featured ? "default" : "outline"}
          size="lg"
          disabled={isLoading}
          className="w-full"
        >
          <Loader state={isLoading}>{plan.button_text}</Loader>
        </Button>
      </CardFooter>
    </Card>
  );
}
