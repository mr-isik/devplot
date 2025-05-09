"use server";

import { Plan } from "./types";

export async function filterPlans(plans: Plan[], isYearly: boolean) {
  return plans.filter((plan) => {
    const isYearlyPlan = plan.recurrence.toLowerCase().includes("year");
    return isYearly ? isYearlyPlan : !isYearlyPlan;
  });
}
