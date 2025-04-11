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

let baseElegantThemeStyles = `
  .elegant-theme {
    /* Temel Renk Değişkenleri - Kullanıcı Özelleştirmelerine Göre Ayarlanacak */
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
    --elegant-gradient: linear-gradient(to right, var(--elegant-accent), var(--elegant-accent-light));
    --elegant-overlay: rgba(253, 248, 233, 0.8);
    --elegant-shadow: 0 10px 30px rgba(179, 134, 0, 0.1);
    --elegant-accent-rgb: 179, 134, 0;
    
    color: var(--elegant-text-primary);
    background-color: var(--elegant-bg);
    font-family: 'Playfair Display', serif;
    position: relative;
  }

  .elegant-theme.dark {
    /* Dark Teması Değerleri */
    --elegant-bg: #1a1500;
    --elegant-text-primary: #f5edd6;
    --elegant-text-secondary: #e6d7b3;
    --elegant-card-bg: #221c0a;
    --elegant-section-bg: #221c0a;
    --elegant-border: #594b21;
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
    background: var(--elegant-gradient);
    color: white;
    border: none;
    box-shadow: 0 8px 20px rgba(var(--elegant-accent-rgb), 0.2);
  }
  
  .elegant-theme .btn-primary:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 25px rgba(var(--elegant-accent-rgb), 0.3);
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

  /* Elegant Background Patterns */
  .elegant-theme::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle at 50% 50%, rgba(var(--elegant-accent-rgb), 0.03) 0%, transparent 60%),
                      radial-gradient(circle at 85% 15%, rgba(var(--elegant-accent-rgb), 0.03) 0%, transparent 40%),
                      radial-gradient(circle at 15% 85%, rgba(var(--elegant-accent-rgb), 0.03) 0%, transparent 40%);
    pointer-events: none;
    z-index: -1;
  }
  
  /* Decorative Elements */
  .elegant-decoration {
    position: relative;
  }
  
  .elegant-decoration::before,
  .elegant-decoration::after {
    content: '';
    position: absolute;
    background-color: var(--elegant-accent);
    opacity: 0.15;
    transition: all 0.6s ease;
  }
  
  .section-title.elegant-decoration::before {
    width: 40px;
    height: 1px;
    left: -60px;
    top: 50%;
  }
  
  .section-title.elegant-decoration::after {
    width: 40px;
    height: 1px;
    right: -60px;
    top: 50%;
  }
  
  .elegant-theme .card:hover .shimmer-effect {
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(var(--elegant-accent-rgb), 0.2) 50%,
      transparent 100%
    );
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  
  .elegant-theme .gold-text {
    background: var(--elegant-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  /* Premium Decorative Elements */
  .elegant-theme .decorative-divider {
    position: relative;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--elegant-gold), transparent);
    margin: 2rem 0;
    opacity: 0.7;
  }
  
  .elegant-theme .decorative-divider::before,
  .elegant-theme .decorative-divider::after {
    content: '❦';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1rem;
    color: var(--elegant-gold);
    background: var(--elegant-bg);
    padding: 0 1rem;
  }
  
  .elegant-theme .decorative-corners {
    position: relative;
  }
  
  .elegant-theme .decorative-corners::before,
  .elegant-theme .decorative-corners::after,
  .elegant-theme .decorative-corners .corner-top-left,
  .elegant-theme .decorative-corners .corner-bottom-right {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    pointer-events: none;
    opacity: 0.8;
    transition: all 0.4s ease;
  }
  
  .elegant-theme .decorative-corners::before {
    top: 0;
    left: 0;
    border-top: 2px solid var(--elegant-gold);
    border-left: 2px solid var(--elegant-gold);
  }
  
  .elegant-theme .decorative-corners::after {
    bottom: 0;
    right: 0;
    border-bottom: 2px solid var(--elegant-gold);
    border-right: 2px solid var(--elegant-gold);
  }
  
  .elegant-theme .decorative-corners .corner-top-right {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    border-top: 2px solid var(--elegant-gold);
    border-right: 2px solid var(--elegant-gold);
    opacity: 0.8;
    transition: all 0.4s ease;
  }
  
  .elegant-theme .decorative-corners .corner-bottom-left {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30px;
    height: 30px;
    border-bottom: 2px solid var(--elegant-gold);
    border-left: 2px solid var(--elegant-gold);
    opacity: 0.8;
    transition: all 0.4s ease;
  }
  
  .elegant-theme .decorative-corners:hover::before,
  .elegant-theme .decorative-corners:hover::after,
  .elegant-theme .decorative-corners:hover .corner-top-right,
  .elegant-theme .decorative-corners:hover .corner-bottom-left {
    width: 40px;
    height: 40px;
    opacity: 1;
  }

  /* Elegant Timeline Design */
  .elegant-theme .timeline-container {
    position: relative;
    padding: 4rem 0 2rem;
  }

  .elegant-theme .timeline-header {
    text-align: center;
    margin-bottom: 5rem;
  }

  .elegant-theme .timeline-main {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 4rem;
  }

  .elegant-theme .timeline-main::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, 
      rgba(var(--elegant-accent-rgb), 0),
      rgba(var(--elegant-accent-rgb), 0.7),
      rgba(var(--elegant-accent-rgb), 0.7),
      rgba(var(--elegant-accent-rgb), 0));
    z-index: 1;
  }

  .elegant-theme .timeline-items {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    position: relative;
    padding: 3rem 0 1rem;
    gap: 2rem;
    scrollbar-width: thin;
    scrollbar-color: var(--elegant-accent) transparent;
  }

  .elegant-theme .timeline-items::-webkit-scrollbar {
    height: 4px;
  }

  .elegant-theme .timeline-items::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }

  .elegant-theme .timeline-items::-webkit-scrollbar-thumb {
    background-color: var(--elegant-accent);
    border-radius: 10px;
  }

  .elegant-theme .timeline-item {
    position: relative;
    min-width: 350px;
    flex: 0 0 auto;
    opacity: 0.8;
    transition: all 0.4s ease;
  }

  .elegant-theme .timeline-item::before {
    content: '';
    position: absolute;
    top: -3rem;
    left: 50%;
    width: 1px;
    height: 3rem;
    background: linear-gradient(to top, var(--elegant-accent), transparent);
    transform: translateX(-50%);
    z-index: 2;
  }

  .elegant-theme .timeline-item::after {
    content: '';
    position: absolute;
    top: -3.25rem;
    left: 50%;
    width: 12px;
    height: 12px;
    border: 1px solid var(--elegant-accent);
    border-radius: 50%;
    background: var(--elegant-bg);
    transform: translateX(-50%);
    z-index: 3;
    transition: all 0.4s ease;
  }

  .elegant-theme .timeline-item:hover {
    opacity: 1;
    transform: translateY(-5px);
  }

  .elegant-theme .timeline-item:hover::after {
    background: var(--elegant-accent);
    box-shadow: 0 0 15px rgba(var(--elegant-accent-rgb), 0.5);
    transform: translateX(-50%) scale(1.2);
  }

  .elegant-theme .timeline-date {
    position: absolute;
    top: -6rem;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    text-align: center;
    font-family: "Playfair Display", serif;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
    color: var(--elegant-accent);
    white-space: nowrap;
    background: var(--elegant-bg);
    padding: 0.4rem 1.2rem;
    border-bottom: 1px solid var(--elegant-accent);
  }

  .elegant-theme .timeline-content {
    width: 100%;
    position: relative;
    transition: all 0.4s ease;
  }

  @media (max-width: 768px) {
    .elegant-theme .timeline-main {
      padding: 0 1rem;
    }
    
    .elegant-theme .timeline-items {
      gap: 1.5rem;
    }
    
    .elegant-theme .timeline-item {
      min-width: 300px;
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

  // RGB renk dönüşümleri için yardımcı fonksiyon
  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const formattedHex = hex.replace(
      shorthandRegex,
      (_, r, g, b) => r + r + g + g + b + b
    );
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      formattedHex
    );

    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : "0, 0, 0"; // Siyah varsayılan değer
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
      body: "Playfair Display, serif",
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
    // Ana renk ve RGB değerini hesaplama
    const accentColor = themeOptions.colors[4];
    const accentRgb = hexToRgb(accentColor);

    // Açık altın rengi hesaplama (mevcut renkten %20 daha açık)
    const accentLight = adjustColor(accentColor, 20);

    // Açık krem rengi hesaplama - arka plan tonu
    const creamColor = adjustColor(themeOptions.colors[0], 2);
    const creamColorDark = adjustColor(creamColor, -5);

    // Koyu kahverengi ton - ana metin rengi
    const brownColor = themeOptions.colors[3];
    const brownColorLight = adjustColor(brownColor, 25);

    // Özelleştirilmiş renk paleti
    themeOptions.colorPalette = {
      primary: accentColor,
      secondary: accentLight,
      background: themeOptions.colors[0],
      text: brownColor,
      accent: accentColor,
      muted: brownColorLight,
      border: creamColorDark,
      card: themeOptions.colors[0],
    };

    // CSS değişkenleri için özel stil eklemesi
    const customStyles = `
      .elegant-theme {
        --elegant-gold: ${accentColor};
        --elegant-gold-light: ${accentLight};
        --elegant-cream: ${creamColor};
        --elegant-cream-dark: ${creamColorDark};
        --elegant-brown: ${brownColor};
        --elegant-brown-light: ${brownColorLight};
        --elegant-bg: ${themeOptions.colors[0]};
        --elegant-text-primary: ${brownColor};
        --elegant-text-secondary: ${brownColorLight};
        --elegant-accent: ${accentColor};
        --elegant-accent-light: ${accentLight};
        --elegant-border: ${creamColorDark};
        --elegant-card-bg: ${themeOptions.colors[0]};
        --elegant-section-bg: ${creamColor};
        --elegant-gradient: linear-gradient(to right, ${accentColor}, ${accentLight});
        --elegant-overlay: ${creamColor}cc;
        --elegant-shadow: 0 10px 30px rgba(${accentRgb}, 0.1);
        --elegant-accent-rgb: ${accentRgb};
      }
    `;

    // Ana stile ekle
    baseElegantThemeStyles = baseElegantThemeStyles + customStyles;
  }

  if (themeOptions.font) {
    const fontValue = `${themeOptions.font.charAt(0).toUpperCase() + themeOptions.font.slice(1)}, serif`;
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

  // Font variables and theme styles combined
  const combinedStyles = `
    ${elegantThemeStyles}
    
    ${
      themeOptions.font
        ? `
      :root {
        --font-family: ${
          fontFamilies[themeOptions.font as keyof typeof fontFamilies] ||
          `${themeOptions.font.charAt(0).toUpperCase() + themeOptions.font.slice(1)}, serif`
        } !important;
      }
      
      .elegant-theme, .elegant-theme * {
        font-family: ${
          fontFamilies[themeOptions.font as keyof typeof fontFamilies] ||
          `${themeOptions.font.charAt(0).toUpperCase() + themeOptions.font.slice(1)}, serif`
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
        {/* Hero Section with Premium Touch */}
        <section className="section py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center"
            >
              <div className="decorative-corners relative mb-8 inline-block px-10 py-2">
                <div className="corner-top-right"></div>
                <div className="corner-bottom-left"></div>
                <motion.h1
                  className="accent-text mb-6 text-5xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  {portfolio.contents.hero_header}
                </motion.h1>
              </div>

              <motion.p
                className="max-w-2xl text-xl leading-relaxed text-[var(--elegant-text-secondary)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {portfolio.contents.hero_description}
              </motion.p>

              <div className="decorative-divider my-8"></div>

              <motion.div
                className="mt-10 flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {socials.map((social, index) => (
                  <motion.div
                    key={social.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Link
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button
                        type="button"
                        className="btn btn-icon premium-hover"
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

        {/* About Section with Elegant Design */}
        {portfolio.contents.about_text && (
          <section className="alt-section section">
            <div className="container mx-auto px-4">
              <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="section-title golden-text text-3xl font-bold">
                  About Me
                </h2>
                <p>Get to know me better</p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="decorative-corners mx-auto max-w-3xl px-8 py-6">
                  <div className="corner-top-right"></div>
                  <div className="corner-bottom-left"></div>
                  <p className="text-lg leading-relaxed text-[var(--elegant-text-secondary)]">
                    {portfolio.contents.about_text}
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Skills Section with Animated Badges */}
        {skills && skills.length > 0 && (
          <section className="section">
            <div className="container mx-auto px-4">
              <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="section-title golden-text text-3xl font-bold">
                  Skills
                </h2>
                <p>Technologies and tools I work with</p>
              </motion.div>

              <motion.div
                className="mx-auto max-w-4xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {skills && skills.length > 0 ? (
                  <div className="flex flex-wrap justify-center gap-3">
                    {skills.map((skill: Skill, index: number) => {
                      const SkillIcon = getSkillIcon(skill.name);
                      const skillColor = getSkillColor(skill.name);

                      return (
                        <motion.span
                          key={skill.id}
                          className="skill-badge premium-hover"
                          style={{
                            borderColor: `${skillColor}20`,
                            color: skillColor,
                            background: `${skillColor}10`,
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.05 * index }}
                          whileHover={{
                            y: -5,
                            boxShadow: `0 10px 20px rgba(0,0,0,0.1), 0 0 10px ${skillColor}30`,
                          }}
                        >
                          <SkillIcon size={14} />
                          {skill.name}
                        </motion.span>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-center text-[var(--elegant-text-secondary)]">
                    No skills information yet.
                  </p>
                )}
              </motion.div>
            </div>
          </section>
        )}

        {/* Education Section with Elegant Cards */}
        {educations && educations.length > 0 && (
          <section className="alt-section section">
            <div className="container mx-auto px-4">
              <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="section-title golden-text text-3xl font-bold">
                  Education
                </h2>
                <p>My academic background and qualifications</p>
              </motion.div>

              <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6">
                {educations && educations.length > 0 ? (
                  educations.map((education: Education, index) => (
                    <motion.div
                      key={education.id}
                      className="card decorative-corners"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="corner-top-right"></div>
                      <div className="corner-bottom-left"></div>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold accent-text underlined">
                            {education.degree} in {education.field}
                          </h3>
                          <p className="text-[var(--elegant-text-secondary)] mt-1">
                            {education.school}
                          </p>
                        </div>
                        <div className="education-date premium-hover">
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
                    </motion.div>
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

        {/* Experience Section with Elegant Timeline */}
        {experiences && experiences.length > 0 && (
          <section className="section">
            <div className="container mx-auto px-4">
              <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="section-title golden-text text-3xl font-bold">
                  Experience
                </h2>
                <p>My professional journey and accomplishments</p>
              </motion.div>

              <div className="timeline-container">
                <div className="timeline-main">
                  <div className="timeline-main::before"></div>

                  <motion.div
                    className="timeline-items"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                  >
                    {experiences && experiences.length > 0 ? (
                      experiences.map((experience, index) => (
                        <motion.div
                          key={experience.id}
                          className="timeline-item"
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="timeline-date">
                            <CalendarIcon className="mr-1 size-3 inline" />
                            {format(experience.start_date, "MMM yyyy")} -{" "}
                            {experience.end_date
                              ? format(experience.end_date, "MMM yyyy")
                              : "Present"}
                          </div>
                          <div className="timeline-content card decorative-corners">
                            <div className="corner-top-right"></div>
                            <div className="corner-bottom-left"></div>
                            <div className="shimmer-effect absolute inset-0"></div>

                            <h3 className="text-xl font-semibold gold-text">
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
                              <p className="font-medium accent-text">
                                {experience.company}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-[var(--elegant-text-secondary)]">
                              {experience.employment_type}
                            </p>
                            <p className="mt-4 text-[var(--elegant-text-secondary)]">
                              {experience.description}
                            </p>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-center text-[var(--elegant-text-secondary)]">
                        No experience information yet.
                      </p>
                    )}
                  </motion.div>
                </div>
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

        {/* Footer with Elegant Design */}
        <footer className="py-12 text-center text-[var(--elegant-text-secondary)]">
          <div className="container mx-auto px-4">
            <div className="decorative-divider mb-8 mt-4"></div>
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
