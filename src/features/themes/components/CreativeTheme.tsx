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

const baseCreativeThemeStyles = `
  .creative-theme {
    --creative-bg: #fdfbff;
    --creative-text-primary: #1a1a2e;
    --creative-text-secondary: #4a4a6a;
    --creative-accent: #7209b7;
    --creative-accent-light: #b5179e;
    --creative-border: #f0e6ff;
    --creative-card-bg: #ffffff;
    --creative-section-bg: #f8f0ff;
    --creative-gradient: linear-gradient(135deg, #7209b7, #b5179e);
    
    color: var(--creative-text-primary);
    background-color: var(--creative-bg);
    font-family: 'Poppins', system-ui, sans-serif;
  }

  .creative-theme.dark {
    --creative-bg: #0f0f1b;
    --creative-text-primary: #f0e6ff;
    --creative-text-secondary: #c8b6e2;
    --creative-accent: #b5179e;
    --creative-accent-light: #d33fd3;
    --creative-border: #241c30;
    --creative-card-bg: #16141f;
    --creative-section-bg: #1a1a2e;
    --creative-gradient: linear-gradient(135deg, #b5179e, #7209b7);
  }
  
  .creative-theme .section {
    padding: 6rem 0;
    position: relative;
    overflow: hidden;
  }
  
  .creative-theme .section::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: var(--creative-gradient);
    opacity: 0.05;
    top: -150px;
    right: -150px;
    z-index: 0;
  }
  
  .creative-theme .section::after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: var(--creative-gradient);
    opacity: 0.03;
    bottom: -100px;
    left: -100px;
    z-index: 0;
  }
  
  .creative-theme .alt-section {
    background-color: var(--creative-section-bg);
  }
  
  .creative-theme .card {
    background-color: var(--creative-card-bg);
    border-radius: 1.5rem;
    box-shadow: 0 10px 30px rgba(114, 9, 183, 0.06);
    padding: 2rem;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
    border: none;
    z-index: 1;
  }
  
  .creative-theme .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--creative-gradient);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  .creative-theme .card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(114, 9, 183, 0.15);
  }
  
  .creative-theme .card:hover::before {
    opacity: 0.02;
  }
  
  .creative-theme .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    padding: 0.75rem 1.75rem;
    font-weight: 600;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }
  
  .creative-theme .btn-primary {
    background: var(--creative-gradient);
    color: white;
    box-shadow: 0 5px 15px rgba(114, 9, 183, 0.3);
  }
  
  .creative-theme .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(114, 9, 183, 0.4);
  }
  
  .creative-theme .btn-outline {
    background-color: transparent;
    border: 2px solid var(--creative-accent);
    color: var(--creative-accent);
  }
  
  .creative-theme .btn-outline:hover {
    background-color: var(--creative-accent);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(114, 9, 183, 0.25);
  }
  
  .creative-theme .btn-icon {
    padding: 1rem;
    border-radius: 9999px;
    background-color: transparent;
    color: var(--creative-accent);
    border: 2px solid var(--creative-border);
    transition: all 0.3s ease;
  }
  
  .creative-theme .btn-icon:hover {
    background-color: var(--creative-accent);
    color: white;
    border-color: var(--creative-accent);
    transform: translateY(-3px) rotate(10deg);
    box-shadow: 0 8px 25px rgba(114, 9, 183, 0.25);
  }
  
  .creative-theme .badge {
    display: inline-flex;
    align-items: center;
    border-radius: 9999px;
    padding: 0.5rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    background-color: var(--creative-section-bg);
    color: var(--creative-accent);
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }
  
  .creative-theme .badge:hover {
    background-color: var(--creative-accent);
    color: white;
    transform: translateY(-3px) scale(1.05);
  }
  
  .creative-theme .skill-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 9999px;
    padding: 0.5rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.3s ease;
    border: none;
  }
  
  .creative-theme .skill-badge:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
  
  .creative-theme h1, .creative-theme h2, .creative-theme h3 {
    font-weight: 700;
    line-height: 1.2;
  }
  
  .creative-theme h1 {
    font-size: 3.5rem;
  }
  
  .creative-theme p {
    line-height: 1.8;
  }
  
  .creative-theme .section-title {
    position: relative;
    display: inline-block;
    margin-bottom: 3rem;
    text-align: center;
    width: 100%;
    font-size: 2.5rem;
  }
  
  .creative-theme .section-title::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 5px;
    background: var(--creative-gradient);
    border-radius: 9999px;
  }
  
  .creative-theme .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }
  
  .creative-theme .section-header p {
    max-width: 700px;
    margin: 1rem auto 0;
    color: var(--creative-text-secondary);
    font-size: 1.125rem;
  }
  
  .creative-theme .hero-gradient-text {
    background: var(--creative-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  
  .creative-theme .project-card {
    position: relative;
    overflow: hidden;
    border-radius: 1.5rem;
    transition: all 0.4s ease;
  }
  
  .creative-theme .project-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(114, 9, 183, 0.15);
  }
  
  .creative-theme .project-image {
    transition: all 0.6s ease;
  }
  
  .creative-theme .project-card:hover .project-image {
    transform: scale(1.08);
  }
  
  .creative-theme .education-date {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1.25rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    background: var(--creative-section-bg);
    color: var(--creative-accent);
    font-weight: 500;
  }
  
  .creative-theme .experience-logo {
    border: none;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .creative-theme .card:hover .experience-logo {
    box-shadow: 0 8px 25px rgba(114, 9, 183, 0.15);
    transform: scale(1.05);
  }
`;

const CreativeTheme = ({
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
    theme: "creative",
    colorTheme: "light",
    colors: ["#fdfbff", "#f8f0ff", "#f0e6ff", "#1a1a2e", "#7209b7"],
    font: "poppins",
    colorPalette: {
      primary: "#7209b7",
      secondary: "#b5179e",
      background: "#fdfbff",
      text: "#1a1a2e",
      accent: "#7209b7",
      muted: "#4a4a6a",
      border: "#f0e6ff",
      card: "#ffffff",
    },
    fonts: {
      heading: "Poppins, system-ui, sans-serif",
      body: "Poppins, system-ui, sans-serif",
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
      secondary: themeOptions.colors[4] + "cc",
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

  const creativeThemeStyles = applyThemeCustomization(
    baseCreativeThemeStyles,
    themeOptions,
    "creative"
  );

  const themeClass = `creative-theme ${themeOptions.colorTheme === "dark" ? "dark" : ""}`;

  // Font variables and theme styles combined
  const combinedStyles = `
    ${creativeThemeStyles}
    
    ${
      themeOptions.font
        ? `
      :root {
        --font-family: ${
          fontFamilies[themeOptions.font as keyof typeof fontFamilies] ||
          `${themeOptions.font.charAt(0).toUpperCase() + themeOptions.font.slice(1)}, system-ui, sans-serif`
        } !important;
      }
      
      .creative-theme, .creative-theme * {
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
        <section className="section py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center"
            >
              <h1 className="mb-8 text-6xl font-bold leading-tight">
                <span className="hero-gradient-text">
                  {portfolio.contents.hero_header}
                </span>
              </h1>
              <p className="max-w-2xl text-xl leading-relaxed text-[var(--creative-text-secondary)]">
                {portfolio.contents.hero_description}
              </p>

              <motion.div
                className="mt-12 flex gap-4"
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
                      <button type="button" className="btn btn-icon">
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
          <section className="alt-section section">
            <div className="container mx-auto px-4">
              <div className="section-header">
                <h2 className="section-title text-4xl font-bold">About Me</h2>
                <p>Get to know me better</p>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="mx-auto max-w-3xl rounded-[2rem] bg-[var(--creative-card-bg)] p-8 shadow-lg"
              >
                <p className="text-lg leading-relaxed text-[var(--creative-text-secondary)]">
                  {portfolio.contents.about_text}
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <section className="section">
            <div className="container mx-auto px-4">
              <div className="section-header">
                <h2 className="section-title text-4xl font-bold">Skills</h2>
                <p>Technologies and tools I work with</p>
              </div>
              <div className="mx-auto max-w-4xl">
                {skills && skills.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-4"
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
                            background: `${skillColor}15`,
                          }}
                        >
                          <SkillIcon size={18} />
                          {skill.name}
                        </motion.span>
                      );
                    })}
                  </motion.div>
                ) : (
                  <p className="text-center text-[var(--creative-text-secondary)]">
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
                <h2 className="section-title text-4xl font-bold">Education</h2>
                <p>My academic background and qualifications</p>
              </div>
              <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8">
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
                            <h3 className="text-2xl font-semibold">
                              {education.degree} in {education.field}
                            </h3>
                            <p className="mt-2 text-[var(--creative-text-secondary)]">
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
                              {education.end_date
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
                  <p className="text-center text-[var(--creative-text-secondary)]">
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
                <h2 className="section-title text-4xl font-bold">Experience</h2>
                <p>My professional journey and work history</p>
              </div>
              <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8">
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
                            <h3 className="text-2xl font-semibold">
                              {experience.role}
                            </h3>
                            <div className="mt-3 flex items-center gap-3">
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
                              <p className="font-medium text-[var(--creative-text-secondary)]">
                                {experience.company}
                              </p>
                            </div>
                            <p className="mt-2 text-sm text-[var(--creative-text-secondary)]">
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
                        <p className="mt-5 text-[var(--creative-text-secondary)]">
                          {experience.description}
                        </p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-[var(--creative-text-secondary)]">
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
                <h2 className="section-title text-4xl font-bold">Projects</h2>
                <p>Showcasing my work and creative solutions</p>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
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
                        <div className="relative mb-6 aspect-video overflow-hidden rounded-xl">
                          {project.image ? (
                            <Image
                              src={project.image}
                              alt={project.title}
                              className="project-image object-cover"
                              fill
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-[var(--creative-accent)] to-[var(--creative-accent-light)]">
                              <span className="text-2xl font-bold text-white">
                                {project.title.substring(0, 2).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="mb-3 text-2xl font-bold">
                            {project.title}
                          </h3>
                          <p className="text-[var(--creative-text-secondary)]">
                            {project.description}
                          </p>
                        </div>
                        <div className="mt-auto pt-6 grid grid-cols-2 gap-4">
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
                  <p className="col-span-2 text-center text-[var(--creative-text-secondary)]">
                    No project information yet.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="py-16 text-center text-[var(--creative-text-secondary)]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="mb-3 text-sm">
                ©{new Date().getFullYear()} {portfolio.contents.meta_title}
              </p>
              <div className="mx-auto mt-6 flex justify-center gap-5">
                {socials.map((social) => (
                  <Link
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--creative-text-secondary)] transition-colors hover:text-[var(--creative-accent)]"
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

export default CreativeTheme;
