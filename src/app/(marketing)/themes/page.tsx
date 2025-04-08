import { Card, CardContent } from "@/components/ui/card";
import ThemeSelector from "@/features/themes/components/ThemeSelector";

type Props = {
  params: { locale: string };
};

export default async function ThemesPage({ params: { locale } }: Props) {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Themes</h1>
      <p className="mb-8 text-xl text-muted-foreground">
        Choose a theme to customize your portfolio
      </p>

      <Card>
        <CardContent className="p-6">
          <ThemeSelector />
        </CardContent>
      </Card>
    </div>
  );
}
