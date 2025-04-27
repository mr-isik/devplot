import { getFullPortfolio, getPortfolio } from "@/actions/portfolios/actions";
import {
  getPortfolioSkills,
  getSkillCategories,
  getSkills,
} from "@/actions/skills/actions";
import { getTenant } from "@/actions/tenants/actions";
import { getUser } from "@/actions/users/actions";
import EditPortfolioForm from "@/features/portfolios/forms/EditPortfolioForm";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  return {
    title: "DevPlot | Edit Portfolio",
    description: "DevPlot | Edit Portfolio",
  };
}

export default async function EditPortfolioPage() {
  const { userData } = await getUser();

  if (!userData || userData.length === 0) {
    redirect("/sign-in");
  }

  const { data: tenants, error: tenantError } = await getTenant(userData[0].id);

  if (tenantError) {
    console.error("Tenant retrieval error:", tenantError);
    redirect("/dashboard");
  }
  const id = tenants[0].id;
  const { data: fullPortfolio, error } = await getFullPortfolio(id);

  if (error || !fullPortfolio || fullPortfolio.length === 0) {
    redirect(`/dashboard/create`);
  }

  const [
    { data: skillsResponse },
    { data: categoriesResponse },
    { data: portfolioSkillsResponse },
  ] = await Promise.all([
    getSkills(),
    getSkillCategories(),
    getPortfolioSkills(fullPortfolio[0].id),
  ]);

  const skillsData = {
    allSkills: skillsResponse,
    categories: categoriesResponse,
    portfolioSkills: portfolioSkillsResponse,
  };

  return (
    <div className="container space-y-6 py-12">
      <div className="mx-auto flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Edit Portfolio</h1>
        <p className="text-muted-foreground">Update your portfolio details</p>
      </div>

      <EditPortfolioForm
        portfolio={fullPortfolio[0]}
        id={fullPortfolio[0].id}
        skillsData={skillsData}
      />
    </div>
  );
}
