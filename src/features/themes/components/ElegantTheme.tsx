"use client";

import type { ThemeProps } from "@/features/themes/types";
import type { ThemeOptions } from "@/features/themes/types/theme-options";
import { getPlatformIcon } from "@/features/portfolios/forms/steps/SocialsStep";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { CalendarIcon, ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Education } from "@/features/educations/types";
import { Skill } from "@/features/skills/types";
import { getSkillIcon, getSkillColor } from "@/lib/skillsData";
import {
  adjustColor,
  applyThemeCustomization,
  colorThemes,
  fontFamilies,
} from "../utils/themeCustomization";
import { FaGithub } from "react-icons/fa";

const baseElegantThemeStyles = `
  .elegant-theme {
    --elegant-gold: #b38600;
    --elegant-gold-light: #d9b036;
    --elegant-cream: #fdf8e9;
    --elegant-cream-dark: #f5edd6;
    --elegant-brown: #2a1d05;
    --elegant-brown-light: #59442b;
    --elegant-bg: #ffffff;
    --elegant-text-primary: #2a1d05;
    --elegant-text-secondary: #59442b;
    --elegant-accent: #b38600;
    --elegant-accent-light: #d9b036;
    --elegant-border: #e6d7b3;
    --elegant-card-bg: #ffffff;
    --elegant-section-bg: #fdf8e9;
    --elegant-gradient: linear-gradient(to right, #b38600, #d9b036);
    
    color: var(--elegant-text-primary);
    background-color: var(--elegant-bg);
    font-family: 'Playfair Display', serif;
    background-image: 
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b38600' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }

  .elegant-theme.dark {
    --elegant-gold: #dbb74e;
    --elegant-gold-light: #ecd78e;
    --elegant-cream: #211d18;
    --elegant-cream-dark: #171512;
    --elegant-brown: #f5edd6;
    --elegant-brown-light: #e6d7b3;
    --elegant-bg: #0f0d0a;
    --elegant-text-primary: #f5edd6;
    --elegant-text-secondary: #e6d7b3;
    --elegant-accent: #dbb74e;
    --elegant-accent-light: #ecd78e;
    --elegant-border: #3a342a;
    --elegant-card-bg: #1a1712;
    --elegant-section-bg: #171512;
    --elegant-gradient: linear-gradient(to right, #dbb74e, #ecd78e);
    
    background-image: 
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dbb74e' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  
  .elegant-theme .section {
    padding: 5rem 0;
    position: relative;
    scroll-margin-top: 2rem;
  }
  
  .elegant-theme .alt-section {
    background-color: var(--elegant-section-bg);
    position: relative;
  }
  
  .elegant-theme::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: var(--elegant-gradient);
    z-index: 100;
  }
  
  .elegant-theme .card {
    background-color: var(--elegant-card-bg);
    border-radius: 0;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    padding: 2rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    border-bottom: 2px solid var(--elegant-accent);
  }
  
  .elegant-theme .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
  
  .elegant-theme .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    padding: 0.75rem 1.5rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.8rem;
    transition: all 0.3s ease;
    position: relative;
  }
  
  .elegant-theme .btn::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--elegant-accent);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }
  
  .elegant-theme .btn:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
  
  .elegant-theme .btn-primary {
    background-color: var(--elegant-accent);
    color: white;
    border: 1px solid var(--elegant-accent);
  }
  
  .elegant-theme .btn-primary:hover {
    background-color: transparent;
    color: var(--elegant-accent);
  }
  
  .elegant-theme .btn-outline {
    background-color: transparent;
    border: 1px solid var(--elegant-accent);
    color: var(--elegant-accent);
  }
  
  .elegant-theme .btn-outline:hover {
    background-color: var(--elegant-accent);
    color: white;
  }
  
  .elegant-theme .btn-icon {
    padding: 0.75rem;
    border-radius: 0;
    background-color: transparent;
    color: var(--elegant-text-primary);
    border: 1px solid var(--elegant-border);
    transition: all 0.3s ease;
  }
  
  .elegant-theme .btn-icon:hover {
    background-color: var(--elegant-accent);
    color: white;
    border-color: var(--elegant-accent);
  }
  
  .elegant-theme .badge {
    display: inline-flex;
    align-items: center;
    border-radius: 0;
    padding: 0.5rem 1rem;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    background-color: var(--elegant-section-bg);
    color: var(--elegant-accent);
    border: 1px solid var(--elegant-border);
    transition: all 0.3s ease;
  }
  
  .elegant-theme .badge:hover {
    background-color: var(--elegant-accent);
    color: white;
    border-color: var(--elegant-accent);
  }
  
  .elegant-theme .skill-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0;
    padding: 0.5rem 1rem;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.03em;
    background-color: var(--elegant-section-bg);
    color: var(--elegant-text-secondary);
    border: 1px solid var(--elegant-border);
    transition: all 0.3s ease;
  }
  
  .elegant-theme .skill-badge:hover {
    transform: translateY(-3px);
    border-color: var(--elegant-accent);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }
  
  .elegant-theme h1, .elegant-theme h2, .elegant-theme h3 {
    font-weight: 700;
    line-height: 1.2;
    font-family: 'Playfair Display', serif;
  }
  
  .elegant-theme h1 {
    font-size: clamp(2.5rem, 6vw, 3.5rem);
    letter-spacing: -0.01em;
  }
  
  .elegant-theme p {
    line-height: 1.7;
    font-family: 'Montserrat', sans-serif;
  }
  
  .elegant-theme .section-title {
    position: relative;
    display: inline-block;
    margin-bottom: 3rem;
    text-align: center;
    width: 100%;
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-family: 'Playfair Display', serif;
    letter-spacing: 0;
  }
  
  .elegant-theme .section-title::after {
    content: '';
    position: absolute;
    bottom: -0.75rem;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 1px;
    background-color: var(--elegant-accent);
    transition: width 0.3s ease;
  }
  
  .elegant-theme .section-title:hover::after {
    width: 80px;
  }
  
  .elegant-theme .section-header {
    text-align: center;
    margin-bottom: 3.5rem;
  }
  
  .elegant-theme .section-header p {
    max-width: 600px;
    margin: 0.75rem auto 0;
    color: var(--elegant-text-secondary);
    font-size: 1.1rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
  }
  
  .elegant-theme .accent-text {
    color: var(--elegant-accent);
  }
  
  .elegant-theme .project-card {
    position: relative;
    overflow: hidden;
    border-radius: 0;
    transition: all 0.3s ease;
    border-bottom: 2px solid var(--elegant-accent);
  }
  
  .elegant-theme .project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
  
  .elegant-theme .project-image {
    transition: all 0.5s ease;
  }
  
  .elegant-theme .project-card:hover .project-image {
    transform: scale(1.05);
  }
  
  .elegant-theme .education-date {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 0;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    background-color: var(--elegant-section-bg);
    color: var(--elegant-text-secondary);
    font-weight: 500;
    letter-spacing: 0.03em;
    border: 1px solid var(--elegant-border);
    transition: all 0.3s ease;
  }
  
  .elegant-theme .education-date:hover {
    transform: translateY(-2px);
    border-color: var(--elegant-accent);
  }
  
  .elegant-theme .experience-logo {
    border: none;
    border-radius: 0;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }
  
  .elegant-theme .card:hover .experience-logo {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    .elegant-theme .section {
      padding: 4rem 0;
    }
    
    .elegant-theme .card {
      padding: 1.5rem;
    }
    
    .elegant-theme .section-header {
      margin-bottom: 2.5rem;
    }
    
    .elegant-theme .section-title {
      margin-bottom: 2.5rem;
    }
  }
  
  @media (max-width: 640px) {
    .elegant-theme .btn {
      padding: 0.625rem 1.25rem;
    }
    
    .elegant-theme .badge, .elegant-theme .skill-badge {
      padding: 0.375rem 0.75rem;
    }
  }
`;

const ElegantTheme = ({
  portfolio,
  experiences,
  projects,
  socials,
  skills,
  educations,
}: ThemeProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  let themeOptions: ThemeOptions = {
    theme: "elegant",
    colorTheme: "light",
    colors: ["#ffffff", "#fdf8e9", "#e6d7b3", "#2a1d05", "#b38600"],
    font: "playfair",
    colorPalette: {
      primary: "#b38600",
      secondary: "#d9b036",
      background: "#ffffff",
      text: "#2a1d05",
      accent: "#b38600",
      muted: "#59442b",
      border: "#e6d7b3",
      card: "#ffffff",
    },
    fonts: {
      heading: "Playfair Display, serif",
      body: "Montserrat, sans-serif",
    },
  };

  try {
    if (
      portfolio.options &&
      Array.isArray(portfolio.options) &&
      portfolio.options.length > 0 &&
      portfolio.options[0].options
    ) {
      if (typeof portfolio.options[0].options === "string") {
        const parsedOptions = JSON.parse(
          portfolio.options[0].options
        ) as Partial<ThemeOptions>;

        themeOptions = {
          ...themeOptions,
          ...parsedOptions,
        };
      } else if (
        typeof portfolio.options[0].options === "object" &&
        portfolio.options[0].options !== null
      ) {
        const optionsObj = portfolio.options[0]
          .options as Partial<ThemeOptions>;

        themeOptions = {
          ...themeOptions,
          ...optionsObj,
        };
      }
    }
  } catch (error) {
    console.error("Error processing theme options:", error);
  }

  if (
    themeOptions.colors &&
    Array.isArray(themeOptions.colors) &&
    themeOptions.colors.length >= 5
  ) {
    themeOptions.colorPalette = {
      primary: themeOptions.colors[4],
      secondary: themeOptions.colors[4] + "99",
      background: themeOptions.colors[0],
      text: themeOptions.colors[3],
      accent: themeOptions.colors[4],
      muted: themeOptions.colors[3] + "99",
      border: themeOptions.colors[2],
      card: themeOptions.colors[0],
    };
  }

  if (themeOptions.font) {
    const fontValue = `${themeOptions.font.charAt(0).toUpperCase() + themeOptions.font.slice(1)}, sans-serif`;
    themeOptions.fonts = {
      heading: fontValue,
      body: fontValue,
    };
  }

  const elegantThemeStyles = applyThemeCustomization(
    baseElegantThemeStyles,
    themeOptions,
    "elegant"
  );

  const themeClass = `elegant-theme ${themeOptions.colorTheme === "dark" ? "dark" : ""}`;

  const combinedStyles = `
    ${elegantThemeStyles}
    
    ${
      themeOptions.font
        ? `
      :root {
        --font-family: ${
          fontFamilies[themeOptions.font as keyof typeof fontFamilies] ||
          `${themeOptions.font.charAt(0).toUpperCase() + themeOptions.font.slice(1)}, sans-serif`
        } !important;
      }
    `
        : ""
    }
  `;

  return (
    <>
      <style jsx global>
        {combinedStyles}
      </style>

      <div className={themeClass}>
        {/* Hero Section */}
        <section className="section py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center"
            >
              <h1 className="accent-text mb-6 text-5xl font-bold leading-tight">
                {portfolio.contents.hero_header}
              </h1>
              <p className="max-w-2xl text-xl leading-relaxed text-[var(--elegant-text-secondary)]">
                {portfolio.contents.hero_description}
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                {socials.map((social) => (
                  <Link
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button type="button" className="btn btn-icon">
                      <span className="sr-only">{social.platform}</span>
                      {getPlatformIcon(social.platform)}
                    </button>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        {portfolio.contents.about_text && (
          <section className="alt-section section">
            <div className="container mx-auto px-4">
              <div className="section-header">
                <h2 className="section-title text-3xl font-bold">About Me</h2>
                <p>Get to know me better</p>
              </div>
              <div className="text-center">
                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[var(--elegant-text-secondary)]">
                  {portfolio.contents.about_text}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <section className="section">
            <div className="container mx-auto px-4">
              <div className="section-header">
                <h2 className="section-title text-3xl font-bold">Skills</h2>
                <p>Technologies and tools I work with</p>
              </div>
              <div className="mx-auto max-w-4xl">
                {skills && skills.length > 0 ? (
                  <div className="flex flex-wrap justify-center gap-3">
                    {skills.map((skill: Skill) => {
                      const SkillIcon = getSkillIcon(skill.name);
                      const skillColor = getSkillColor(skill.name);

                      return (
                        <span
                          key={skill.id}
                          className="skill-badge"
                          style={{
                            borderColor: `${skillColor}20`,
                            color: skillColor,
                            background: `${skillColor}10`,
                          }}
                        >
                          <SkillIcon size={14} />
                          {skill.name}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-center text-[var(--elegant-text-secondary)]">
                    No skills information yet.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Education Section */}
        {educations && educations.length > 0 && (
          <section className="alt-section section">
            <div className="container mx-auto px-4">
              <div className="section-header">
                <h2 className="section-title text-3xl font-bold">Education</h2>
                <p>My academic background and qualifications</p>
              </div>
              <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6">
                {educations && educations.length > 0 ? (
                  educations.map((education: Education, index) => (
                    <div key={education.id} className="card">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold">
                            {education.degree} in {education.field}
                          </h3>
                          <p className="text-[var(--elegant-text-secondary)] mt-1">
                            {education.school}
                          </p>
                        </div>
                        <div className="education-date">
                          <CalendarIcon className="mr-1 size-4" />
                          <span>
                            {format(new Date(education.start_date), "MMM yyyy")}{" "}
                            -{" "}
                            {education.end_date
                              ? format(new Date(education.end_date), "MMM yyyy")
                              : "Present"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-[var(--elegant-text-secondary)]">
                    No education information yet.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Experience Section */}
        {experiences && experiences.length > 0 && (
          <section className="section">
            <div className="container mx-auto px-4">
              <div className="section-header">
                <h2 className="section-title text-3xl font-bold">Experience</h2>
                <p>My professional journey and work history</p>
              </div>
              <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6">
                {experiences && experiences.length > 0 ? (
                  experiences.map((experience, index) => (
                    <div key={experience.id} className="card">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold">
                            {experience.role}
                          </h3>
                          <div className="mt-2 flex items-center gap-3">
                            {experience.logo && (
                              <div className="overflow-hidden experience-logo">
                                <Image
                                  src={experience.logo}
                                  alt={experience.company}
                                  width={40}
                                  height={40}
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <p className="font-medium text-[var(--elegant-text-secondary)]">
                              {experience.company}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-[var(--elegant-text-secondary)]">
                            {experience.employment_type}
                          </p>
                        </div>
                        <div className="education-date">
                          <CalendarIcon className="mr-1 size-4" />
                          <span>
                            {format(experience.start_date, "MMM yyyy")} -{" "}
                            {experience.end_date
                              ? format(experience.end_date, "MMM yyyy")
                              : "Present"}
                          </span>
                        </div>
                      </div>
                      <p className="mt-4 text-[var(--elegant-text-secondary)]">
                        {experience.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-[var(--elegant-text-secondary)]">
                    No experience information yet.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section className="alt-section section">
            <div className="container mx-auto px-4">
              <div className="section-header">
                <h2 className="section-title text-3xl font-bold">Projects</h2>
                <p>Showcasing my work and creative solutions</p>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
                {projects && projects.length > 0 ? (
                  projects.map((project, index) => (
                    <div key={project.id} className="project-card">
                      <div className="card flex h-full flex-col">
                        <div className="relative mb-5 aspect-video overflow-hidden">
                          {project.image ? (
                            <Image
                              src={project.image}
                              alt={project.title}
                              className="project-image object-cover"
                              fill
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-[var(--elegant-accent)] to-[var(--elegant-accent-light)]">
                              <span className="text-xl font-bold text-white">
                                {project.title.substring(0, 2).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="mb-2 text-2xl font-semibold">
                            {project.title}
                          </h3>
                          <p className="text-[var(--elegant-text-secondary)]">
                            {project.description}
                          </p>
                        </div>
                        <div className="mt-auto pt-6 grid grid-cols-2 gap-3">
                          {project.repo_url && (
                            <Link
                              href={project.repo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline"
                            >
                              <FaGithub className="mr-2 size-4" />
                              Source Code
                            </Link>
                          )}
                          {project.live_url && (
                            <Link
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary"
                            >
                              <ExternalLinkIcon className="mr-2 size-4" />
                              Live Demo
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="col-span-2 text-center text-[var(--elegant-text-secondary)]">
                    No project information yet.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="py-12 text-center text-[var(--elegant-text-secondary)]">
          <div className="container mx-auto px-4">
            <div>
              <p className="mb-2 text-sm">
                ©{new Date().getFullYear()} {portfolio.contents.meta_title}
              </p>
              <div className="mx-auto mt-4 flex justify-center gap-4">
                {socials.map((social) => (
                  <Link
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--elegant-text-secondary)] transition-colors hover:text-[var(--elegant-accent)]"
                  >
                    {getPlatformIcon(social.platform)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ElegantTheme;
