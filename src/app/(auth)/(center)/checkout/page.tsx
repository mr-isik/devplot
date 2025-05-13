import { Checkout } from "@/components/landing/Checkout";
import { getUser } from "@/actions/users/actions";
import { Card, CardContent } from "@/components/ui/card";
import { PlanSummary } from "@/components/checkout/PlanSummary";
import { redirect } from "next/navigation";
import { getPlanById } from "@/actions/plans/actions";

export const metadata = {
  title: "Checkout - Devplot",
  description: "Checkout page",
};

const CheckoutPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ planId?: string; priceId?: string }>;
}) => {
  const { userData } = await getUser();
  const { planId, priceId } = await searchParams;

  const res = await fetch("http://ip-api.com/json/");
  const data = await res.json();
  const country =
    data.countryCode === "TR" || data.countryCode === "US"
      ? data.countryCode
      : undefined;

  if (!userData) {
    return redirect("/sign-in");
  }

  if (!planId || !priceId) {
    return redirect("/pricing");
  }

  const { data: plan, error } = await getPlanById(planId, priceId, country);

  if (error || !plan) {
    return redirect("/pricing");
  }

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Column - Plan Details */}
      <PlanSummary plan={plan} country={country} />

      {/* Right Column - Checkout Component */}
      <div className="lg:sticky lg:top-8 h-full w-full flex justify-center items-center">
        <Card className="bg-transparent border-none w-full">
          <CardContent className="checkout-container">
            <Checkout user={userData} plan={plan} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
