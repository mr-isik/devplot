// Skill verileri ve ikonları
import {
  BarChart4Icon,
  BrainIcon,
  ClockIcon,
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  HeartHandshakeIcon,
  LayoutIcon,
  MessagesSquareIcon,
  SearchIcon,
  ServerIcon,
  SettingsIcon,
  ShieldIcon,
  SmartphoneIcon,
  UsersIcon,
} from "lucide-react";

import { AiOutlineDotNet } from "react-icons/ai";
import { DiMsqlServer, DiRedis } from "react-icons/di";
import {
  FaAndroid,
  FaAngular,
  FaAws,
  FaBootstrap,
  FaCss3,
  FaDocker,
  FaFigma,
  FaFlask,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJava,
  FaJenkins,
  FaJira,
  FaLaravel,
  FaLinux,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaReact,
  FaRust,
  FaSass,
  FaSwift,
  FaVuejs,
} from "react-icons/fa";
import { FaFlutter, FaGitlab, FaGolang } from "react-icons/fa6";
import { GrGraphQl, GrMysql } from "react-icons/gr";
import { IoIosAppstore, IoLogoIonic, IoLogoJavascript } from "react-icons/io";
import {
  RiFirebaseFill,
  RiNextjsFill,
  RiSvelteFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import {
  SiCypress,
  SiDjango,
  SiExpress,
  SiGooglecloud,
  SiJest,
  SiKotlin,
  SiKubernetes,
  SiMongodb,
  SiOracle,
  SiPostgresql,
  SiPytorch,
  SiRuby,
  SiSpringboot,
  SiSqlite,
  SiTensorflow,
  SiTypescript,
  SiVite,
  SiWebpack,
} from "react-icons/si";
import { TbBrandCSharp, TbBrandReactNative, TbGitBranch } from "react-icons/tb";
import { VscAzure, VscVscode } from "react-icons/vsc";

export type SkillCategory =
  | "programming-language"
  | "frontend"
  | "backend"
  | "database"
  | "mobile"
  | "devops"
  | "ai-ml"
  | "soft-skill"
  | "tool";

export type SkillData = {
  name: string;
  icon: React.ElementType;
  category: SkillCategory;
  color?: string;
};

export const SKILL_CATEGORIES = [
  {
    slug: "programming-language",
    name: "Programming Languages",
    icon: CodeIcon,
  },
  { slug: "frontend", name: "Frontend Development", icon: LayoutIcon },
  { slug: "backend", name: "Backend Development", icon: ServerIcon },
  { slug: "database", name: "Databases", icon: DatabaseIcon },
  { slug: "mobile", name: "Mobile Development", icon: SmartphoneIcon },
  { slug: "devops", name: "DevOps & Cloud", icon: CloudIcon },
  { slug: "ai-ml", name: "AI & Machine Learning", icon: BrainIcon },
  { slug: "soft-skill", name: "Soft Skills", icon: UsersIcon },
  { slug: "tool", name: "Tools & Platforms", icon: SettingsIcon },
];

export const COMMON_SKILLS: SkillData[] = [
  {
    name: "JavaScript",
    icon: IoLogoJavascript,
    category: "programming-language",
    color: "#F7DF1E",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    category: "programming-language",
    color: "#3178C6",
  },
  {
    name: "Python",
    icon: FaPython,
    category: "programming-language",
    color: "#3776AB",
  },
  {
    name: "Java",
    icon: FaJava,
    category: "programming-language",
    color: "#007396",
  },
  {
    name: "C#",
    icon: TbBrandCSharp,
    category: "programming-language",
    color: "#512BD4",
  },
  {
    name: "PHP",
    icon: FaPhp,
    category: "programming-language",
    color: "#777BB4",
  },
  {
    name: "Go",
    icon: FaGolang,
    category: "programming-language",
    color: "#00ADD8",
  },
  {
    name: "Rust",
    icon: FaRust,
    category: "programming-language",
    color: "#000000",
  },
  {
    name: "Ruby",
    icon: SiRuby,
    category: "programming-language",
    color: "#CC342D",
  },
  {
    name: "Swift",
    icon: FaSwift,
    category: "programming-language",
    color: "#FA7343",
  },
  {
    name: "Kotlin",
    icon: SiKotlin,
    category: "programming-language",
    color: "#7F52FF",
  },

  { name: "React", icon: FaReact, category: "frontend", color: "#61DAFB" },
  { name: "Angular", icon: FaAngular, category: "frontend", color: "#DD0031" },
  { name: "Vue.js", icon: FaVuejs, category: "frontend", color: "#4FC08D" },
  {
    name: "Next.js",
    icon: RiNextjsFill,
    category: "frontend",
    color: "#111111",
  },
  {
    name: "Svelte",
    icon: RiSvelteFill,
    category: "frontend",
    color: "#FF3E00",
  },
  { name: "HTML", icon: FaHtml5, category: "frontend", color: "#E34F26" },
  { name: "CSS", icon: FaCss3, category: "frontend", color: "#1572B6" },
  { name: "Sass/SCSS", icon: FaSass, category: "frontend", color: "#CC6699" },
  {
    name: "Tailwind CSS",
    icon: RiTailwindCssFill,
    category: "frontend",
    color: "#06B6D4",
  },
  {
    name: "Bootstrap",
    icon: FaBootstrap,
    category: "frontend",
    color: "#7952B3",
  },

  { name: "Node.js", icon: FaNodeJs, category: "backend", color: "#339933" },
  {
    name: "Express.js",
    icon: SiExpress,
    category: "backend",
    color: "#339933",
  },
  { name: "Django", icon: SiDjango, category: "backend", color: "#092E20" },
  { name: "Flask", icon: FaFlask, category: "backend", color: "#000000" },
  {
    name: "Spring Boot",
    icon: SiSpringboot,
    category: "backend",
    color: "#6DB33F",
  },
  {
    name: "ASP.NET Core",
    icon: AiOutlineDotNet,
    category: "backend",
    color: "#512BD4",
  },
  { name: "Laravel", icon: FaLaravel, category: "backend", color: "#FF2D20" },
  {
    name: "Ruby on Rails",
    icon: SiRuby,
    category: "backend",
    color: "#CC0000",
  },
  { name: "GraphQL", icon: GrGraphQl, category: "backend", color: "#E10098" },
  { name: "REST API", icon: ServerIcon, category: "backend", color: "#005571" },

  { name: "MySQL", icon: GrMysql, category: "database", color: "#4479A1" },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    category: "database",
    color: "#336791",
  },
  { name: "MongoDB", icon: SiMongodb, category: "database", color: "#47A248" },
  { name: "SQLite", icon: SiSqlite, category: "database", color: "#003B57" },
  { name: "Redis", icon: DiRedis, category: "database", color: "#DC382D" },
  {
    name: "Firebase",
    icon: RiFirebaseFill,
    category: "database",
    color: "#FFCA28",
  },
  {
    name: "SQL Server",
    icon: DiMsqlServer,
    category: "database",
    color: "#CC2927",
  },
  { name: "Oracle", icon: SiOracle, category: "database", color: "#F80000" },

  {
    name: "React Native",
    icon: TbBrandReactNative,
    category: "mobile",
    color: "#61DAFB",
  },
  { name: "Flutter", icon: FaFlutter, category: "mobile", color: "#02569B" },
  {
    name: "iOS Development",
    icon: IoIosAppstore,
    category: "mobile",
    color: "#000000",
  },
  {
    name: "Android Development",
    icon: FaAndroid,
    category: "mobile",
    color: "#3DDC84",
  },
  { name: "Ionic", icon: IoLogoIonic, category: "mobile", color: "#3880FF" },

  { name: "Docker", icon: FaDocker, category: "devops", color: "#2496ED" },
  {
    name: "Kubernetes",
    icon: SiKubernetes,
    category: "devops",
    color: "#326CE5",
  },
  { name: "AWS", icon: FaAws, category: "devops", color: "#FF9900" },
  { name: "Azure", icon: VscAzure, category: "devops", color: "#0078D4" },
  {
    name: "Google Cloud",
    icon: SiGooglecloud,
    category: "devops",
    color: "#4285F4",
  },
  { name: "Git", icon: FaGitAlt, category: "devops", color: "#F05032" },
  { name: "GitHub", icon: FaGithub, category: "devops", color: "#181717" },
  { name: "GitLab", icon: FaGitlab, category: "devops", color: "#FCA121" },
  { name: "CI/CD", icon: TbGitBranch, category: "devops", color: "#2088FF" },
  { name: "Jenkins", icon: FaJenkins, category: "devops", color: "#D24939" },

  {
    name: "Machine Learning",
    icon: BrainIcon,
    category: "ai-ml",
    color: "#01A3A4",
  },
  {
    name: "Deep Learning",
    icon: BrainIcon,
    category: "ai-ml",
    color: "#5E5CE6",
  },
  {
    name: "TensorFlow",
    icon: SiTensorflow,
    category: "ai-ml",
    color: "#FF6F00",
  },
  { name: "PyTorch", icon: SiPytorch, category: "ai-ml", color: "#EE4C2C" },
  {
    name: "NLP",
    icon: MessagesSquareIcon,
    category: "ai-ml",
    color: "#3498DB",
  },
  {
    name: "Computer Vision",
    icon: SearchIcon,
    category: "ai-ml",
    color: "#EC5E87",
  },
  {
    name: "Data Science",
    icon: BarChart4Icon,
    category: "ai-ml",
    color: "#FF6B6B",
  },

  {
    name: "Team Leadership",
    icon: UsersIcon,
    category: "soft-skill",
    color: "#38B2AC",
  },
  {
    name: "Project Management",
    icon: ClockIcon,
    category: "soft-skill",
    color: "#718096",
  },
  {
    name: "Communication",
    icon: MessagesSquareIcon,
    category: "soft-skill",
    color: "#3182CE",
  },
  {
    name: "Problem Solving",
    icon: SearchIcon,
    category: "soft-skill",
    color: "#DD6B20",
  },
  {
    name: "Time Management",
    icon: ClockIcon,
    category: "soft-skill",
    color: "#805AD5",
  },
  {
    name: "Teamwork",
    icon: HeartHandshakeIcon,
    category: "soft-skill",
    color: "#319795",
  },

  { name: "VS Code", icon: VscVscode, category: "tool", color: "#007ACC" },
  { name: "Figma", icon: FaFigma, category: "tool", color: "#F24E1E" },
  { name: "Jira", icon: FaJira, category: "tool", color: "#0052CC" },
  { name: "Webpack", icon: SiWebpack, category: "tool", color: "#8DD6F9" },
  { name: "Vite", icon: SiVite, category: "tool", color: "#646CFF" },
  { name: "Jest", icon: SiJest, category: "tool", color: "#C21325" },
  { name: "Cypress", icon: SiCypress, category: "tool", color: "#17202C" },
  { name: "Linux", icon: FaLinux, category: "tool", color: "#FCC624" },
  {
    name: "Cybersecurity",
    icon: ShieldIcon,
    category: "tool",
    color: "#E03131",
  },
];

export function getSkillIcon(skillName: string) {
  const skill = COMMON_SKILLS.find(
    (s) => s.name.toLowerCase() === skillName.toLowerCase()
  );
  return skill?.icon || CodeIcon;
}

export function getSkillColor(skillName: string) {
  const skill = COMMON_SKILLS.find(
    (s) => s.name.toLowerCase() === skillName.toLowerCase()
  );
  return skill?.color || "#718096";
}

export function getSkillsByCategory(category: SkillCategory) {
  return COMMON_SKILLS.filter((skill) => skill.category === category);
}

export function getAllSkillNames() {
  return COMMON_SKILLS.map((skill) => skill.name);
}
