"use client";

import type { PortfolioFormValues } from "@/lib/validations/portfolio";
import DynamicFormField, {
  FormFieldType,
} from "@/components/globals/DynamicFormField";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { updateContent } from "@/actions/contents/action";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { SaveIcon } from "lucide-react";

interface BasicInfoStepProps {
  portfolioId?: string;
}

export default function BasicInfoStep({
  portfolioId,
}: BasicInfoStepProps = {}) {
  const form = useFormContext<PortfolioFormValues>();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!portfolioId) return;

    setIsSaving(true);
    try {
      const values = form.getValues();
      const content = values.content || {};

      await updateContent(
        {
          hero_header: content.hero_header || "",
          hero_description: content.hero_description || "",
          about_text: content.about_text || "",
          meta_title: content.meta_title || "",
          meta_description: content.meta_description || "",
        },
        portfolioId
      );

      form.reset(form.getValues());
      toast.success("Basic info saved");
    } catch (error) {
      console.error("Error saving basic info:", error);
      toast.error("Failed to save basic info");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <DynamicFormField
                control={form.control}
                name="content.hero_header"
                label="Hero Title"
                placeholder="E.g.: John Doe - Frontend Developer"
                fieldType={FormFieldType.INPUT}
                description="Enter the main title of your portfolio. Usually your name and title."
              />

              <DynamicFormField
                control={form.control}
                name="content.hero_description"
                label="Short Description"
                placeholder="E.g.: Frontend Developer with 5+ years of experience building user-focused interfaces"
                fieldType={FormFieldType.TEXTAREA}
                description="Enter a brief description that introduces you."
              />

              <FormField
                control={form.control}
                name="content.about_text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About Me Text</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe yourself, your skills, and your experiences in detail."
                        className="min-h-[200px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This text will be displayed in the "About Me" section. You
                      can describe yourself, your skills, and career goals.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-4 text-lg font-medium">SEO Settings</h3>
            <div className="grid gap-6">
              <DynamicFormField
                control={form.control}
                name="content.meta_title"
                label="SEO Title"
                placeholder="E.g.: John Doe | Frontend Developer & UI Designer"
                fieldType={FormFieldType.INPUT}
                description="This title will be used in search engines and browser tabs."
              />

              <DynamicFormField
                control={form.control}
                name="content.meta_description"
                label="SEO Description"
                placeholder="E.g.: Professional portfolio of John Doe, a frontend developer specializing in React and UI design."
                fieldType={FormFieldType.TEXTAREA}
                description="A brief description of your portfolio that will appear in search engine results."
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {portfolioId && (
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={isSaving || !form.formState.isDirty}
            className="gap-2"
          >
            <SaveIcon className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      )}
    </div>
  );
}
