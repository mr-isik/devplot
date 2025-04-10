"use client";

import type { Theme, ThemeVariant } from "../types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllThemes } from "@/features/themes/registry/themeRegistry";
import { motion } from "framer-motion";
import { CheckIcon, EyeIcon, Paintbrush2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ThemeSelectorProps = {
  currentThemeId?: ThemeVariant;
  currentColorTheme?: string;
  onSelectTheme?: (themeId: ThemeVariant) => void;
  onSelectColorTheme?: (colorTheme: string) => void;
};

export default function ThemeSelector({
  currentThemeId,
  currentColorTheme,
  onSelectTheme,
  onSelectColorTheme,
}: ThemeSelectorProps) {
  const themes = getAllThemes();
  const [selectedThemeId, setSelectedThemeId] = useState<
    ThemeVariant | undefined
  >(currentThemeId);

  const [selectedColorTheme, setSelectedColorTheme] = useState<
    string | undefined
  >(currentColorTheme || "light");

  const handleSelectTheme = (themeId: ThemeVariant) => {
    setSelectedThemeId(themeId);
    if (onSelectTheme) {
      onSelectTheme(themeId);
    }
  };

  const handleSelectColorTheme = (colorTheme: string) => {
    setSelectedColorTheme(colorTheme);
    if (onSelectColorTheme) {
      onSelectColorTheme(colorTheme);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Themes</h2>
          <p className="text-muted-foreground">
            Choose a theme to customize your portfolio
          </p>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="minimal">Minimal</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="w-full">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {themes.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                isSelected={selectedThemeId === theme.id}
                onSelect={() => handleSelectTheme(theme.id as ThemeVariant)}
              />
            ))}
          </div>
        </TabsContent>

        {/* Kategori sekmelerinde filtrelenmiş temalar gösterilecek */}
        <TabsContent value="minimal">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {themes
              .filter((theme) => theme.id === "minimal")
              .map((theme) => (
                <ThemeCard
                  key={theme.id}
                  theme={theme}
                  isSelected={selectedThemeId === theme.id}
                  onSelect={() => handleSelectTheme(theme.id as ThemeVariant)}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

type ThemeCardProps = {
  theme: Theme;
  isSelected?: boolean;
  onSelect: () => void;
};

function ThemeCard({ theme, isSelected, onSelect }: ThemeCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card
        className={`flex h-full flex-col overflow-hidden border-2 ${isSelected ? "border-primary" : "border"}`}
      >
        <CardHeader className="p-0">
          <div className="relative h-64 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src={theme.thumbnail || "/themes/placeholder-thumbnail.jpg"}
              alt={theme.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="duration-10000 object-cover object-top transition-all ease-linear hover:object-bottom"
            />
            <div className="absolute right-2 top-2 flex gap-1">
              <Badge
                variant={isSelected ? "default" : "outline"}
                className="font-semibold"
              >
                {theme.name}
              </Badge>

              {isSelected && (
                <Badge className="bg-primary text-primary-foreground">
                  <CheckIcon className="mr-1 size-3" />
                  Current theme
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="grow p-4">
          <CardTitle className="mb-2 text-xl">{theme.name}</CardTitle>
          <CardDescription>{theme.description}</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between gap-2 p-4 pt-0">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/themes/preview/${theme.id}`}>
              <EyeIcon className="mr-2 size-4" />
              Preview
            </Link>
          </Button>

          <Button
            variant={isSelected ? "secondary" : "default"}
            size="sm"
            onClick={onSelect}
            className="ml-auto"
          >
            {isSelected ? (
              <>
                <CheckIcon className="mr-2 size-4" />
                Theme selected
              </>
            ) : (
              <>
                <Paintbrush2Icon className="mr-2 size-4" />
                Select theme
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
