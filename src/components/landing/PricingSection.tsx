"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plan } from "@/features/plans/types";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PricingCard } from "./PricingCard";

export function PricingSection({ plans }: { plans: Plan[] }) {
  const [isYearly, setIsYearly] = useState(true);

  const filteredPlans = plans.filter((plan) => {
    const isYearlyPlan = plan.recurrence.toLowerCase().includes("year");
    return isYearly ? isYearlyPlan : !isYearlyPlan;
  });

  return (
    <section className="w-full py-20 bg-muted/30 relative overflow-hidden">
      <div className="container max-w-4xl px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-sm">
            Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Invest in your career
          </h2>
          <p className="text-lg text-foreground/80 mb-8">
            Choose a plan that fits your needs - a good portfolio always pays
            for itself.
          </p>

          <div className="flex items-center justify-center mb-8">
            <div className="relative flex items-center p-1 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50">
              <div
                className={cn(
                  "absolute h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-full bg-background shadow-sm transition-all duration-300 ease-in-out",
                  isYearly ? "translate-x-[calc(100%-2px)]" : "translate-x-1"
                )}
              />
              <button
                onClick={() => setIsYearly(false)}
                className={cn(
                  "relative px-6 py-2 text-sm font-medium rounded-full transition-colors duration-200 z-10",
                  !isYearly
                    ? "text-primary"
                    : "text-foreground/60 hover:text-foreground"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={cn(
                  "relative px-6 py-2 text-sm font-medium rounded-full transition-colors duration-200 z-10",
                  isYearly
                    ? "text-primary"
                    : "text-foreground/60 hover:text-foreground"
                )}
              >
                Yearly
                <span className="absolute -top-5 -right-8 text-[10px] font-medium bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                  2 Months Free
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPlans.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              isYearly={isYearly}
              index={index}
            />
          ))}
        </div>

        <div className="mt-16 text-center glass dark:glass-dark p-6 md:p-8 rounded-xl border border-border/40 max-w-3xl mx-auto backdrop-blur-md hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-chart-5/5 rounded-xl opacity-30"></div>
          <h3 className="text-xl md:text-2xl font-semibold mb-4 relative z-10">
            Have special requirements?
          </h3>
          <p className="text-foreground/80 mb-6 relative z-10">
            We offer custom plans for partners, educational institutions, or
            special requirements.
          </p>
          <Link href="/contact" className="relative z-10">
            <Button variant="outline" size="lg" className="group">
              Contact Us
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-md"></div>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
