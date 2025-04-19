import { getFullPortfolio, getPortfolio } from "@/actions/portfolios/actions";
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
    redirect("/login");
  }

  const { data: portfolios } = await getPortfolio(userData[0].id);

  if (!portfolios || portfolios.length <= 0) {
    redirect(`/dashboard/create`);
  }

  const id = userData[0].id;
  const { data: fullPortfolio, error } = await getFullPortfolio(id);

  if (error || !fullPortfolio || fullPortfolio.length === 0) {
    redirect(`/dashboard/create`);
  }

  return (
    <div className="container space-y-6 py-12">
      <div className="mx-auto flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Edit Portfolio</h1>
        <p className="text-muted-foreground">Update your portfolio details</p>
      </div>

      <EditPortfolioForm
        portfolioData={fullPortfolio[0]}
        portfolioId={portfolios[0].id}
      />
    </div>
  );
}
