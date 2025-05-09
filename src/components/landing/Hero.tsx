import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
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

      {/* Subtle Gradient Orbs */}
      <div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-gradient-to-br from-primary/20 to-primary/0 blur-3xl opacity-40 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-1/2 w-1/2 h-1/2 bg-gradient-to-br from-accent/20 to-accent/0 blur-3xl opacity-40 rounded-full -translate-x-1/2 translate-y-1/2"></div>

      <div className="container px-4 mx-auto max-w-5xl relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge className="mb-2 text-sm px-4 py-1.5 rounded-full glass text-foreground dark:glass-dark hover:bg-primary/10 transition-colors border-border animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Meet Devplot
          </Badge>

          <div className="space-y-6 max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in-up">
              From Code to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-chart-5 animate-gradient">
                Career
              </span>
            </h1>
            <p className="text-xl  text-foreground/80 dark:text-foreground/70 animate-fade-in-up animation-delay-100 leading-relaxed">
              Create an impressive developer portfolio in minutes and catch the
              attention of the best tech companies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-200">
            <Link href="/sign-up">
              <Button variant="glow" size="lg">
                <span className="relative z-10">Start Building</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
              </Button>
            </Link>
            <Link href="/themes">
              <Button variant="outline" size="lg">
                View Themes
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-base text-muted-foreground animate-fade-in-up animation-delay-300">
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

          <div className="mt-12 w-full max-w-4xl animate-fade-in-up animation-delay-400">
            <div className="glass dark:glass-dark backdrop-blur-md rounded-xl border border-border/40 p-2 shadow-xl relative overflow-hidden">
              <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-border/20">
                <Image
                  src="/themes/theme-preview.png"
                  alt="Theme Preview"
                  fill
                  className="object-cover"
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
