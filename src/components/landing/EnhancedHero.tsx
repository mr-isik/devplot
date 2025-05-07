import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Eye, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="w-full py-20 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/15 dark:from-primary/10 dark:via-background/90 dark:to-accent/15 border-b border-border relative overflow-hidden">
      {/* Animated Background Grid */}
      <div
        className="absolute inset-0 bg-grid-small-black/[0.05] dark:bg-grid-small-white/[0.05]"
        style={{
          maskImage:
            "radial-gradient(circle at center, black, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black, transparent 80%)",
        }}
      />

      {/* Blurred Gradient Orbs */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/30 to-primary/0 blur-3xl opacity-60 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-accent/30 to-accent/0 blur-3xl opacity-60 rounded-full translate-x-1/2 translate-y-1/2"></div>

      {/* Floating Elements (Decorative) */}
      <div className="absolute hidden md:block w-32 h-32 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full -top-10 left-1/5 blur-xl animate-float-slow opacity-80"></div>
      <div className="absolute hidden md:block w-36 h-36 bg-gradient-to-br from-accent/30 to-accent/10 rounded-full -bottom-20 right-1/5 blur-xl animate-float-medium opacity-70"></div>
      <div className="absolute hidden md:block w-24 h-24 bg-gradient-to-br from-chart-5/30 to-chart-5/10 rounded-full top-1/3 right-[15%] blur-lg animate-float-fast opacity-90"></div>

      <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
        <div className="flex-1 text-center md:text-left max-w-3xl">
          <Badge className="mb-6 text-sm px-4 py-1.5 rounded-full glass dark:glass-dark hover:bg-primary/10 transition-colors border-border animate-fade-in font-medium">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            <span className="font-semibold">NEW</span>: No-Code Portfolio
            Builder
          </Badge>

          <div className="space-y-6 mb-10">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight drop-shadow-sm animate-fade-in-up"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
            >
              From Code to Career: <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-chart-5 animate-gradient">
                Your Portfolio, Your Style
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/90 dark:text-foreground/90 animate-fade-in-up animation-delay-100 leading-relaxed">
              Stop spending weeks building portfolios. With DevPlot, create
              <span className="font-semibold text-primary">
                {" "}
                an impressive developer portfolio in minutes
              </span>{" "}
              and
              <span className="font-semibold text-accent">
                {" "}
                catch the attention of the best tech companies
              </span>
              .
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 mb-10 animate-fade-in-up animation-delay-200">
            <Link href="/sign-up" className="flex items-center gap-2">
              <Button
                size="lg"
                variant="glow"
                className="w-full text-base px-6 py-3 h-auto shadow-lg relative overflow-hidden group rounded-xl"
              >
                <span className="relative z-10">Get Started</span>
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform relative z-10" />
              </Button>
            </Link>
            <Link href="/themes" className="flex items-center gap-2">
              <Button
                variant="glass"
                size="lg"
                className="w-full text-base px-6 py-3 h-auto rounded-xl"
              >
                Explore Themes <Eye className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mb-6 text-base md:text-lg text-muted-foreground animate-fade-in-up animation-delay-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-chart-5" />
              <span>Works on all devices</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-chart-5" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-chart-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        <div className="flex-1 md:max-w-md lg:max-w-lg xl:max-w-xl animate-fade-in-up animation-delay-300">
          <div className="glass dark:glass-dark backdrop-blur-md rounded-xl border border-border/40 p-2 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-primary/10 to-accent/10"></div>

            <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden border border-border/20">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-black/5 to-transparent"></div>
              <Image
                src="/portfolio-preview.webp"
                alt="Portfolio Preview"
                fill
                className="object-cover"
              />
            </div>

            <div className="mt-4 p-4">
              <div className="w-full h-8 bg-muted/40 rounded-md mb-3"></div>
              <div className="w-3/4 h-8 bg-muted/40 rounded-md mb-6"></div>
              <div className="flex gap-2 mb-4">
                <div className="w-1/3 h-10 bg-muted/40 rounded-md"></div>
                <div className="w-1/3 h-10 bg-muted/40 rounded-md"></div>
                <div className="w-1/3 h-10 bg-muted/40 rounded-md"></div>
              </div>
              <div className="w-full h-32 bg-muted/40 rounded-md"></div>
            </div>
          </div>

          <div className="text-center mt-4 text-sm text-muted-foreground">
            <span>Modern, responsive, and personalized portfolios</span>
          </div>
        </div>
      </div>
    </section>
  );
}
