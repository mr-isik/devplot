import { Checkout } from "@/components/landing/Checkout";
import { getUser } from "@/actions/users/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlanSummary } from "@/components/checkout/PlanSummary";

const CheckoutPage = async () => {
  const { userData } = await getUser();

  const res = await fetch("http://ip-api.com/json/");
  const data = await res.json();
  const country =
    data.countryCode === "TR" || data.countryCode === "US"
      ? data.countryCode
      : undefined;

  if (!userData?.[0]) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">
              Please sign in to continue with checkout
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Plan Details */}
        <PlanSummary country={country} />

        {/* Right Column - Checkout Component */}
        <div className="lg:sticky lg:top-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Complete Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="checkout-container">
              <Checkout user={userData[0]} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
