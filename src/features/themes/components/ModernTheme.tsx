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

const baseModernThemeStyles = `
  .modern-theme {
    --modern-bg: #ffffff;
    --modern-text-primary: #121212;
    --modern-text-secondary: #5f6c7b;
    --modern-accent: #0066ff;
    --modern-accent-light: #3b82f6;
    --modern-border: #e2e8f0;
    --modern-card-bg: #ffffff;
    --modern-section-bg: #f8fafc;
    --modern-gradient: linear-gradient(135deg, #0066ff, #3b82f6);
    
    color: var(--modern-text-primary);
    background-color: var(--modern-bg);
    font-family: 'Inter', system-ui, sans-serif;
    overflow-x: hidden;
  }

  .modern-theme.dark {
    --modern-bg: #0f172a;
    --modern-text-primary: #f8fafc;
    --modern-text-secondary: #94a3b8;
    --modern-accent: #3b82f6;
    --modern-accent-light: #60a5fa;
    --modern-border: #1e293b;
    --modern-card-bg: #1e293b;
    --modern-section-bg: #0f172a;
    --modern-gradient: linear-gradient(135deg, #3b82f6, #2563eb);
  }
  
  .modern-theme .section {
    padding: 6rem 0;
    position: relative;
    overflow: hidden;
    scroll-margin-top: 2rem;
  }
  
  .modern-theme .alt-section {
    background-color: var(--modern-section-bg);
    position: relative;
  }
  
  .modern-theme .alt-section::before,
  .modern-theme .alt-section::after {
    content: '';
    position: absolute;
    background-color: var(--modern-accent);
    opacity: 0.03;
    border-radius: 50%;
    z-index: 0;
    filter: blur(50px);
  }
  
  .modern-theme .alt-section::before {
    width: 500px;
    height: 500px;
    top: -250px;
    right: -250px;
  }
  
  .modern-theme .alt-section::after {
    width: 300px;
    height: 300px;
    bottom: -150px;
    left: -150px;
  }
  
  .modern-theme .card {
    background-color: var(--modern-card-bg);
    border-radius: 1.25rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
    padding: 2.25rem;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    border: none;
    position: relative;
    overflow: hidden;
  }
  
  .modern-theme .card:hover {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    transform: translateY(-8px);
  }
  
  .modern-theme .card-highlight {
    position: absolute;
    top: 0;
    left: 0;
    height: 5px;
    width: 0;
    background: var(--modern-gradient);
    transition: width 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: 1;
  }
  
  .modern-theme .card:hover .card-highlight {
    width: 100%;
  }
  
  .modern-theme .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.875rem;
    padding: 0.875rem 1.75rem;
    font-weight: 600;
    transition: all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
    position: relative;
    overflow: hidden;
    z-index: 1;
    letter-spacing: 0.01em;
  }
  
  .modern-theme .btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.2));
    transform: translateX(-100%);
    transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: -1;
  }
  
  .modern-theme .btn:hover::before {
    transform: translateX(0);
  }
  
  .modern-theme .btn-primary {
    background: var(--modern-gradient);
    color: white;
    box-shadow: 0 6px 16px rgba(0, 102, 255, 0.25);
  }
  
  .modern-theme .btn-primary:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 25px rgba(0, 102, 255, 0.35);
  }
  
  .modern-theme .btn-outline {
    background-color: transparent;
    border: 2px solid var(--modern-border);
    color: var(--modern-text-primary);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  }
  
  .modern-theme .btn-outline:hover {
    border-color: var(--modern-accent);
    color: var(--modern-accent);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 102, 255, 0.15);
  }
  
  .modern-theme .btn-icon {
    padding: 0.875rem;
    border-radius: 0.875rem;
    transition: all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
    border: 2px solid var(--modern-border);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  }
  
  .modern-theme .btn-icon:hover {
    background-color: var(--modern-accent);
    color: white;
    transform: translateY(-3px) scale(1.05);
    border-color: var(--modern-accent);
    box-shadow: 0 8px 20px rgba(0, 102, 255, 0.2);
  }
  
  .modern-theme .badge {
    display: inline-flex;
    align-items: center;
    border-radius: 0.875rem;
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 600;
    background-color: var(--modern-section-bg);
    color: var(--modern-text-secondary);
    transition: all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
    border: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  
  .modern-theme .badge:hover {
    background-color: var(--modern-accent-light);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 102, 255, 0.15);
  }
  
  .modern-theme .skill-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.875rem;
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    background-color: var(--modern-section-bg);
    color: var(--modern-text-secondary);
    transition: all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
    border: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  
  .modern-theme .skill-badge:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  }
  
  .modern-theme h1, .modern-theme h2, .modern-theme h3 {
    font-weight: 700;
    line-height: 1.2;
  }
  
  .modern-theme h1 {
    font-size: clamp(2.5rem, 6vw, 3.5rem);
    letter-spacing: -0.02em;
  }
  
  .modern-theme h2 {
    letter-spacing: -0.01em;
  }
  
  .modern-theme p {
    line-height: 1.8;
  }
  
  .modern-theme .section-title {
    position: relative;
    display: inline-block;
    margin-bottom: 3.5rem;
    text-align: center;
    width: 100%;
    font-size: clamp(2rem, 5vw, 2.75rem);
    letter-spacing: -0.01em;
  }
  
  .modern-theme .section-title::after {
    content: '';
    position: absolute;
    bottom: -1.25rem;
    left: 50%;
    transform: translateX(-50%);
    width: 5rem;
    height: 0.35rem;
    background: var(--modern-gradient);
    border-radius: 9999px;
    transition: width 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  .modern-theme .section-title:hover::after {
    width: 7rem;
  }
  
  .modern-theme .section-header {
    text-align: center;
    margin-bottom: 4.5rem;
  }
  
  .modern-theme .section-header p {
    max-width: 700px;
    margin: 1rem auto 0;
    color: var(--modern-text-secondary);
    font-size: 1.125rem;
  }
  
  .modern-theme .hero-text {
    background: var(--modern-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    position: relative;
    display: inline-block;
  }
  
  .modern-theme .hero-text::after {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    background: var(--modern-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    filter: blur(8px);
    opacity: 0.5;
  }
  
  .modern-theme .project-card {
    position: relative;
    overflow: hidden;
    border-radius: 1.25rem;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  .modern-theme .project-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  .modern-theme .project-image {
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  .modern-theme .project-card:hover .project-image {
    transform: scale(1.08);
  }
  
  .modern-theme .education-card {
    border-radius: 1.25rem;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  .modern-theme .education-date {
    display: inline-flex;
    align-items: center;
    padding: 0.625rem 1.25rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    background: var(--modern-section-bg);
    color: var(--modern-text-secondary);
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
  }
  
  .modern-theme .education-date:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    color: var(--modern-accent);
  }
  
  .modern-theme .experience-logo {
    border: none;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  .modern-theme .card:hover .experience-logo {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    .modern-theme .section {
      padding: 4rem 0;
    }
    
    .modern-theme .card {
      padding: 1.75rem;
    }
    
    .modern-theme .section-header {
      margin-bottom: 3rem;
    }
    
    .modern-theme .section-title {
      margin-bottom: 2.5rem;
    }
    
    .modern-theme .section-title::after {
      width: 4rem;
      height: 0.25rem;
    }
  }
  
  @media (max-width: 640px) {
    .modern-theme .btn {
      padding: 0.75rem 1.5rem;
    }
    
    .modern-theme .btn-icon {
      padding: 0.75rem;
    }
    
    .modern-theme .badge, .modern-theme .skill-badge {
      padding: 0.5rem 1rem;
    }
  }
`;

const ModernTheme = ({
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
    theme: "modern",
    colorTheme: "light",
    colors: ["#FFFFFF", "#f8fafc", "#e2e8f0", "#121212", "#0066ff"],
    font: "inter",
    colorPalette: {
      primary: "#0066ff",
      secondary: "#60a5fa",
      background: "#ffffff",
      text: "#121212",
      accent: "#0066ff",
      muted: "#5f6c7b",
      border: "#e2e8f0",
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

  const modernThemeStyles = applyThemeCustomization(
    baseModernThemeStyles,
    themeOptions,
    "modern"
  );

  const themeClass = `modern-theme ${themeOptions.colorTheme === "dark" ? "dark" : ""}`;

  // Font variables and theme styles combined
  const combinedStyles = `
    ${modernThemeStyles}
    
    ${
      themeOptions.font
        ? `
      :root {
        --font-family: ${
          fontFamilies[themeOptions.font as keyof typeof fontFamilies] ||
          `${themeOptions.font.charAt(0).toUpperCase() + themeOptions.font.slice(1)}, system-ui, sans-serif`
        } !important;
      }
      
      .modern-theme, .modern-theme * {
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
      <style jsx global>
        {combinedStyles}
      </style>

      <div className={themeClass + ` font-${themeOptions.font} min-h-screen`}>
        {/* Hero Section */}
        <section className="section py-24 md:py-32" id="hero">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center"
            >
              <motion.h1
                className="mb-6 text-5xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.span
                  className="hero-text"
                  data-text={portfolio.contents.hero_header}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {portfolio.contents.hero_header}
                </motion.span>
              </motion.h1>
              <motion.p
                className="max-w-2xl text-xl leading-relaxed text-[var(--modern-text-secondary)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                {portfolio.contents.hero_description}
              </motion.p>

              <motion.div
                className="mt-10 flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {socials.map((social, index) => (
                  <motion.div
                    key={social.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
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
                className="mx-auto max-w-3xl rounded-2xl bg-[var(--modern-card-bg)] p-8 shadow-lg"
              >
                <p className="text-lg leading-relaxed text-[var(--modern-text-secondary)]">
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
                          <SkillIcon size={16} />
                          {skill.name}
                        </motion.span>
                      );
                    })}
                  </motion.div>
                ) : (
                  <p className="text-center text-[var(--modern-text-secondary)]">
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
                        <div className="card-highlight"></div>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold">
                              {education.degree} in {education.field}
                            </h3>
                            <p className="mt-1 text-[var(--modern-text-secondary)]">
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
                  <p className="text-center text-[var(--modern-text-secondary)]">
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
                        <div className="card-highlight"></div>
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
                                    width={50}
                                    height={50}
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <p className="font-medium text-[var(--modern-text-secondary)]">
                                {experience.company}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-[var(--modern-text-secondary)]">
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
                        <p className="mt-4 text-[var(--modern-text-secondary)]">
                          {experience.description}
                        </p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-[var(--modern-text-secondary)]">
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
                        <div className="card-highlight"></div>
                        <div className="relative mb-5 aspect-video overflow-hidden rounded-lg">
                          {project.image ? (
                            <Image
                              src={project.image}
                              alt={project.title}
                              className="project-image object-cover"
                              fill
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-[var(--modern-accent)] to-[var(--modern-accent-light)]">
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
                          <p className="text-[var(--modern-text-secondary)]">
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
                  <p className="col-span-2 text-center text-[var(--modern-text-secondary)]">
                    No project information yet.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="py-12 text-center text-[var(--modern-text-secondary)]">
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
                    className="text-[var(--modern-text-secondary)] transition-colors hover:text-[var(--modern-accent)]"
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

export default ModernTheme;
