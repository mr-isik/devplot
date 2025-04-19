import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { EyeIcon, SparklesIcon } from "lucide-react";
import Image from "next/image";
import { getAllThemes } from "@/features/themes/registry/themeRegistry";
import Link from "next/link";

type Props = {
  params: { locale: string };
};

export default async function ThemesPage({ params: { locale } }: Props) {
  // Get all available themes
  const themes = getAllThemes();

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Themes</h1>
      <p className="mb-8 text-xl text-muted-foreground">
        Choose a theme to customize your portfolio
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {themes.map((theme) => (
          <Card key={theme.id} className="overflow-hidden">
            <div className="relative h-48 w-full overflow-hidden bg-muted">
              <Image
                src={theme.thumbnail || "/themes/placeholder-thumbnail.jpg"}
                alt={theme.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top transition-all duration-3000 ease-linear hover:object-bottom"
              />
              <div className="absolute right-2 top-2 flex gap-1">
                <Badge
                  variant="outline"
                  className="bg-background/80 font-semibold backdrop-blur-sm"
                >
                  {theme.name}
                </Badge>
                {theme.isPremium && (
                  <Badge className="bg-amber-500 text-white">
                    <SparklesIcon className="mr-1 size-3" />
                    Premium
                  </Badge>
                )}
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-medium">{theme.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {theme.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-muted/50 p-4">
              <Link href={`/dashboard/create?theme=${theme.id}`}>
                <Button variant="default" size="sm">
                  Use This Theme
                </Button>
              </Link>
              <Link href={`/themes/${theme.id}/preview`}>
                <Button variant="outline" size="sm">
                  <EyeIcon className="mr-2 size-4" />
                  Preview
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
