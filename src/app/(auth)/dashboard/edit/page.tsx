import { getPortfolioByUserId } from "@/actions/portfolios/actions";
import { getUser } from "@/actions/users/actions";
import { redirect } from "next/navigation";

type Props = {
  params: {
    locale: string;
  };
};

export async function generateMetadata() {
  return {
    title: "DevPlot | Edit Portfolio",
    description: "DevPlot | Edit Portfolio",
  };
}

export default async function EditPortfolioPage({ params }: Props) {
  const { locale } = params;
  const { userData } = await getUser();

  const { data: portfolios } = await getPortfolioByUserId(userData[0].id);

  if (!portfolios || portfolios.length === 0) {
    redirect(`/${locale}/dashboard/create`);
  }

  return (
    <div className="container space-y-6 py-12">
      <div className="mx-auto flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Edit Portfolio</h1>
        <p className="text-muted-foreground">Update your portfolio details</p>
      </div>

      <div className="h-[calc(100vh-250px)]">
        <div className="flex h-full items-center justify-center">
          <p className="text-xl text-muted-foreground">
            Portfolio edit page is under construction
          </p>
        </div>
      </div>
    </div>
  );
}
