import { AppNavigation } from "@/components/layout/AppNavigation";

export async function generateMetadata() {
  return {
    title: "DevPlot | Dashboard",
    description: "DevPlot | Dashboard",
  };
}

export default function Dashboard() {
  return (
    <>
      <AppNavigation />
    </>
  );
}
