"use client";

import type { ThemeProps } from "@/features/themes/types";
import type { ThemeOptions } from "@/features/themes/types/theme-options";
import { getPlatformIcon } from "@/features/portfolios/forms/steps/SocialsStep";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { CalendarIcon, ExternalLinkIcon, ChevronRight } from "lucide-react";
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

const baseDynamicThemeStyles = `
  .dynamic-theme {
    --dynamic-primary-rgb: 64, 63, 252;
    --dynamic-secondary-rgb: 255, 56, 100;
    --dynamic-accent-rgb: 120, 85, 255;
    --dynamic-bg-rgb: 23, 23, 43;
    
    --dynamic-bg: #17172b;
    --dynamic-bg-secondary: #222246;
    --dynamic-bg-card: rgba(38, 38, 77, 0.7);
    --dynamic-text-primary: #ffffff;
    --dynamic-text-secondary: #b0b0cc;
    --dynamic-accent: #7855ff;
    --dynamic-primary: #403ffc;
    --dynamic-secondary: #ff3864;
    --dynamic-border: #2c2c5a;
    --dynamic-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    --dynamic-glow: 0 0 15px rgba(120, 85, 255, 0.3);
    --dynamic-gradient-1: linear-gradient(135deg, #403ffc, #7855ff);
    --dynamic-gradient-2: linear-gradient(135deg, #7855ff, #ff3864);
    --dynamic-gradient-anim: linear-gradient(90deg, #403ffc, #7855ff, #ff3864, #403ffc);
    --dynamic-button-glow: 0 0 20px rgba(120, 85, 255, 0.5);
    
    color: var(--dynamic-text-primary);
    background-color: var(--dynamic-bg);
    font-family: 'Outfit', sans-serif;
    overflow-x: hidden;
    background-size: 400% 400%;
    background-image: radial-gradient(circle at 10% 20%, rgba(64, 63, 252, 0.03) 0%, transparent 30%),
                     radial-gradient(circle at 85% 60%, rgba(120, 85, 255, 0.05) 0%, transparent 40%),
                     radial-gradient(circle at 40% 90%, rgba(255, 56, 100, 0.03) 0%, transparent 30%);
  }

  .dynamic-theme.dark {
    --dynamic-primary-rgb: 114, 113, 255;
    --dynamic-secondary-rgb: 255, 94, 129;
    --dynamic-accent-rgb: 147, 121, 255;
    --dynamic-bg-rgb: 15, 15, 25;
    
    --dynamic-bg: #0f0f19;
    --dynamic-bg-secondary: #1a1a30;
    --dynamic-bg-card: rgba(30, 30, 56, 0.7);
    --dynamic-text-primary: #f0f0ff;
    --dynamic-text-secondary: #a0a0bb;
    --dynamic-accent: #9379ff;
    --dynamic-primary: #7271ff;
    --dynamic-secondary: #ff5e81;
    --dynamic-border: #252542;
    --dynamic-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    --dynamic-glow: 0 0 15px rgba(147, 121, 255, 0.25);
    --dynamic-gradient-1: linear-gradient(135deg, #7271ff, #9379ff);
    --dynamic-gradient-2: linear-gradient(135deg, #9379ff, #ff5e81);
    --dynamic-gradient-anim: linear-gradient(90deg, #7271ff, #9379ff, #ff5e81, #7271ff);
    --dynamic-button-glow: 0 0 20px rgba(147, 121, 255, 0.4);
  }
  
  .dynamic-theme .section {
    padding: 6rem 0;
    position: relative;
    scroll-margin-top: 2rem;
  }
  
  .dynamic-theme .alt-section {
    background-color: var(--dynamic-bg-secondary);
    position: relative;
    overflow: hidden;
  }
  
  .dynamic-theme .alt-section::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: radial-gradient(circle at 50% 0%, rgba(var(--dynamic-accent-rgb), 0.15) 0%, transparent 50%);
    opacity: 0.5;
    z-index: 0;
  }
  
  .dynamic-theme .card {
    background-color: var(--dynamic-bg-card);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    box-shadow: var(--dynamic-shadow);
    padding: 2rem;
    transition: all 0.5s cubic-bezier(0.2, 0.85, 0.4, 1.275);
    position: relative;
    overflow: hidden;
    border: 1px solid var(--dynamic-border);
    z-index: 1;
  }
  
  .dynamic-theme .card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 50%, rgba(var(--dynamic-accent-rgb), 0.1), transparent 70%);
    opacity: 0;
    transition: opacity 0.6s ease;
    z-index: -1;
  }
  
  .dynamic-theme .card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: var(--dynamic-shadow), var(--dynamic-glow);
    border-color: var(--dynamic-accent);
  }
  
  .dynamic-theme .card:hover::after {
    opacity: 1;
  }
  
  .dynamic-theme .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    padding: 0.875rem 2rem;
    font-weight: 600;
    transition: all 0.4s cubic-bezier(0.2, 0.85, 0.4, 1.275);
    position: relative;
    overflow: hidden;
    z-index: 1;
    backdrop-filter: blur(5px);
  }
  
  .dynamic-theme .btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.7s ease;
    z-index: -1;
  }
  
  .dynamic-theme .btn:hover::before {
    left: 100%;
  }
  
  .dynamic-theme .btn-primary {
    background: var(--dynamic-gradient-1);
    color: white;
    border: none;
    background-size: 200% 200%;
    animation: gradientShift 3s ease infinite;
  }
  
  .dynamic-theme .btn-primary:hover {
    transform: translateY(-5px);
    box-shadow: var(--dynamic-button-glow);
  }
  
  .dynamic-theme .btn-outline {
    background-color: rgba(var(--dynamic-accent-rgb), 0.1);
    border: 1px solid var(--dynamic-accent);
    color: var(--dynamic-accent);
  }
  
  .dynamic-theme .btn-outline:hover {
    background-color: var(--dynamic-accent);
    color: white;
    transform: translateY(-5px);
    box-shadow: var(--dynamic-button-glow);
  }
  
  .dynamic-theme .btn-icon {
    padding: 0.75rem;
    border-radius: 12px;
    background-color: rgba(var(--dynamic-accent-rgb), 0.1);
    color: var(--dynamic-accent);
    border: 1px solid var(--dynamic-border);
    transition: all 0.4s cubic-bezier(0.2, 0.85, 0.4, 1.275);
  }
  
  .dynamic-theme .btn-icon:hover {
    background-color: var(--dynamic-accent);
    color: white;
    border-color: var(--dynamic-accent);
    transform: translateY(-5px) scale(1.1);
    box-shadow: var(--dynamic-button-glow);
  }
  
  .dynamic-theme .badge {
    display: inline-flex;
    align-items: center;
    border-radius: 30px;
    padding: 0.5rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 600;
    background-color: rgba(var(--dynamic-accent-rgb), 0.1);
    color: var(--dynamic-accent);
    transition: all 0.4s cubic-bezier(0.2, 0.85, 0.4, 1.275);
    border: 1px solid var(--dynamic-border);
  }
  
  .dynamic-theme .badge:hover {
    background-color: var(--dynamic-accent);
    color: white;
    transform: translateY(-5px);
    box-shadow: var(--dynamic-button-glow);
  }
  
  .dynamic-theme .skill-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 30px;
    padding: 0.5rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.4s cubic-bezier(0.2, 0.85, 0.4, 1.275);
    border: 1px solid transparent;
    background-color: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(5px);
  }
  
  .dynamic-theme .skill-badge:hover {
    transform: translateY(-7px) scale(1.05);
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .dynamic-theme h1, .dynamic-theme h2, .dynamic-theme h3 {
    font-weight: 700;
    line-height: 1.2;
  }
  
  .dynamic-theme h1 {
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    letter-spacing: -0.02em;
    background: var(--dynamic-gradient-anim);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 300% 100%;
    animation: gradientTextAnimation 6s ease infinite;
  }
  
  .dynamic-theme p {
    line-height: 1.8;
  }
  
  .dynamic-theme .section-title {
    position: relative;
    display: inline-block;
    margin-bottom: 3.5rem;
    text-align: center;
    width: 100%;
    font-size: clamp(2rem, 5vw, 2.75rem);
    letter-spacing: -0.01em;
    background: var(--dynamic-gradient-anim);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 300% 100%;
    animation: gradientTextAnimation 6s ease infinite;
  }
  
  .dynamic-theme .section-title::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: var(--dynamic-gradient-1);
    border-radius: 4px;
    transition: width 0.4s ease;
  }
  
  .dynamic-theme .section-title:hover::after {
    width: 120px;
  }
  
  .dynamic-theme .section-header {
    text-align: center;
    margin-bottom: 4.5rem;
  }
  
  .dynamic-theme .section-header p {
    max-width: 700px;
    margin: 1.25rem auto 0;
    color: var(--dynamic-text-secondary);
    font-size: 1.125rem;
  }
  
  .dynamic-theme .animated-gradient-text {
    background: var(--dynamic-gradient-anim);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 300% 100%;
    animation: gradientTextAnimation 6s ease infinite;
    position: relative;
    display: inline-block;
  }
  
  .dynamic-theme .animated-gradient-text::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: var(--dynamic-gradient-anim);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    filter: blur(15px);
    opacity: 0.5;
    z-index: -1;
    background-size: 300% 100%;
    animation: gradientTextAnimation 6s ease infinite;
  }
  
  .dynamic-theme .project-card {
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    transition: all 0.5s cubic-bezier(0.2, 0.85, 0.4, 1.275);
    border: 1px solid var(--dynamic-border);
  }
  
  .dynamic-theme .project-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: var(--dynamic-shadow), var(--dynamic-glow);
    border-color: var(--dynamic-accent);
  }
  
  .dynamic-theme .project-image {
    transition: all 0.7s cubic-bezier(0.2, 0.85, 0.4, 1.275);
  }
  
  .dynamic-theme .project-card:hover .project-image {
    transform: scale(1.1);
  }
  
  .dynamic-theme .project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(var(--dynamic-bg-rgb), 0.9), transparent);
    opacity: 0.7;
    transition: opacity 0.5s ease;
  }
  
  .dynamic-theme .project-card:hover .project-overlay {
    opacity: 0.9;
  }
  
  .dynamic-theme .education-date {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1.25rem;
    border-radius: 30px;
    font-size: 0.875rem;
    background-color: rgba(var(--dynamic-accent-rgb), 0.1);
    color: var(--dynamic-accent);
    font-weight: 500;
    border: 1px solid var(--dynamic-border);
    transition: all 0.4s cubic-bezier(0.2, 0.85, 0.4, 1.275);
  }
  
  .dynamic-theme .education-date:hover {
    transform: translateY(-5px);
    box-shadow: var(--dynamic-button-glow);
    border-color: var(--dynamic-accent);
  }
  
  .dynamic-theme .experience-logo {
    border: 1px solid var(--dynamic-border);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.4s cubic-bezier(0.2, 0.85, 0.4, 1.275);
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(5px);
  }
  
  .dynamic-theme .card:hover .experience-logo {
    box-shadow: var(--dynamic-glow);
    transform: scale(1.1) rotate(5deg);
    border-color: var(--dynamic-accent);
  }
  
  @keyframes gradientTextAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  
  @media (max-width: 768px) {
    .dynamic-theme .section {
      padding: 4rem 0;
    }
    
    .dynamic-theme .card {
      padding: 1.5rem;
    }
    
    .dynamic-theme .section-header {
      margin-bottom: 3rem;
    }
    
    .dynamic-theme .section-title {
      margin-bottom: 2.5rem;
    }
  }
  
  @media (max-width: 640px) {
    .dynamic-theme .btn {
      padding: 0.75rem 1.5rem;
    }
    
    .dynamic-theme .btn-icon {
      padding: 0.625rem;
    }
    
    .dynamic-theme .badge, .dynamic-theme .skill-badge {
      padding: 0.4rem 1rem;
    }
  }
`;

const DynamicTheme = ({
  portfolio,
  experiences,
  projects,
  socials,
  skills,
  educations,
}: ThemeProps) => {
  // Tema seçenekleri
  let themeOptions: ThemeOptions = {
    theme: "dynamic",
    colorTheme: "dark",
    colors: ["#17172b", "#222246", "#2c2c5a", "#ffffff", "#7855ff"],
    font: "outfit",
    colorPalette: {
      primary: "#7855ff",
      secondary: "#ff3864",
      background: "#17172b",
      text: "#ffffff",
      accent: "#7855ff",
      muted: "#b0b0cc",
      border: "#2c2c5a",
      card: "rgba(38, 38, 77, 0.7)",
    },
    fonts: {
      heading: "Outfit, sans-serif",
      body: "Outfit, sans-serif",
    },
  };

  // Portfolio'dan tema seçeneklerini alma
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

  // Renk paletini güncelleme
  if (
    themeOptions.colors &&
    Array.isArray(themeOptions.colors) &&
    themeOptions.colors.length >= 5
  ) {
    themeOptions.colorPalette = {
      primary: themeOptions.colors[4],
      secondary: "#ff3864", // Sabit ikincil renk (pembe)
      background: themeOptions.colors[0],
      text: themeOptions.colors[3],
      accent: themeOptions.colors[4],
      muted: themeOptions.colors[3] + "99",
      border: themeOptions.colors[2],
      card: "rgba(38, 38, 77, 0.7)",
    };
  }

  // Font seçeneğini güncelleme
  if (themeOptions.font) {
    const fontValue = `${themeOptions.font.charAt(0).toUpperCase() + themeOptions.font.slice(1)}, sans-serif`;
    themeOptions.fonts = {
      heading: fontValue,
      body: fontValue,
    };
  }

  // Tema stillerini özelleştirme
  const dynamicThemeStyles = applyThemeCustomization(
    baseDynamicThemeStyles,
    themeOptions,
    "dynamic"
  );

  const themeClass = `dynamic-theme ${themeOptions.colorTheme === "dark" ? "dark" : ""}`;

  // Font değişkenlerini ve tema stillerini birleştirme
  const combinedStyles = `
    ${dynamicThemeStyles}
    
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
              <h1 className="animated-gradient-text mb-6 text-5xl font-bold leading-tight">
                {portfolio.contents.hero_header}
              </h1>
              <p className="max-w-2xl text-xl leading-relaxed text-[var(--dynamic-text-secondary)]">
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
                    <button type="button" className="btn btn-outline btn-icon">
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
                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[var(--dynamic-text-secondary)]">
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
                  <p className="text-center text-[var(--dynamic-text-secondary)]">
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
                          <p className="text-[var(--dynamic-text-secondary)] mt-1">
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
                  <p className="text-center text-[var(--dynamic-text-secondary)]">
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
                            <p className="font-medium text-[var(--dynamic-text-secondary)]">
                              {experience.company}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-[var(--dynamic-text-secondary)]">
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
                      <p className="mt-4 text-[var(--dynamic-text-secondary)]">
                        {experience.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-[var(--dynamic-text-secondary)]">
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
                        <div className="relative mb-5 aspect-video overflow-hidden rounded-lg">
                          {project.image ? (
                            <Image
                              src={project.image}
                              alt={project.title}
                              className="project-image object-cover"
                              fill
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-[var(--dynamic-accent)] to-[var(--dynamic-accent-light)]">
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
                          <p className="text-[var(--dynamic-text-secondary)]">
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
                  <p className="col-span-2 text-center text-[var(--dynamic-text-secondary)]">
                    No project information yet.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="py-12 text-center text-[var(--dynamic-text-secondary)]">
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
                    className="text-[var(--dynamic-text-secondary)] transition-colors hover:text-[var(--dynamic-accent)]"
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

export default DynamicTheme;
