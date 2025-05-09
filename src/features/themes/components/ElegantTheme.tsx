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
    /* Base Color Variables - Will be adjusted based on user customization */
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
    
    /* Enhanced premium variables */
    --elegant-shadow-intense: 0 20px 50px rgba(179, 134, 0, 0.18);
    --elegant-glow: 0 0 25px rgba(179, 134, 0, 0.2);
    --elegant-glow-intense: 0 0 35px rgba(179, 134, 0, 0.35);
    --elegant-gradient-shimmer: linear-gradient(90deg, var(--elegant-accent), var(--elegant-accent-light), var(--elegant-accent));
    --elegant-gradient-conic: conic-gradient(from 0deg at 50% 50%, var(--elegant-gold), var(--elegant-gold-light), var(--elegant-cream-dark), var(--elegant-gold));
    --elegant-glass: rgba(255, 255, 255, 0.08);
    --elegant-glass-dark: rgba(0, 0, 0, 0.05);
    --elegant-backdrop-blur: blur(12px);
    
    color: var(--elegant-text-primary);
    background-color: var(--elegant-bg);
    font-family: 'Playfair Display', serif;
    position: relative;
    overflow-x: hidden;
  }

  .elegant-theme.dark {
    /* Dark Theme Values */
    --elegant-bg: #1a1500;
    --elegant-text-primary: #f5edd6;
    --elegant-text-secondary: #e6d7b3;
    --elegant-card-bg: #221c0a;
    --elegant-section-bg: #221c0a;
    --elegant-border: #594b21;
    --elegant-glass: rgba(0, 0, 0, 0.25);
    --elegant-glass-dark: rgba(255, 255, 255, 0.05);
  }
  
  .elegant-theme .section {
    padding: 6rem 0;
    position: relative;
    scroll-margin-top: 2rem;
    overflow: hidden;
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
    opacity: 0.9;
    box-shadow: var(--elegant-glow);
  }
  
  .elegant-theme .card {
    background-color: var(--elegant-card-bg);
    border-radius: 4px;
    box-shadow: var(--elegant-shadow);
    padding: 2rem;
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    position: relative;
    overflow: hidden;
    border-bottom: 2px solid var(--elegant-accent);
    perspective: 1000px;
    transform-style: preserve-3d;
    backdrop-filter: var(--elegant-backdrop-blur);
    -webkit-backdrop-filter: var(--elegant-backdrop-blur);
  }
  
  .elegant-theme .card:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: var(--elegant-shadow-intense);
    border-bottom-width: 3px;
  }
  
  .elegant-theme .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(var(--elegant-accent-rgb), 0.05), transparent);
    transform: translateY(100%);
    transition: transform 0.6s ease;
  }
  
  .elegant-theme .card:after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: var(--elegant-glass);
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  .elegant-theme .card:hover::before {
    transform: translateY(-100%);
  }
  
  .elegant-theme .card:hover::after {
    opacity: 1;
  }
  
  .elegant-theme .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    padding: 0.75rem 1.5rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.85rem;
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    position: relative;
    overflow: hidden;
    z-index: 1;
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
    transition: transform 0.4s ease;
    z-index: -1;
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
  
  .elegant-theme .btn-primary::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.7s ease;
    z-index: -1;
  }
  
  .elegant-theme .btn-primary:hover::before {
    left: 100%;
  }
  
  .elegant-theme .btn-outline {
    background-color: transparent;
    border: 1px solid var(--elegant-accent);
    color: var(--elegant-accent);
    overflow: hidden;
  }
  
  .elegant-theme .btn-outline:hover {
    background-color: var(--elegant-accent);
    color: white;
  }
  
  .elegant-theme .btn-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--elegant-border);
    color: var(--elegant-text-secondary);
    border-radius: 2px;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    background-color: transparent;
  }
  
  .elegant-theme .btn-icon.premium-hover {
    position: relative;
    overflow: hidden;
  }
  
  .elegant-theme .btn-icon.premium-hover:before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--elegant-gradient);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 0;
  }
  
  .elegant-theme .btn-icon.premium-hover:hover {
    transform: translateY(-3px);
    box-shadow: var(--elegant-shadow);
    border-color: var(--elegant-accent);
  }
  
  .elegant-theme .btn-icon.premium-hover:hover:before {
    opacity: 0.1;
  }
  
  .elegant-theme .badge {
    position: relative;
    overflow: hidden;
  }
  
  .elegant-theme .badge:after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: rotate(30deg);
    animation: shimmerAnimation 4s infinite linear;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  .elegant-theme .badge:hover:after {
    opacity: 1;
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
    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
    position: relative;
    overflow: hidden;
  }
  
  .elegant-theme .skill-badge:hover {
    transform: translateY(-3px) scale(1.05);
    border-color: var(--elegant-accent);
    box-shadow: var(--elegant-shadow);
  }
  
  .elegant-theme .skill-badge::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(var(--elegant-accent-rgb), 0.2), transparent);
    transition: left 0.7s ease;
    z-index: -1;
  }
  
  .elegant-theme .skill-badge:hover::before {
    left: 100%;
  }
  
  .elegant-theme h1, .elegant-theme h2, .elegant-theme h3 {
    font-weight: 700;
    line-height: 1.2;
    font-family: 'Playfair Display', serif;
    color: var(--elegant-text-primary);
  }
  
  .elegant-theme h1 {
    font-size: clamp(2.5rem, 6vw, 4rem);
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
    font-size: clamp(2rem, 5vw, 2.8rem);
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
    transition: width 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  }
  
  .elegant-theme .section-title:hover::after {
    width: 100px;
  }
  
  .elegant-theme .section-header {
    text-align: center;
    margin-bottom: 4rem;
    position: relative;
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
  
  .elegant-theme .gold-text {
    color: var(--elegant-accent);
    position: relative;
    display: inline-block;
  }
  
  .elegant-theme .underlined {
    position: relative;
    display: inline-block;
  }
  
  .elegant-theme .underlined::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--elegant-gradient);
    transform: scaleX(0.3);
    transform-origin: left;
    transition: transform 0.4s ease;
  }
  
  .elegant-theme .underlined:hover::after,
  .elegant-theme .card:hover .underlined::after {
    transform: scaleX(1);
  }
  
  .elegant-theme .project-card {
    position: relative;
    overflow: hidden;
    border-radius: 0;
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    border-bottom: 2px solid var(--elegant-accent);
    perspective: 1000px;
  }
  
  .elegant-theme .project-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: var(--elegant-shadow-intense);
    border-bottom-width: 3px;
  }
  
  .elegant-theme .project-image {
    transition: all 0.7s cubic-bezier(0.19, 1, 0.22, 1);
  }
  
  .elegant-theme .project-card:hover .project-image {
    transform: scale(1.08);
  }
  
  .elegant-theme .project-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, transparent, rgba(var(--elegant-accent-rgb), 0.05), transparent);
    transform: translateY(100%);
    transition: transform 0.8s ease;
    z-index: 1;
    pointer-events: none;
  }
  
  .elegant-theme .project-card:hover::before {
    transform: translateY(-100%);
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
    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
    position: relative;
    overflow: hidden;
  }
  
  .elegant-theme .education-date:hover {
    transform: translateY(-3px);
    border-color: var(--elegant-accent);
    box-shadow: var(--elegant-shadow);
  }
  
  .elegant-theme .education-date::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(var(--elegant-accent-rgb), 0.2), transparent);
    transition: left 0.7s ease;
    z-index: -1;
  }
  
  .elegant-theme .education-date:hover::before {
    left: 100%;
  }
  
  .elegant-theme .experience-logo {
    border: none;
    border-radius: 0;
    overflow: hidden;
    box-shadow: var(--elegant-shadow);
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  }
  
  .elegant-theme .card:hover .experience-logo {
    box-shadow: var(--elegant-shadow-intense);
    transform: scale(1.1) rotate(3deg);
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

  /* Enhanced Elegant Background Patterns */
  .elegant-theme::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 50% 50%, rgba(var(--elegant-accent-rgb), 0.03) 0%, transparent 60%),
      radial-gradient(circle at 85% 15%, rgba(var(--elegant-accent-rgb), 0.03) 0%, transparent 40%),
      radial-gradient(circle at 15% 85%, rgba(var(--elegant-accent-rgb), 0.03) 0%, transparent 40%),
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b38600' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2V6h4V4H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
    z-index: -1;
    opacity: 0.4;
  }
  
  /* Enhanced Decorative Elements */
  .elegant-decoration {
    position: relative;
  }
  
  .elegant-decoration::before,
  .elegant-decoration::after {
    content: '';
    position: absolute;
    background-color: var(--elegant-accent);
    opacity: 0.2;
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
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
      transform: translateX(-150%);
    }
    100% {
      transform: translateX(150%);
    }
  }
  
  .elegant-theme .golden-text {
    background: linear-gradient(to right, var(--elegant-accent), var(--elegant-accent-light), var(--elegant-accent));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
    position: relative;
    text-shadow: 0 2px 10px rgba(var(--elegant-accent-rgb), 0.1);
    transition: all 0.3s ease;
  }
  
  .elegant-theme .golden-text:hover {
    background-position: right center;
    text-shadow: 0 0 15px rgba(var(--elegant-accent-rgb), 0.3);
  }

  /* Enhanced Premium Decorative Elements */
  .elegant-theme .decorative-divider {
    position: relative;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--elegant-gold), transparent);
    margin: 2rem 0;
    opacity: 0.7;
    overflow: hidden;
  }
  
  .elegant-theme .decorative-divider::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent);
    animation: shine 3s infinite;
  }
  
  @keyframes shine {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
  
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
    border: 1px solid rgba(var(--elegant-accent-rgb), 0.2);
    background-color: var(--elegant-glass-dark);
    backdrop-filter: var(--elegant-backdrop-blur);
    -webkit-backdrop-filter: var(--elegant-backdrop-blur);
  }
  
  .elegant-theme .decorative-corners:hover {
    transform: translateY(-5px) scale(1.01);
  }
  
  .elegant-theme .decorative-corners .corner-top-right,
  .elegant-theme .decorative-corners .corner-bottom-left {
    position: absolute;
    width: 20px;
    height: 20px;
    border-style: solid;
    border-color: var(--elegant-accent);
    transition: all 0.4s ease;
  }
  
  .elegant-theme .decorative-corners .corner-top-right {
    top: -1px;
    right: -1px;
    border-width: 2px 2px 0 0;
  }
  
  .elegant-theme .decorative-corners .corner-bottom-left {
    bottom: -1px;
    left: -1px;
    border-width: 0 0 2px 2px;
  }
  
  .elegant-theme .decorative-corners:hover .corner-top-right,
  .elegant-theme .decorative-corners:hover .corner-bottom-left {
    width: 30px;
    height: 30px;
    border-color: var(--elegant-gold-light);
    box-shadow: var(--elegant-glow);
  }

  /* Enhanced Elegant Timeline Design */
  .elegant-theme .timeline-container {
    position: relative;
    padding: 3rem 0;
    max-width: 1000px;
    margin: 0 auto;
  }

  .elegant-theme .timeline-line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
    background: linear-gradient(to bottom, 
      transparent 0%,
      var(--elegant-accent) 15%,
      var(--elegant-accent) 85%, 
      transparent 100%);
    transform: translateX(-50%);
    z-index: 1;
  }
  
  .elegant-theme .timeline-line::before {
    content: '';
    position: absolute;
    top: 15%;
    left: 0;
    width: 100%;
    height: 70%;
    background: linear-gradient(to bottom, 
      transparent 0%,
      rgba(var(--elegant-accent-rgb), 0.3) 50%,
      transparent 100%);
    animation: pulseGlow 4s infinite alternate;
  }
  
  @keyframes pulseGlow {
    0% {
      opacity: 0.3;
      box-shadow: 0 0 5px rgba(var(--elegant-accent-rgb), 0.3);
    }
    100% {
      opacity: 0.6;
      box-shadow: 0 0 12px rgba(var(--elegant-accent-rgb), 0.6);
    }
  }

  .elegant-theme .timeline-item {
    position: relative;
    margin-bottom: 5rem;
    width: 100%;
    display: flex;
    z-index: 2;
  }

  .elegant-theme .timeline-item:last-child {
    margin-bottom: 0;
  }

  .elegant-theme .timeline-content {
    width: calc(50% - 2.5rem);
    position: relative;
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    transform-style: preserve-3d;
    perspective: 1000px;
  }
  
  .elegant-theme .timeline-content:hover {
    transform: translateY(-5px);
  }

  .elegant-theme .timeline-item:nth-child(odd) .timeline-content {
    margin-left: auto;
    padding-left: 2.5rem;
    transform-origin: left center;
  }

  .elegant-theme .timeline-item:nth-child(even) .timeline-content {
    margin-right: auto;
    padding-right: 2.5rem;
    text-align: right;
    transform-origin: right center;
  }

  .elegant-theme .timeline-dot {
    position: absolute;
    top: 5px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--elegant-accent);
    box-shadow: 0 0 0 4px rgba(var(--elegant-accent-rgb), 0.1);
    transition: all 0.3s ease;
    z-index: 5;
  }
  
  .elegant-theme .timeline-item:nth-child(odd) .timeline-dot {
    left: calc(50% - 5px);
  }
  
  .elegant-theme .timeline-item:nth-child(even) .timeline-dot {
    left: calc(50% - 5px);
  }

  .elegant-theme .timeline-item:hover .timeline-dot {
    box-shadow: 0 0 0 6px rgba(var(--elegant-accent-rgb), 0.15), var(--elegant-glow);
    transform: scale(1.2);
  }
  
  .elegant-theme .timeline-item:nth-child(odd)::before {
    content: '';
    position: absolute;
    top: 1.75rem;
    left: 50%;
    width: 2.5rem;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--elegant-accent));
  }

  .elegant-theme .timeline-item:nth-child(even)::before {
    content: '';
    position: absolute;
    top: 1.75rem;
    right: 50%;
    width: 2.5rem;
    height: 1px;
    background: linear-gradient(to left, transparent, var(--elegant-accent));
  }

  .elegant-theme .timeline-date {
    position: absolute;
    top: -1.8rem;
    font-family: "Playfair Display", serif;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
    color: var(--elegant-accent);
    font-style: italic;
  }

  .elegant-theme .timeline-item:nth-child(odd) .timeline-date {
    right: 0;
  }

  .elegant-theme .timeline-item:nth-child(even) .timeline-date {
    left: 0;
  }
  
  /* New 3D and parallax effects */
  .elegant-theme .parallax-container {
    perspective: 1500px;
    transform-style: preserve-3d;
  }
  
  .elegant-theme .parallax-layer {
    transition: transform 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  .elegant-theme .parallax-container:hover .parallax-top {
    transform: translateZ(40px);
  }
  
  .elegant-theme .parallax-container:hover .parallax-medium {
    transform: translateZ(20px);
  }
  
  .elegant-theme .parallax-container:hover .parallax-shallow {
    transform: translateZ(10px);
  }
  
  /* New animated background elements */
  .elegant-theme .animated-bg-particle {
    position: absolute;
    background: var(--elegant-gold);
    border-radius: 50%;
    opacity: 0.2;
    pointer-events: none;
  }
  
  .elegant-theme .premium-hover {
    position: relative;
    overflow: hidden;
  }
  
  .elegant-theme .premium-hover::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(var(--elegant-accent-rgb), 0.2) 0%, transparent 50%);
    opacity: 0;
    transform: scale(0.5);
    transition: opacity 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    pointer-events: none;
    z-index: -1;
  }
  
  .elegant-theme .premium-hover:hover::after {
    opacity: 1;
    transform: scale(1);
  }

  @media (max-width: 768px) {
    .elegant-theme .timeline-line {
      left: 2rem;
    }
    
    .elegant-theme .timeline-content {
      width: calc(100% - 4rem);
      margin-left: auto !important;
      padding-left: 2rem !important;
      text-align: left !important;
    }
    
    .elegant-theme .timeline-dot {
      left: 2rem !important;
    }
    
    .elegant-theme .timeline-item::before {
      left: 2rem !important;
      right: auto !important;
      width: 2rem !important;
      background: linear-gradient(to right, transparent, var(--elegant-accent)) !important;
    }
    
    .elegant-theme .timeline-date {
      top: -1.5rem;
      right: auto !important;
      left: 0 !important;
    }
  }

  /* Enhanced 3D elements */
  .elegant-theme .element-3d {
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  .elegant-theme .element-3d:hover {
    transform: perspective(1000px) rotateX(2deg) rotateY(2deg) scale(1.02);
  }
  
  /* Add enhanced shimmer effect to badges and cards */
  @keyframes shimmerAnimation {
    0% {
      background-position: -100% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  
  .elegant-theme .badge {
    position: relative;
    overflow: hidden;
  }
  
  .elegant-theme .badge:after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: rotate(30deg);
    animation: shimmerAnimation 4s infinite linear;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  .elegant-theme .badge:hover:after {
    opacity: 1;
  }
  
  /* Timeline enhancements */
  .elegant-theme .timeline-item {
    position: relative;
  }
  
  .elegant-theme .timeline-item:before {
    content: '';
    position: absolute;
    left: -31px;
    top: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom, var(--elegant-accent) 0%, transparent 100%);
    opacity: 0.3;
  }
  
  .elegant-theme .timeline-dot {
    position: absolute;
    left: -35px;
    top: 5px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--elegant-accent);
    box-shadow: 0 0 0 4px rgba(var(--elegant-accent-rgb), 0.1);
    transition: all 0.3s ease;
  }
  
  .elegant-theme .timeline-item:hover .timeline-dot {
    box-shadow: 0 0 0 6px rgba(var(--elegant-accent-rgb), 0.15), var(--elegant-glow);
    transform: scale(1.2);
  }

  /* Enhanced glass morphism effects */
  .elegant-theme .glass-panel {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: var(--elegant-backdrop-blur);
    -webkit-backdrop-filter: var(--elegant-backdrop-blur);
    border: 1px solid rgba(var(--elegant-accent-rgb), 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
  }
  
  .elegant-theme.dark .glass-panel {
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(var(--elegant-accent-rgb), 0.2);
  }
  
  /* Enhanced project cards */
  .elegant-theme .project-card {
    position: relative;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  .elegant-theme .project-card:hover {
    transform: translateY(-12px);
  }
  
  .elegant-theme .project-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 30%, rgba(0, 0, 0, 0.8) 100%);
    opacity: 0.8;
    transition: opacity 0.4s ease;
    z-index: 1;
  }
  
  .elegant-theme.dark .project-card::after {
    background: linear-gradient(to bottom, transparent 30%, rgba(0, 0, 0, 0.9) 100%);
  }
  
  .elegant-theme .project-card__content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 2rem;
    z-index: 2;
    transform: translateY(20px);
    opacity: 0.9;
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  .elegant-theme .project-card:hover .project-card__content {
    transform: translateY(0);
    opacity: 1;
  }
  
  .elegant-theme .project-card__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  .elegant-theme .project-card:hover .project-card__image {
    transform: scale(1.05);
  }
  
  /* Advanced animations */
  @keyframes elegant-float {
    0% {
      transform: translateY(0) translateX(0);
    }
    50% {
      transform: translateY(-10px) translateX(5px);
    }
    100% {
      transform: translateY(0) translateX(0);
    }
  }
  
  @keyframes elegant-pulse {
    0%, 100% {
      opacity: 0.8;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
  }
  
  @keyframes elegant-shimmer {
    0% {
      background-position: -200% center;
    }
    100% {
      background-position: 200% center;
    }
  }
  
  .elegant-theme .animate-elegant-float {
    animation: elegant-float 6s ease-in-out infinite;
  }
  
  .elegant-theme .animate-elegant-pulse {
    animation: elegant-pulse 4s ease-in-out infinite;
  }
  
  /* Stylized scrollbar */
  .elegant-theme::-webkit-scrollbar {
    width: 12px;
  }
  
  .elegant-theme::-webkit-scrollbar-track {
    background: var(--elegant-bg);
  }
  
  .elegant-theme::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, var(--elegant-gold), var(--elegant-gold-light));
    border-radius: 6px;
    border: 3px solid var(--elegant-bg);
  }
  
  .elegant-theme::-webkit-scrollbar-thumb:hover {
    background: var(--elegant-gold);
  }
  
  /* Enhanced links styling */
  .elegant-theme .elegant-link {
    position: relative;
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;
    padding-bottom: 2px;
  }
  
  .elegant-theme .elegant-link::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    left: 0;
    background: linear-gradient(to right, var(--elegant-accent), var(--elegant-accent-light));
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
  }
  
  .elegant-theme .elegant-link:hover {
    color: var(--elegant-accent-light);
  }
  
  .elegant-theme .elegant-link:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
  
  /* Loading state animation */
  @keyframes elegant-loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  .elegant-theme .elegant-loading {
    width: 2rem;
    height: 2rem;
    border: 2px solid rgba(var(--elegant-accent-rgb), 0.3);
    border-radius: 50%;
    border-top-color: var(--elegant-gold);
    animation: elegant-loading 1s ease-in-out infinite;
  }
  
  /* Enhanced skill badges with hover effects */
  .elegant-theme .skill-badge {
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  .elegant-theme .skill-badge:hover {
    transform: translateY(-5px);
    box-shadow: var(--elegant-shadow-intense);
  }
  
  .elegant-theme .skill-badge::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    z-index: -1;
    background: linear-gradient(215deg, var(--elegant-gold), var(--elegant-gold-light), var(--elegant-gold));
    background-size: 200% 200%;
    animation: elegant-shimmer 6s linear infinite;
    opacity: 0;
    transition: opacity 0.4s ease;
    border-radius: inherit;
  }
  
  .elegant-theme .skill-badge:hover::before {
    opacity: 1;
  }
  
  /* Stylized tooltip effect */
  .elegant-theme .elegant-tooltip {
    position: relative;
    cursor: pointer;
  }
  
  .elegant-theme .elegant-tooltip::before {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    padding: 0.5rem 1rem;
    background: var(--elegant-bg);
    color: var(--elegant-accent);
    font-size: 0.8rem;
    border-radius: 4px;
    pointer-events: none;
    opacity: 0;
    white-space: nowrap;
    transition: all 0.3s ease;
    border: 1px solid var(--elegant-border);
    box-shadow: var(--elegant-shadow);
    z-index: 10;
  }
  
  .elegant-theme .elegant-tooltip::after {
    content: '';
    position: absolute;
    bottom: calc(100% - 5px);
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    border-width: 5px;
    border-style: solid;
    border-color: var(--elegant-border) transparent transparent transparent;
    pointer-events: none;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 10;
  }
  
  .elegant-theme .elegant-tooltip:hover::before,
  .elegant-theme .elegant-tooltip:hover::after {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  
  /* Image overlay effects */
  .elegant-theme .image-frame {
    position: relative;
    overflow: hidden;
    border: 1px solid var(--elegant-border);
    padding: 3px;
    background: var(--elegant-bg);
  }
  
  .elegant-theme .image-frame::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, var(--elegant-gold), transparent 70%);
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: 1;
    pointer-events: none;
  }
  
  .elegant-theme .image-frame:hover::before {
    opacity: 0.2;
  }
  
  .elegant-theme .image-frame img {
    transition: transform 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  .elegant-theme .image-frame:hover img {
    transform: scale(1.05);
  }
  
  /* Advanced text effects */
  .elegant-theme .elegant-title {
    position: relative;
    display: inline-block;
  }
  
  .elegant-theme .elegant-title::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40px;
    height: 2px;
    background: var(--elegant-gradient);
    transition: width 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  .elegant-theme .elegant-title:hover::after {
    width: 100%;
  }
  
  /* Enhanced form elements styling */
  .elegant-theme .elegant-input {
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--elegant-border);
    color: var(--elegant-text-primary);
    padding: 0.75rem 0;
    transition: all 0.3s ease;
    width: 100%;
  }
  
  .elegant-theme .elegant-input:focus {
    outline: none;
    border-color: var(--elegant-accent);
    box-shadow: 0 1px 0 var(--elegant-accent);
  }
  
  .elegant-theme .elegant-input::placeholder {
    color: var(--elegant-text-secondary);
    opacity: 0.6;
  }

  /* Project link styles */
  .elegant-theme .elegant-link {
    position: relative;
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;
    padding-bottom: 2px;
  }
  
  .elegant-theme .elegant-link::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    left: 0;
    background: linear-gradient(to right, var(--elegant-accent), var(--elegant-accent-light));
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
  }
  
  .elegant-theme .elegant-link:hover {
    color: var(--elegant-accent-light);
  }
  
  .elegant-theme .elegant-link:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }

  /* Card shimmer effect */
  .elegant-theme .card-shimmer {
    position: relative;
    overflow: hidden;
  }
  
  .elegant-theme .card-shimmer::after {
    content: '';
    position: absolute;
    top: -100%;
    left: -100%;
    width: 70%;
    height: 70%;
    background: linear-gradient(
      135deg,
      transparent 0%,
      transparent 50%,
      rgba(var(--elegant-accent-rgb), 0.1) 50%,
      rgba(var(--elegant-accent-rgb), 0.2) 85%,
      transparent 100%
    );
    transform: rotate(45deg);
    transition: all 0.3s ease;
  }
  
  .elegant-theme .card-shimmer:hover::after {
    top: 120%;
    left: 120%;
  }
  
  /* Education card */
  .elegant-theme .education-card {
    position: relative;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: var(--elegant-bg-card);
    border: 1px solid rgba(var(--elegant-border-rgb), 0.1);
    transition: all 0.3s ease;
    overflow: hidden;
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.05);
    z-index: 1;
  }
  
  .elegant-theme .education-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 40%, rgba(var(--elegant-accent-rgb), 0.05) 100%);
    z-index: -1;
  }
  
  .elegant-theme .education-card::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 3rem 3rem 0;
    border-color: transparent rgba(var(--elegant-accent-rgb), 0.08) transparent transparent;
    z-index: -1;
  }

  .elegant-theme .menu-link.active::after,
  .elegant-theme .menu-link:hover::after {
    transform-origin: bottom left;
    transform: scaleX(1);
  }
  
  .elegant-theme .menu-link.active {
    color: var(--elegant-accent);
  }
  
  .elegant-theme .menu-link::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 1px;
    bottom: -4px;
    left: 0;
    background: linear-gradient(to right, var(--elegant-accent), var(--elegant-accent-light));
    transform-origin: bottom right;
    transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
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

    // Arka plan rengi
    const bgColor = themeOptions.colors[0];

    // İkincil arka plan rengi
    const bgSecondaryColor = themeOptions.colors[1] || adjustColor(bgColor, 2);

    // Kenarlık rengi
    const borderColor =
      themeOptions.colors[2] || adjustColor(bgSecondaryColor, -5);

    // Ana metin rengi
    const textColor = themeOptions.colors[3];

    // İkincil metin rengi
    const textSecondaryColor = adjustColor(textColor, 25);

    // Özelleştirilmiş renk paleti
    themeOptions.colorPalette = {
      primary: accentColor,
      secondary: accentLight,
      background: bgColor,
      text: textColor,
      accent: accentColor,
      muted: textSecondaryColor,
      border: borderColor,
      card: bgColor,
    };

    // CSS değişkenleri için özel stil eklemesi
    const customStyles = `
      .elegant-theme {
        --elegant-gold: ${accentColor};
        --elegant-gold-light: ${accentLight};
        --elegant-cream: ${bgSecondaryColor};
        --elegant-cream-dark: ${borderColor};
        --elegant-brown: ${textColor};
        --elegant-brown-light: ${textSecondaryColor};
        --elegant-bg: ${bgColor};
        --elegant-text-primary: ${textColor};
        --elegant-text-secondary: ${textSecondaryColor};
        --elegant-accent: ${accentColor};
        --elegant-accent-light: ${accentLight};
        --elegant-accent-rgb: ${accentRgb};
        --elegant-border: ${borderColor};
        --elegant-card-bg: ${bgColor};
        --elegant-section-bg: ${bgSecondaryColor};
        --elegant-gradient: linear-gradient(to right, ${accentColor}, ${accentLight});
        --elegant-overlay: ${bgSecondaryColor}cc;
        --elegant-shadow: 0 10px 30px rgba(${accentRgb}, 0.1);
        --elegant-glow: 0 0 15px rgba(${accentRgb}, 0.3);
        --elegant-border-rgb: ${hexToRgb(borderColor)};
      }
      
      .elegant-theme.dark {
        --elegant-bg: ${adjustColor(textColor, -80)};
        --elegant-text-primary: ${adjustColor(bgColor, -5)};
        --elegant-text-secondary: ${adjustColor(bgColor, -15)};
        --elegant-card-bg: ${adjustColor(textColor, -70)};
        --elegant-section-bg: ${adjustColor(textColor, -70)};
        --elegant-border: ${adjustColor(borderColor, -40)};
      }
    `;

    // Ana stile ekle
    baseElegantThemeStyles = customStyles + baseElegantThemeStyles;
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
        <section
          className="section relative h-screen flex items-center justify-center min-h-[700px] overflow-hidden"
          id="hero"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[var(--elegant-cream)] dark:bg-[var(--elegant-bg)] opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(var(--elegant-accent-rgb),0.05)]"></div>

            {/* Decorative particles */}
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-[var(--elegant-accent)] animate-elegant-float"
                initial={{ opacity: 0 }}
                animate={{ opacity: Math.random() * 0.2 }}
                transition={{ duration: 1, delay: i * 0.05 }}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.max(2, Math.random() * 8)}px`,
                  height: `${Math.max(2, Math.random() * 8)}px`,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}

            {/* Enhanced Decorative lines */}
            <div className="absolute top-0 left-0 w-[200px] h-[200px] pointer-events-none">
              <motion.div
                className="absolute top-0 left-0 w-[1px] h-[150px] bg-[var(--elegant-accent)] opacity-20"
                initial={{ height: 0 }}
                animate={{ height: 150 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <motion.div
                className="absolute top-0 left-0 w-[150px] h-[1px] bg-[var(--elegant-accent)] opacity-20"
                initial={{ width: 0 }}
                animate={{ width: 150 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>

            <div className="absolute bottom-0 right-0 w-[200px] h-[200px] pointer-events-none">
              <motion.div
                className="absolute bottom-0 right-0 w-[1px] h-[150px] bg-[var(--elegant-accent)] opacity-20"
                initial={{ height: 0 }}
                animate={{ height: 150 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-[150px] h-[1px] bg-[var(--elegant-accent)] opacity-20"
                initial={{ width: 0 }}
                animate={{ width: 150 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>

          <div className="container mx-auto px-4 z-10 relative">
            <div className="text-center parallax-container">
              {/* Elegant decorative element above name */}
              <motion.div
                className="mb-4 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-[120px] h-[2px] bg-gradient-to-r from-transparent via-[var(--elegant-accent)] to-transparent relative">
                  <motion.div
                    className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-[8px] h-[8px] bg-[var(--elegant-accent)] rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              {/* Name with parallax effect */}
              <div className="mb-6 parallax-layer parallax-top">
                <motion.h1
                  className="mb-4 text-[var(--elegant-text-primary)] dark:text-[var(--elegant-text-primary)] font-playfair relative inline-block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="relative z-10">
                    {portfolio.contents.hero_header
                      .split(" ")
                      .map((part, i, arr) => (
                        <span key={i} className="inline-block">
                          <span className="golden-text">{part}</span>
                          {i < arr.length - 1 && <span className="mx-2"></span>}
                        </span>
                      ))}
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--elegant-accent)] to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </motion.h1>

                <motion.div
                  className="relative element-3d"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <p className="text-[var(--elegant-text-secondary)] dark:text-[var(--elegant-text-secondary)] text-xl font-montserrat font-light tracking-wider">
                    {portfolio.contents.hero_description}
                  </p>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[50px] h-[1px] bg-[var(--elegant-accent)] opacity-30"></div>
                </motion.div>
              </div>

              {/* Animated description in glass panel */}
              <motion.div
                className="max-w-xl mx-auto mb-10 parallax-layer parallax-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="glass-panel rounded-xl p-6">
                  <p className="text-[var(--elegant-text-secondary)] dark:text-[var(--elegant-text-secondary)] font-montserrat leading-relaxed">
                    {portfolio.contents.about_text?.substring(0, 150)}
                    {portfolio.contents.about_text &&
                      portfolio.contents.about_text.length > 150 &&
                      "..."}
                  </p>
                </div>
              </motion.div>

              {/* Social buttons with enhanced hover */}
              <motion.div
                className="flex justify-center gap-4 mt-8 relative parallax-layer parallax-shallow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {socials.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-icon premium-hover overflow-hidden relative element-3d group"
                    aria-label={item.platform}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--elegant-accent)] to-[var(--elegant-accent-light)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 transition-colors duration-500 group-hover:text-white">
                      {getPlatformIcon(item.platform)}
                    </div>
                    <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--elegant-accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </motion.a>
                ))}
              </motion.div>

              {/* Animated scroll indicator */}
              <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <span className="text-[var(--elegant-text-secondary)] dark:text-[var(--elegant-text-secondary)] text-sm font-montserrat tracking-widest mb-2">
                  SCROLL
                </span>
                <div className="w-[1px] h-[40px] bg-gradient-to-b from-[var(--elegant-accent)] to-transparent relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[5px] h-[5px] bg-[var(--elegant-accent)] rounded-full animate-pulse"></div>
                  <motion.div
                    className="absolute w-[5px] h-[5px] bg-[var(--elegant-accent)] rounded-full left-1/2 -translate-x-1/2"
                    animate={{
                      y: [0, 40],
                      opacity: [1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section with Elegant Design */}
        {portfolio.contents.about_text && (
          <section className="alt-section section" id="about">
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
          <section className="alt-section section" id="skills">
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
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="glass-panel rounded-xl p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {skills.map((skill) => {
                      const SkillIcon = getSkillIcon(skill.name);
                      const skillColor = getSkillColor(skill.name);

                      return (
                        <motion.div
                          key={skill.id}
                          className="skill-badge aspect-square rounded-lg p-4 flex flex-col items-center justify-center border border-[rgba(var(--elegant-accent-rgb),0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-sm animate-elegant-float"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                          style={{
                            animationDelay: `${Math.random() * 2}s`,
                            boxShadow: `0 4px 20px rgba(var(--elegant-accent-rgb), 0.05)`,
                          }}
                          whileHover={{
                            y: -5,
                            transition: { duration: 0.2 },
                          }}
                        >
                          <div className="mb-3 text-3xl text-[var(--elegant-accent)]">
                            <SkillIcon />
                          </div>
                          <span className="text-center font-medium text-sm">
                            {skill.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Education Section with Elegant Cards */}
        {educations && educations.length > 0 && (
          <section className="alt-section section" id="education">
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
                {educations.map((education: Education, index) => (
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
                          {format(new Date(education.start_date), "MMM yyyy")} -{" "}
                          {education.end_date &&
                          education.end_date !== "Present"
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

        {/* Experience Section with Elegant Timeline */}
        {experiences && experiences.length > 0 && (
          <section className="alt-section section" id="experience">
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
                <div className="timeline-line"></div>
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
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <div className="timeline-date">
                          <CalendarIcon className="mr-1 size-3 inline" />
                          {format(
                            new Date(experience.start_date),
                            "MMM yyyy"
                          )}{" "}
                          -{" "}
                          {experience.end_date &&
                          experience.end_date !== "Present"
                            ? format(new Date(experience.end_date), "MMM yyyy")
                            : "Present"}
                        </div>
                        <div className="card decorative-corners">
                          <div className="corner-top-right"></div>
                          <div className="corner-bottom-left"></div>
                          <div className="shimmer-effect absolute inset-0"></div>

                          <h3 className="text-xl font-semibold gold-text">
                            {experience.role}
                          </h3>
                          <div
                            className={`mt-3 flex items-center gap-3 justify-end`}
                          >
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
                      </div>
                    </motion.div>
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
        {projects.length > 0 && (
          <section className="alt-section section" id="projects">
            <div className="container mx-auto px-4">
              <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="section-title golden-text text-3xl font-bold">
                  Projects
                </h2>
                <p>Showcase of my work and achievements</p>
              </motion.div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="project-card h-[400px] relative overflow-hidden rounded-md"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Project Image */}
                    <div className="absolute inset-0 w-full h-full">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          className="project-card__image"
                          layout="fill"
                          objectFit="cover"
                          priority={false}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[var(--elegant-cream)] to-[var(--elegant-accent)] flex items-center justify-center">
                          <span className="text-4xl text-white font-bold">
                            {project.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Overlay */}
                    <div className="project-card__content">
                      <h3 className="text-xl font-bold text-white mb-2 elegant-title">
                        {project.title}
                      </h3>
                      <p className="text-[var(--elegant-text-primary)] mb-4 line-clamp-2 opacity-90">
                        {project.description}
                      </p>
                      <div className="flex space-x-3">
                        {project.repo_url && (
                          <a
                            href={project.repo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="elegant-link flex items-center text-sm"
                          >
                            <FaGithub className="mr-1 text-lg" /> Code
                          </a>
                        )}
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="elegant-link flex items-center text-sm"
                          >
                            <ExternalLinkIcon className="mr-1 w-4 h-4" /> Live
                            Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
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
