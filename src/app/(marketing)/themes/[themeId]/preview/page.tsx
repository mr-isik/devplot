import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeProvider } from "@/features/themes/context/ThemeContext";
import { ThemeStyleProvider } from "@/features/themes/components/ThemeStyleProvider";
import { getThemeById } from "@/features/themes/registry/themeRegistry";
import { createThemeOptions } from "@/features/themes/services/themeService";
import { ArrowLeft, SparklesIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Portfolio, Content, Option } from "@/features/portfolios/types";
import type { Project } from "@/features/projects/types";
import type { Skill } from "@/features/skills/types";

type Props = {
  params: Promise<{ themeId: string }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { themeId } = await params;

  const theme = getThemeById(themeId as any);

  return { title: theme?.name };
};

export default async function ThemePreviewPage({ params }: Props) {
  const { themeId } = await params;

  const theme = getThemeById(themeId as any);

  // If theme not found, redirect to 404
  if (!theme) {
    notFound();
  }

  // Create default options for this theme
  const themeOptions = createThemeOptions(theme.id as any);

  // Get the theme component
  const ThemeComponent = theme.component;

  // Create mock content data
  const mockContent: Content = {
    id: "preview-content",
    portfolio_id: "preview",
    hero_header: "John Doe",
    hero_description: "Full Stack Developer",
    meta_title: "John Doe - Developer Portfolio",
    meta_description:
      "Portfolio showcasing my projects and skills as a developer",
    about_text:
      "Passionate developer with expertise in React, Node.js, and TypeScript.",
  };

  // Create mock option
  const mockOption: Option = {
    id: "preview-option",
    portfolio_id: "preview",
    options: JSON.stringify(themeOptions),
  };

  // Create mock portfolio data
  const mockPortfolio: Portfolio = {
    id: "preview",
    user_id: "preview-user",
    created_at: new Date().toISOString(),
    is_published: true,
    contents: mockContent,
    options: [mockOption],
    socials: [
      {
        id: "preview-social-1",
        portfolio_id: "preview",
        platform: "Twitter",
        url: "https://twitter.com/johndoe",
        created_at: new Date().toISOString(),
      },
      {
        id: "preview-social-2",
        portfolio_id: "preview",
        platform: "LinkedIn",
        url: "https://linkedin.com/in/johndoe",
        created_at: new Date().toISOString(),
      },
      {
        id: "preview-social-3",
        portfolio_id: "preview",
        platform: "GitHub",
        url: "https://github.com/johndoe",
        created_at: new Date().toISOString(),
      },
    ],
    experiences: [
      {
        id: "preview-exp-1",
        portfolio_id: "preview",
        role: "Software Engineer",
        company: "Google",
        employment_type: "Full-time",
        description:
          "A modern web application built with React and TypeScript.",
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
    ],
    projects: [
      {
        id: "preview-proj-1",
        portfolio_id: "preview",
        title: "Project One",
        description:
          "A modern web application built with React and TypeScript.",
        repo_url: "https://github.com/johndoe/project-one",
        live_url: "https://project-one.example.com",
        created_at: new Date().toISOString(),
        image: "/images/projects/placeholder-1.jpg",
      },
    ],
    educations: [
      {
        id: "preview-edu-1",
        portfolio_id: "preview",
        school: "University of California, Los Angeles",
        degree: "Bachelor of Science in Computer Science",
        field: "Computer Science",
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
    ],
    skills: [
      {
        id: "preview-skill-1",
        portfolio_id: "preview",
        name: "React",
      },
      {
        id: "preview-skill-2",
        portfolio_id: "preview",
        name: "TypeScript",
      },
    ],
  };

  const mockProjects: Project[] = [
    {
      id: "preview-proj-1",
      portfolio_id: "preview",
      title: "Project One",
      description: "A modern web application built with React and TypeScript.",
      repo_url: "https://github.com/johndoe/project-one",
      live_url: "https://project-one.example.com",
      created_at: new Date().toISOString(),
      image: "/images/projects/placeholder-1.jpg",
    },
    {
      id: "preview-proj-2",
      portfolio_id: "preview",
      title: "Project Two",
      description: "Mobile application developed with React Native.",
      repo_url: null,
      live_url: "https://project-two.example.com",
      created_at: new Date().toISOString(),
      image: "/images/projects/placeholder-2.jpg",
    },
  ];

  const mockSkills: Skill[] = [
    { id: "preview-skill-1", name: "React", portfolio_id: "preview" },
    { id: "preview-skill-2", name: "TypeScript", portfolio_id: "preview" },
    { id: "preview-skill-3", name: "Node.js", portfolio_id: "preview" },
    { id: "preview-skill-4", name: "Next.js", portfolio_id: "preview" },
  ];

  return (
    <ThemeProvider initialOptions={themeOptions}>
      <ThemeStyleProvider>
        <div className="container mx-auto py-10">
          <div className="mb-8 flex gap-2 items-center justify-between flex-col md:flex-row">
            <div>
              <Link
                href="/themes"
                className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="mr-2 size-4" />
                Back to Themes
              </Link>
              <h1 className="text-3xl font-bold">{theme.name} Theme</h1>
              <div className="mt-2 flex items-center gap-2">
                <p className="text-xl text-muted-foreground">
                  {theme.description}
                </p>
                {theme.isPremium && (
                  <Badge className="bg-amber-500 text-white">
                    <SparklesIcon className="mr-1 size-3" />
                    Premium
                  </Badge>
                )}
              </div>
            </div>

            <Link
              href={`/dashboard/create?theme=${theme.id}`}
              className="md:w-auto w-full"
            >
              <Button size="lg" variant="outline">
                Use This Theme
              </Button>
            </Link>
          </div>

          <h2 className="mb-6 text-2xl font-semibold">Live Preview</h2>

          <div className="overflow-hidden rounded-lg -mx-5">
            <ThemeComponent
              portfolio={mockPortfolio}
              projects={mockProjects}
              skills={mockSkills}
              experiences={mockPortfolio.experiences}
              socials={mockPortfolio.socials}
              educations={mockPortfolio.educations}
            />
          </div>
        </div>
      </ThemeStyleProvider>
    </ThemeProvider>
  );
}
