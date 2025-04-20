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
  applyThemeCustomization,
  fontFamilies,
} from "../utils/themeCustomization";
import { FaGithub } from "react-icons/fa";

const baseMinimalThemeStyles = `
  .minimal-theme {
    --minimal-bg: #fafafa;
    --minimal-text-primary: #171717;
    --minimal-text-secondary: #525252;
    --minimal-accent: #2563eb;
    --minimal-accent-light: #60a5fa;
    --minimal-border: #e5e5e5;
    --minimal-card-bg: #ffffff;
    --minimal-section-bg: #f5f5f5;
    --minimal-gradient: linear-gradient(135deg, #3b82f6, #2563eb);
    
    color: var(--minimal-text-primary);
    background-color: var(--minimal-bg);
    font-family: 'Inter', system-ui, sans-serif;
  }

  .minimal-theme.dark {
    --minimal-bg: #121212;
    --minimal-text-primary: #f5f5f5;
    --minimal-text-secondary: #a3a3a3;
    --minimal-accent: #3b82f6;
    --minimal-accent-light: #93c5fd;
    --minimal-border: #262626;
    --minimal-card-bg: #1e1e1e;
    --minimal-section-bg: #171717;
    --minimal-gradient: linear-gradient(135deg, #3b82f6, #1d4ed8);
  }
  
  .minimal-theme .section {
    padding: 5rem 0;
  }
  
  .minimal-theme .alt-section {
    background-color: var(--minimal-section-bg);
  }
  
  .minimal-theme .card {
    background-color: var(--minimal-card-bg);
    border: 1px solid var(--minimal-border);
    border-radius: 0.75rem;
    padding: 1.75rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .minimal-theme .card:hover {
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.08);
    transform: translateY(-3px);
  }
  
  .minimal-theme .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--minimal-gradient);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .minimal-theme .card:hover::before {
    opacity: 1;
  }
  
  .minimal-theme .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    padding: 0.625rem 1.25rem;
    font-weight: 500;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }
  
  .minimal-theme .btn-primary {
    background: var(--minimal-gradient);
    color: white;
    box-shadow: 0 4px 14px rgba(37, 99, 235, 0.2);
  }
  
  .minimal-theme .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.25);
  }
  
  .minimal-theme .btn-outline {
    background-color: transparent;
    border: 1px solid var(--minimal-border);
    color: var(--minimal-text-primary);
  }
  
  .minimal-theme .btn-outline:hover {
    border-color: var(--minimal-accent);
    color: var(--minimal-accent);
    transform: translateY(-2px);
  }
  
  .minimal-theme .btn-icon {
    padding: 0.625rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
  }
  
  .minimal-theme .btn-icon:hover {
    background-color: var(--minimal-accent);
    color: white;
    transform: translateY(-2px);
  }
  
  .minimal-theme .badge {
    display: inline-flex;
    align-items: center;
    border-radius: 9999px;
    padding: 0.375rem 0.875rem;
    font-size: 0.75rem;
    font-weight: 500;
    background-color: var(--minimal-section-bg);
    color: var(--minimal-text-secondary);
    transition: all 0.2s ease;
    border: 1px solid transparent;
  }
  
  .minimal-theme .badge:hover {
    border-color: var(--minimal-accent);
    color: var(--minimal-accent);
    transform: translateY(-1px);
  }
  
  .minimal-theme .skill-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    border-radius: 9999px;
    padding: 0.375rem 0.875rem;
    font-size: 0.75rem;
    font-weight: 500;
    background-color: var(--minimal-section-bg);
    color: var(--minimal-text-secondary);
    transition: all 0.2s ease;
    border: 1px solid transparent;
  }
  
  .minimal-theme .skill-badge:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  }
  
  .minimal-theme h1, .minimal-theme h2, .minimal-theme h3 {
    font-weight: 700;
    line-height: 1.2;
  }
  
  .minimal-theme p {
    line-height: 1.6;
  }
  
  .minimal-theme .section-title {
    position: relative;
    display: inline-block;
    margin-bottom: 2.5rem;
    text-align: center;
    width: 100%;
  }
  
  .minimal-theme .section-title::after {
    content: '';
    position: absolute;
    bottom: -0.75rem;
    left: 50%;
    transform: translateX(-50%);
    width: 3rem;
    height: 0.25rem;
    background: var(--minimal-gradient);
    border-radius: 9999px;
  }
  
  .minimal-theme .section-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .minimal-theme .section-header p {
    max-width: 600px;
    margin: 0.5rem auto 0;
    color: var(--minimal-text-secondary);
  }
  
  .minimal-theme .hero-gradient {
    background: var(--minimal-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .minimal-theme .project-card {
    position: relative;
    overflow: hidden;
    border-radius: 0.75rem;
    transition: all 0.3s ease;
  }
  
  .minimal-theme .project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
  
  .minimal-theme .project-image {
    transition: all 0.5s ease;
  }
  
  .minimal-theme .project-card:hover .project-image {
    transform: scale(1.05);
  }
  
  .minimal-theme .education-card {
    position: relative;
    overflow: hidden;
    border-radius: 0.75rem;
    transition: all 0.3s ease;
  }
  
  .minimal-theme .education-date {
    display: inline-flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    background: var(--minimal-section-bg);
    color: var(--minimal-text-secondary);
  }
  
  .minimal-theme .experience-logo {
    border: 2px solid var(--minimal-border);
    transition: all 0.3s ease;
  }
  
  .minimal-theme .card:hover .experience-logo {
    border-color: var(--minimal-accent);
  }
  
  .minimal-theme .skill-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1rem;
  }
  
  @media (max-width: 640px) {
    .minimal-theme .skill-grid {
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }
  }
`;

const MinimalTheme = ({
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
    theme: "minimal",
    colorTheme: "light",
    colors: ["#FFFFFF", "#F5F5F5", "#E5E5E5", "#000000", "#3B82F6"],
    font: "inter",
    colorPalette: {
      primary: "#2563eb",
      secondary: "#60a5fa",
      background: "#fafafa",
      text: "#171717",
      accent: "#3b82f6",
      muted: "#a3a3a3",
      border: "#e5e5e5",
      card: "#ffffff",
    },
    fonts: {
      heading: "Inter, system-ui, sans-serif",
      body: "Inter, system-ui, sans-serif",
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
    const fontValue = `${themeOptions.font.charAt(0).toUpperCase() + themeOptions.font.slice(1)}, system-ui, sans-serif`;
    themeOptions.fonts = {
      heading: fontValue,
      body: fontValue,
    };
  }

  const minimalThemeStyles = applyThemeCustomization(
    baseMinimalThemeStyles,
    themeOptions,
    "minimal"
  );

  const themeClass = `minimal-theme ${themeOptions.colorTheme === "dark" ? "dark" : ""}`;

  // Font değişkenlerini ve tema stillerini tek bir string'de birleştir
  const combinedStyles = `
    ${minimalThemeStyles}
    
    ${
      themeOptions.font
        ? `
      :root {
        --font-family: ${
          fontFamilies[themeOptions.font as keyof typeof fontFamilies] ||
          `${themeOptions.font.charAt(0).toUpperCase() + themeOptions.font.slice(1)}, system-ui, sans-serif`
        } !important;
      }
      
      .minimal-theme, .minimal-theme * {
        font-family: ${
          fontFamilies[themeOptions.font as keyof typeof fontFamilies] ||
          `${themeOptions.font.charAt(0).toUpperCase() + themeOptions.font.slice(1)}, system-ui, sans-serif`
        } !important;
      }
    `
        : ""
    }
  `;

  return (
    <>
      {/* Tüm stilleri tek bir style etiketinde birleştir */}
      <style jsx global>
        {combinedStyles}
      </style>

      <div className={themeClass + ` font-${themeOptions.font} min-h-screen`}>
        {/* Hero Section */}
        <section className="section py-24" id="hero">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center"
            >
              <h1 className="mb-6 text-5xl font-bold leading-tight">
                <span className="hero-gradient">
                  {portfolio.contents.hero_header}
                </span>
              </h1>
              <p
                className="max-w-2xl text-xl leading-relaxed"
                style={{
                  color:
                    themeOptions.colorTheme === "dark"
                      ? "#a3a3a3"
                      : themeOptions.colors && themeOptions.colors.length > 3
                        ? themeOptions.colors[3] + "99"
                        : "#52525299",
                }}
              >
                {portfolio.contents.hero_description}
              </p>

              <motion.div
                className="mt-10 flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {socials.map((social, index) => (
                  <motion.div
                    key={social.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button
                        type="button"
                        className="btn btn-outline btn-icon"
                      >
                        <span className="sr-only">{social.platform}</span>
                        {getPlatformIcon(social.platform)}
                      </button>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        {portfolio.contents.about_text && (
          <section className="alt-section section" id="about">
            <div className="container mx-auto px-4">
              <div className="section-header">
                <h2 className="section-title text-3xl font-bold">About Me</h2>
                <p>Get to know me better</p>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[#525252]">
                  {portfolio.contents.about_text}
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <section className="alt-section section" id="skills">
            <div className="container mx-auto px-4">
              <div className="section-header">
                <h2 className="section-title text-3xl font-bold">Skills</h2>
                <p>Technologies and tools I work with</p>
              </div>
              <div className="mx-auto max-w-4xl">
                {skills && skills.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3"
                  >
                    {skills.map((skill: Skill, index) => {
                      const SkillIcon = getSkillIcon(skill.name);
                      const skillColor = getSkillColor(skill.name);

                      return (
                        <motion.span
                          key={skill.id}
                          variants={itemVariants}
                          className="skill-badge"
                          style={{
                            borderColor: `${skillColor}20`,
                            color: skillColor,
                            background: `${skillColor}10`,
                          }}
                        >
                          <SkillIcon size={14} />
                          {skill.name}
                        </motion.span>
                      );
                    })}
                  </motion.div>
                ) : (
                  <p className="text-center text-[#525252]">
                    No skills information yet.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Education Section */}
        {educations && educations.length > 0 && (
          <section className="alt-section section" id="education">
            <div className="container mx-auto px-4">
              <div className="section-header">
                <h2 className="section-title text-3xl font-bold">Education</h2>
                <p>My academic background and qualifications</p>
              </div>
              <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6">
                {educations && educations.length > 0 ? (
                  educations.map((education: Education, index) => (
                    <motion.div
                      key={education.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="card">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold">
                              {education.degree} in {education.field}
                            </h3>
                            <p className="text-[#525252] mt-1">
                              {education.school}
                            </p>
                          </div>
                          <div className="education-date">
                            <CalendarIcon className="mr-1 size-4" />
                            <span>
                              {format(
                                new Date(education.start_date),
                                "MMM yyyy"
                              )}{" "}
                              -{" "}
                              {education.end_date &&
                              education.end_date !== "Present"
                                ? format(
                                    new Date(education.end_date),
                                    "MMM yyyy"
                                  )
                                : "Present"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-[#525252]">
                    No education information yet.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Experience Section */}
        {experiences && experiences.length > 0 && (
          <section className="alt-section section" id="experience">
            <div className="container mx-auto px-4">
              <div className="section-header">
                <h2 className="section-title text-3xl font-bold">Experience</h2>
                <p>My professional journey and work history</p>
              </div>
              <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6">
                {experiences && experiences.length > 0 ? (
                  experiences.map((experience, index) => (
                    <motion.div
                      key={experience.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="card">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold">
                              {experience.role}
                            </h3>
                            <div className="mt-2 flex items-center gap-3">
                              {experience.logo && (
                                <div className="overflow-hidden rounded-full experience-logo">
                                  <Image
                                    src={experience.logo}
                                    alt={experience.company}
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <p className="font-medium text-[#525252]">
                                {experience.company}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-[#525252]">
                              {experience.employment_type}
                            </p>
                          </div>
                          <div className="education-date">
                            <CalendarIcon className="mr-1 size-4" />
                            <span>
                              {format(experience.start_date, "MMM yyyy")} -{" "}
                              {experience.end_date &&
                              experience.end_date !== "Present"
                                ? format(experience.end_date, "MMM yyyy")
                                : "Present"}
                            </span>
                          </div>
                        </div>
                        <p className="mt-4 text-[#525252]">
                          {experience.description}
                        </p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-[#525252]">
                    No experience information yet.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section className="alt-section section" id="projects">
            <div className="container mx-auto px-4">
              <div className="section-header">
                <h2 className="section-title text-3xl font-bold">Projects</h2>
                <p>Showcasing my work and creative solutions</p>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
                {projects && projects.length > 0 ? (
                  projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="project-card"
                    >
                      <div className="card flex h-full flex-col">
                        <div className="relative mb-5 aspect-video overflow-hidden rounded-lg">
                          {project.image ? (
                            <Image
                              src={project.image}
                              alt={project.title}
                              className="project-image object-cover"
                              fill
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
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
                          <p className="text-[#525252]">
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
                    </motion.div>
                  ))
                ) : (
                  <p className="col-span-2 text-center text-[#525252]">
                    No project information yet.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="py-12 text-center text-[#525252]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
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
                    className="text-[#525252] transition-colors hover:text-[var(--minimal-accent)]"
                  >
                    {getPlatformIcon(social.platform)}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MinimalTheme;
