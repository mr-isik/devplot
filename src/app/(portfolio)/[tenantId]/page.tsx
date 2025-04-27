import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchPortfolioMetadataWithTenantId,
  fetchPortfolioWithTenantId,
} from "@/features/portfolios/services/portfolioDataService";
import PortfolioRenderer from "@/features/themes/components/PortfolioRenderer";

type Props = {
  params: Promise<{ tenantId: string }>;
};

// Generate metadata for the portfolio page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tenantId = (await params).tenantId;

  const { metadata, error } = await fetchPortfolioMetadataWithTenantId(
    parseInt(tenantId)
  );

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
const PortfolioPage = async ({ params }: Props) => {
  const tenantId = (await params).tenantId;

  // Fetch portfolio data using our data service
  const { portfolio, error } = await fetchPortfolioWithTenantId(
    parseInt(tenantId)
  );

  // Handle errors or missing data
  if (error || !portfolio) {
    return notFound();
  }

  // Render the portfolio with the appropriate theme
  return <PortfolioRenderer portfolio={portfolio} />;
};

export default PortfolioPage;
