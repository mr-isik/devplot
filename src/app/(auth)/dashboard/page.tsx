import { AppNavigation } from "@/components/layout/AppNavigation";
import Portfolios from "@/features/portfolios/portfolios";

export async function generateMetadata() {
  return {
    title: "DevPlot | Dashboard",
    description: "DevPlot | Dashboard",
  };
}

export default function Dashboard() {
  return (
    <div>
      <AppNavigation />
      <Portfolios />
    </div>
  );
}
