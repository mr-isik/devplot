import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  Heart,
  Zap,
  Send,
  Globe,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Themes", href: "/themes" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Themes", href: "/themes" },
      /* FIXME: add slack link */
      { label: "Community", href: "/community" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

/* FIXME: add social links */
const socialLinks = [
  { icon: <Github className="size-5" />, href: "https://github.com" },
  { icon: <Twitter className="size-5" />, href: "https://twitter.com" },
  { icon: <Linkedin className="size-5" />, href: "https://linkedin.com" },
  { icon: <Instagram className="size-5" />, href: "https://instagram.com" },
];

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-background to-muted/20 border-t border-border/40 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-small-black/[0.02] dark:bg-grid-small-white/[0.02]"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl opacity-20"></div>

      {/* Main Footer Content */}
      <div className="container px-4 md:px-6 py-12 md:py-16 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-primary to-accent p-1.5 rounded-lg">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold tracking-tight">DevPlot</span>
            </div>

            <p className="text-muted-foreground text-sm md:text-base max-w-md">
              Build an impressive developer portfolio in minutes and showcase
              your skills to potential employers.
            </p>

            {/* Newsletter */}
            {/* TODO: add newsletter */}
            <div className="pt-2">
              <h4 className="text-sm font-semibold mb-3">
                Subscribe to our newsletter
              </h4>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your email"
                  className="bg-background/50 backdrop-blur-sm max-w-[260px]"
                />
                <Button size="icon" variant="default" className="shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Get the latest updates, tips and product news.
              </p>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="font-semibold">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition duration-150 text-sm flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowRight className="h-3 w-0 overflow-hidden group-hover:w-3 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <span>© {new Date().getFullYear()} DevPlot. Made with</span>
            <Heart className="h-3 w-3 text-destructive fill-destructive" />
            <span>
              by{" "}
              <Link href="/" className="hover:text-primary transition-colors">
                DevPlot Team
              </Link>
            </span>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social, idx) => (
              <Link
                key={idx}
                href={social.href}
                className="size-9 rounded-full border border-border flex items-center justify-center hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
