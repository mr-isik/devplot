import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchPortfolioById,
  fetchPortfolioMetadata,
} from "@/features/portfolios/services/portfolioDataService";
import PortfolioRenderer from "@/features/themes/components/PortfolioRenderer";

// Generate metadata for the portfolio page
export async function generateMetadata({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> {
  const { id } = await params;

  const { metadata, error } = await fetchPortfolioMetadata(id);

  if (error || !metadata) {
    return {
      title: "Portfolio Not Found",
      description: "The requested portfolio could not be found.",
    };
  }

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: "website",
    },
  };
}

// The portfolio page component - now with clear separation of concerns:
// 1. Data fetching is handled by the portfolioDataService
// 2. Theme selection and rendering is handled by the PortfolioRenderer
const PortfolioPage = async ({ params }: { params: { id: number } }) => {
  const { id } = await params;

  // Fetch portfolio data using our data service
  const { portfolio, error } = await fetchPortfolioById(id);

  // Handle errors or missing data
  if (error || !portfolio) {
    return notFound();
  }

  // Render the portfolio with the appropriate theme
  return <PortfolioRenderer portfolio={portfolio} />;
};

export default PortfolioPage;
