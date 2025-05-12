import { getPlans } from "@/actions/plans/actions";
import FAQSection from "@/components/landing/FAQSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Pricing - Devplot",
  description:
    "Choose a plan that fits your needs - a good portfolio always pays for itself.",
};

const PricingPage = async () => {
  const res = await fetch("http://ip-api.com/json/");
  const data = await res.json();
  const country =
    data.countryCode === "TR" || data.countryCode === "US"
      ? data.countryCode
      : undefined;

  const { data: plans, error } = await getPlans(country);

  if (error) {
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Error fetching plans</h1>
      <p className="text-sm text-muted-foreground">{error.message}</p>
    </div>;
  }

  return (
    <>
      <PricingSection plans={plans!} />
      <FAQSection />
    </>
  );
};

export default PricingPage;
