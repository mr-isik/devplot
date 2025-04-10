import { getUser } from "@/actions/users/actions";
import PortfolioForm from "@/features/portfolios/forms/PortfolioForm";

export async function generateMetadata() {
  return {
    title: `Create Portfolio - DevPlot`,
    description: "Create your portfolio with DevPlot",
  };
}

export default async function CreatePortfolioPage() {
  const { userData } = await getUser();

  /*  // Kullanıcının portfolyosu var mı kontrol ediyoruz
  const { data: portfolios } = await getPortfolioByUserId(userData[0].id);

  // Eğer kullanıcının portfolyosu varsa edit sayfasına yönlendiriyoruz
  if (portfolios && portfolios.length > 0) {
    redirect(`/dashboard/edit`);
  } */
  return (
    <div className="container space-y-6 py-12">
      <div className="mx-auto flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Create Portfolio</h1>
        <p className="text-muted-foreground">
          Create your portfolio with DevPlot
        </p>
      </div>

      <div className="h-[calc(100vh-250px)]">
        {/* <PortfolioForm userId={userData[0].id} /> */}
      </div>
    </div>
  );
}
