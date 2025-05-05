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
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { SaveIcon } from "lucide-react";
import Loader from "@/components/globals/Loader";

interface BasicInfoStepProps {
  portfolioId?: number;
}

export default function BasicInfoStep({
  portfolioId,
}: BasicInfoStepProps = {}) {
  const form = useFormContext<PortfolioFormValues>();
  const [isSaving, setIsSaving] = useState(false);

  // Reference to track original values
  const originalValues = useRef<any>(null);

  // State to track if form has changes
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize original values on component mount
  useEffect(() => {
    const content = form.getValues().content || {};
    originalValues.current = {
      hero_header: content.hero_header || "",
      hero_description: content.hero_description || "",
      about_text: content.about_text || "",
      meta_title: content.meta_title || "",
      meta_description: content.meta_description || "",
    };
  }, [form]);

  // Check for changes when form values change
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (!originalValues.current) return;

      const content = value.content || {};
      const changed =
        content.hero_header !== originalValues.current.hero_header ||
        content.hero_description !== originalValues.current.hero_description ||
        content.about_text !== originalValues.current.about_text ||
        content.meta_title !== originalValues.current.meta_title ||
        content.meta_description !== originalValues.current.meta_description;

      setHasChanges(changed);
    });

    return () => subscription.unsubscribe();
  }, [form]);

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
          favicon: content.favicon,
        },
        portfolioId
      );

      // Update original values after successful save
      originalValues.current = {
        hero_header: content.hero_header || "",
        hero_description: content.hero_description || "",
        about_text: content.about_text || "",
        meta_title: content.meta_title || "",
        meta_description: content.meta_description || "",
      };

      setHasChanges(false);
      toast.success("Basic info saved");
    } catch (error) {
      console.error("Error saving basic info:", error);
      toast.error("Failed to save basic info");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
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
                id="hero-title"
                aria-describedby="hero-title-description"
              />

              <DynamicFormField
                control={form.control}
                name="content.hero_description"
                label="Short Description"
                placeholder="E.g.: Frontend Developer with 5+ years of experience building user-focused interfaces"
                fieldType={FormFieldType.TEXTAREA}
                description="Enter a brief description that introduces you."
                id="short-description"
                aria-describedby="short-description-description"
              />

              <DynamicFormField
                control={form.control}
                name="content.about_text"
                label="About Me Text"
                placeholder="Describe yourself, your skills, and your experiences in detail."
                fieldType={FormFieldType.TEXTAREA}
                description="This text will be displayed in the 'About Me' section."
                id="about-me-text"
                aria-describedby="about-me-text-description"
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
                id="seo-title"
                aria-describedby="seo-title-description"
              />

              <DynamicFormField
                control={form.control}
                name="content.meta_description"
                label="SEO Description"
                placeholder="E.g.: Professional portfolio of John Doe, a frontend developer specializing in React and UI design."
                fieldType={FormFieldType.TEXTAREA}
                description="A brief description of your portfolio that will appear in search engine results."
                id="seo-description"
                aria-describedby="seo-description-description"
              />

              <DynamicFormField
                control={form.control}
                name="content.favicon"
                label="Favicon"
                fieldType={FormFieldType.FILE}
                description="Upload a favicon for your portfolio."
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {portfolioId && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-10 border-t bg-background p-4 shadow-md transition-transform duration-300 ease-in-out ${hasChanges ? "translate-y-0" : "translate-y-full"}`}
        >
          <div className="container flex justify-end">
            <Button
              onClick={handleSave}
              disabled={isSaving || !hasChanges}
              className="gap-2"
              size="lg"
            >
              <Loader state={isSaving}>
                <SaveIcon className="h-4 w-4" />
                Save Changes
              </Loader>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
