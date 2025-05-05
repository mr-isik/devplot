import { getUser } from "@/actions/users/actions";
import PortfolioForm from "@/features/portfolios/forms/PortfolioForm";
import { getPortfolio, getPortfolios } from "@/actions/portfolios/actions";
import { redirect } from "next/navigation";
import { createTenant, getTenant } from "@/actions/tenants/actions";
import { getSkills } from "@/actions/skills/actions";
import { getSkillCategories } from "@/actions/skills/actions";
import { getPortfolioSkills } from "@/actions/skills/actions";

export async function generateMetadata() {
  return {
    title: `Create Portfolio - DevPlot`,
    description: "Create your portfolio with DevPlot",
  };
}

export default async function CreatePortfolioPage() {
  const { userData } = await getUser();

  if (!userData) {
    redirect("/sign-in");
  }

  const { data: tenants, error: tenantError } = await getTenant(userData[0].id);

  if (tenantError) {
    console.error("Tenant retrieval error:", tenantError);
    redirect("/dashboard");
  }

  let tenantId = tenants[0]?.id;

  if (tenants.length === 0) {
    const { data: tenantData, error: tenantError } = await createTenant(
      userData[0].id
    );

    if (tenantError) {
      console.error("Tenant creation error:", tenantError);
      redirect("/dashboard");
    }

    /* @ts-ignore */
    tenantId = tenantData?.id;
  }
  const { data: portfolios } = await getPortfolios(tenantId);

  if (portfolios && portfolios.length > 0) {
    redirect(`/dashboard/edit`);
  }

  const [{ data: skillsResponse }, { data: categoriesResponse }] =
    await Promise.all([getSkills(), getSkillCategories()]);

  const skillsData = {
    allSkills: skillsResponse,
    categories: categoriesResponse,
    portfolioSkills: [],
  };
  return (
    <div className="container space-y-6 py-12">
      <div className="mx-auto flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Create Portfolio</h1>
        <p className="text-muted-foreground">
          Create your portfolio with DevPlot
        </p>
      </div>

      <div className="h-[calc(100vh-250px)]">
        <PortfolioForm tenantId={tenantId} skillsData={skillsData} />
      </div>
    </div>
  );
}
