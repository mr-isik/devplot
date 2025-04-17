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
        (portfolioData.skills || []).map((skill: any) => ({
          ...skill,
          item_id: skill.id,
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
      component: <SkillsStep portfolioId={portfolioId} />,
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
      component: <PublishStep preview={false} portfolioId={portfolioId} />,
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
      </div>
    </FormProvider>
  );
}
