"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Plan } from "@/features/plans/types";
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

interface PlanSummaryProps {
  plan: Plan;
  country?: string;
}

export function PlanSummary({ plan, country }: PlanSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 bg-gradient-to-b from-secondary/10 to-secondary/5 h-full rounded-2xl flex justify-center items-center"
    >
      <Card className="overflow-hidden bg-transparent duration-300 border-none w-full max-w-3xl px-16 py-12">
        <CardContent className="space-y-8 pt-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between bg-primary/5 p-8 rounded-xl"
          >
            <div>
              <h3 className="font-bold text-3xl bg-gradient-to-r from-primary to-primary/90 bg-clip-text text-transparent tracking-tight">
                {plan.name} Plan
              </h3>
              <p className="text-muted-foreground text-xl mt-2">
                {plan.prices[0].billing_cycle} billing
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold tracking-tight">
                {
                  currencies.find((c) => c.code === plan.prices[0].currency)
                    ?.symbol
                }
                {plan.prices[0].price_amount}
                <span className="text-xl font-normal text-muted-foreground ml-2">
                  /{plan.prices[0].billing_cycle}
                </span>
              </p>
            </div>
          </motion.div>

          <div className="space-y-6">
            <h4 className="font-semibold text-2xl flex items-center gap-3 bg-primary/5 p-4 rounded-lg">
              <Sparkles className="h-7 w-7 text-primary" />
              What's included:
            </h4>
            <ul className="space-y-1">
              {plan.features.map((feature: string, index: number) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 text-muted-foreground group hover:bg-primary/5 p-2 rounded-lg transition-all duration-200"
                >
                  <CheckCircle2 className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-foreground transition-colors text-xl font-medium">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="pt-6">
            <div className="flex items-center justify-between font-semibold text-2xl py-4 px-6 border-t border-border/50 bg-primary/5 rounded-xl">
              <span>Total</span>
              <span className="text-primary text-3xl">
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
