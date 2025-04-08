"use client";

import type { Theme } from "@/features/themes/types";
import type { PortfolioFormValues } from "@/lib/validations/portfolio";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DEFAULT_THEME_ID,
  getAllThemes,
  getThemeById,
} from "@/features/themes/registry";
import { motion } from "framer-motion";
import {
  CheckIcon,
  EyeIcon,
  Paintbrush2Icon,
  Settings2Icon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const colorThemes = [
  {
    id: "light",
    name: "Light",
    colors: ["#FFFFFF", "#F5F5F5", "#E5E5E5", "#000000", "#3B82F6"],
  },
  {
    id: "dark",
    name: "Dark",
    colors: ["#1E1E1E", "#2D2D2D", "#3E3E3E", "#FFFFFF", "#3B82F6"],
  },
  {
    id: "blue",
    name: "Blue",
    colors: ["#EFF6FF", "#DBEAFE", "#BFDBFE", "#000000", "#2563EB"],
  },
  {
    id: "green",
    name: "Green",
    colors: ["#ECFDF5", "#D1FAE5", "#A7F3D0", "#000000", "#059669"],
  },
  {
    id: "purple",
    name: "Purple",
    colors: ["#F5F3FF", "#E9D5FF", "#D8B4FE", "#000000", "#7C3AED"],
  },
  {
    id: "orange",
    name: "Orange",
    colors: ["#FFF7ED", "#FFEDD5", "#FED7AA", "#000000", "#EA580C"],
  },
  {
    id: "custom",
    name: "Custom",
    colors: ["#FFFFFF", "#F5F5F5", "#E5E5E5", "#000000", "#3B82F6"],
  },
];

const fonts = [
  { value: "inter", label: "Inter", description: "A clean and modern font" },
  {
    value: "roboto",
    label: "Roboto",
    description: "A professional and widely used font",
  },
  {
    value: "poppins",
    label: "Poppins",
    description: "An elegant font with soft edges",
  },
  {
    value: "montserrat",
    label: "Montserrat",
    description: "A strong and impactful font",
  },
  {
    value: "lato",
    label: "Lato",
    description: "A balanced and easy-to-read font",
  },
  {
    value: "playfair",
    label: "Playfair Display",
    description: "A classic serif font with character",
  },
  {
    value: "raleway",
    label: "Raleway",
    description: "A minimalist sans-serif with thin strokes",
  },
  {
    value: "oswald",
    label: "Oswald",
    description: "A condensed sans-serif for headlines",
  },
  {
    value: "merriweather",
    label: "Merriweather",
    description: "A traditional serif font with high readability",
  },
];

function ThemeCard({
  theme,
  isSelected,
  onSelect,
}: {
  theme: Theme;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="h-full"
      onClick={onSelect}
    >
      <Card
        className={`flex h-full cursor-pointer flex-col overflow-hidden border-2 ${
          isSelected ? "border-primary" : "border"
        }`}
      >
        <div className="relative h-40 w-full overflow-hidden bg-muted">
          <Image
            src={theme.thumbnail || "/themes/placeholder-thumbnail.jpg"}
            alt={theme.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="duration-3000 object-cover object-top transition-all ease-linear hover:object-bottom"
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
                Selected
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="grow p-4">
          <h3 className="font-medium">{theme.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {theme.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function AppearanceStep() {
  const form = useFormContext<PortfolioFormValues>();
  const themes = getAllThemes();

  const [selectedThemeId, setSelectedThemeId] = useState<string>(
    form.getValues().options.theme || DEFAULT_THEME_ID
  );
  const [selectedThemeDetails, setSelectedThemeDetails] = useState<
    Theme | undefined
  >(getThemeById(selectedThemeId as any));
  const [selectedColorTheme, setSelectedColorTheme] = useState(
    form.getValues().options.theme || "light"
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [customColors, setCustomColors] = useState<string[]>([
    "#FFFFFF",
    "#F5F5F5",
    "#E5E5E5",
    "#000000",
    "#3B82F6",
  ]);

  const handleThemeSelect = (theme: Theme) => {
    setSelectedThemeId(theme.id);
    setSelectedThemeDetails(theme);
    form.setValue("theme_id", theme.id);

    const currentOptions = form.getValues("options");
    const updatedOptions = {
      ...currentOptions,
      theme: theme.id === "dark-theme" ? "dark" : "light",
    };

    form.setValue("options", updatedOptions);
  };

  const handleColorThemeSelect = (colorTheme: string) => {
    setSelectedColorTheme(colorTheme);

    const currentOptions = form.getValues("options");
    const updatedOptions = {
      ...currentOptions,
      theme: colorTheme,
    };

    if (colorTheme === "custom") {
      updatedOptions.colors = customColors;
    }

    form.setValue("options", updatedOptions);
  };

  const handleFontChange = (font: string) => {
    const currentOptions = form.getValues("options");
    const updatedOptions = {
      ...currentOptions,
      font: font,
    };

    form.setValue("options", updatedOptions);
  };

  const handleCustomColorChange = (index: number, color: string) => {
    const newColors = [...customColors];
    newColors[index] = color;
    setCustomColors(newColors);

    if (selectedColorTheme === "custom") {
      const currentOptions = form.getValues("options");
      const updatedOptions = {
        ...currentOptions,
        colors: newColors,
      };

      form.setValue("options", updatedOptions);
    }
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Theme Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Theme Preview</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPreviewOpen(false)}
                className="absolute right-4 top-4"
              >
                <XIcon className="size-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Preview how your portfolio will look with the selected theme
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="theme" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="theme">
            <Paintbrush2Icon className="mr-2 size-4" />
            Template
          </TabsTrigger>
          <TabsTrigger value="colors">
            <span className="relative mr-2 flex size-3">
              <span className="absolute inline-flex size-full animate-pulse rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-primary"></span>
            </span>
            Colors
          </TabsTrigger>
          <TabsTrigger value="typography">
            <Settings2Icon className="mr-2 size-4" />
            Typography
          </TabsTrigger>
        </TabsList>

        {/* Theme Selection */}
        <TabsContent value="theme" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Template</CardTitle>
              <CardDescription>
                Choose a template that defines the overall layout of your
                portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {themes.map((theme) => (
                  <ThemeCard
                    key={theme.id}
                    theme={theme}
                    isSelected={selectedThemeId === theme.id}
                    onSelect={() => handleThemeSelect(theme)}
                  />
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-muted/50 p-4">
              <div className="flex items-center">
                <span className="mr-2 text-sm font-medium">Selected:</span>
                <Badge
                  variant="outline"
                  className="bg-primary/10 font-semibold"
                >
                  {selectedThemeDetails?.name || "Minimal"} Template
                </Badge>
              </div>

              <Button variant="outline" size="sm" onClick={handlePreview}>
                <EyeIcon className="mr-2 size-4" />
                Preview Template
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Color Scheme */}
        <TabsContent value="colors" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Color Scheme</CardTitle>
              <CardDescription>
                Choose a color scheme for your portfolio or create a custom one
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {colorThemes.map((theme) => (
                  <Button
                    key={theme.id}
                    variant="outline"
                    className={`h-auto cursor-pointer flex-col rounded-lg p-4 transition-all hover:border-primary ${
                      selectedColorTheme === theme.id
                        ? "border-2 border-primary"
                        : ""
                    }`}
                    onClick={() => handleColorThemeSelect(theme.id)}
                  >
                    <div className="flex flex-col items-center">
                      <div className="mb-3 flex space-x-1">
                        {theme.colors.map((color, index) => (
                          <div
                            key={index}
                            className="size-6 rounded"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{theme.name}</span>
                    </div>
                  </Button>
                ))}
              </div>

              {/* Custom color editor (visible when Custom theme is selected) */}
              {selectedColorTheme === "custom" && (
                <div className="space-y-4 rounded-lg border p-4">
                  <h3 className="font-medium">Custom Color Settings</h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <label htmlFor="bg-color" className="text-sm font-medium">
                        Background
                      </label>
                      <div className="flex items-center gap-2">
                        <div
                          className="size-8 rounded border"
                          style={{ backgroundColor: customColors[0] }}
                        />
                        <Input
                          id="bg-color"
                          type="color"
                          value={customColors[0]}
                          onChange={(e) =>
                            handleCustomColorChange(0, e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label
                        htmlFor="sec-bg-color"
                        className="text-sm font-medium"
                      >
                        Secondary Background
                      </label>
                      <div className="flex items-center gap-2">
                        <div
                          className="size-8 rounded border"
                          style={{ backgroundColor: customColors[1] }}
                        />
                        <Input
                          id="sec-bg-color"
                          type="color"
                          value={customColors[1]}
                          onChange={(e) =>
                            handleCustomColorChange(1, e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label
                        htmlFor="accent-color"
                        className="text-sm font-medium"
                      >
                        Accent
                      </label>
                      <div className="flex items-center gap-2">
                        <div
                          className="size-8 rounded border"
                          style={{ backgroundColor: customColors[2] }}
                        />
                        <Input
                          id="accent-color"
                          type="color"
                          value={customColors[2]}
                          onChange={(e) =>
                            handleCustomColorChange(2, e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label
                        htmlFor="text-color"
                        className="text-sm font-medium"
                      >
                        Text
                      </label>
                      <div className="flex items-center gap-2">
                        <div
                          className="size-8 rounded border"
                          style={{ backgroundColor: customColors[3] }}
                        />
                        <Input
                          id="text-color"
                          type="color"
                          value={customColors[3]}
                          onChange={(e) =>
                            handleCustomColorChange(3, e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label
                        htmlFor="primary-color"
                        className="text-sm font-medium"
                      >
                        Primary
                      </label>
                      <div className="flex items-center gap-2">
                        <div
                          className="size-8 rounded border"
                          style={{ backgroundColor: customColors[4] }}
                        />
                        <Input
                          id="primary-color"
                          type="color"
                          value={customColors[4]}
                          onChange={(e) =>
                            handleCustomColorChange(4, e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="mt-4 rounded-lg p-4"
                    style={{
                      backgroundColor: customColors[0],
                      color: customColors[3],
                    }}
                  >
                    <h4 style={{ color: customColors[4] }}>Preview</h4>
                    <p className="text-sm">
                      This is how your color scheme will look
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Button
                        style={{
                          backgroundColor: customColors[4],
                          color: customColors[0],
                        }}
                      >
                        Primary Button
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "transparent",
                          borderColor: customColors[3],
                          color: customColors[3],
                        }}
                      >
                        Secondary
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Typography */}
        <TabsContent value="typography" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>Choose your font styles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Font Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Font Settings</h3>

                <FormField
                  control={form.control}
                  name="options.font"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Font</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a font" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {fonts.map((font) => (
                            <SelectItem
                              key={font.value}
                              value={font.value}
                              className={`font-${font.value}`}
                            >
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        This will be the primary font used throughout your
                        portfolio
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
