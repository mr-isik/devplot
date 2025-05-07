import {
  BarChart3,
  Code,
  Globe,
  Zap,
  PaintBucket,
  Rocket,
  Shield,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const features = [
  {
    icon: <Code className="size-6 text-primary" />,
    title: "Code Integration",
    description:
      "Connect your GitHub profile and automatically import your code and projects to your portfolio",
    color: "from-primary/10 to-primary/5",
    gradient: "from-primary/80 to-primary/40",
  },
  {
    icon: <PaintBucket className="size-6 text-accent" />,
    title: "Customizable Themes",
    description:
      "Choose from great-looking themes or create your own unique design",
    color: "from-accent/10 to-accent/5",
    gradient: "from-accent/80 to-accent/40",
  },
  {
    icon: <Zap className="size-6 text-chart-5" />,
    title: "AI-Powered Content",
    description:
      "Create professional content and project descriptions with artificial intelligence",
    color: "from-chart-5/10 to-chart-5/5",
    gradient: "from-chart-5/80 to-chart-5/40",
  },
  {
    icon: <Rocket className="size-6 text-chart-3" />,
    title: "Rapid Deployment",
    description:
      "Publish your portfolio with a single click and gain a professional look with a custom domain",
    color: "from-chart-3/10 to-chart-3/5",
    gradient: "from-chart-3/80 to-chart-3/40",
  },
  {
    icon: <Globe className="size-6 text-chart-2" />,
    title: "SEO Optimization",
    description: "Be more easily discoverable by employers and recruiters",
    color: "from-chart-2/10 to-chart-2/5",
    gradient: "from-chart-2/80 to-chart-2/40",
  },
  {
    icon: <Shield className="size-6 text-chart-4" />,
    title: "Security and Privacy",
    description:
      "Your data is secure, with full control over what is displayed",
    color: "from-chart-4/10 to-chart-4/5",
    gradient: "from-chart-4/80 to-chart-4/40",
  },
];

export function FeatureShowcase() {
  return (
    <section className="w-full py-20 relative overflow-hidden bg-gradient-to-br from-muted/50 via-background to-muted/30">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-grid-small-black/[0.05] dark:bg-grid-small-white/[0.05]"></div>
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/20 to-primary/0 blur-3xl opacity-50 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-accent/20 to-accent/0 blur-3xl opacity-50 rounded-full translate-x-1/2 translate-y-1/2"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block glass dark:glass-dark backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium text-primary mb-4">
            Everything in One Platform
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            The easiest way to create a{" "}
            <span className="text-primary">professional</span>{" "}
            <span className="text-accent">portfolio</span>
          </h2>
          <p className="text-lg text-foreground/80 mb-8">
            DevPlot makes it easier than ever for developers to create stunning
            portfolios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group backdrop-blur-sm rounded-xl border border-border/40 overflow-hidden animate-fade-in transition-all duration-300 hover:shadow-xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card background with gradient and glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/60 z-0"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r z-0"></div>

              {/* Top border gradient animation */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r opacity-50 z-0"></div>

              {/* Glowing orb in background */}
              <div
                className={`absolute top-1/2 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} rounded-full -translate-y-1/2 translate-x-1/2 filter blur-3xl opacity-10 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500 z-0`}
              ></div>

              {/* Card content */}
              <div className="p-6 relative z-10 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`group-hover:scale-110 transition-transform duration-300 size-14 flex items-center justify-center rounded-lg bg-gradient-to-br ${feature.color} border border-border/30 shadow-sm`}
                  >
                    <div className="size-12 rounded-lg glass dark:glass-dark flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="size-8 rounded-full bg-gradient-to-br from-background to-background/80 border border-border/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 translate-x-4 duration-300">
                    <Zap className="size-4 text-accent" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-foreground/80 group-hover:text-foreground/90 transition-colors">
                  {feature.description}
                </p>

                {/* Bottom reveal effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-80 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <Link href="/sign-up">
            <Button
              variant="gradient"
              size="lg"
              className="group animate-pulse-glow shadow-lg"
              rounded="lg"
            >
              Create Your Portfolio Now
              <Zap className="ml-1 group-hover:rotate-12 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
