import { Checkout } from "@/components/landing/Checkout";
import { getUser } from "@/actions/users/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlanSummary } from "@/components/checkout/PlanSummary";
import { redirect } from "next/navigation";

const CheckoutPage = async () => {
  const { userData } = await getUser();

  const res = await fetch("http://ip-api.com/json/");
  const data = await res.json();
  const country =
    data.countryCode === "TR" || data.countryCode === "US"
      ? data.countryCode
      : undefined;

  if (!userData?.[0]) {
    return redirect("/sign-in");
  }

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Column - Plan Details */}
      <PlanSummary country={country} />

      {/* Right Column - Checkout Component */}
      <div className="lg:sticky lg:top-8 h-full w-full flex justify-center items-center">
        <Card className="bg-transparent border-none w-full">
          <CardContent className="checkout-container">
            <Checkout user={userData[0]} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
