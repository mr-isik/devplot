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
  adjustColor,
  applyThemeCustomization,
  colorThemes,
  fontFamilies,
} from "../utils/themeCustomization";
import { FaGithub } from "react-icons/fa";

let baseDynamicThemeStyles = `
  .dynamic-theme {
    /* Temel Renk Değişkenleri - Kullanıcı Özelleştirmelerine Göre Ayarlanacak */
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
    --dynamic-glow: 0 0 15px rgba(var(--dynamic-accent-rgb), 0.3);
    --dynamic-gradient-1: linear-gradient(135deg, var(--dynamic-primary), var(--dynamic-secondary));
    --dynamic-gradient-2: linear-gradient(135deg, var(--dynamic-secondary), var(--dynamic-accent));
    --dynamic-gradient-anim: linear-gradient(90deg, var(--dynamic-primary), var(--dynamic-accent), var(--dynamic-secondary), var(--dynamic-primary));
    --dynamic-button-glow: 0 0 20px rgba(var(--dynamic-accent-rgb), 0.5);
    
    color: var(--dynamic-text-primary);
    background-color: var(--dynamic-bg);
    font-family: 'Outfit', sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  .dynamic-theme.dark {
    /* Dark Tema Değerleri - Kullanıcı Ayarlarına Göre Değişecek */
    --dynamic-bg: #17172b;
    --dynamic-bg-secondary: #222246;
    --dynamic-bg-card: rgba(38, 38, 77, 0.7);
    --dynamic-text-primary: #ffffff;
    --dynamic-text-secondary: #b0b0cc;
  }
  
  .dynamic-theme.light {
    /* Light Tema Değerleri - Kullanıcı Ayarlarına Göre Değişecek */
    --dynamic-bg: #f8faff;
    --dynamic-bg-secondary: #eef2ff;
    --dynamic-bg-card: rgba(255, 255, 255, 0.7);
    --dynamic-text-primary: #17172b;
    --dynamic-text-secondary: #5c5c7b;
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
  
  .dynamic-theme .card::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: radial-gradient(circle at 50% 50%, rgba(var(--dynamic-accent-rgb), 0.1), transparent 70%);
    opacity: 0;
    transition: opacity 0.6s ease;
  }
  
  .dynamic-theme .card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, transparent, rgba(var(--dynamic-accent-rgb), 0.1), transparent);
    opacity: 0;
    z-index: 1;
    transform: translateX(-100%);
    transition: transform 0.6s ease;
    pointer-events: none;
  }
  
  .dynamic-theme .card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: var(--dynamic-shadow), var(--dynamic-glow);
    border-color: var(--dynamic-accent);
  }
  
  .dynamic-theme .card:hover::before {
    opacity: 1;
  }
  
  .dynamic-theme .card:hover::after {
    transform: translateX(100%);
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
    position: relative;
    overflow: hidden;
  }
  
  .dynamic-theme .skill-badge::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  .dynamic-theme .skill-badge:hover {
    transform: translateY(-7px) scale(1.05);
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(var(--dynamic-accent-rgb), 0.3);
    border: 1px solid rgba(var(--dynamic-accent-rgb), 0.3);
  }
  
  .dynamic-theme .skill-badge:hover::after {
    transform: translateX(100%);
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
    transition: transform 0.3s ease;
  }
  
  .dynamic-theme .animated-gradient-text:hover {
    transform: scale(1.03);
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

  /* Animated Background Lines */
  .dynamic-theme::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      repeating-linear-gradient(
        transparent, 
        transparent 20px, 
        rgba(var(--dynamic-accent-rgb), 0.03) 20px, 
        rgba(var(--dynamic-accent-rgb), 0.03) 21px
      ),
      repeating-linear-gradient(
        90deg,
        transparent, 
        transparent 20px, 
        rgba(var(--dynamic-accent-rgb), 0.03) 20px, 
        rgba(var(--dynamic-accent-rgb), 0.03) 21px
      );
    z-index: -1;
    animation: movingBackgroundLines 30s linear infinite;
  }
  
  @keyframes movingBackgroundLines {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(1deg) scale(1.05);
    }
    100% {
      transform: rotate(0deg) scale(1);
    }
  }
  
  /* Energy Orb */
  .dynamic-theme::after {
    content: '';
    position: fixed;
    top: 50px;
    right: -40px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(
      circle, 
      rgba(var(--dynamic-secondary-rgb), 0.15) 0%, 
      rgba(var(--dynamic-primary-rgb), 0.05) 50%, 
      transparent 70%
    );
    filter: blur(40px);
    z-index: -1;
    animation: orb 20s ease-in-out infinite alternate;
  }
  
  @keyframes orb {
    0% {
      transform: translateY(0) scale(1);
      opacity: 0.4;
    }
    100% {
      transform: translateY(200px) scale(1.5);
      opacity: 0.2;
    }
  }
  
  .dynamic-theme .glow-text {
    background: var(--dynamic-gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    position: relative;
  }
  
  .dynamic-theme .glow-text::after {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    opacity: 0.4;
    filter: blur(12px);
    background: var(--dynamic-gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  /* 3D Card Effect */
  .dynamic-theme .three-d-card {
    transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform-style: preserve-3d;
    perspective: 1000px;
  }
  
  .dynamic-theme .three-d-card:hover {
    transform: rotateY(5deg) rotateX(5deg) scale(1.02);
  }
  
  .dynamic-theme .three-d-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent 20%,
      rgba(var(--dynamic-primary-rgb), 0.1) 40%,
      rgba(var(--dynamic-secondary-rgb), 0.1) 60%,
      transparent 80%
    );
    z-index: 2;
    opacity: 0;
    transition: opacity 0.6s ease;
    pointer-events: none;
  }

  .dynamic-theme .three-d-card:hover::before {
    opacity: 1;
  }

  /* Dynamic Timeline with 3D Effect */
  .dynamic-theme .timeline-wrapper {
    position: relative;
    padding: 3rem 0;
  }

  .dynamic-theme .timeline-container {
    position: relative;
    max-width: 1100px;
    margin: 0 auto;
    padding: 3rem 0;
  }

  .dynamic-theme .timeline-progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: rgba(var(--dynamic-primary-rgb), 0.1);
    z-index: 1;
    overflow: hidden;
    border-radius: 5px;
  }

  .dynamic-theme .timeline-progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    background: linear-gradient(90deg, 
      rgba(var(--dynamic-accent-rgb), 0.7),
      rgba(var(--dynamic-primary-rgb), 0.7),
      rgba(var(--dynamic-secondary-rgb), 0.7));
    transition: width 0.3s ease;
    z-index: 2;
  }

  .dynamic-theme .timeline-line {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg,
      rgba(var(--dynamic-primary-rgb), 0.1),
      rgba(var(--dynamic-accent-rgb), 0.5),
      rgba(var(--dynamic-primary-rgb), 0.1));
    transform: translateY(-50%);
    z-index: 1;
  }

  .dynamic-theme .timeline-items {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    position: relative;
    z-index: 2;
  }

  .dynamic-theme .timeline-item {
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 120px 1fr;
    grid-gap: 2rem;
    align-items: center;
  }

  .dynamic-theme .timeline-item:nth-child(even) {
    grid-template-columns: 1fr 120px 1fr;
  }

  .dynamic-theme .timeline-item:nth-child(odd) .timeline-content {
    grid-column: 1;
    text-align: right;
  }

  .dynamic-theme .timeline-item:nth-child(even) .timeline-content {
    grid-column: 3;
    text-align: left;
  }

  .dynamic-theme .timeline-marker {
    grid-column: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 3;
  }

  .dynamic-theme .timeline-dot {
    width: 30px;
    height: 30px;
    background: var(--dynamic-card-bg);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border: 2px solid rgba(var(--dynamic-accent-rgb), 0.3);
    box-shadow: 0 0 20px rgba(var(--dynamic-accent-rgb), 0.2);
    transition: all 0.4s ease;
  }

  .dynamic-theme .timeline-dot::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background: conic-gradient(
      from 0deg,
      var(--dynamic-accent),
      var(--dynamic-primary),
      var(--dynamic-secondary),
      var(--dynamic-accent)
    );
    border-radius: 50%;
    animation: spin 4s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .dynamic-theme .timeline-date {
    margin-top: 0.8rem;
    background: linear-gradient(135deg, 
      rgba(var(--dynamic-primary-rgb), 0.2),
      rgba(var(--dynamic-accent-rgb), 0.2));
    padding: 0.4rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
    color: var(--dynamic-text-primary);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(var(--dynamic-accent-rgb), 0.2);
    white-space: nowrap;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .dynamic-theme .timeline-content {
    position: relative;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform-style: preserve-3d;
    perspective: 1000px;
  }

  .dynamic-theme .timeline-card {
    padding: 2rem;
    border-radius: 16px;
    background: var(--dynamic-card-bg);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(var(--dynamic-accent-rgb), 0.1);
    backdrop-filter: blur(10px);
    transition: all 0.4s ease;
    transform-style: preserve-3d;
    position: relative;
    overflow: hidden;
  }

  .dynamic-theme .timeline-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, 
      rgba(var(--dynamic-accent-rgb), 0), 
      rgba(var(--dynamic-accent-rgb), 0.03), 
      rgba(var(--dynamic-primary-rgb), 0.05));
    z-index: -1;
  }

  .dynamic-theme .timeline-content:hover .timeline-card {
    transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }

  .dynamic-theme .timeline-company {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .dynamic-theme .timeline-item:nth-child(odd) .timeline-company {
    justify-content: flex-end;
  }

  .dynamic-theme .timeline-logo {
    border-radius: 10px;
    overflow: hidden;
    border: 2px solid rgba(var(--dynamic-primary-rgb), 0.1);
    background: var(--dynamic-bg);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.4s ease;
  }

  .dynamic-theme .timeline-content:hover .timeline-logo {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 10px 25px rgba(var(--dynamic-accent-rgb), 0.2);
  }

  @media (max-width: 768px) {
    .dynamic-theme .timeline-item,
    .dynamic-theme .timeline-item:nth-child(even),
    .dynamic-theme .timeline-item:nth-child(odd) {
      grid-template-columns: 80px 1fr;
      grid-gap: 1rem;
    }
    
    .dynamic-theme .timeline-marker {
      grid-column: 1;
      grid-row: 1;
    }
    
    .dynamic-theme .timeline-item:nth-child(odd) .timeline-content,
    .dynamic-theme .timeline-item:nth-child(even) .timeline-content {
      grid-column: 2;
      grid-row: 1;
      text-align: left;
    }
    
    .dynamic-theme .timeline-line {
      left: 40px;
      width: 2px;
      height: 100%;
      top: 0;
      transform: none;
    }
    
    .dynamic-theme .timeline-item:nth-child(odd) .timeline-company {
      justify-content: flex-start;
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

  // Tamamlayıcı renk üretme fonksiyonu
  const getComplementaryColor = (hex: string) => {
    // Hex'i RGB'ye çevir
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    // Tamamlayıcı renk (255 - orijinal değer)
    r = 255 - r;
    g = 255 - g;
    b = 255 - b;

    // RGB'yi Hex'e geri çevir
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  let themeOptions: ThemeOptions = {
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

  if (
    themeOptions.colors &&
    Array.isArray(themeOptions.colors) &&
    themeOptions.colors.length >= 5
  ) {
    const accentColor = themeOptions.colors[4];
    const accentRgb = hexToRgb(accentColor);

    const primaryColor = adjustColor(accentColor, -15);
    const primaryRgb = hexToRgb(primaryColor);

    const secondaryColor = getComplementaryColor(accentColor);
    const secondaryRgb = hexToRgb(secondaryColor);

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

    // CSS değişkenleri için özel stil eklemesi
    const customStyles = `
      .dynamic-theme {
        --dynamic-primary: ${primaryColor};
        --dynamic-primary-rgb: ${primaryRgb};
        --dynamic-secondary: ${secondaryColor};
        --dynamic-secondary-rgb: ${secondaryRgb};
        --dynamic-accent: ${accentColor};
        --dynamic-accent-rgb: ${accentRgb};
        --dynamic-bg: ${themeOptions.colors[0]};
        --dynamic-bg-rgb: ${hexToRgb(themeOptions.colors[0])};
        --dynamic-bg-secondary: ${themeOptions.colors[1]};
        --dynamic-bg-card: rgba(${hexToRgb(themeOptions.colors[1])}, 0.7);
        --dynamic-text-primary: ${themeOptions.colors[3]};
        --dynamic-text-secondary: ${themeOptions.colors[3] + "99"};
        --dynamic-border: ${themeOptions.colors[2]};
        --dynamic-shadow: 0 8px 32px rgba(${primaryRgb}, 0.3);
        --dynamic-glow: 0 0 15px rgba(${accentRgb}, 0.3);
        --dynamic-gradient-1: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
        --dynamic-gradient-2: linear-gradient(135deg, ${secondaryColor}, ${accentColor});
        --dynamic-gradient-anim: linear-gradient(90deg, ${primaryColor}, ${accentColor}, ${secondaryColor}, ${primaryColor});
        --dynamic-button-glow: 0 0 20px rgba(${accentRgb}, 0.5);
      }
    `;

    // Ana stile ekle
    baseDynamicThemeStyles = baseDynamicThemeStyles + customStyles;
  }

  if (themeOptions.font) {
    const fontValue = `${themeOptions.font.charAt(0).toUpperCase() + themeOptions.font.slice(1)}, sans-serif`;
    themeOptions.fonts = {
      heading: fontValue,
      body: fontValue,
    };
  }

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
          `${themeOptions.font.charAt(0).toUpperCase() + themeOptions.font.slice(1)}, system-ui, sans-serif`
        } !important;
      }
      
      .dynamic-theme, .dynamic-theme * {
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
        {/* Interactive Background Elements */}
        <div className="animated-bg-lines">
          <div className="animated-bg-line"></div>
          <div className="animated-bg-line"></div>
          <div className="animated-bg-line"></div>
          <div className="animated-bg-line"></div>
        </div>

        <div className="energy-orb energy-orb-1"></div>
        <div className="energy-orb energy-orb-2"></div>

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
                className="animated-gradient-text mb-6 text-5xl font-bold leading-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                }}
              >
                {portfolio.contents.hero_header}
              </motion.h1>

              <motion.p
                className="max-w-2xl text-xl leading-relaxed text-[var(--dynamic-text-secondary)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {portfolio.contents.hero_description}
              </motion.p>

              <motion.div
                className="mt-10 flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                {socials.map((social, index) => (
                  <motion.div
                    key={social.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.8 + index * 0.1,
                    }}
                    whileHover={{ scale: 1.2 }}
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
                className="text-center premium-card"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="premium-card-inner">
                  <div className="premium-card-shine"></div>
                  <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[var(--dynamic-text-secondary)]">
                    {portfolio.contents.about_text}
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Skills Section */}
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
                <h2 className="section-title text-3xl font-bold">Skills</h2>
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
                          className="skill-badge"
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
                            scale: 1.1,
                            boxShadow: `0 10px 20px rgba(0,0,0,0.2), 0 0 15px ${skillColor}40`,
                          }}
                        >
                          <SkillIcon size={14} />
                          {skill.name}
                        </motion.span>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-center text-[var(--dynamic-text-secondary)]">
                    No skills information yet.
                  </p>
                )}
              </motion.div>
            </div>
          </section>
        )}

        {/* Education Section */}
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

              <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6">
                {educations && educations.length > 0 ? (
                  educations.map((education: Education, index) => (
                    <motion.div
                      key={education.id}
                      className="card premium-card"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="premium-card-inner">
                        <div className="premium-card-shine"></div>
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
                  <p className="text-center text-[var(--dynamic-text-secondary)]">
                    No education information yet.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Experience Section with 3D Timeline */}
        {experiences && experiences.length > 0 && (
          <section className="section">
            <div className="container mx-auto px-4">
              <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="section-title text-3xl font-bold">
                  <span className="gradient-text">Experience</span>
                </h2>
                <p>Interactive journey through my professional career</p>
              </motion.div>

              <div className="timeline-wrapper">
                <div className="timeline-progress">
                  <motion.div
                    className="timeline-progress-bar"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  ></motion.div>
                </div>

                <div className="timeline-container">
                  <div className="timeline-line"></div>

                  <div className="timeline-items">
                    {experiences && experiences.length > 0 ? (
                      experiences.map((experience, index) => (
                        <motion.div
                          key={experience.id}
                          className="timeline-item"
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.7,
                            delay: index * 0.2,
                            type: "spring",
                            stiffness: 50,
                          }}
                        >
                          <motion.div
                            className="timeline-content"
                            whileHover={{ scale: 1.03 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 10,
                            }}
                          >
                            <div className="timeline-card">
                              <h3 className="text-xl font-semibold mb-3">
                                {experience.role}
                              </h3>
                              <div className="timeline-company">
                                {experience.logo && (
                                  <div className="timeline-logo">
                                    <Image
                                      src={experience.logo}
                                      alt={experience.company}
                                      width={45}
                                      height={45}
                                      className="object-cover"
                                    />
                                  </div>
                                )}
                                <p className="font-medium text-[var(--dynamic-accent)]">
                                  {experience.company}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-[var(--dynamic-text-secondary)]">
                                {experience.employment_type}
                              </p>
                              <p className="mt-4 text-[var(--dynamic-text-secondary)]">
                                {experience.description}
                              </p>
                            </div>
                          </motion.div>

                          <div className="timeline-marker">
                            <div className="timeline-dot"></div>
                            <div className="timeline-date">
                              <CalendarIcon className="mr-1 size-3 inline" />
                              {format(experience.start_date, "MMM yyyy")} -{" "}
                              {experience.end_date
                                ? format(experience.end_date, "MMM yyyy")
                                : "Present"}
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-center text-[var(--dynamic-text-secondary)]">
                        No experience information yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
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
                      className="project-card premium-card"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="premium-card-inner">
                        <div className="premium-card-shine"></div>
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
                            <h3 className="mb-2 text-2xl font-semibold animated-gradient-text">
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
                    </motion.div>
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

        {/* Enhanced Footer */}
        <footer className="py-12 text-center text-[var(--dynamic-text-secondary)]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-2 text-sm">
                ©{new Date().getFullYear()} {portfolio.contents.meta_title}
              </p>
              <div className="mx-auto mt-4 flex justify-center gap-4">
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
      </div>
    </>
  );
};

export default DynamicTheme;
