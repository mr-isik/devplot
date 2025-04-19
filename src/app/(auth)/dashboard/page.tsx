import { getPortfolios } from "@/actions/portfolios/actions";
import { getUser } from "@/actions/users/actions";
import { AppNavigation } from "@/components/layout/AppNavigation";
import { DeletePortfolioDialog } from "@/components/portfolios/DeletePortfolioDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, Edit, Plus, RefreshCw } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  return {
    title: "DevPlot | Dashboard",
    description: "View and manage your developer portfolios",
  };
}

export default async function Dashboard() {
  // Get current authenticated user
  const { userData } = await getUser();

  if (!userData || userData.length === 0) {
    redirect("/sign-in");
  }

  // Get user's portfolios
  const { data: portfolios, error } = await getPortfolios(userData[0].id);

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8">
        <AppNavigation />

        <div className="mt-12 space-y-8 container max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Your Portfolios
              </h1>
              <p className="mt-1 text-muted-foreground">
                Manage and customize your developer portfolios
              </p>
            </div>

            <Link href="/dashboard/create">
              <Button size="lg" className="w-full sm:w-auto">
                <Plus className="mr-2" />
                Create Portfolio
              </Button>
            </Link>
          </div>

          {error && (
            <Card className="border-destructive/50 bg-destructive/10">
              <CardHeader>
                <CardTitle className="text-destructive">
                  Error Loading Portfolios
                </CardTitle>
                <CardDescription>
                  We encountered an issue while loading your portfolios. Please
                  try again.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" size="sm" className="mt-4">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Page
                </Button>
              </CardFooter>
            </Card>
          )}

          {!error && (!portfolios || portfolios?.length === 0) ? (
            <div className="mt-16 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mt-4 text-xl font-semibold">No portfolios yet</h2>
              <p className="mt-2 max-w-md text-muted-foreground">
                Create your first portfolio to showcase your skills, projects,
                and experience to potential employers or clients.
              </p>
              <Link href="/dashboard/create">
                <Button className="mt-6">
                  <Plus className="mr-2" />
                  Create Portfolio
                </Button>
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {portfolios?.map((portfolio) => (
                <Card
                  key={portfolio.id}
                  className="group overflow-hidden transition-all duration-300 hover:shadow-md dark:hover:shadow-primary/5"
                >
                  <CardHeader className="bg-gradient-to-br from-primary/10 to-primary/5 pb-8">
                    <CardTitle className="text-xl">
                      {portfolio.contents.meta_title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {portfolio.contents.meta_description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center">
                        <span className="text-sm font-medium">Status:</span>
                        <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          {portfolio.is_published ? "Published" : "Draft"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">Created:</span>
                        <span className="ml-2 text-sm text-muted-foreground">
                          {new Date(portfolio.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t bg-card/50 p-4">
                    <div className="flex space-x-2">
                      <Link href="/dashboard/edit">
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </Link>
                      <DeletePortfolioDialog portfolioId={portfolio.id} />
                    </div>
                    <Link href={`/${userData?.[0]?.id}`} target="_blank">
                      <Button size="sm" variant="soft" className="gap-1">
                        View
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
