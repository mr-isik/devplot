"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { CalendarIcon, ExternalLinkIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { ThemeProps } from "@/features/themes/types";
import { ThemeOptions } from "@/features/themes/types/theme-options";
import { adjustColor, fontFamilies } from "../utils/themeCustomization";
import { getPlatformIcon } from "@/features/portfolios/forms/steps/SocialsStep";
import { Education } from "@/features/educations/types";
import { Skill } from "@/features/skills/types";
import { getSkillIcon, getSkillColor } from "@/lib/skillsData";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 200,
      delay: 0.1 * i,
    },
  }),
};

// Helper functions
const hexToRgb = (hex: string): string => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const formattedHex = hex.replace(
    shorthandRegex,
    (_, r, g, b) => r + r + g + g + b + b
  );
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(formattedHex);

  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "0, 0, 0";
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
      colors: ["#17172b", "#222246", "#2c2c5a", "#ffffff", "#7855ff"],
      font: "outfit",
      colorPalette: {
        primary: "#403ffc",
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
    const secondaryColor = getComplementaryColor(accentColor);
    const secondaryRgb = hexToRgb(secondaryColor);

    // Update color palette
    themeOptions.colorPalette = {
      primary: primaryColor,
      secondary: secondaryColor,
      background: themeOptions.colors[0],
      text: themeOptions.colors[3],
      accent: accentColor,
      muted: themeOptions.colors[3] + "99",
      border: themeOptions.colors[2],
      card: `rgba(${hexToRgb(themeOptions.colors[1])}, 0.7)`,
    };

    return {
      "--dynamic-primary": primaryColor,
      "--dynamic-primary-rgb": primaryRgb,
      "--dynamic-secondary": secondaryColor,
      "--dynamic-secondary-rgb": secondaryRgb,
      "--dynamic-accent": accentColor,
      "--dynamic-accent-rgb": accentRgb,
      "--dynamic-bg": themeOptions.colors[0],
      "--dynamic-bg-rgb": hexToRgb(themeOptions.colors[0]),
      "--dynamic-bg-secondary": themeOptions.colors[1],
      "--dynamic-bg-card": `rgba(${hexToRgb(themeOptions.colors[1])}, 0.7)`,
      "--dynamic-text-primary": themeOptions.colors[3],
      "--dynamic-text-secondary": themeOptions.colors[3] + "99",
      "--dynamic-border": themeOptions.colors[2],
      "--dynamic-shadow": `0 8px 32px rgba(${primaryRgb}, 0.3)`,
      "--dynamic-glow": `0 0 15px rgba(${accentRgb}, 0.3)`,
      "--dynamic-gradient-1": `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
      "--dynamic-gradient-2": `linear-gradient(135deg, ${secondaryColor}, ${accentColor})`,
      "--dynamic-gradient-anim": `linear-gradient(90deg, ${primaryColor}, ${accentColor}, ${secondaryColor}, ${primaryColor})`,
      "--dynamic-button-glow": `0 0 20px rgba(${accentRgb}, 0.5)`,
      fontFamily: themeOptions.font
        ? fontFamilies[themeOptions.font as keyof typeof fontFamilies] ||
          `${themeOptions.font.charAt(0).toUpperCase() + themeOptions.font.slice(1)}, system-ui, sans-serif`
        : undefined,
    };
  }, [themeOptions]);

  // Get theme class
  const themeClass = `${themeOptions.colorTheme === "dark" ? "dark" : ""}`;

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden bg-[var(--dynamic-bg)] text-[var(--dynamic-text-primary)] ${themeClass}`}
      style={cssVariables as React.CSSProperties}
    >
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              repeating-linear-gradient(transparent, transparent 20px, var(--dynamic-accent) 20px, var(--dynamic-accent) 21px),
              repeating-linear-gradient(90deg, transparent, transparent 20px, var(--dynamic-accent) 20px, var(--dynamic-accent) 21px)
            `,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Accent Gradients */}
        <div className="absolute top-0 -right-32 w-96 h-96 rounded-full bg-gradient-to-b from-[var(--dynamic-secondary)] to-transparent opacity-10 blur-3xl animate-float" />
        <div className="absolute bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-t from-[var(--dynamic-primary)] to-transparent opacity-10 blur-3xl animate-float-delay" />
      </div>

      {/* Hero Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--dynamic-primary)] via-[var(--dynamic-accent)] to-[var(--dynamic-secondary)] animate-gradient"
            >
              {portfolio.contents.hero_header}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="max-w-2xl text-lg md:text-xl text-[var(--dynamic-text-secondary)] leading-relaxed"
            >
              {portfolio.contents.hero_description}
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              {socials.map((social, index) => (
                <motion.div
                  key={social.id}
                  custom={index}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.2 }}
                >
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--dynamic-bg-card)] border border-[var(--dynamic-border)] text-[var(--dynamic-accent)] transition-all duration-300 hover:bg-[var(--dynamic-accent)] hover:text-white hover:shadow-lg hover:shadow-[var(--dynamic-accent-rgb)]/20 hover:-translate-y-1"
                  >
                    <span className="sr-only">{social.platform}</span>
                    {getPlatformIcon(social.platform)}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      {portfolio.contents.about_text && (
        <section className="py-20 bg-[var(--dynamic-bg-secondary)] relative z-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)] relative">
                About Me
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)]"></span>
              </h2>
              <p className="text-[var(--dynamic-text-secondary)]">
                Get to know me better
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              <div className="p-6 md:p-8 rounded-2xl bg-[var(--dynamic-bg-card)] border border-[var(--dynamic-border)] backdrop-blur-md shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-[var(--dynamic-accent-rgb)]/10">
                <p className="text-lg leading-relaxed text-[var(--dynamic-text-secondary)]">
                  {portfolio.contents.about_text}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)] relative">
                Skills
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)]"></span>
              </h2>
              <p className="text-[var(--dynamic-text-secondary)]">
                Technologies and tools I work with
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex flex-wrap justify-center gap-3">
                {skills.map((skill: Skill, index: number) => {
                  const SkillIcon = getSkillIcon(skill.name);
                  const skillColor = getSkillColor(skill.name);

                  return (
                    <motion.span
                      key={skill.id}
                      custom={index}
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.1,
                        boxShadow: `0 10px 20px rgba(0,0,0,0.2), 0 0 15px ${skillColor}40`,
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
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
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {educations && educations.length > 0 && (
        <section className="py-20 bg-[var(--dynamic-bg-secondary)] relative z-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)] relative">
                Education
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)]"></span>
              </h2>
              <p className="text-[var(--dynamic-text-secondary)]">
                My academic background and qualifications
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6">
              {educations.map((education: Education, index) => (
                <motion.div
                  key={education.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 md:p-8 rounded-2xl bg-[var(--dynamic-bg-card)] border border-[var(--dynamic-border)] backdrop-blur-md shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-[var(--dynamic-accent-rgb)]/10 hover:-translate-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {education.degree} in {education.field}
                      </h3>
                      <p className="text-[var(--dynamic-text-secondary)] mt-1">
                        {education.school}
                      </p>
                    </div>
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--dynamic-accent-rgb)]/10 text-[var(--dynamic-accent)] border border-[var(--dynamic-border)] text-sm font-medium">
                      <CalendarIcon className="mr-1 w-4 h-4" />
                      <span>
                        {format(new Date(education.start_date), "MMM yyyy")} -{" "}
                        {education.end_date && education.end_date !== "Present"
                          ? format(new Date(education.end_date), "MMM yyyy")
                          : "Present"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section with Timeline */}
      {experiences && experiences.length > 0 && (
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)] relative">
                Experience
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)]"></span>
              </h2>
              <p className="text-[var(--dynamic-text-secondary)]">
                Professional journey through my career
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto relative">
              {/* Timeline Progress */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-[1px] top-0 bottom-0 w-0.5 bg-[var(--dynamic-border)]"
                initial={{ scaleY: 0, originY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              />

              <div className="space-y-12">
                {experiences.map((experience, index) => (
                  <motion.div
                    key={experience.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className={`relative ${index % 2 === 0 ? "md:ml-auto md:pl-12 md:pr-0 md:text-left" : "md:mr-auto md:pr-12 md:pl-0 md:text-right"} md:w-[calc(50%-24px)] px-12`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute -left-10 top-0 md:top-5 transform bg-[var(--dynamic-bg-card)] border-2 border-[var(--dynamic-accent)] rounded-full w-8 h-8 flex items-center justify-center z-10">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)] animate-pulse"></div>
                    </div>

                    {/* Timeline Content */}
                    <div className="p-6 md:p-8 rounded-2xl bg-[var(--dynamic-bg-card)] border border-[var(--dynamic-border)] backdrop-blur-md shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-[var(--dynamic-accent-rgb)]/10 hover:-translate-y-2">
                      <h3 className="text-xl font-semibold mb-2">
                        {experience.role}
                      </h3>

                      <div
                        className={`flex items-center gap-3 mb-2 ${index % 2 === 1 ? "md:justify-end" : ""}`}
                      >
                        {experience.logo && (
                          <div className="bg-white rounded-lg p-1 overflow-hidden w-10 h-10 flex items-center justify-center">
                            <Image
                              src={experience.logo}
                              alt={experience.company}
                              width={32}
                              height={32}
                              className="object-contain"
                            />
                          </div>
                        )}
                        <span className="font-medium text-[var(--dynamic-accent)]">
                          {experience.company}
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-[var(--dynamic-text-secondary)] mb-4">
                        <CalendarIcon className="mr-1 w-3 h-3 inline" />
                        <span>
                          {format(new Date(experience.start_date), "MMM yyyy")}{" "}
                          -{" "}
                          {experience.end_date &&
                          experience.end_date !== "Present"
                            ? format(new Date(experience.end_date), "MMM yyyy")
                            : "Present"}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{experience.employment_type}</span>
                      </div>

                      <p className="text-[var(--dynamic-text-secondary)]">
                        {experience.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <section className="py-20 bg-[var(--dynamic-bg-secondary)] relative z-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)] relative">
                Projects
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)]"></span>
              </h2>
              <p className="text-[var(--dynamic-text-secondary)]">
                Showcasing my work and creative solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-[var(--dynamic-border)] bg-[var(--dynamic-bg-card)] backdrop-blur-md shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-[var(--dynamic-accent-rgb)]/10 hover:-translate-y-2"
                >
                  <div className="aspect-video relative overflow-hidden rounded-t-xl">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                        width={500}
                        height={280}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[var(--dynamic-primary)] to-[var(--dynamic-accent)] flex items-center justify-center">
                        <span className="text-xl font-bold text-white">
                          {project.title.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--dynamic-bg-rgb)]/90 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)]">
                      {project.title}
                    </h3>
                    <p className="text-[var(--dynamic-text-secondary)] mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {project.repo_url && (
                        <Link
                          href={project.repo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 rounded-lg bg-[var(--dynamic-bg-rgb)]/30 border border-[var(--dynamic-border)] text-[var(--dynamic-text-primary)] transition-all duration-300 hover:bg-[var(--dynamic-accent-rgb)]/10 hover:border-[var(--dynamic-accent)] hover:text-[var(--dynamic-accent)]"
                        >
                          <FaGithub className="mr-2 w-4 h-4" />
                          Source Code
                        </Link>
                      )}
                      {project.live_url && (
                        <Link
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--dynamic-primary)] to-[var(--dynamic-accent)] text-white transition-all duration-300 hover:shadow-lg hover:shadow-[var(--dynamic-accent-rgb)]/20 hover:-translate-y-1"
                        >
                          <ExternalLinkIcon className="mr-2 w-4 h-4" />
                          Live Demo
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 text-center text-[var(--dynamic-text-secondary)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-4">
              ©{new Date().getFullYear()} {portfolio.contents.meta_title}
            </p>
            <div className="flex justify-center gap-4 mt-6">
              {socials.map((social, index) => (
                <motion.div
                  key={social.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileHover={{ scale: 1.2 }}
                >
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--dynamic-text-secondary)] transition-colors hover:text-[var(--dynamic-accent)]"
                  >
                    {getPlatformIcon(social.platform)}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
      `}</style>
    </div>
  );
};

export default DynamicTheme;
