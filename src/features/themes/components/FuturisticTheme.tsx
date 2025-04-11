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

let baseFuturisticThemeStyles = `
  .futuristic-theme {
    /* Temel Renk Değişkenleri - Kullanıcı Özelleştirmelerine Göre Ayarlanacak */
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
    --futuristic-card-glow: 0 0 20px rgba(var(--futuristic-accent-rgb), 0.2);
    --futuristic-section-bg: rgba(17, 19, 43, 0.7);
    --futuristic-neon-glow: 0 0 10px rgba(var(--futuristic-accent-rgb), 0.5), 0 0 20px rgba(var(--futuristic-accent-rgb), 0.2);
    --futuristic-neon-text-shadow: 0 0 5px rgba(var(--futuristic-accent-rgb), 0.7);
    --futuristic-grid-color: rgba(var(--futuristic-accent-rgb), 0.1);
    --futuristic-gradient: linear-gradient(135deg, var(--futuristic-accent), var(--futuristic-accent-secondary));
    
    color: var(--futuristic-text-primary);
    background-color: var(--futuristic-bg);
    font-family: 'Space Grotesk', system-ui, sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  .futuristic-theme.dark {
    /* Dark Teması Değerleri - Yine Kullanıcı Özelleştirmelerine Göre Değişecek */
    --futuristic-bg: #0a0b18;
    --futuristic-bg-secondary: #11132b;
    --futuristic-text-primary: #ffffff;
    --futuristic-text-secondary: #c3c4d8;
    --futuristic-card-bg: rgba(20, 21, 46, 0.7);
    --futuristic-section-bg: rgba(17, 19, 43, 0.7);
  }
  
  .futuristic-theme.light {
    /* Light Teması Değerleri - Yine Kullanıcı Özelleştirmelerine Göre Değişecek */
    --futuristic-bg: #f0f2ff;
    --futuristic-bg-secondary: #e0e4ff;
    --futuristic-text-primary: #11142b;
    --futuristic-text-secondary: #414366;
    --futuristic-card-bg: rgba(240, 242, 255, 0.7);
    --futuristic-section-bg: rgba(224, 228, 255, 0.7);
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
    animation: gridPulse 10s ease-in-out infinite alternate;
  }
  
  @keyframes gridPulse {
    0% {
      background-size: 30px 30px;
      opacity: 0.5;
    }
    50% {
      background-size: 35px 35px;
      opacity: 0.3;
    }
    100% {
      background-size: 30px 30px;
      opacity: 0.5;
    }
  }
  
  /* Floating particles */
  .particle {
    position: absolute;
    width: 6px;
    height: 6px;
    background: var(--futuristic-accent);
    border-radius: 50%;
    z-index: 0;
    opacity: 0.4;
    filter: blur(3px);
    pointer-events: none;
    box-shadow: 0 0 6px var(--futuristic-accent);
  }
  
  .particle-1 {
    top: 15%;
    left: 10%;
    animation: float 20s ease-in-out infinite alternate;
  }
  
  .particle-2 {
    top: 45%;
    right: 15%;
    animation: float 25s ease-in-out infinite alternate-reverse;
  }
  
  .particle-3 {
    bottom: 20%;
    left: 20%;
    animation: float 18s ease-in-out infinite alternate;
  }
  
  .particle-4 {
    top: 35%;
    left: 50%;
    animation: float 15s ease-in-out infinite alternate-reverse;
  }
  
  .particle-5 {
    bottom: 30%;
    right: 25%;
    animation: float 22s ease-in-out infinite alternate;
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
    overflow: hidden;
    border: 1px solid rgba(var(--futuristic-accent-rgb), 0.1);
    z-index: 1;
    transform-style: preserve-3d;
    perspective: 1000px;
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
    transform: translateY(-10px) scale(1.02) rotateX(3deg) rotateY(3deg);
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
    transform-style: preserve-3d;
    perspective: 1000px;
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
    transform-style: preserve-3d;
    perspective: 500px;
  }
  
  .futuristic-theme .skill-badge:hover {
    transform: translateY(-5px) scale(1.05) rotateX(10deg);
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
  
  .futuristic-theme .hero-gradient-text {
    background: var(--futuristic-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    position: relative;
    display: inline-block;
    text-shadow: var(--futuristic-neon-text-shadow);
    animation: glowPulse 2s infinite alternate;
  }
  
  @keyframes glowPulse {
    0% {
      text-shadow: 0 0 10px rgba(var(--futuristic-accent-rgb), 0.5), 0 0 20px rgba(var(--futuristic-accent-rgb), 0.2);
    }
    100% {
      text-shadow: 0 0 15px rgba(var(--futuristic-accent-rgb), 0.7), 0 0 30px rgba(var(--futuristic-accent-rgb), 0.4);
    }
  }
  
  .futuristic-theme .project-card {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    background: var(--futuristic-card-bg);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(var(--futuristic-accent-rgb), 0.1);
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    transform-style: preserve-3d;
    perspective: 1000px;
  }
  
  .futuristic-theme .project-card:hover {
    transform: translateY(-10px) scale(1.02) rotateY(5deg);
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

  /* Hologram Effect */
  .hologram {
    position: relative;
    overflow: hidden;
  }

  .hologram::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to bottom right,
      transparent,
      rgba(var(--futuristic-accent-rgb), 0.2),
      transparent,
      transparent
    );
    transform: rotate(30deg);
    animation: hologramScan 4s linear infinite;
    pointer-events: none;
    z-index: 1;
  }

  @keyframes hologramScan {
    0% {
      transform: rotate(30deg) translateY(-100%);
    }
    100% {
      transform: rotate(30deg) translateY(100%);
    }
  }

  /* Timeline Design */
  .futuristic-theme .timeline-container {
    position: relative;
    margin: 2rem auto;
    max-width: 1000px;
  }

  .futuristic-theme .timeline-track {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background: linear-gradient(to bottom, 
      rgba(var(--futuristic-accent-rgb), 0), 
      rgba(var(--futuristic-accent-rgb), 0.8),
      rgba(var(--futuristic-accent-rgb), 0));
    transform: translateX(-50%);
    z-index: 1;
  }

  .futuristic-theme .timeline-track::before,
  .futuristic-theme .timeline-track::after {
    content: '';
    position: absolute;
    left: 50%;
    width: 20px;
    height: 20px;
    background: rgba(var(--futuristic-accent-rgb), 0.3);
    border-radius: 50%;
    transform: translateX(-50%);
    backdrop-filter: blur(5px);
    animation: pulse 2s infinite alternate;
  }

  .futuristic-theme .timeline-track::before {
    top: 0;
  }

  .futuristic-theme .timeline-track::after {
    bottom: 0;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 10px rgba(var(--futuristic-accent-rgb), 0.5), 
                  0 0 20px rgba(var(--futuristic-accent-rgb), 0.3);
      transform: translateX(-50%) scale(1);
    }
    100% {
      box-shadow: 0 0 15px rgba(var(--futuristic-accent-rgb), 0.7), 
                  0 0 30px rgba(var(--futuristic-accent-rgb), 0.5);
      transform: translateX(-50%) scale(1.2);
    }
  }

  .futuristic-theme .timeline-item {
    position: relative;
    margin-bottom: 3rem;
    width: 100%;
    display: flex;
    z-index: 2;
  }

  .futuristic-theme .timeline-item:nth-child(odd) {
    justify-content: flex-start;
  }

  .futuristic-theme .timeline-item:nth-child(even) {
    justify-content: flex-end;
  }

  .futuristic-theme .timeline-item:nth-child(odd) .timeline-content {
    margin-right: 2rem;
    transform-origin: right center;
  }

  .futuristic-theme .timeline-item:nth-child(even) .timeline-content {
    margin-left: 2rem;
    transform-origin: left center;
  }

  .futuristic-theme .timeline-dot {
    position: absolute;
    top: 2rem;
    left: 50%;
    width: 16px;
    height: 16px;
    background: var(--futuristic-accent);
    border-radius: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 15px rgba(var(--futuristic-accent-rgb), 0.8);
    z-index: 3;
  }

  .futuristic-theme .timeline-dot::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 20px;
    height: 2px;
    background: linear-gradient(
      to var(--direction, right), 
      var(--futuristic-accent), 
      rgba(var(--futuristic-accent-rgb), 0)
    );
    z-index: 2;
  }

  .futuristic-theme .timeline-item:nth-child(odd) .timeline-dot::before {
    --direction: left;
    right: 15px;
    transform: translateY(-50%);
  }

  .futuristic-theme .timeline-item:nth-child(even) .timeline-dot::before {
    --direction: right;
    left: 15px;
    transform: translateY(-50%);
  }

  .futuristic-theme .timeline-content {
    width: calc(50% - 3rem);
    position: relative;
    transition: all 0.4s cubic-bezier(0.2, 0.85, 0.4, 1.275);
  }

  .futuristic-theme .timeline-content:hover {
    transform: scale(1.03);
  }

  .futuristic-theme .timeline-date {
    font-family: "Space Mono", monospace;
    font-size: 0.8rem;
    letter-spacing: 1px;
    display: inline-block;
    padding: 0.4rem 1rem;
    background: rgba(var(--futuristic-accent-rgb), 0.1);
    border-radius: 20px;
    color: var(--futuristic-accent);
    margin-bottom: 0.5rem;
    border: 1px solid rgba(var(--futuristic-accent-rgb), 0.3);
    box-shadow: 0 0 10px rgba(var(--futuristic-accent-rgb), 0.2);
    backdrop-filter: blur(5px);
  }

  @media (max-width: 768px) {
    .futuristic-theme .timeline-track {
      left: 30px;
    }
    
    .futuristic-theme .timeline-item,
    .futuristic-theme .timeline-item:nth-child(odd),
    .futuristic-theme .timeline-item:nth-child(even) {
      justify-content: flex-end;
    }
    
    .futuristic-theme .timeline-dot {
      left: 30px;
    }
    
    .futuristic-theme .timeline-content,
    .futuristic-theme .timeline-item:nth-child(odd) .timeline-content,
    .futuristic-theme .timeline-item:nth-child(even) .timeline-content {
      width: calc(100% - 80px);
      margin-left: 50px;
      margin-right: 0;
      transform-origin: left center;
    }
    
    .futuristic-theme .timeline-item:nth-child(odd) .timeline-dot::before,
    .futuristic-theme .timeline-item:nth-child(even) .timeline-dot::before {
      --direction: right;
      left: 15px;
      right: auto;
    }
  }

  /* Futuristic Skills Grid */
  .futuristic-theme .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 1.5rem;
    max-width: 900px;
    margin: 0 auto;
    perspective: 1000px;
  }

  .futuristic-theme .skill-card {
    position: relative;
    height: 130px;
    background: rgba(var(--futuristic-bg-secondary-rgb), 0.4);
    backdrop-filter: blur(10px);
    border-radius: 1rem;
    border: 1px solid rgba(var(--futuristic-accent-rgb), 0.1);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform-style: preserve-3d;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    text-align: center;
  }

  .futuristic-theme .skill-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, 
      rgba(var(--futuristic-accent-rgb), 0), 
      rgba(var(--futuristic-accent-rgb), 0.05));
    z-index: 0;
  }

  .futuristic-theme .skill-card::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      transparent, 
      rgba(var(--futuristic-accent-rgb), 0.1), 
      transparent
    );
    animation: rotate 10s linear infinite;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .futuristic-theme .skill-card:hover::after {
    opacity: 1;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .futuristic-theme .skill-card:hover {
    transform: translateY(-15px) rotateX(10deg) rotateY(10deg);
    box-shadow: 0 20px 40px rgba(var(--futuristic-accent-rgb), 0.2);
    border-color: rgba(var(--futuristic-accent-rgb), 0.5);
  }

  .futuristic-theme .skill-icon {
    position: relative;
    z-index: 2;
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
    transition: all 0.4s ease;
  }

  .futuristic-theme .skill-card:hover .skill-icon {
    transform: scale(1.2);
    filter: drop-shadow(0 0 10px rgba(var(--futuristic-accent-rgb), 0.7));
  }

  .futuristic-theme .skill-name {
    position: relative;
    z-index: 2;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.4s ease;
  }

  .futuristic-theme .skill-glow {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    background: var(--futuristic-accent);
    filter: blur(20px);
    opacity: 0.3;
    border-radius: 50%;
    transition: all 0.4s ease;
  }

  .futuristic-theme .skill-card:hover .skill-glow {
    opacity: 0.7;
    width: 50px;
    height: 50px;
    filter: blur(25px);
  }

  @media (max-width: 768px) {
    .futuristic-theme .skills-grid {
      grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      gap: 1rem;
    }
    
    .futuristic-theme .skill-card {
      height: 110px;
      padding: 1rem;
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

  // Renk RGB değerlerini hesaplama fonksiyonu
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

  // Tema konfigürasyonu
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
    // Ana renk ve RGB değerini hesaplama
    const accentColor = themeOptions.colors[4];
    const accentRgb = hexToRgb(accentColor);

    // İkincil rengi hesaplama - kullanıcının seçimine göre ayarlama
    // Ana renkten %20 daha koyu bir ton oluşturuyoruz
    const accentSecondaryColor = adjustColor(accentColor, -20);
    const accentSecondaryRgb = hexToRgb(accentSecondaryColor);

    // Metin rengini arka plan rengine göre kontrastlı olacak şekilde ayarlama
    // const contrastText = isLightColor(themeOptions.colors[0]) ? "#11142b" : "#ffffff";
    // const contrastTextSecondary = isLightColor(themeOptions.colors[0]) ? "#414366" : "#c3c4d8";

    // Özelleştirilmiş renk paleti
    themeOptions.colorPalette = {
      primary: accentColor,
      secondary: accentSecondaryColor,
      background: themeOptions.colors[0],
      text: themeOptions.colors[3],
      accent: accentColor,
      muted: themeOptions.colors[3] + "99", // Ana metin %60 opaklık
      border: themeOptions.colors[2],
      card: `rgba(${hexToRgb(themeOptions.colors[1])}, 0.7)`,
    };

    // CSS değişkenleri için özel stil eklemesi - tüm renkleri kullanıcının seçtiği renklerle değiştir
    const customStyles = `
      .futuristic-theme {
        --futuristic-accent-rgb: ${accentRgb};
        --futuristic-accent-secondary-rgb: ${accentSecondaryRgb};
        --futuristic-bg: ${themeOptions.colors[0]};
        --futuristic-bg-secondary: ${themeOptions.colors[1]};
        --futuristic-text-primary: ${themeOptions.colors[3]};
        --futuristic-text-secondary: ${themeOptions.colors[3] + "99"};
        --futuristic-accent: ${accentColor};
        --futuristic-accent-secondary: ${accentSecondaryColor};
        --futuristic-border: ${themeOptions.colors[2]};
        --futuristic-card-bg: rgba(${hexToRgb(themeOptions.colors[1])}, 0.7);
        --futuristic-card-glow: 0 0 20px rgba(${accentRgb}, 0.2);
        --futuristic-section-bg: rgba(${hexToRgb(themeOptions.colors[1])}, 0.7);
        --futuristic-neon-glow: 0 0 10px rgba(${accentRgb}, 0.5), 0 0 20px rgba(${accentRgb}, 0.2);
        --futuristic-neon-text-shadow: 0 0 5px rgba(${accentRgb}, 0.7);
        --futuristic-grid-color: rgba(${accentRgb}, 0.1);
        --futuristic-gradient: linear-gradient(135deg, ${accentColor}, ${accentSecondaryColor});
      }
    `;

    // Stili base stile ekle
    baseFuturisticThemeStyles = baseFuturisticThemeStyles + customStyles;
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

  // Font variables and theme styles combined
  const combinedStyles = `
    ${futuristicThemeStyles}
    
    ${
      themeOptions.font
        ? `
      :root {
        --font-family: ${
          fontFamilies[themeOptions.font as keyof typeof fontFamilies] ||
          `${themeOptions.font.charAt(0).toUpperCase() + themeOptions.font.slice(1)}, system-ui, sans-serif`
        } !important;
      }
      
      .futuristic-theme, .futuristic-theme * {
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

      <div className={themeClass}>
        {/* Floating Particles */}
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>

        {/* Hero Section */}
        <section className="section py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center"
            >
              <motion.h1
                className="hero-text mb-6 text-5xl font-bold leading-tight"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                }}
              >
                {portfolio.contents.hero_header}
              </motion.h1>

              <motion.p
                className="max-w-2xl text-xl leading-relaxed text-[var(--futuristic-text-secondary)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {portfolio.contents.hero_description}
              </motion.p>

              <motion.div
                className="mt-10 flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {socials.map((social, index) => (
                  <motion.div
                    key={social.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  >
                    <Link
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button type="button" className="btn btn-icon hologram">
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
              <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="section-title text-3xl font-bold">About Me</h2>
                <p>Get to know me better</p>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[var(--futuristic-text-secondary)] hologram">
                  {portfolio.contents.about_text}
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {/* Skills Section with 3D Grid */}
        {skills && skills.length > 0 && (
          <section className="alt-section section">
            <div className="container mx-auto px-4">
              <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="section-title text-3xl font-bold">
                  <span className="hero-gradient-text" data-text="Skills">
                    Skills
                  </span>
                </h2>
                <p className="max-w-xl mx-auto text-[var(--futuristic-text-secondary)]">
                  Technologies and tools I've mastered
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                {skills && skills.length > 0 ? (
                  <motion.div
                    className="skills-grid mt-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {skills.map((skill: Skill, index) => {
                      const SkillIcon = getSkillIcon(skill.name);
                      const skillColor = getSkillColor(skill.name);

                      return (
                        <motion.div
                          key={skill.id}
                          variants={itemVariants}
                          className="skill-card"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.05,
                            type: "spring",
                            stiffness: 100,
                          }}
                          style={{
                            borderColor: `${skillColor}30`,
                          }}
                          whileHover={{
                            boxShadow: `0 20px 40px ${skillColor}20`,
                          }}
                        >
                          <div
                            className="skill-icon"
                            style={{ color: skillColor }}
                          >
                            <SkillIcon size={36} />
                          </div>
                          <div className="skill-name">{skill.name}</div>
                          <div
                            className="skill-glow"
                            style={{ background: skillColor }}
                          ></div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                ) : (
                  <p className="text-center text-[var(--futuristic-text-secondary)]">
                    No skills information yet.
                  </p>
                )}
              </motion.div>
            </div>
          </section>
        )}

        {/* Education Section with Timeline */}
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
                <h2 className="section-title text-3xl font-bold">Education</h2>
                <p>My academic background and qualifications</p>
              </motion.div>
              <div className="mx-auto max-w-3xl grid grid-cols-1 gap-6">
                {educations && educations.length > 0 ? (
                  educations.map((education: Education, index) => (
                    <motion.div
                      key={education.id}
                      className="card"
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="timeline-container">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold">
                              {education.degree} in {education.field}
                            </h3>
                            <p className="text-[var(--futuristic-text-secondary)] mt-1">
                              {education.school}
                            </p>
                          </div>
                          <div className="education-date hologram">
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
          <section className="section py-20">
            <motion.div
              className="container mx-auto px-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="section-header text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title text-3xl font-bold">
                  <span className="hero-gradient-text" data-text="Experience">
                    Experience
                  </span>
                </h2>
                <p className="max-w-xl mx-auto text-[var(--futuristic-text-secondary)]">
                  My professional journey through time and space
                </p>
              </motion.div>

              {experiences && experiences.length > 0 ? (
                <div className="timeline-container relative">
                  <div className="timeline-track"></div>

                  {experiences.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      className="timeline-item"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 100,
                      }}
                    >
                      <div className="timeline-dot"></div>
                      <motion.div
                        className="timeline-content card"
                        whileHover={{
                          boxShadow:
                            "0 20px 40px rgba(var(--futuristic-accent-rgb), 0.2)",
                          y: -5,
                        }}
                      >
                        <span className="timeline-date">
                          <CalendarIcon className="inline mr-1 size-3" />
                          {format(exp.start_date, "MMM yyyy")} -{" "}
                          {exp.end_date
                            ? format(exp.end_date, "MMM yyyy")
                            : "Present"}
                        </span>
                        <h3 className="text-xl font-semibold">{exp.role}</h3>
                        <div className="mt-2 flex items-center gap-3">
                          {exp.logo && (
                            <div className="overflow-hidden rounded-lg border border-[var(--futuristic-border)] hologram">
                              <Image
                                src={exp.logo}
                                alt={exp.company}
                                width={40}
                                height={40}
                                className="object-cover"
                              />
                            </div>
                          )}
                          <p className="font-medium text-[var(--futuristic-accent)]">
                            {exp.company}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-[var(--futuristic-text-secondary)]">
                          {exp.employment_type}
                        </p>
                        <p className="mt-4 text-[var(--futuristic-text-secondary)]">
                          {exp.description}
                        </p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-[var(--futuristic-text-secondary)]">
                  No experience information yet.
                </p>
              )}
            </motion.div>
          </section>
        )}

        {/* Projects Section with 3D Hover Cards */}
        {projects && projects.length > 0 && (
          <section className="alt-section section">
            <div className="container mx-auto px-4">
              <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="section-title text-3xl font-bold">Projects</h2>
                <p>Showcasing my work and creative solutions</p>
              </motion.div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
                {projects && projects.length > 0 ? (
                  projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="project-card"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <div className="card flex h-full flex-col">
                        <div className="relative mb-5 aspect-video overflow-hidden rounded-lg">
                          {project.image ? (
                            <Image
                              src={project.image}
                              alt={project.title}
                              className="project-image object-cover hologram"
                              fill
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-[var(--futuristic-accent)] to-[var(--futuristic-accent-secondary)] hologram">
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
                    </motion.div>
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

        {/* Footer with Glowing Effect */}
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
