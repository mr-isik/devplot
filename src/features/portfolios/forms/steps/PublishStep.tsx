"use client";

import type { PortfolioFormValues } from "@/lib/validations/portfolio";
import { Badge } from "@/components/ui/badge";
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
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { getThemeById } from "@/features/themes/registry";
import {
  BriefcaseIcon,
  CheckIcon,
  CopyIcon,
  EyeIcon,
  GraduationCapIcon,
  LinkIcon,
  PaintbrushIcon,
  RocketIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ThemeProps } from "@/features/themes/types";
import { usePortfolioData } from "@/features/portfolios/hooks/usePortfolioData";
import { toast } from "sonner";
import { updatePortfolio } from "@/actions/portfolios/actions";

type PublishStepProps = {
  preview?: boolean;
  portfolioId?: string;
  userId: string;
};

export default function PublishStep({
  preview,
  portfolioId,
  userId,
}: PublishStepProps) {
  const form = useFormContext<PortfolioFormValues>();
  const [publishEnabled, setPublishEnabled] = useState(
    form.getValues().portfolio.is_published
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Get current form data for preview
  const { portfolio, experiences, projects, socials, skills, educations } =
    usePortfolioData(form);

  // Get selected theme for preview
  const selectedThemeId = form.getValues().options?.theme || "minimal";
  const selectedTheme = getThemeById(selectedThemeId as any);
  const ThemeComponent = selectedTheme?.component;

  // Get color theme information
  const colorTheme = form.getValues().options?.colorTheme || "light";
  const font = form.getValues().options?.font || "inter";

  // Effect to automatically open the preview if preview prop is true
  useEffect(() => {
    if (preview) {
      setIsPreviewOpen(true);
    }
  }, [preview]);

  const updatePublishState = async (checked: boolean) => {
    setPublishEnabled(checked);
    form.setValue("portfolio.is_published", checked, {
      shouldDirty: true,
      shouldValidate: true,
    });

    // Directly save changes when toggle is changed
    if (portfolioId) {
      try {
        const { error } = await updatePortfolio({
          id: portfolioId,
          is_published: checked,
        });

        if (error) {
          throw new Error(`Failed to update publish status: ${error.message}`);
        }

        toast.success(
          checked
            ? "Portfolio is now published"
            : "Portfolio is now unpublished"
        );

        // Reset form to mark as clean
        const formValues = form.getValues();
        form.reset(formValues);
      } catch (error) {
        console.error("Error updating publish status:", error);
        toast.error("Failed to update publish status");

        // Revert the toggle if there was an error
        setPublishEnabled(!checked);
        form.setValue("portfolio.is_published", !checked, {
          shouldDirty: true,
        });
      }
    }
  };

  // Handle preview opening
  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  // Handle URL copying
  const handleCopyUrl = () => {
    if (!portfolioId) return;

    const url = `https://${process.env.NEXT_PUBLIC_DOMAIN}/${userId}`;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    toast.success("Portfolio URL copied to clipboard");

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Portfolio Preview</span>
            </DialogTitle>
            <DialogDescription>
              This is how your portfolio will look after publishing
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex gap-2 flex-wrap">
            <Badge variant="outline" className="bg-primary/10">
              {selectedTheme?.name || "Default"} Theme
            </Badge>
            <Badge variant="outline" className="bg-primary/10">
              {colorTheme.charAt(0).toUpperCase() + colorTheme.slice(1)} Colors
            </Badge>
            <Badge variant="outline" className="bg-primary/10">
              {font.charAt(0).toUpperCase() + font.slice(1)} Font
            </Badge>
            <Badge variant="outline" className="bg-primary/10">
              {experiences.length} Experiences
            </Badge>
            <Badge variant="outline" className="bg-primary/10">
              {projects.length} Projects
            </Badge>
            <Badge variant="outline" className="bg-primary/10">
              {skills.length} Skills
            </Badge>
          </div>

          <div className="mt-4 border rounded-lg overflow-hidden h-[70vh]">
            {ThemeComponent ? (
              <div className="w-full h-full overflow-y-auto transform scale-[0.85] origin-top">
                <ThemeComponent
                  portfolio={portfolio}
                  experiences={experiences}
                  projects={projects}
                  socials={socials}
                  skills={skills}
                  educations={educations}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p>Preview not available</p>
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-end">
            <Button onClick={() => setIsPreviewOpen(false)}>
              Close Preview
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="rounded-lg border p-4">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <h3 className="text-lg font-medium">Make portfolio public</h3>
                <p className="text-sm text-muted-foreground">
                  Turn this on to make your portfolio accessible to everyone
                </p>
              </div>
              <FormField
                control={form.control}
                name="portfolio.is_published"
                render={({ field: _ }) => (
                  <FormItem>
                    <FormControl>
                      <Switch
                        checked={publishEnabled}
                        onCheckedChange={updatePublishState}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium">Your Portfolio URL</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              This is the link you can share with others
            </p>
            <div className="flex items-center rounded-md border bg-muted/50 px-3 py-2">
              <span className="text-sm font-medium flex-1">
                {portfolioId
                  ? `https://${process.env.NEXT_PUBLIC_DOMAIN}/portfolio/${userId}`
                  : "Your URL will appear here after publishing"}
              </span>
              {portfolioId && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyUrl}
                  className="ml-2"
                >
                  {isCopied ? (
                    <CheckIcon className="size-4" />
                  ) : (
                    <CopyIcon className="size-4" />
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Theme Information */}
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium">Theme Information</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              Your portfolio is using these style settings
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 rounded-md bg-muted/30 flex items-center">
                <PaintbrushIcon className="size-4 mr-2 text-primary" />
                <div>
                  <span className="text-xs text-muted-foreground">Theme</span>
                  <p className="text-sm font-medium">
                    {selectedTheme?.name || "Default"}
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-md bg-muted/30 flex items-center">
                <div
                  className="size-4 mr-2 rounded-full bg-primary"
                  style={{
                    background:
                      colorTheme === "custom"
                        ? form.getValues().options?.colors?.[4] || "#3B82F6"
                        : undefined,
                  }}
                ></div>
                <div>
                  <span className="text-xs text-muted-foreground">Colors</span>
                  <p className="text-sm font-medium">
                    {colorTheme.charAt(0).toUpperCase() + colorTheme.slice(1)}
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-md bg-muted/30 flex items-center">
                <span className="size-4 mr-2 text-xs font-bold text-primary">
                  Aa
                </span>
                <div>
                  <span className="text-xs text-muted-foreground">Font</span>
                  <p className="text-sm font-medium">
                    {font.charAt(0).toUpperCase() + font.slice(1)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Summary */}
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium">Content Summary</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              Your portfolio includes these sections
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-3 rounded-md bg-muted/30 flex flex-col items-center justify-center text-center">
                <BriefcaseIcon className="size-5 mb-2 text-primary" />
                <span className="text-sm font-medium">
                  {experiences.length}
                </span>
                <span className="text-xs text-muted-foreground">
                  Experiences
                </span>
              </div>
              <div className="p-3 rounded-md bg-muted/30 flex flex-col items-center justify-center text-center">
                <RocketIcon className="size-5 mb-2 text-primary" />
                <span className="text-sm font-medium">{projects.length}</span>
                <span className="text-xs text-muted-foreground">Projects</span>
              </div>
              <div className="p-3 rounded-md bg-muted/30 flex flex-col items-center justify-center text-center">
                <GraduationCapIcon className="size-5 mb-2 text-primary" />
                <span className="text-sm font-medium">{educations.length}</span>
                <span className="text-xs text-muted-foreground">
                  Educations
                </span>
              </div>
              <div className="p-3 rounded-md bg-muted/30 flex flex-col items-center justify-center text-center">
                <UserIcon className="size-5 mb-2 text-primary" />
                <span className="text-sm font-medium">{skills.length}</span>
                <span className="text-xs text-muted-foreground">Skills</span>
              </div>
              <div className="p-3 rounded-md bg-muted/30 flex flex-col items-center justify-center text-center">
                <LinkIcon className="size-5 mb-2 text-primary" />
                <span className="text-sm font-medium">{socials.length}</span>
                <span className="text-xs text-muted-foreground">
                  Social Links
                </span>
              </div>
            </div>
          </div>

          {/* Preview Portfolio Button */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <h3 className="text-lg font-medium">Preview Portfolio</h3>
                <p className="text-sm text-muted-foreground">
                  See how your portfolio will look before publishing
                </p>
              </div>
              <Button variant="default" onClick={handlePreview}>
                <EyeIcon className="mr-2 size-4" />
                Preview
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/50 p-6">
          <div className="flex flex-col space-y-2">
            <h4 className="font-medium">Next steps after publishing</h4>
            <ul className="list-inside list-disc text-sm text-muted-foreground">
              <li>Share your portfolio on social media</li>
              <li>Include the link in your resume and job applications</li>
              <li>Keep your portfolio up to date with your latest work</li>
            </ul>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
