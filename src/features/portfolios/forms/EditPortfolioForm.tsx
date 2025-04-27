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
import { Card, CardContent } from "@/components/ui/card";
import { deletePortfolio } from "@/actions/portfolios/actions";
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
import Loader from "@/components/globals/Loader";

interface EditPortfolioFormProps {
  portfolio: any;
  id: number;
  skillsData?: {
    allSkills: any[] | null;
    categories: any[] | null;
    portfolioSkills: any[] | null;
  };
}

export default function EditPortfolioForm({
  portfolio: portfolioData,
  id: portfolioId,
  skillsData,
}: EditPortfolioFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basics");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Safely parse options with fallback to default values
  let parsedOptions = {
    theme: "minimal",
    colorTheme: "light",
    colors: ["#FFFFFF", "#F5F5F5", "#E5E5E5", "#000000", "#3B82F6"],
    font: "inter",
  };

  try {
    if (portfolioData.options && portfolioData.options.length > 0) {
      const optionsStr = portfolioData.options[0].options;
      if (optionsStr) {
        const parsed = JSON.parse(optionsStr);
        parsedOptions = {
          ...parsedOptions,
          ...parsed,
        };
      }
    }
  } catch (error) {
    console.error("Error parsing options:", error);
  }

  // Initialize the form with existing portfolio data
  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues: {
      portfolio: {
        is_published: portfolioData.is_published || false,
      },
      options: {
        theme: parsedOptions.theme,
        colorTheme: parsedOptions.colorTheme,
        colors: parsedOptions.colors,
        font: parsedOptions.font,
      },
      content: {
        hero_header: portfolioData.contents?.hero_header || "",
        hero_description: portfolioData.contents?.hero_description || "",
        meta_title: portfolioData.contents?.meta_title || "",
        meta_description: portfolioData.contents?.meta_description || "",
        about_text: portfolioData.contents?.about_text || "",
      },
      experiences:
        (portfolioData.experiences || []).map((experience: any) => ({
          ...experience,
          item_id: experience.id,
        })) || [],
      educations:
        (portfolioData.educations || []).map((education: any) => ({
          ...education,
          item_id: education.id,
        })) || [],
      projects:
        (portfolioData.projects || []).map((project: any) => ({
          ...project,
          item_id: project.id,
        })) || [],
      skills:
        skillsData?.portfolioSkills?.map((skill: any) => ({
          name: skill.skills.name,
          category: skill.skills.category,
          icon_name: skill.skills.icon_name,
          item_id: skill.skill_id,
        })) || [],
      socials:
        (portfolioData.socials || []).map((social: any) => ({
          ...social,
          item_id: social.id,
        })) || [],
    },
  });

  // Steps configuration
  const STEPS = [
    {
      id: "basics",
      title: "Basic Information",
      description: "Main details and SEO",
      icon: <InfoIcon className="mr-2 size-4" />,
      component: <BasicInfoStep portfolioId={portfolioId} />,
    },
    {
      id: "appearance",
      title: "Appearance",
      description: "Theme, colors and typography",
      icon: <Paintbrush2Icon className="mr-2 size-4" />,
      component: <AppearanceStep portfolioId={portfolioId} />,
    },
    {
      id: "experiences",
      title: "Experience",
      description: "Work history",
      icon: <BriefcaseIcon className="mr-2 size-4" />,
      component: <ExperiencesStep portfolioId={portfolioId} />,
    },
    {
      id: "educations",
      title: "Education",
      description: "Academic background",
      icon: <GraduationCapIcon className="mr-2 size-4" />,
      component: <EducationsStep portfolioId={portfolioId} />,
    },
    {
      id: "projects",
      title: "Projects",
      description: "Your portfolio work",
      icon: <RocketIcon className="mr-2 size-4" />,
      component: <ProjectsStep portfolioId={portfolioId} />,
    },
    {
      id: "skills",
      title: "Skills",
      description: "Showcase your expertise",
      icon: <WrenchIcon className="mr-2 size-4" />,
      component: (
        <SkillsStep
          portfolioId={portfolioId}
          skillsData={skillsData?.allSkills}
          categoriesData={skillsData?.categories}
        />
      ),
    },
    {
      id: "socials",
      title: "Social Media",
      description: "Connect online",
      icon: <LinkIcon className="mr-2 size-4" />,
      component: <SocialsStep portfolioId={portfolioId} />,
    },
    {
      id: "publish",
      title: "Publish",
      description: "Review and publish",
      icon: <EyeIcon className="mr-2 size-4" />,
      component: (
        <PublishStep
          preview={false}
          portfolioId={portfolioId}
          tenantId={portfolioData.tenant_id}
        />
      ),
    },
  ];

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

  const handleStepNavigation = (direction: "next" | "prev") => {
    const currentIndex = STEPS.findIndex((step) => step.id === activeTab);

    if (direction === "next" && currentIndex < STEPS.length - 1) {
      setActiveTab(STEPS[currentIndex + 1].id);
    } else if (direction === "prev" && currentIndex > 0) {
      setActiveTab(STEPS[currentIndex - 1].id);
    }
  };

  const isFirstStep = activeTab === STEPS[0].id;
  const isLastStep = activeTab === STEPS[STEPS.length - 1].id;

  return (
    <FormProvider {...form}>
      <div className="flex h-full flex-col">
        <Card className="min-h-[calc(100vh-250px)] border-none bg-transparent sm:min-h-[600px] sm:border shadow-none">
          <CardContent className="p-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex h-full flex-col sm:flex-row"
            >
              {/* Mobile Tab Bar - Only visible on mobile */}
              <div className="sticky top-0 z-10 border-b bg-background sm:hidden">
                <div className="mb-2 flex items-center p-4">
                  <h1 className="text-xl font-bold">Edit Portfolio</h1>
                </div>
                <div className="no-scrollbar overflow-x-auto px-4 pb-2">
                  <TabsList className="inline-flex h-10 w-auto">
                    {STEPS.map((step) => (
                      <TabsTrigger
                        key={step.id}
                        value={step.id}
                        className="h-9 whitespace-nowrap px-4"
                      >
                        <div className="flex items-center">
                          {step.icon}
                          <span className="ml-1.5">{step.title}</span>
                        </div>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </div>

              {/* Desktop Sidebar - Hidden on mobile */}
              <div className="hidden sm:block sm:min-w-[200px] sm:max-w-[250px] sm:pr-6">
                <TabsList className="grid h-auto w-full grid-cols-1 sm:justify-start">
                  {STEPS.map((step) => (
                    <TabsTrigger
                      key={step.id}
                      value={step.id}
                      className="h-auto px-4 py-3 data-[state=active]:bg-muted sm:w-full sm:justify-start"
                    >
                      <div className="flex items-center">
                        {step.icon}
                        <span className="ml-2">{step.title}</span>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>

                <div className="space-y-2 p-4">
                  {activeTab !== STEPS[STEPS.length - 1].id ? (
                    <>
                      <Button
                        variant="default"
                        className="w-full"
                        onClick={() => handleStepNavigation("next")}
                      >
                        Continue
                      </Button>
                      {!isFirstStep && (
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => handleStepNavigation("prev")}
                        >
                          Back
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleStepNavigation("prev")}
                      >
                        Back
                      </Button>
                    </>
                  )}
                  <AlertDialog
                    open={showDeleteConfirm}
                    onOpenChange={setShowDeleteConfirm}
                  >
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="gap-1.5 mt-2 w-full text-destructive"
                      >
                        <TrashIcon className="size-4" />
                        Delete Portfolio
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your portfolio and all associated data.
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
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1">
                {STEPS.map((step) => (
                  <TabsContent
                    key={step.id}
                    value={step.id}
                    className="mt-0 border-0 md:p-6 sm:p-0"
                  >
                    <div className="space-y-6">
                      <div className="mb-6 hidden sm:block">
                        <h1 className="text-2xl font-bold tracking-tight">
                          {step.title}
                        </h1>
                        <p className="text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                      {step.component}
                    </div>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Mobile Bottom Action Bar - Fixed at bottom */}
        <div className="fixed inset-x-0 bottom-0 flex justify-between border-t bg-background p-4 sm:hidden">
          {isLastStep ? (
            <>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => handleStepNavigation("prev")}
              >
                Back
              </Button>
              <Button
                className="ml-2 flex-1"
                onClick={() =>
                  router.push(
                    `${process.env.NEXT_PUBLIC_DOMAIN}/${portfolioData.tenant_id}`
                  )
                }
              >
                <EyeIcon className="mr-2 size-4" />
                View Portfolio
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="default"
                onClick={() => handleStepNavigation("next")}
                className="flex-1"
              >
                Continue
              </Button>
              {!isFirstStep && (
                <Button
                  variant="outline"
                  className="ml-2 flex-1"
                  onClick={() => handleStepNavigation("prev")}
                >
                  Back
                </Button>
              )}
            </>
          )}
        </div>

        <div className="h-16 sm:hidden"></div>
        {/* Extra space for social media mobile add button */}
        {activeTab === "socials" && <div className="h-16 sm:hidden"></div>}
      </div>
    </FormProvider>
  );
}
