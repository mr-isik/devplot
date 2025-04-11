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

const baseFuturisticThemeStyles = `
  .futuristic-theme {
    --futuristic-accent-rgb: 0, 247, 255;
    --futuristic-accent-secondary-rgb: 123, 44, 249;
    --futuristic-bg: #0a0b18;
    --futuristic-bg-secondary: #11132b;
    --futuristic-text-primary: #ffffff;
    --futuristic-text-secondary: #c3c4d8;
    --futuristic-accent: #00f7ff;
    --futuristic-accent-secondary: #7b2cf9;
    --futuristic-border: #283498;
    --futuristic-card-bg: rgba(20, 21, 46, 0.7);
    --futuristic-card-glow: 0 0 20px rgba(0, 247, 255, 0.2);
    --futuristic-section-bg: rgba(17, 19, 43, 0.7);
    --futuristic-neon-glow: 0 0 10px rgba(0, 247, 255, 0.5), 0 0 20px rgba(0, 247, 255, 0.2);
    --futuristic-gradient: linear-gradient(135deg, #00f7ff, #7b2cf9);
    --futuristic-grid-color: rgba(123, 44, 249, 0.1);
    --futuristic-glass: rgba(20, 21, 46, 0.7);
    
    color: var(--futuristic-text-primary);
    background-color: var(--futuristic-bg);
    font-family: 'Space Grotesk', 'Poppins', system-ui, sans-serif;
    background-image: 
      radial-gradient(circle at 15% 50%, rgba(123, 44, 249, 0.15), transparent 25%),
      radial-gradient(circle at 85% 30%, rgba(0, 247, 255, 0.1), transparent 25%);
    background-attachment: fixed;
    position: relative;
    overflow-x: hidden;
  }
  
  .futuristic-theme.dark {
    --futuristic-accent-rgb: 0, 247, 255;
    --futuristic-accent-secondary-rgb: 123, 44, 249;
    --futuristic-bg: #0a0b18;
    --futuristic-bg-secondary: #11132b;
    --futuristic-text-primary: #ffffff;
    --futuristic-text-secondary: #c3c4d8;
    --futuristic-accent: #00f7ff;
    --futuristic-accent-secondary: #7b2cf9;
    --futuristic-border: #283498;
    --futuristic-card-bg: rgba(20, 21, 46, 0.7);
    --futuristic-card-glow: 0 0 20px rgba(0, 247, 255, 0.2);
    --futuristic-section-bg: rgba(17, 19, 43, 0.7);
    --futuristic-neon-glow: 0 0 10px rgba(0, 247, 255, 0.5), 0 0 20px rgba(0, 247, 255, 0.2);
    --futuristic-gradient: linear-gradient(135deg, #00f7ff, #7b2cf9);
    --futuristic-grid-color: rgba(123, 44, 249, 0.1);
    --futuristic-glass: rgba(20, 21, 46, 0.7);
  }
  
  .futuristic-theme.light {
    --futuristic-accent-rgb: 0, 102, 255;
    --futuristic-accent-secondary-rgb: 123, 44, 249;
    --futuristic-bg: #f0f7ff;
    --futuristic-bg-secondary: #e4edff;
    --futuristic-text-primary: #11132b;
    --futuristic-text-secondary: #3f4079;
    --futuristic-accent: #0066ff;
    --futuristic-accent-secondary: #7b2cf9;
    --futuristic-border: #c3d1ff;
    --futuristic-card-bg: rgba(255, 255, 255, 0.7);
    --futuristic-card-glow: 0 0 20px rgba(0, 102, 255, 0.2);
    --futuristic-section-bg: rgba(228, 237, 255, 0.7);
    --futuristic-neon-glow: 0 0 10px rgba(0, 102, 255, 0.3), 0 0 20px rgba(0, 102, 255, 0.1);
    --futuristic-gradient: linear-gradient(135deg, #0066ff, #7b2cf9);
    --futuristic-grid-color: rgba(123, 44, 249, 0.05);
    --futuristic-glass: rgba(255, 255, 255, 0.7);
  }
  
  /* Grid Background Effect */
  .futuristic-theme::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
      linear-gradient(to right, var(--futuristic-grid-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--futuristic-grid-color) 1px, transparent 1px);
    background-size: 30px 30px;
    z-index: -1;
    opacity: 0.5;
    pointer-events: none;
  }
  
  .futuristic-theme .section {
    padding: 7rem 0;
    position: relative;
    overflow: hidden;
    z-index: 1;
    scroll-margin-top: 2rem;
    backdrop-filter: blur(10px);
  }
  
  .futuristic-theme .section::before {
    content: '';
    position: absolute;
    width: 40vw;
    height: 40vw;
    background: linear-gradient(to right, var(--futuristic-accent-secondary), var(--futuristic-accent));
    border-radius: 50%;
    top: -20vw;
    right: -20vw;
    filter: blur(80px);
    opacity: 0.2;
    z-index: -1;
    animation: pulse 15s ease-in-out infinite alternate;
  }
  
  .futuristic-theme .section::after {
    content: '';
    position: absolute;
    width: 30vw;
    height: 30vw;
    background: linear-gradient(to right, var(--futuristic-accent), var(--futuristic-accent-secondary));
    border-radius: 50%;
    bottom: -15vw;
    left: -15vw;
    filter: blur(80px);
    opacity: 0.2;
    z-index: -1;
    animation: pulse 18s ease-in-out infinite alternate-reverse;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.2;
    }
    100% {
      transform: scale(1);
      opacity: 0.1;
    }
  }
  
  .futuristic-theme .alt-section {
    background-color: var(--futuristic-section-bg);
    backdrop-filter: blur(20px);
    position: relative;
    z-index: 1;
  }
  
  .futuristic-theme .card {
    background-color: var(--futuristic-card-bg);
    backdrop-filter: blur(10px);
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15), var(--futuristic-card-glow);
    padding: 2.5rem;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
    border: 1px solid rgba(var(--futuristic-accent-rgb), 0.1);
    overflow: hidden;
    z-index: 1;
  }
  
  .futuristic-theme .card::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(to bottom right, 
      transparent 0%, 
      rgba(var(--futuristic-accent-rgb), 0.05) 50%, 
      transparent 100%);
    opacity: 0;
    transition: opacity 0.6s ease;
  }
  
  .futuristic-theme .card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--futuristic-gradient);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .futuristic-theme .card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2), 
      0 0 20px rgba(var(--futuristic-accent-rgb), 0.3),
      0 0 0 1px rgba(var(--futuristic-accent-rgb), 0.1);
  }
  
  .futuristic-theme .card:hover::before {
    opacity: 1;
  }
  
  .futuristic-theme .card:hover::after {
    transform: scaleX(1);
  }
  
  .futuristic-theme .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    padding: 0.875rem 2rem;
    font-weight: 600;
    font-size: 0.95rem;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    position: relative;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    border: 1px solid transparent;
    overflow: hidden;
    z-index: 1;
  }
  
  .futuristic-theme .btn::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: var(--futuristic-gradient);
    z-index: -2;
    border-radius: 0.5rem;
  }
  
  .futuristic-theme .btn::after {
    content: '';
    position: absolute;
    inset: 1px;
    border-radius: 0.4rem;
    background: var(--futuristic-bg);
    z-index: -1;
    opacity: 1;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .futuristic-theme .btn-primary {
    color: var(--futuristic-accent);
    box-shadow: 0 5px 15px rgba(var(--futuristic-accent-rgb), 0.2),
      0 0 10px rgba(var(--futuristic-accent-rgb), 0.2),
      0 0 0 1px rgba(var(--futuristic-accent-rgb), 0.1);
  }
  
  .futuristic-theme .btn-primary:hover {
    color: var(--futuristic-bg);
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(var(--futuristic-accent-rgb), 0.3),
      0 0 15px rgba(var(--futuristic-accent-rgb), 0.3),
      0 0 0 1px rgba(var(--futuristic-accent-rgb), 0.2);
  }
  
  .futuristic-theme .btn-primary:hover::after {
    opacity: 0;
  }
  
  .futuristic-theme .btn-outline {
    background: transparent;
    color: var(--futuristic-text-primary);
    border: 1px solid rgba(var(--futuristic-accent-rgb), 0.3);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }
  
  .futuristic-theme .btn-outline::before {
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  .futuristic-theme .btn-outline::after {
    background: transparent;
  }
  
  .futuristic-theme .btn-outline:hover {
    color: var(--futuristic-accent);
    border-color: var(--futuristic-accent);
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 
      0 0 10px rgba(var(--futuristic-accent-rgb), 0.2);
  }
  
  .futuristic-theme .btn-icon {
    padding: 0.75rem;
    border-radius: 0.5rem;
    background: transparent;
    color: var(--futuristic-text-primary);
    border: 1px solid rgba(var(--futuristic-accent-rgb), 0.2);
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .futuristic-theme .btn-icon::before,
  .futuristic-theme .btn-icon::after {
    display: none;
  }
  
  .futuristic-theme .btn-icon:hover {
    background: var(--futuristic-accent);
    color: var(--futuristic-bg);
    transform: translateY(-3px) scale(1.1);
    border: 1px solid var(--futuristic-accent);
    box-shadow: 0 10px 25px rgba(var(--futuristic-accent-rgb), 0.3),
      0 0 10px rgba(var(--futuristic-accent-rgb), 0.3);
  }
  
  .futuristic-theme .badge {
    display: inline-flex;
    align-items: center;
    border-radius: 2rem;
    padding: 0.5rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    background: linear-gradient(to right, 
      rgba(var(--futuristic-accent-rgb), 0.1), 
      rgba(var(--futuristic-accent-secondary-rgb), 0.1));
    color: var(--futuristic-accent);
    border: 1px solid rgba(var(--futuristic-accent-rgb), 0.2);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05),
      0 0 5px rgba(var(--futuristic-accent-rgb), 0.1);
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
    overflow: hidden;
  }
  
  .futuristic-theme .badge::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.7s ease;
  }
  
  .futuristic-theme .badge:hover {
    transform: translateY(-3px);
    background: linear-gradient(to right, 
      rgba(var(--futuristic-accent-rgb), 0.15), 
      rgba(var(--futuristic-accent-secondary-rgb), 0.15));
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1),
      0 0 8px rgba(var(--futuristic-accent-rgb), 0.2);
  }
  
  .futuristic-theme .badge:hover::before {
    left: 100%;
  }
  
  .futuristic-theme .skill-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    background-color: var(--futuristic-card-bg);
    color: var(--futuristic-text-primary);
    border: 1px solid rgba(var(--futuristic-accent-rgb), 0.1);
    backdrop-filter: blur(10px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .futuristic-theme .skill-badge:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1),
      0 0 10px rgba(var(--futuristic-accent-rgb), 0.2);
    border: 1px solid rgba(var(--futuristic-accent-rgb), 0.3);
  }
  
  .futuristic-theme h1, .futuristic-theme h2, .futuristic-theme h3 {
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }
  
  .futuristic-theme h1 {
    font-size: clamp(2.5rem, 8vw, 4rem);
    letter-spacing: -0.02em;
    line-height: 1.1;
  }
  
  .futuristic-theme h2 {
    letter-spacing: -0.01em;
  }
  
  .futuristic-theme p {
    line-height: 1.8;
  }
  
  .futuristic-theme .section-title {
    position: relative;
    display: inline-block;
    margin-bottom: 3.5rem;
    text-align: center;
    width: 100%;
    font-size: clamp(2rem, 5vw, 2.75rem);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .futuristic-theme .section-title::before {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 6rem;
    height: 2px;
    background: var(--futuristic-gradient);
    border-radius: 9999px;
    transition: width 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .futuristic-theme .section-title:hover::before {
    width: 8rem;
  }
  
  .futuristic-theme .section-title::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: transparent;
    filter: blur(8px);
    opacity: 0.5;
    transform: translateY(0.05em);
    z-index: -1;
  }
  
  .futuristic-theme .section-header {
    text-align: center;
    margin-bottom: 5rem;
  }
  
  .futuristic-theme .section-header p {
    max-width: 700px;
    margin: 1rem auto 0;
    color: var(--futuristic-text-secondary);
    font-size: 1.125rem;
  }
  
  .futuristic-theme .hero-text {
    background: var(--futuristic-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    position: relative;
    display: inline-block;
    text-shadow: var(--futuristic-neon-glow);
  }
  
  .futuristic-theme .hero-text::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    background: var(--futuristic-gradient);
    width: 100%;
    height: 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    filter: blur(12px);
    opacity: 0.7;
  }
  
  .futuristic-theme .project-card {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    background: var(--futuristic-card-bg);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(var(--futuristic-accent-rgb), 0.1);
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .futuristic-theme .project-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2),
      0 0 20px rgba(var(--futuristic-accent-rgb), 0.3);
    border: 1px solid rgba(var(--futuristic-accent-rgb), 0.3);
  }
  
  .futuristic-theme .project-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--futuristic-gradient);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .futuristic-theme .project-card:hover::after {
    transform: scaleX(1);
  }
  
  .futuristic-theme .project-image {
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .futuristic-theme .project-card:hover .project-image {
    transform: scale(1.1);
  }
  
  .futuristic-theme .education-card {
    border-radius: 1rem;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    background: var(--futuristic-card-bg);
    backdrop-filter: blur(10px);
    overflow: hidden;
  }
  
  .futuristic-theme .education-date {
    display: inline-flex;
    align-items: center;
    padding: 0.625rem 1.25rem;
    border-radius: 2rem;
    font-size: 0.875rem;
    background: rgba(var(--futuristic-accent-rgb), 0.1);
    color: var(--futuristic-accent);
    font-weight: 500;
    letter-spacing: 0.02em;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05),
      0 0 5px rgba(var(--futuristic-accent-rgb), 0.1);
    border: 1px solid rgba(var(--futuristic-accent-rgb), 0.2);
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .futuristic-theme .education-date:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1),
      0 0 8px rgba(var(--futuristic-accent-rgb), 0.2);
    background: rgba(var(--futuristic-accent-rgb), 0.15);
  }
  
  .futuristic-theme .experience-logo {
    border: none;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
  }
  
  .futuristic-theme .experience-logo::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom right, 
      rgba(var(--futuristic-accent-rgb), 0.2), 
      transparent);
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  .futuristic-theme .card:hover .experience-logo {
    transform: scale(1.1) rotate(3deg);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15),
      0 0 15px rgba(var(--futuristic-accent-rgb), 0.2);
  }
  
  .futuristic-theme .card:hover .experience-logo::after {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    .futuristic-theme .section {
      padding: 4rem 0;
    }
    
    .futuristic-theme .card {
      padding: 1.75rem;
    }
    
    .futuristic-theme .section-header {
      margin-bottom: 3rem;
    }
    
    .futuristic-theme .section-title {
      margin-bottom: 2.5rem;
    }
  }
  
  @media (max-width: 640px) {
    .futuristic-theme .btn {
      padding: 0.75rem 1.5rem;
    }
    
    .futuristic-theme .btn-icon {
      padding: 0.75rem;
    }
    
    .futuristic-theme .badge, .futuristic-theme .skill-badge {
      padding: 0.5rem 1rem;
    }
  }
`;

const FuturisticTheme = ({
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
    theme: "futuristic",
    colorTheme: "dark",
    colors: ["#0a0b18", "#11132b", "#283498", "#ffffff", "#00f7ff"],
    font: "space",
    colorPalette: {
      primary: "#00f7ff",
      secondary: "#7b2cf9",
      background: "#0a0b18",
      text: "#ffffff",
      accent: "#00f7ff",
      muted: "#c3c4d8",
      border: "#283498",
      card: "rgba(20, 21, 46, 0.7)",
    },
    fonts: {
      heading: "Space Grotesk, sans-serif",
      body: "Space Grotesk, sans-serif",
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
      secondary: "#7b2cf9",
      background: themeOptions.colors[0],
      text: themeOptions.colors[3],
      accent: themeOptions.colors[4],
      muted: themeOptions.colors[3] + "99",
      border: themeOptions.colors[2],
      card: "rgba(20, 21, 46, 0.7)",
    };
  }

  if (themeOptions.font) {
    const fontValue = `${themeOptions.font.charAt(0).toUpperCase() + themeOptions.font.slice(1)}, sans-serif`;
    themeOptions.fonts = {
      heading: fontValue,
      body: fontValue,
    };
  }

  const futuristicThemeStyles = applyThemeCustomization(
    baseFuturisticThemeStyles,
    themeOptions,
    "futuristic"
  );

  const themeClass = `futuristic-theme ${themeOptions.colorTheme === "dark" ? "dark" : "light"}`;

  const combinedStyles = `
    ${futuristicThemeStyles}
    
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
              <h1 className="hero-text mb-6 text-5xl font-bold leading-tight">
                {portfolio.contents.hero_header}
              </h1>
              <p className="max-w-2xl text-xl leading-relaxed text-[var(--futuristic-text-secondary)]">
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
                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[var(--futuristic-text-secondary)]">
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
                  <p className="text-center text-[var(--futuristic-text-secondary)]">
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
                          <p className="text-[var(--futuristic-text-secondary)] mt-1">
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
                  <p className="text-center text-[var(--futuristic-text-secondary)]">
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
                            <p className="font-medium text-[var(--futuristic-text-secondary)]">
                              {experience.company}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-[var(--futuristic-text-secondary)]">
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
                      <p className="mt-4 text-[var(--futuristic-text-secondary)]">
                        {experience.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-[var(--futuristic-text-secondary)]">
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
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-[var(--futuristic-accent)] to-[var(--futuristic-accent-secondary)]">
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
                          <p className="text-[var(--futuristic-text-secondary)]">
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
                  <p className="col-span-2 text-center text-[var(--futuristic-text-secondary)]">
                    No project information yet.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="py-12 text-center text-[var(--futuristic-text-secondary)]">
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
                    className="text-[var(--futuristic-text-secondary)] transition-colors hover:text-[var(--futuristic-accent)]"
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

export default FuturisticTheme;
