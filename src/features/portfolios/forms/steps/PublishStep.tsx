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
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { getThemeById } from "@/features/themes/registry";
import {
  BriefcaseIcon,
  GraduationCapIcon,
  LinkIcon,
  RocketIcon,
} from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

type PublishStepProps = {
  preview?: boolean;
  portfolioId?: string;
};

export default function PublishStep({
  preview,
  portfolioId,
}: PublishStepProps) {
  const form = useFormContext<PortfolioFormValues>();
  const [publishEnabled, setPublishEnabled] = useState(
    form.getValues().portfolio.is_published
  );

  const updatePublishState = (checked: boolean) => {
    setPublishEnabled(checked);
    form.setValue("portfolio.is_published", checked, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="space-y-6">
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
              <span className="text-sm font-medium">
                {portfolioId
                  ? `https://devplot.com/portfolio/${portfolioId}`
                  : "Your URL will appear here after publishing"}
              </span>
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
