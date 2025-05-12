"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Shield, CreditCard, Sparkles } from "lucide-react";
import { Plan } from "@/features/plans/types";
import { getPlanById } from "@/actions/plans/actions";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";

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

export function PlanSummary({ country }: { country?: string }) {
  const searchParams = useSearchParams();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const planId = searchParams.get("planId");
  const priceId = searchParams.get("priceId");

  useEffect(() => {
    async function fetchPlan() {
      try {
        const { data, error } = await getPlanById(planId!, priceId!, country);
        setPlan(data);
        setError(error);
      } catch (error) {
        setError(error as Error);
      }
    }
    fetchPlan();
  }, [error]);

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        Error: {error.message}
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="overflow-hidden border-2 border-primary/10 hover:border-primary/20 transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between"
          >
            <div>
              <h3 className="font-bold text-lg bg-gradient-to-r from-primary to-primary/90 bg-clip-text text-transparent">
                {plan.name} Plan
              </h3>
              <p className="text-muted-foreground">
                {plan.prices[0].billing_cycle} billing
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">
                {
                  currencies.find((c) => c.code === plan.prices[0].currency)
                    ?.symbol
                }
                {plan.prices[0].price_amount}
                <span className="text-sm font-normal text-muted-foreground">
                  /{plan.prices[0].billing_cycle}
                </span>
              </p>
            </div>
          </motion.div>

          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              What's included:
            </h4>
            <ul className="space-y-3">
              {plan.features.map((feature: string, index: number) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 text-muted-foreground group"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-foreground transition-colors">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="pt-4">
            <div className="flex items-center justify-between font-semibold text-lg pt-2 border-t">
              <span>Total</span>
              <span className="text-primary">
                {
                  currencies.find((c) => c.code === plan.prices[0].currency)
                    ?.symbol
                }
                {plan.prices[0].price_amount}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
