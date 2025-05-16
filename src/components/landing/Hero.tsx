import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Code2,
  Terminal,
  GitBranch,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="w-full min-h-[90vh] flex items-center justify-center py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10 dark:from-primary/5 dark:via-background/95 dark:to-accent/10 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div
        className="absolute inset-0 bg-grid-small-black/[0.03] dark:bg-grid-small-white/[0.03]"
        style={{
          maskImage:
            "radial-gradient(circle at center, black, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black, transparent 80%)",
        }}
      />

      {/* Particle Effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Icons */}
      <div className="absolute top-1/4 left-1/4 animate-float-slow">
        <Code2 className="w-8 h-8 text-primary/30" />
      </div>
      <div className="absolute top-1/3 right-1/4 animate-float">
        <Terminal className="w-8 h-8 text-accent/30" />
      </div>
      <div className="absolute bottom-1/4 left-1/3 animate-float-slow">
        <GitBranch className="w-8 h-8 text-chart-5/30" />
      </div>
      <div className="absolute top-1/2 right-1/3 animate-float">
        <Github className="w-8 h-8 text-primary/20" />
      </div>
      <div className="absolute bottom-1/3 right-1/4 animate-float-slow">
        <Linkedin className="w-8 h-8 text-accent/20" />
      </div>

      {/* Subtle Gradient Orbs */}
      <div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-gradient-to-br from-primary/20 to-primary/0 blur-3xl opacity-40 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-1/2 w-1/2 h-1/2 bg-gradient-to-br from-accent/20 to-accent/0 blur-3xl opacity-40 rounded-full -translate-x-1/2 translate-y-1/2 animate-pulse-slow"></div>
      <div className="absolute top-1/2 right-0 w-1/3 h-1/3 bg-gradient-to-br from-chart-5/20 to-chart-5/0 blur-3xl opacity-30 rounded-full translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>

      <div className="container px-4 mx-auto max-w-5xl relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge className="mb-2 text-sm px-4 py-1.5 rounded-full glass text-foreground dark:glass-dark hover:bg-primary/10 transition-colors border-border animate-fade-in hover:scale-105 transform duration-300 hover:shadow-lg">
            <Sparkles className="h-3.5 w-3.5 mr-1.5 animate-pulse" />
            Meet Devplot
          </Badge>

          <div className="space-y-6 max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in-up">
              From Code to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-chart-5 animate-gradient hover:scale-105 transform duration-300 inline-block relative">
                Career
                <span className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-chart-5/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </span>
            </h1>
            <p className="text-xl text-foreground/80 dark:text-foreground/70 animate-fade-in-up animation-delay-100 leading-relaxed">
              Create an impressive developer portfolio in minutes and catch the
              attention of the best tech companies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-200">
            <Link href="/sign-up">
              <Button
                variant="glow"
                size="lg"
                className="group hover:scale-105 transform duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <span className="relative z-10">Start Building</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
              </Button>
            </Link>
            <Link href="/themes">
              <Button
                variant="outline"
                size="lg"
                className="hover:scale-105 transform duration-300 hover:shadow-lg hover:border-primary/50"
              >
                View Themes
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-base text-muted-foreground animate-fade-in-up animation-delay-300">
            <div className="flex items-center gap-2 hover:text-foreground transition-colors hover:scale-105 transform duration-300">
              <CheckCircle2 className="h-5 w-5 text-chart-5 animate-pulse" />
              <span>Works on all devices</span>
            </div>
            <div className="flex items-center gap-2 hover:text-foreground transition-colors hover:scale-105 transform duration-300">
              <CheckCircle2 className="h-5 w-5 text-chart-5 animate-pulse" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2 hover:text-foreground transition-colors hover:scale-105 transform duration-300">
              <CheckCircle2 className="h-5 w-5 text-chart-5 animate-pulse" />
              <span>Cancel anytime</span>
            </div>
          </div>

          <div className="mt-12 w-full max-w-4xl animate-fade-in-up animation-delay-400">
            <div className="glass dark:glass-dark backdrop-blur-md rounded-xl border border-border/40 p-2 shadow-xl relative overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-chart-5/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-border/20">
                <Image
                  src="/themes/theme-preview.png"
                  alt="Theme Preview"
                  fill
                  className="object-cover hover:scale-105 transform duration-700"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
