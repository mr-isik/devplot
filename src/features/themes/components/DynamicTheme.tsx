"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { format } from "date-fns";
import {
  CalendarIcon,
  ExternalLinkIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  MapPinIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  CodeIcon,
  HeartIcon,
  RocketIcon,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { ThemeProps } from "@/features/themes/types";
import { ThemeOptions } from "@/features/themes/types/theme-options";
import { adjustColor, fontFamilies } from "../utils/themeCustomization";
import { getPlatformIcon } from "@/features/portfolios/forms/steps/SocialsStep";
import { Education } from "@/features/educations/types";
import { Skill } from "@/features/skills/types";
import { getSkillIcon, getSkillColor } from "@/lib/skillsData";

// Animations library
const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.7 } },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  },
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  staggerItems: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  },
  rotateIn: {
    initial: { opacity: 0, rotate: -10, scale: 0.9 },
    animate: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.6 } },
  },
  pulse: {
    initial: {},
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  },
};

// Helper functions
const hexToRgba = (hex: string, alpha: number = 1): string => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const formattedHex = hex.replace(
    shorthandRegex,
    (_, r, g, b) => r + r + g + g + b + b
  );
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(formattedHex);

  return result
    ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`
    : `rgba(0, 0, 0, ${alpha})`;
};

const hexToRgb = (hex: string): string => {
  const rgba = hexToRgba(hex);
  return rgba
    .replace(/rgba?\(|\)|\s/g, "")
    .split(",")
    .slice(0, 3)
    .join(", ");
};

const getComplementaryColor = (hex: string): string => {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  r = 255 - r;
  g = 255 - g;
  b = 255 - b;

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

// Generating a contrasting text color for a background
const getContrastText = (hex: string): string => {
  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Calculate luminance - standard formula for brightness
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return white for dark backgrounds, black for light backgrounds
  return luminance > 0.5 ? "#000000" : "#ffffff";
};

// Creates an object with proper nesting to be used in style attribute
const gradientTextStyle = (from: string, to: string) => ({
  backgroundImage: `linear-gradient(to right, ${from}, ${to})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
});

const DynamicTheme = ({
  portfolio,
  experiences,
  projects,
  socials,
  skills,
  educations,
}: ThemeProps) => {
  // Initialize theme options with defaults
  const themeOptions = useMemo(() => {
    let options: ThemeOptions = {
      theme: "dynamic",
      colorTheme: "dark",
      colors: ["#030014", "#11071F", "#190A2C", "#ffffff", "#8E2DE2"],
      font: "poppins",
      colorPalette: {
        primary: "#8E2DE2",
        secondary: "#4A00E0",
        background: "#030014",
        text: "#ffffff",
        accent: "#A855F7",
        muted: "#B0B0CC",
        border: "#190A2C",
        card: "rgba(25, 10, 44, 0.7)",
      },
      fonts: {
        heading: "Poppins, sans-serif",
        body: "Poppins, sans-serif",
      },
    };

    try {
      if (
        portfolio.options &&
        Array.isArray(portfolio.options) &&
        portfolio.options.length > 0 &&
        portfolio.options[0].options
      ) {
        const portfolioOptions = portfolio.options[0].options;
        if (typeof portfolioOptions === "string") {
          const parsedOptions = JSON.parse(
            portfolioOptions
          ) as Partial<ThemeOptions>;
          options = { ...options, ...parsedOptions };
        } else if (
          typeof portfolioOptions === "object" &&
          portfolioOptions !== null
        ) {
          options = {
            ...options,
            ...(portfolioOptions as Partial<ThemeOptions>),
          };
        }
      }
    } catch (error) {
      console.error("Error processing theme options:", error);
    }

    return options;
  }, [portfolio]);

  // Generate CSS custom properties
  const cssVariables = useMemo(() => {
    if (!themeOptions.colors || themeOptions.colors.length < 5) {
      return {};
    }

    const accentColor = themeOptions.colors[4];
    const accentRgb = hexToRgb(accentColor);
    const primaryColor = adjustColor(accentColor, -15);
    const primaryRgb = hexToRgb(primaryColor);
    const secondaryColor = adjustColor(accentColor, 15);
    const secondaryRgb = hexToRgb(secondaryColor);
    const complementaryColor = getComplementaryColor(accentColor);
    const complementaryRgb = hexToRgb(complementaryColor);

    // Update color palette
    themeOptions.colorPalette = {
      primary: primaryColor,
      secondary: secondaryColor,
      background: themeOptions.colors[0],
      text: themeOptions.colors[3],
      accent: accentColor,
      muted: hexToRgba(themeOptions.colors[3], 0.6),
      border: themeOptions.colors[2],
      card: hexToRgba(themeOptions.colors[1], 0.7),
    };

    return {
      "--dynamic-primary": primaryColor,
      "--dynamic-primary-rgb": primaryRgb,
      "--dynamic-secondary": secondaryColor,
      "--dynamic-secondary-rgb": secondaryRgb,
      "--dynamic-complementary": complementaryColor,
      "--dynamic-complementary-rgb": complementaryRgb,
      "--dynamic-accent": accentColor,
      "--dynamic-accent-rgb": accentRgb,
      "--dynamic-accent-transparent": hexToRgba(accentColor, 0.1),
      "--dynamic-bg": themeOptions.colors[0],
      "--dynamic-bg-rgb": hexToRgb(themeOptions.colors[0]),
      "--dynamic-bg-secondary": themeOptions.colors[1],
      "--dynamic-bg-card": hexToRgba(themeOptions.colors[1], 0.7),
      "--dynamic-text-primary": themeOptions.colors[3],
      "--dynamic-text-secondary": hexToRgba(themeOptions.colors[3], 0.7),
      "--dynamic-text-muted": hexToRgba(themeOptions.colors[3], 0.5),
      "--dynamic-border": themeOptions.colors[2],
      "--dynamic-shadow": `0 8px 32px ${hexToRgba(primaryColor, 0.3)}`,
      "--dynamic-shadow-strong": `0 10px 40px ${hexToRgba(accentColor, 0.4)}`,
      "--dynamic-glow": `0 0 20px ${hexToRgba(accentColor, 0.3)}`,
      "--dynamic-glow-strong": `0 0 30px ${hexToRgba(accentColor, 0.5)}`,
      "--dynamic-gradient-1": `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
      "--dynamic-gradient-2": `linear-gradient(135deg, ${accentColor}, ${secondaryColor})`,
      "--dynamic-gradient-3": `linear-gradient(135deg, ${secondaryColor}, ${complementaryColor})`,
      "--dynamic-gradient-radial": `radial-gradient(circle, ${hexToRgba(accentColor, 0.15)}, transparent 70%)`,
      "--dynamic-gradient-conic": `conic-gradient(from 0deg at 50% 50%, ${primaryColor}, ${accentColor}, ${secondaryColor}, ${complementaryColor}, ${primaryColor})`,
      "--dynamic-gradient-anim": `linear-gradient(90deg, ${primaryColor}, ${accentColor}, ${secondaryColor}, ${primaryColor})`,
      "--dynamic-button-glow": `0 0 20px ${hexToRgba(accentColor, 0.5)}`,
      "--dynamic-card-glow": `0 0 30px ${hexToRgba(accentColor, 0.2)}`,
      fontFamily: themeOptions.font
        ? fontFamilies[themeOptions.font as keyof typeof fontFamilies] ||
          `${themeOptions.font.charAt(0).toUpperCase() + themeOptions.font.slice(1)}, system-ui, sans-serif`
        : undefined,
    };
  }, [themeOptions]);

  // Theme class - dark or light mode
  const themeClass = `${themeOptions.colorTheme === "dark" ? "dark" : ""}`;

  // State for intersection observer animations
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Function to handle intersection observer callback
  const handleIntersection = (id: string) => {
    setActiveSection(id);
  };

  // Create a simple intersection observer hook
  const useIntersectionObserver = (sectionId: string, threshold = 0.3) => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              handleIntersection(sectionId);
            }
          });
        },
        { threshold }
      );

      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);

      return () => {
        if (element) observer.unobserve(element);
      };
    }, [sectionId]);

    return activeSection === sectionId;
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden bg-[var(--dynamic-bg)] text-[var(--dynamic-text-primary)] ${themeClass}`}
      style={cssVariables as React.CSSProperties}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-30">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[var(--dynamic-primary)] blur-[120px] animate-float" />
          <div className="absolute top-1/4 -right-1/4 w-[300px] h-[300px] rounded-full bg-[var(--dynamic-accent)] blur-[80px] animate-float-delay" />
        </div>

        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] opacity-30">
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[var(--dynamic-secondary)] blur-[100px] animate-float-delay" />
          <div className="absolute bottom-1/4 -left-1/4 w-[300px] h-[300px] rounded-full bg-[var(--dynamic-primary)] blur-[80px] animate-float" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>

        {/* Particle overlay */}
        <div className="absolute inset-0">
          {Array.from({ length: 100 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-1 h-1 rounded-full bg-[var(--dynamic-accent)]"
              initial={{
                opacity: Math.random() * 0.6 + 0.2,
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.1, 0.5, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden"
      >
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-6xl mx-auto relative">
            {/* 3D Effect Layered Hero */}
            <div className="relative">
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-20 -left-20 md:-left-40 w-80 h-80 opacity-20 pointer-events-none"
                initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                animate={{ opacity: 0.2, scale: 1, rotate: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                <div className="w-full h-full rounded-full border border-[var(--dynamic-accent)] animate-spin-slow"></div>
                <div className="absolute inset-4 rounded-full border border-[var(--dynamic-primary)] opacity-70 animate-reverse-spin-slow"></div>
              </motion.div>

              <motion.div
                className="absolute -bottom-20 -right-20 md:-right-40 w-80 h-80 opacity-20 pointer-events-none"
                initial={{ opacity: 0, scale: 0.8, rotate: 20 }}
                animate={{ opacity: 0.2, scale: 1, rotate: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                <div className="w-full h-full rounded-full border border-[var(--dynamic-secondary)] animate-reverse-spin-slow"></div>
                <div className="absolute inset-4 rounded-full border border-[var(--dynamic-accent)] opacity-70 animate-spin-slow"></div>
              </motion.div>

              {/* Main content with 3D effect */}
              <motion.div
                className="text-center relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Main headline with layered 3D effect */}
                <div className="relative inline-block mb-6">
                  <motion.h1
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    {/* Text shadow layer for 3D effect */}
                    <span className="absolute -top-1 -left-1 text-[var(--dynamic-accent)] opacity-30 blur-sm select-none">
                      {portfolio.contents.hero_header}
                    </span>
                    <span className="absolute -top-0.5 -left-0.5 text-[var(--dynamic-primary)] opacity-50 blur-[2px] select-none">
                      {portfolio.contents.hero_header}
                    </span>
                    {/* Main text with gradient */}
                    <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-[var(--dynamic-primary)] via-[var(--dynamic-accent)] to-[var(--dynamic-secondary)] animate-gradient">
                      {portfolio.contents.hero_header}
                    </span>
                  </motion.h1>
                </div>

                <motion.div
                  className="relative max-w-2xl mx-auto mb-10 perspective-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="relative">
                    <p className="absolute -top-0.5 -left-0.5 text-[var(--dynamic-accent)] opacity-30 blur-sm text-lg md:text-xl select-none">
                      {portfolio.contents.hero_description}
                    </p>
                    <p className="relative text-lg md:text-xl leading-relaxed text-[var(--dynamic-text-secondary)]">
                      {portfolio.contents.hero_description}
                    </p>
                  </div>
                </motion.div>

                {/* Animated Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    className="mt-2 mb-8 relative group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)] blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <a
                      href="#about"
                      className="relative inline-flex items-center justify-center px-8 py-3 rounded-full bg-[var(--dynamic-bg-card)] border border-[var(--dynamic-border)] backdrop-blur-md text-[var(--dynamic-text-primary)] font-medium"
                    >
                      Explore My Work
                      <ArrowRightIcon className="ml-2 w-5 h-5 animate-pulse-x" />
                    </a>
                  </motion.div>

                  <motion.div
                    className="animate-float"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <div className="w-5 h-10 border-2 border-[var(--dynamic-text-secondary)] rounded-full flex justify-center p-1">
                      <motion.div
                        className="w-1 h-1 bg-[var(--dynamic-accent)] rounded-full"
                        animate={{
                          y: [0, 12, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  </motion.div>
                </motion.div>

                {/* Social Icons */}
                <motion.div
                  variants={animations.staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="mt-10 flex flex-wrap justify-center gap-4"
                >
                  {socials.map((social, index) => (
                    <motion.div
                      key={social.id}
                      custom={index}
                      variants={animations.staggerItems}
                      whileHover={{
                        scale: 1.2,
                        rotate: [0, -5, 5, 0],
                        transition: {
                          duration: 0.5,
                        },
                      }}
                    >
                      <Link
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative"
                      >
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)] blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"></span>
                        <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--dynamic-bg-card)] border border-[var(--dynamic-border)] backdrop-blur-md text-[var(--dynamic-accent)] transition-all duration-300 group-hover:text-white group-hover:border-transparent group-hover:translate-y-[-3px]">
                          <span className="sr-only">{social.platform}</span>
                          {getPlatformIcon(social.platform)}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-col items-center text-[var(--dynamic-text-secondary)]"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <ChevronRightIcon className="w-6 h-6 rotate-90" />
            </motion.div>
            <span className="text-xs uppercase tracking-widest">Scroll</span>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      {portfolio.contents.about_text && (
        <section id="about" className="relative py-24 z-10">
          <div className="container mx-auto px-4 relative">
            {/* Section Title with animated underline */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <div className="inline-block relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--dynamic-accent)] to-transparent"
                />
                <h2 className="text-4xl md:text-5xl font-bold inline-block bg-clip-text text-transparent bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)]">
                  About Me
                </h2>
              </div>
              <p className="text-[var(--dynamic-text-secondary)] mt-4">
                Discover who I am and what drives me
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto relative">
              {/* Decorative elements */}
              <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-[var(--dynamic-primary)] opacity-5 blur-3xl animate-pulse" />
              <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-[var(--dynamic-accent)] opacity-5 blur-3xl animate-pulse-delay" />

              {/* 3D Card Effect */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="group perspective">
                  <motion.div
                    whileHover={{
                      rotateX: [-0.5, 0.5],
                      rotateY: [-0.5, 0.5],
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    className="relative p-1 bg-gradient-to-b from-[var(--dynamic-accent)] via-[var(--dynamic-primary)] to-[var(--dynamic-secondary)] rounded-2xl shadow-xl preserve-3d"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" />

                    <div className="p-8 md:p-10 rounded-xl bg-[var(--dynamic-bg-card)] backdrop-blur-lg border border-[var(--dynamic-border)] relative z-10 preserve-3d">
                      {/* Decorative code brackets */}
                      <span className="absolute top-4 left-4 text-4xl text-[var(--dynamic-primary)] opacity-20 font-mono preserve-3d translate-z-8">
                        &#123;
                      </span>
                      <span className="absolute bottom-4 right-4 text-4xl text-[var(--dynamic-primary)] opacity-20 font-mono preserve-3d translate-z-8">
                        &#125;
                      </span>

                      <div className="relative preserve-3d">
                        <motion.p
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="text-lg md:text-xl leading-relaxed text-[var(--dynamic-text-secondary)] preserve-3d translate-z-4"
                        >
                          {portfolio.contents.about_text}
                        </motion.p>

                        {/* Floating decorative elements */}
                        <motion.div
                          className="absolute -top-6 -right-6 text-[var(--dynamic-accent)] opacity-30 preserve-3d translate-z-12"
                          animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, 0],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        >
                          <CodeIcon size={40} />
                        </motion.div>

                        <motion.div
                          className="absolute -bottom-6 -left-6 text-[var(--dynamic-primary)] opacity-30 preserve-3d translate-z-12"
                          animate={{
                            y: [0, 10, 0],
                            rotate: [0, -5, 0],
                          }}
                          transition={{
                            duration: 5,
                            delay: 1,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        >
                          <HeartIcon size={40} />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <section id="skills" className="relative py-24 bg-gradient-radial z-10">
          <div className="absolute inset-0 bg-[var(--dynamic-gradient-radial)] pointer-events-none"></div>

          <div className="container mx-auto px-4 relative">
            {/* Section Title with animated underline */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <div className="inline-block relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--dynamic-accent)] to-transparent"
                />
                <h2 className="text-4xl md:text-5xl font-bold inline-block bg-clip-text text-transparent bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)]">
                  My Skills
                </h2>
              </div>
              <p className="text-[var(--dynamic-text-secondary)] mt-4">
                Tools and technologies I've mastered
              </p>
            </motion.div>

            {/* 3D Rotating Skill Showcase */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-5xl mx-auto"
            >
              <motion.div
                variants={animations.staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              >
                {skills.map((skill: Skill, index: number) => {
                  const SkillIcon = getSkillIcon(skill.name);
                  const skillColor = getSkillColor(skill.name);

                  return (
                    <motion.div
                      key={skill.id}
                      variants={animations.staggerItems}
                      className="perspective"
                    >
                      <motion.div
                        whileHover={{
                          rotateX: [0, 10, 0],
                          rotateY: [0, 15, 0],
                          z: [0, 30, 0],
                          scale: 1.05,
                        }}
                        transition={{ duration: 0.5 }}
                        className="skill-card group relative h-full"
                      >
                        <div
                          className="absolute inset-0 rounded-2xl"
                          style={{
                            background: `radial-gradient(circle at center, ${skillColor}20 0%, transparent 70%)`,
                            opacity: 0,
                            transition: "opacity 0.3s ease-in-out",
                          }}
                        />
                        <div
                          className="h-full flex flex-col items-center justify-center p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 preserve-3d"
                          style={{
                            background: `${skillColor}08`,
                            borderColor: `${skillColor}20`,
                          }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{
                              duration: 20,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="absolute opacity-10 inset-0 pointer-events-none"
                          >
                            <div
                              className="w-full h-full rounded-full border"
                              style={{ borderColor: skillColor }}
                            ></div>
                          </motion.div>

                          <motion.div
                            whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                            className="relative mb-4 w-16 h-16 flex items-center justify-center rounded-full preserve-3d translate-z-8"
                            style={{
                              background: `${skillColor}15`,
                              border: `1px solid ${skillColor}30`,
                              boxShadow: `0 0 20px ${skillColor}20`,
                            }}
                          >
                            <SkillIcon
                              size={30}
                              style={{ color: skillColor }}
                              className="group-hover:animate-pulse"
                            />
                          </motion.div>

                          <p
                            className="text-base font-medium text-center preserve-3d translate-z-4"
                            style={{ color: skillColor }}
                          >
                            {skill.name}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {educations && educations.length > 0 && (
        <section id="education" className="py-24 relative z-10">
          <div className="container mx-auto px-4 relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--dynamic-gradient-radial)] blur-3xl opacity-20 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--dynamic-gradient-radial)] blur-3xl opacity-20 animate-pulse-slow"></div>

            {/* Section Title with animated underline */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <div className="inline-block relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--dynamic-accent)] to-transparent"
                />
                <h2 className="text-4xl md:text-5xl font-bold inline-block bg-clip-text text-transparent bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)]">
                  Education
                </h2>
              </div>
              <p className="text-[var(--dynamic-text-secondary)] mt-4">
                My academic journey and credentials
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto relative">
              {/* Vertical Timeline Line */}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--dynamic-primary)] via-[var(--dynamic-accent)] to-[var(--dynamic-secondary)] md:transform md:-translate-x-1/2 z-0"
              />

              {/* Education Timeline Items */}
              <div className="relative z-10">
                {educations.map((education: Education, index) => (
                  <motion.div
                    key={education.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`mb-12 md:mb-24 flex flex-col ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } relative`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-[-9px] md:left-1/2 md:transform md:-translate-x-1/2 top-0 w-5 h-5">
                      <span className="block w-full h-full rounded-full bg-[var(--dynamic-bg-card)]"></span>
                      <span className="absolute inset-1 rounded-full bg-[var(--dynamic-accent)] animate-pulse"></span>
                    </div>

                    <div
                      className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-10" : "md:pl-10"}`}
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.03,
                          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                        }}
                        className="education-card relative overflow-hidden"
                      >
                        {/* Glowing border effect */}
                        <div className="absolute inset-0 p-[1px] rounded-xl overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-[var(--dynamic-primary)] via-[var(--dynamic-accent)] to-[var(--dynamic-secondary)] animate-gradient-slow rounded-xl"></div>
                        </div>

                        <div className="relative bg-[var(--dynamic-bg-card)] border border-[var(--dynamic-border)] backdrop-blur-md p-6 md:p-8 rounded-xl">
                          {/* Education Icon */}
                          <div className="absolute -top-6 -right-6 text-[var(--dynamic-accent)] opacity-10">
                            <GraduationCapIcon size={64} />
                          </div>

                          <h3 className="text-xl md:text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)]">
                            {education.degree} in {education.field}
                          </h3>

                          <p className="text-xl text-[var(--dynamic-text-primary)] font-medium mb-2">
                            {education.school}
                          </p>

                          <div className="flex items-center mt-4 text-[var(--dynamic-text-secondary)]">
                            <CalendarIcon className="mr-2 w-4 h-4" />
                            <span className="text-sm font-medium">
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
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experiences && experiences.length > 0 && (
        <section
          id="experience"
          className="py-24 relative z-10 bg-gradient-radial overflow-hidden"
        >
          <div className="absolute inset-0 bg-[var(--dynamic-gradient-radial)] opacity-40 pointer-events-none"></div>

          {/* Decorative Code Lines */}
          <div className="absolute inset-0 opacity-5 pointer-events-none hidden md:block">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-px w-full bg-[var(--dynamic-accent)]"
                style={{
                  top: `${i * 10}%`,
                  opacity: 0.3,
                  transform: `translateY(${i % 2 ? 10 : -10}px)`,
                }}
              />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i + 10}
                className="absolute w-px h-full bg-[var(--dynamic-accent)]"
                style={{
                  left: `${i * 10}%`,
                  opacity: 0.2,
                  transform: `translateX(${i % 2 ? 10 : -10}px)`,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative">
            {/* Section Title with animated underline */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <div className="inline-block relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--dynamic-accent)] to-transparent"
                />
                <h2 className="text-4xl md:text-5xl font-bold inline-block bg-clip-text text-transparent bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)]">
                  Experience
                </h2>
              </div>
              <p className="text-[var(--dynamic-text-secondary)] mt-4">
                My professional journey and expertise
              </p>
            </motion.div>

            {/* 3D Experience Timeline */}
            <div className="max-w-6xl mx-auto relative">
              {/* Experience Timeline */}
              <div className="relative">
                {/* Timeline Progress Line */}
                <motion.div
                  className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--dynamic-primary)] via-[var(--dynamic-accent)] to-[var(--dynamic-secondary)]"
                  style={{ marginLeft: -1 }}
                  initial={{ scaleY: 0, originY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                <div className="space-y-16 md:space-y-24 relative">
                  {experiences.map((experience, index) => (
                    <motion.div
                      key={experience.id}
                      className="flex flex-col md:flex-row items-start relative"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: index * 0.1 }}
                    >
                      {/* Timeline Node */}
                      <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 mt-3 z-10">
                        <motion.div
                          className="w-6 h-6 rounded-full bg-[var(--dynamic-bg-card)] border-2 border-[var(--dynamic-accent)] flex items-center justify-center"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                            delay: 0.2 + index * 0.1,
                          }}
                        >
                          <span className="w-2 h-2 rounded-full bg-[var(--dynamic-accent)] animate-pulse" />
                        </motion.div>
                      </div>

                      {/* Date */}
                      <div
                        className={`w-full md:w-1/2 flex ${
                          index % 2 === 0
                            ? "md:justify-end md:pr-16"
                            : "md:justify-start md:pl-16 md:order-last"
                        }`}
                      >
                        <div className="pl-16 md:pl-0 mb-4 md:mb-0">
                          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--dynamic-accent-transparent)] text-[var(--dynamic-accent)] border border-[var(--dynamic-border)] text-sm font-medium">
                            <CalendarIcon className="mr-2 w-4 h-4" />
                            <span>
                              {format(
                                new Date(experience.start_date),
                                "MMM yyyy"
                              )}{" "}
                              -{" "}
                              {experience.end_date &&
                              experience.end_date !== "Present"
                                ? format(
                                    new Date(experience.end_date),
                                    "MMM yyyy"
                                  )
                                : "Present"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Experience Card */}
                      <div
                        className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                          index % 2 === 0 ? "md:pl-16" : "md:pr-16"
                        }`}
                      >
                        <motion.div
                          className="group perspective"
                          whileHover={{ scale: 1.02 }}
                        >
                          <motion.div
                            whileHover={{
                              rotateX: [-1, 1],
                              rotateY: [-1, 1],
                            }}
                            transition={{
                              duration: 0.5,
                              ease: "easeInOut",
                            }}
                            className="relative overflow-hidden rounded-2xl bg-[var(--dynamic-bg-card)] border border-[var(--dynamic-border)] shadow-xl backdrop-blur-md preserve-3d"
                          >
                            {/* Background glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[var(--dynamic-accent-transparent)] opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

                            {/* Company Logo */}
                            {experience.logo && (
                              <div className="absolute top-4 right-4 rounded-lg p-2 bg-white/90 dark:bg-black/20 shadow-lg w-12 h-12 flex items-center justify-center preserve-3d translate-z-8">
                                <Image
                                  src={experience.logo}
                                  alt={experience.company}
                                  width={32}
                                  height={32}
                                  className="object-contain"
                                />
                              </div>
                            )}

                            <div className="p-6 md:p-8 preserve-3d">
                              {/* Role & Company */}
                              <div className="mb-6 preserve-3d translate-z-4">
                                <h3 className="text-xl md:text-2xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)]">
                                  {experience.role}
                                </h3>
                                <div className="flex items-center">
                                  <BriefcaseIcon className="mr-2 w-4 h-4 text-[var(--dynamic-accent)]" />
                                  <span className="font-medium text-[var(--dynamic-text-primary)]">
                                    {experience.company}
                                  </span>

                                  {experience.employment_type && (
                                    <>
                                      <span className="mx-2 text-[var(--dynamic-text-secondary)]">
                                        •
                                      </span>
                                      <span className="text-[var(--dynamic-text-secondary)] text-sm">
                                        {experience.employment_type}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>

                              {/* Description */}
                              <p className="text-[var(--dynamic-text-secondary)] preserve-3d translate-z-2">
                                {experience.description}
                              </p>
                            </div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <section id="projects" className="py-24 relative z-10">
          <div className="container mx-auto px-4 relative">
            {/* Decorative elements */}
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[var(--dynamic-gradient-radial)] opacity-10 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[var(--dynamic-gradient-radial)] opacity-10 blur-3xl"></div>

            {/* Section Title with animated underline */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <div className="inline-block relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--dynamic-accent)] to-transparent"
                />
                <h2 className="text-4xl md:text-5xl font-bold inline-block bg-clip-text text-transparent bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)]">
                  Projects
                </h2>
              </div>
              <p className="text-[var(--dynamic-text-secondary)] mt-4">
                Explore my favorite works and creations
              </p>
            </motion.div>

            {/* Projects Grid */}
            <motion.div
              variants={animations.staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="max-w-7xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={animations.staggerItems}
                    custom={index}
                    className="group perspective"
                  >
                    <motion.div
                      whileHover={{
                        y: -10,
                        rotateX: 2,
                        rotateY: 2,
                        scale: 1.02,
                      }}
                      className="relative rounded-2xl overflow-hidden bg-[var(--dynamic-bg-card)] border border-[var(--dynamic-border)] shadow-xl preserve-3d h-full"
                    >
                      {/* Project Image */}
                      <div className="relative aspect-video overflow-hidden">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={500}
                            height={280}
                            className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[var(--dynamic-primary)] to-[var(--dynamic-accent)] flex items-center justify-center">
                            <span className="text-4xl font-bold text-white">
                              {project.title.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                        )}

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--dynamic-bg-card)] to-transparent opacity-90"></div>
                      </div>

                      <div className="p-6 md:p-8 relative preserve-3d">
                        {/* Project title with 3D effect */}
                        <motion.h3
                          className="text-xl md:text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)] preserve-3d translate-z-4"
                          whileHover={{ scale: 1.05 }}
                        >
                          {project.title}
                        </motion.h3>

                        <p className="text-[var(--dynamic-text-secondary)] mb-6 preserve-3d translate-z-2 line-clamp-3">
                          {project.description}
                        </p>

                        {/* Links with hover effects */}
                        <div className="mt-auto flex flex-wrap gap-3 preserve-3d translate-z-4">
                          {project.repo_url && (
                            <Link
                              href={project.repo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative"
                            >
                              <span className="absolute inset-0 rounded-lg bg-[var(--dynamic-primary)] opacity-0 group-hover:opacity-10 blur transition-opacity duration-300"></span>
                              <span className="relative flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--dynamic-bg-rgb)]/30 border border-[var(--dynamic-border)] text-[var(--dynamic-text-primary)] transition-all duration-300 group-hover:border-[var(--dynamic-primary)]">
                                <FaGithub className="w-4 h-4" />
                                <span>Code</span>
                              </span>
                            </Link>
                          )}

                          {project.live_url && (
                            <Link
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative"
                            >
                              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)] opacity-90 blur-sm group-hover:opacity-100 transition-all duration-300"></span>
                              <span className="relative flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)] border border-transparent text-white font-medium transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[var(--dynamic-accent-rgb)]/20">
                                <ExternalLinkIcon className="w-4 h-4" />
                                <span>Live Demo</span>
                              </span>
                            </Link>
                          )}
                        </div>

                        {/* Decorative element */}
                        <motion.div
                          className="absolute -bottom-4 -right-4 text-[var(--dynamic-accent)] opacity-10 preserve-3d translate-z-12 pointer-events-none"
                          animate={{
                            rotate: [0, 10, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        >
                          <RocketIcon size={48} />
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-24 relative z-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--dynamic-accent)] to-transparent opacity-20"></div>

          {/* Radial gradient */}
          <div className="absolute inset-0 bg-[var(--dynamic-gradient-radial)] opacity-30"></div>

          {/* Animated particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[var(--dynamic-accent)]"
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Logo / Name */}
              <div className="mb-8">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-block relative"
                >
                  <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--dynamic-primary)] via-[var(--dynamic-accent)] to-[var(--dynamic-secondary)] animate-gradient">
                    {portfolio.contents.meta_title}
                  </div>
                  <motion.div
                    className="absolute -inset-3 rounded-full border border-[var(--dynamic-border)] opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                </motion.div>
              </div>

              {/* Social Links */}
              <motion.div
                variants={animations.staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="flex justify-center gap-4 mb-10"
              >
                {socials.map((social, index) => (
                  <motion.div
                    key={social.id}
                    variants={animations.staggerItems}
                    custom={index}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <Link
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                    >
                      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)] blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"></span>
                      <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[var(--dynamic-bg-card)] border border-[var(--dynamic-border)] backdrop-blur-md text-[var(--dynamic-text-secondary)] transition-all duration-300 group-hover:text-white group-hover:border-transparent group-hover:translate-y-[-2px]">
                        {getPlatformIcon(social.platform)}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Copyright */}
              <div className="text-[var(--dynamic-text-secondary)] text-sm">
                <p>
                  © {new Date().getFullYear()} {portfolio.contents.meta_title}.
                  All rights reserved.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Animations */}
      <style jsx global>{`
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

        @keyframes float-delay {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes animate-gradient {
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

        @keyframes pulse-x {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(3px);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes reverse-spin-slow {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes gradient-slow {
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

        @keyframes pulse-slow {
          0% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0.5;
          }
        }

        @keyframes pulse-delay {
          0% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0.5;
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delay {
          animation: float-delay 12s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: animate-gradient 6s ease infinite;
        }

        .animate-pulse-x {
          animation: pulse-x 1.5s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-reverse-spin-slow {
          animation: reverse-spin-slow 15s linear infinite;
        }

        .animate-gradient-slow {
          background-size: 200% 200%;
          animation: gradient-slow 8s ease infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-delay {
          animation: pulse-delay 5s ease-in-out infinite;
          animation-delay: 1s;
        }

        .perspective {
          perspective: 1000px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        .translate-z-2 {
          transform: translateZ(2px);
        }

        .translate-z-4 {
          transform: translateZ(4px);
        }

        .translate-z-8 {
          transform: translateZ(8px);
        }

        .translate-z-12 {
          transform: translateZ(12px);
        }

        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgb(var(--dynamic-accent-rgb), 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgb(var(--dynamic-accent-rgb), 0.05) 1px,
              transparent 1px
            );
          background-size: 30px 30px;
        }

        .bg-gradient-radial {
          background: radial-gradient(
            circle at center,
            rgba(var(--dynamic-accent-rgb), 0.15),
            transparent 70%
          );
        }
      `}</style>
    </div>
  );
};

export default DynamicTheme;
