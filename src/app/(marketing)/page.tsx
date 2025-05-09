import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Code,
  Eye,
  PaintBucket,
  Rocket,
  Trophy,
  Users,
  Star,
  Zap,
  Sparkles,
  Code2,
  Palette,
} from "lucide-react";
import Link from "next/link";
import { Hero } from "@/components/landing/Hero";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { PortfolioContent } from "@/components/landing/PortfolioContent";
import Image from "next/image";
import FAQSection from "@/components/landing/FAQSection";

export async function generateMetadata() {
  return {
    title: "DevPlot - Developer Portfolio Builder",
    description:
      "Stand out in the tech industry with a professional portfolio that showcases your skills and projects - built in minutes",
    openGraph: {
      title: "DevPlot - Developer Portfolio Builder",
      description:
        "Stand out in the tech industry with a professional portfolio that showcases your skills and projects - built in minutes",
    },
  };
}

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Feature Showcase Section */}
      <FeatureShowcase />

      {/* Why You Need a Portfolio Section */}
      <section className="w-full py-20 relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why employers value{" "}
              <span className="text-primary">portfolios</span>
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              A strong portfolio is the most effective way to stand out in the
              coding world and land your dream job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border border-border/40 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="size-12 flex items-center justify-center mb-4 rounded-lg bg-muted">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Stronger Than Words</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  Your resume lists your skills, but your portfolio proves them.
                  Show tangible experience through real projects.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/40 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="size-12 flex items-center justify-center mb-4 rounded-lg bg-muted">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Stand Out from Competition</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  A portfolio showcasing your technical skills helps you rise
                  above dozens of other candidates applying for the same
                  position.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/40 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="size-12 flex items-center justify-center mb-4 rounded-lg bg-muted">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Build Employer Confidence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  Employers question skills listed on resumes. A portfolio
                  transparently validates your experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio Content Section */}
      <PortfolioContent />

      {/* Theme Preview Section */}
      <section className="w-full py-20 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Uniquely <span className="text-primary">styled</span>
              <br />
              portfolio themes
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              Create a portfolio that looks as impressive as your code with
              DevPlot's modern themes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Minimal",
                description: "Clean and minimalist design",
                image: "/themes/minimal-theme-thumbnail.jpg",
                icon: <Code className="h-5 w-5" />,
              },
              {
                title: "Modern",
                description: "Code-focused & modern-style",
                image: "/themes/modern-theme-thumbnail.jpg",
                icon: <Code2 className="h-5 w-5" />,
              },
              {
                title: "Creative",
                description: "Bold and colorful layout",
                image: "/themes/creative-theme-thumbnail.jpg",
                icon: <PaintBucket className="h-5 w-5" />,
              },
            ].map((theme, i) => (
              <div
                key={i}
                className="group relative rounded-xl border border-border/40 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-52 bg-muted flex items-center justify-center px-6 overflow-hidden border-b border-border/20">
                  <div className="w-full max-w-[280px] h-36 rounded-md shadow-sm relative overflow-hidden group-hover:scale-105 transition-transform duration-500 border border-border/30">
                    <Image
                      src={theme.image}
                      alt={theme.title}
                      width={280}
                      height={144}
                      className="w-full h-full object-cover object-top absolute inset-0"
                    />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                      {theme.title}
                    </h3>
                    <div className="size-8 rounded-full bg-muted flex items-center justify-center">
                      {theme.icon}
                    </div>
                  </div>
                  <p className="text-sm text-foreground/70 mb-4">
                    {theme.description}
                  </p>
                  <Link href="/themes">
                    <Button variant="outline" size="sm" className="w-full">
                      Preview
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link href="/themes">
              <Button size="lg" className="group">
                Explore All Themes
                <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="w-full py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Create an <span className="text-primary">impressive</span>{" "}
              portfolio in three simple steps
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              DevPlot simplifies the portfolio creation process. No complex
              coding or design knowledge required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
            {[
              {
                step: 1,
                title: "Create Your Account",
                description: "Quick registration for platform access",
                icon: <Users className="h-8 w-8 text-foreground" />,
              },
              {
                step: 2,
                title: "Build Your Portfolio",
                description: "Add projects and choose a theme",
                icon: <Code className="h-8 w-8 text-foreground" />,
              },
              {
                step: 3,
                title: "Publish and Share",
                description:
                  "Show your portfolio to everyone with a unique URL",
                icon: <Rocket className="h-8 w-8 text-foreground" />,
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="size-16 rounded-full bg-muted flex items-center justify-center border border-border/50">
                    {item.icon}
                  </div>
                  <div className="absolute -top-0.5 -left-0.5 size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <Link href="/sign-up">
              <Button size="lg">Get Started Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Call to Action */}
      <section className="w-full py-20 bg-muted">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-4xl mx-auto">
            Take the first step to landing
            <br />
            your <span className="text-primary">dream job</span>
          </h2>

          <p className="text-xl mb-12 max-w-2xl mx-auto text-foreground/80">
            Create a professional portfolio in minutes and showcase your talents
            to the world.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <Link href="/sign-up">
              <Button size="lg" className="px-8">
                <Zap className="h-5 w-5 mr-2" />
                Start Building
              </Button>
            </Link>
            <Link href="/themes">
              <Button variant="outline" size="lg" className="px-8">
                View Themes
              </Button>
            </Link>
          </div>

          <p className="text-sm text-foreground/60">
            Easy to cancel • 14-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  );
}
