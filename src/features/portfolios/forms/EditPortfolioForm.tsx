"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  portfolioFormSchema,
  type PortfolioFormValues,
} from "@/lib/validations/portfolio";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deletePortfolio, updatePortfolio } from "@/actions/portfolios/actions";
import { updateContent } from "@/actions/contents/action";
import { updateOption } from "@/actions/options/actions";
import {
  BriefcaseIcon,
  EyeIcon,
  GraduationCapIcon,
  InfoIcon,
  LinkIcon,
  Paintbrush2Icon,
  RocketIcon,
  TrashIcon,
  WrenchIcon,
} from "lucide-react";

import AppearanceStep from "./steps/AppearanceStep";
import BasicInfoStep from "./steps/BasicInfoStep";
import EducationsStep from "./steps/EducationsStep";
import ExperiencesStep from "./steps/ExperiencesStep";
import ProjectsStep from "./steps/ProjectsStep";
import PublishStep from "./steps/PublishStep";
import SkillsStep from "./steps/SkillsStep";
import SocialsStep from "./steps/SocialsStep";
import SaveChangesBar from "@/components/globals/SaveChangesBar";
import Loader from "@/components/globals/Loader";

interface EditPortfolioFormProps {
  portfolioData: any; // Replace with proper type
  portfolioId: string;
}

export default function EditPortfolioForm({
  portfolioData,
  portfolioId,
}: EditPortfolioFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basics");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const options = JSON.parse(portfolioData.options[0].options);

  // Initialize the form with existing portfolio data
  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues: {
      portfolio: {
        is_published: portfolioData.is_published || false,
      },
      options: {
        theme: options?.theme || "minimal",
        colorTheme: options?.color_theme || "light",
        colors: options?.colors || [
          "#FFFFFF",
          "#F5F5F5",
          "#E5E5E5",
          "#000000",
          "#3B82F6",
        ],
        font: options?.font || "inter",
      },
      content: {
        hero_header: portfolioData.contents?.hero_header || "",
        hero_description: portfolioData.contents?.hero_description || "",
        meta_title: portfolioData.contents?.meta_title || "",
        meta_description: portfolioData.contents?.meta_description || "",
        about_text: portfolioData.contents?.about_text || "",
      },
      experiences: portfolioData.experiences || [],
      educations: portfolioData.educations || [],
      projects: portfolioData.projects || [],
      skills: portfolioData.skills || [],
      socials: portfolioData.socials || [],
    },
  });

  // Track which sections are dirty (have unsaved changes)
  const isBasicInfoDirty = form.formState.dirtyFields.content !== undefined;
  const isAppearanceDirty = form.formState.dirtyFields.options !== undefined;
  const isPublishDirty = form.formState.dirtyFields.portfolio !== undefined;

  // Steps configuration
  const STEPS = [
    {
      id: "basics",
      title: "Basic Information",
      description: "Main details and SEO",
      icon: <InfoIcon className="mr-2 size-4" />,
      component: <BasicInfoStep />,
      isDirty: isBasicInfoDirty,
    },
    {
      id: "appearance",
      title: "Appearance",
      description: "Theme, colors and typography",
      icon: <Paintbrush2Icon className="mr-2 size-4" />,
      component: <AppearanceStep />,
      isDirty: isAppearanceDirty,
    },
    {
      id: "experiences",
      title: "Experience",
      description: "Work history",
      icon: <BriefcaseIcon className="mr-2 size-4" />,
      component: <ExperiencesStep portfolioId={portfolioData.id} />,
      isDirty: false,
    },
    {
      id: "educations",
      title: "Education",
      description: "Academic background",
      icon: <GraduationCapIcon className="mr-2 size-4" />,
      component: <EducationsStep portfolioId={portfolioId} />,
      isDirty: false,
    },
    {
      id: "projects",
      title: "Projects",
      description: "Your portfolio work",
      icon: <RocketIcon className="mr-2 size-4" />,
      component: <ProjectsStep />,
      isDirty: false,
    },
    {
      id: "skills",
      title: "Skills",
      description: "Showcase your expertise",
      icon: <WrenchIcon className="mr-2 size-4" />,
      component: <SkillsStep />,
      isDirty: false,
    },
    {
      id: "socials",
      title: "Social Media",
      description: "Connect online",
      icon: <LinkIcon className="mr-2 size-4" />,
      component: <SocialsStep />,
      isDirty: false,
    },
    {
      id: "publish",
      title: "Publish",
      description: "Review and publish",
      icon: <EyeIcon className="mr-2 size-4" />,
      component: <PublishStep preview={false} portfolioId={portfolioId} />,
      isDirty: isPublishDirty,
    },
  ];

  // Save functions for different sections
  const saveBasicInfo = async () => {
    setIsSubmitting(true);
    try {
      const formValues = form.getValues();
      const contentData = formValues.content;

      // Update content
      const { error: contentError } = await updateContent(
        {
          hero_header: contentData.hero_header,
          hero_description: contentData.hero_description,
          meta_title: contentData.meta_title,
          meta_description: contentData.meta_description,
          about_text: contentData.about_text,
        },
        portfolioId
      );

      if (contentError) {
        throw new Error(`Failed to update content: ${contentError.message}`);
      }

      toast.success("Basic information updated successfully");
      form.reset(formValues);
    } catch (error) {
      console.error("Error updating basic info:", error);
      toast.error("Failed to update basic information");
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveAppearance = async () => {
    setIsSubmitting(true);
    try {
      const formValues = form.getValues();
      const optionsData = formValues.options;

      // Update options
      const { error: optionsError } = await updateOption(
        {
          portfolio_id: portfolioId,
          options: JSON.stringify({
            theme: optionsData.theme,
            colorTheme: optionsData.colorTheme,
            colors: optionsData.colors,
            font: optionsData.font,
          }),
        },
        portfolioId
      );

      if (optionsError) {
        throw new Error(`Failed to update appearance: ${optionsError.message}`);
      }

      toast.success("Appearance updated successfully");
      form.reset(formValues);
    } catch (error) {
      console.error("Error updating appearance:", error);
      toast.error("Failed to update appearance");
    } finally {
      setIsSubmitting(false);
    }
  };

  const savePublish = async () => {
    setIsSubmitting(true);
    try {
      const formValues = form.getValues();

      // Update portfolio publish status
      const { error: portfolioError } = await updatePortfolio({
        id: portfolioId,
        is_published: formValues.portfolio.is_published,
      });

      if (portfolioError) {
        throw new Error(
          `Failed to update publish status: ${portfolioError.message}`
        );
      }

      toast.success("Publish settings updated successfully");
      form.reset(formValues);
    } catch (error) {
      console.error("Error updating publish settings:", error);
      toast.error("Failed to update publish settings");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePortfolio = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await deletePortfolio(portfolioId);

      if (error) {
        throw new Error(`Failed to delete portfolio: ${error.message}`);
      }

      toast.success("Portfolio deleted successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error deleting portfolio:", error);
      toast.error("Failed to delete portfolio");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine which save function to use based on active tab
  const getSaveFunction = () => {
    switch (activeTab) {
      case "basics":
        return saveBasicInfo;
      case "appearance":
        return saveAppearance;
      case "publish":
        return savePublish;
      default:
        return () => {}; // No-op for tabs that don't need external save handling
    }
  };

  // Determine if the current section is dirty
  const isCurrentSectionDirty = () => {
    const step = STEPS.find((step) => step.id === activeTab);
    return step ? step.isDirty : false;
  };

  // These steps handle their own data saving internally
  const isSelfSavingStep = () => {
    return [
      "experiences",
      "educations",
      "projects",
      "skills",
      "socials",
    ].includes(activeTab);
  };

  return (
    <FormProvider {...form}>
      <div className="relative space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Edit Your Portfolio</CardTitle>
            <CardDescription>
              Update your portfolio information in the sections below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-6">
                {STEPS.map((step) => (
                  <TabsTrigger
                    key={step.id}
                    value={step.id}
                    className="relative"
                  >
                    <span className="flex items-center">
                      {step.icon}
                      <span className="hidden md:inline">{step.title}</span>
                    </span>
                    {step.isDirty && (
                      <span className="absolute -top-1 -right-1 size-2 bg-primary rounded-full" />
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>

              {STEPS.map((step) => (
                <TabsContent key={step.id} value={step.id}>
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold">{step.title}</h2>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                    {step.component}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
          <CardFooter className="border-t p-6 flex justify-between">
            <AlertDialog
              open={showDeleteConfirm}
              onOpenChange={setShowDeleteConfirm}
            >
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="gap-1.5">
                  <TrashIcon className="size-4" />
                  Delete Portfolio
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your portfolio and all associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeletePortfolio}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    <Loader state={isSubmitting}>Delete</Loader>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              className="gap-1.5"
              onClick={() => router.push(`/portfolio/${portfolioId}`)}
            >
              <EyeIcon className="size-4" />
              View Portfolio
            </Button>
          </CardFooter>
        </Card>

        {/* Save changes bar only appears for sections that need external saving */}
        {!isSelfSavingStep() && (
          <SaveChangesBar
            isDirty={isCurrentSectionDirty()}
            isSubmitting={isSubmitting}
            onSave={getSaveFunction()}
            section={STEPS.find((step) => step.id === activeTab)?.title || ""}
          />
        )}
      </div>
    </FormProvider>
  );
}
