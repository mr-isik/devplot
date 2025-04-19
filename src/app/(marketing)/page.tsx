type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IIndexProps) {
  const { locale } = await props.params;

  return {
    title: "DevPlot - Developer Portfolio Builder",
    description:
      "Stand out in the tech industry with a professional portfolio that showcases your skills and projects - built in minutes",
  };
}

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Code,
  Eye,
  Github,
  Linkedin,
  PaintBucket,
  Rocket,
  Trophy,
  Users,
  Star,
  CheckCircle2,
  Zap,
  BarChart3,
  LineChart,
  Sparkles,
  HelpCircle,
  Code2,
  Globe,
  Shield,
  CreditCard,
  GitBranch,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Logo from "@/components/globals/logo";

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="w-full py-16 md:py-20 lg:py-28 bg-gradient-to-br from-primary/15 via-background to-secondary/15 dark:from-background dark:via-background/95 dark:to-primary/20 border-b border-border relative overflow-hidden">
        {/* Animated Background Grid */}
        <div
          className="absolute inset-0 bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]"
          style={{
            maskImage:
              "radial-gradient(circle at center, black, transparent 80%)",
          }}
        />

        {/* Floating Elements (Decorative) */}
        <div className="absolute hidden md:block w-24 h-24 bg-primary/10 rounded-full -top-12 left-1/4 blur-xl animate-float-slow"></div>
        <div className="absolute hidden md:block w-32 h-32 bg-secondary/10 rounded-full -bottom-16 right-1/4 blur-xl animate-float-medium"></div>
        <div className="absolute hidden md:block w-20 h-20 bg-primary/20 rounded-full top-40 right-[10%] blur-lg animate-float-fast"></div>

        <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center z-10 relative">
          <Badge className="mb-4 text-sm px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors border-primary/20 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Developer-First Portfolio Platform
          </Badge>

          <div className="space-y-4 mb-8 max-w-4xl">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-secondary dark:from-primary dark:via-primary dark:to-secondary/80 drop-shadow-sm animate-fade-in-up"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
            >
              Showcase Your Code. <br /> Advance Your Career.
            </h1>
            <p className="max-w-[700px] text-lg md:text-xl text-foreground/90 dark:text-foreground/90 mx-auto animate-fade-in-up animation-delay-100">
              Build a professional developer portfolio in minutes, not weeks.
              <span className="font-semibold text-primary">
                {" "}
                Stand out from the crowd
              </span>{" "}
              and land your dream job.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up animation-delay-200">
            <Link href="/sign-up" className="flex items-center gap-2">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all group hover:scale-105 w-full"
              >
                Start Building
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/themes" className="flex items-center gap-2">
              <Button
                variant="outline"
                size="lg"
                className="border-primary/30 hover:bg-primary/10 hover:text-primary hover:border-primary/60 transition-all w-full"
              >
                View Themes <Eye className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden animate-fade-in-up animation-delay-300">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur-sm opacity-70 animate-pulse-slow"></div>
            <div className="aspect-[16/9] w-full relative bg-card dark:bg-card/80 rounded-xl overflow-hidden border-2 border-border/50 shadow-2xl backdrop-blur-sm">
              <Tabs defaultValue="portfolio1" className="w-full h-full">
                <TabsList className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-background/90 backdrop-blur-sm border border-border/50 shadow-md">
                  <TabsTrigger value="portfolio1">Modern</TabsTrigger>
                  <TabsTrigger value="portfolio2">Classic</TabsTrigger>
                  <TabsTrigger value="portfolio3">Minimal</TabsTrigger>
                </TabsList>
                <TabsContent value="portfolio1" className="w-full h-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center space-y-4 p-8 w-full text-center">
                      <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center animate-bounce-slow">
                        <Code className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">
                        Modern Portfolio Preview
                      </h3>
                      <p className="text-muted-foreground max-w-md">
                        Interactive preview will be displayed here. Choose a
                        template to start.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="portfolio2" className="w-full h-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center space-y-4 p-8 w-full text-center">
                      <div className="h-16 w-16 rounded-full bg-secondary/20 flex items-center justify-center animate-bounce-slow">
                        <Github className="h-8 w-8 text-secondary" />
                      </div>
                      <h3 className="text-2xl font-bold">
                        Classic Portfolio Preview
                      </h3>
                      <p className="text-muted-foreground max-w-md">
                        Interactive preview will be displayed here. Choose a
                        template to start.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="portfolio3" className="w-full h-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center space-y-4 p-8 w-full text-center">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center animate-bounce-slow">
                        <PaintBucket className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">
                        Minimal Portfolio Preview
                      </h3>
                      <p className="text-muted-foreground max-w-md">
                        Interactive preview will be displayed here. Choose a
                        template to start.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-12 animate-fade-in-up animation-delay-400">
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-primary">3000+</p>
              <p className="text-sm text-muted-foreground">
                Portfolios Created
              </p>
            </div>
            <div className="hidden md:block h-10 border-l border-border"></div>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-primary">89%</p>
              <p className="text-sm text-muted-foreground">
                Improved Job Success
              </p>
            </div>
            <div className="hidden md:block h-10 border-l border-border"></div>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-primary">12+</p>
              <p className="text-sm text-muted-foreground">
                Beautiful Templates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Need a Portfolio Section */}
      <section className="w-full py-16 md:py-24 bg-background dark:bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-sm px-3 py-1 rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors border-secondary/20">
              Career Boost
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Why Every Developer Needs a Portfolio
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              In today's competitive tech industry, your code repository isn't
              enough. Here's why a portfolio is your most powerful career tool:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-border/40 bg-card hover:shadow-lg hover:shadow-primary/5 transition-all hover:-translate-y-1 hover:border-primary/20 group">
              <CardHeader>
                <div className="bg-primary/10 rounded-full h-14 w-14 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                  <Trophy className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <CardTitle>Stand Out From Competition</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  With thousands of developers applying for the same positions,
                  a portfolio showcases what makes you unique and helps you get
                  noticed by recruiters.
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-xs text-muted-foreground gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>85% of hiring managers check portfolios</span>
                </div>
              </CardFooter>
            </Card>
            <Card className="border-border/40 bg-card hover:shadow-lg hover:shadow-primary/5 transition-all hover:-translate-y-1 hover:border-primary/20 group">
              <CardHeader>
                <div className="bg-primary/10 rounded-full h-14 w-14 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                  <Github className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <CardTitle>Showcase Beyond GitHub</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  GitHub shows code, but doesn't tell your story. A portfolio
                  highlights your problem-solving approach, project context, and
                  the impact of your work.
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-xs text-muted-foreground gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Context matters more than code alone</span>
                </div>
              </CardFooter>
            </Card>
            <Card className="border-border/40 bg-card hover:shadow-lg hover:shadow-primary/5 transition-all hover:-translate-y-1 hover:border-primary/20 group">
              <CardHeader>
                <div className="bg-primary/10 rounded-full h-14 w-14 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                  <Linkedin className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <CardTitle>Build Your Personal Brand</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A professional portfolio establishes you as an authority in
                  your field, opening doors to speaking opportunities,
                  collaborations, and better job offers.
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-xs text-muted-foreground gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>73% increase in networking opportunities</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="w-full py-16 md:py-20 bg-primary/5 dark:bg-primary/10 border-y border-border">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="flex flex-col items-center text-center space-y-2 group hover:-translate-y-1 transition-transform">
              <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">15min</h3>
              <p className="text-sm text-muted-foreground">
                Average Setup Time
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 group hover:-translate-y-1 transition-transform">
              <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">78%</h3>
              <p className="text-sm text-muted-foreground">
                More Interview Calls
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 group hover:-translate-y-1 transition-transform">
              <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">4.9/5</h3>
              <p className="text-sm text-muted-foreground">User Satisfaction</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 group hover:-translate-y-1 transition-transform">
              <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">92%</h3>
              <p className="text-sm text-muted-foreground">Growth in 2023</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose DevPlot Section */}
      <section className="w-full py-16 md:py-24 bg-background dark:bg-background relative">
        <div
          className="absolute inset-0 bg-grid-small-black/[0.1] dark:bg-grid-small-white/[0.1]"
          style={{
            maskImage:
              "radial-gradient(ellipse at center, black, transparent 70%)",
          }}
        />

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-sm px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors border-primary/20">
              Why DevPlot?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Why DevPlot is Your Best Choice
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              DevPlot isn't just another portfolio builder. It's designed
              specifically for developers, by developers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-card border-border/40 hover:shadow-lg hover:shadow-primary/5 transition-all hover:-translate-y-1 hover:border-primary/20 overflow-hidden group">
              <div className="h-1 w-full bg-gradient-to-r from-primary to-primary/50"></div>
              <CardHeader className="pb-2">
                <Rocket className="h-6 w-6 mb-2 text-primary group-hover:scale-110 transition-transform" />
                <CardTitle>Launch in Minutes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Don't waste weekends building from scratch. Our templates let
                  you create a professional portfolio in minutes.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border/40 hover:shadow-lg hover:shadow-primary/5 transition-all hover:-translate-y-1 hover:border-primary/20 overflow-hidden group">
              <div className="h-1 w-full bg-gradient-to-r from-primary/60 to-primary"></div>
              <CardHeader className="pb-2">
                <Code className="h-6 w-6 mb-2 text-primary group-hover:scale-110 transition-transform" />
                <CardTitle>Developer-Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built specifically for developers with code snippet
                  highlighting, GitHub integration, and tech stack showcasing.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border/40 hover:shadow-lg hover:shadow-primary/5 transition-all hover:-translate-y-1 hover:border-primary/20 overflow-hidden group">
              <div className="h-1 w-full bg-gradient-to-r from-primary to-primary/40"></div>
              <CardHeader className="pb-2">
                <PaintBucket className="h-6 w-6 mb-2 text-primary group-hover:scale-110 transition-transform" />
                <CardTitle>Fully Customizable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Make it yours with custom themes, layouts, and branding that
                  perfectly matches your personal style.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border/40 hover:shadow-lg hover:shadow-primary/5 transition-all hover:-translate-y-1 hover:border-primary/20 overflow-hidden group">
              <div className="h-1 w-full bg-gradient-to-r from-primary/30 to-primary"></div>
              <CardHeader className="pb-2">
                <Users className="h-6 w-6 mb-2 text-primary group-hover:scale-110 transition-transform" />
                <CardTitle>Recruiter-Approved</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Designed with input from tech recruiters to highlight exactly
                  what hiring managers are looking for.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="w-full py-16 md:py-24 bg-secondary/5 dark:bg-secondary/10 border-y border-border">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-sm px-3 py-1 rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors border-secondary/20">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Developers who leveled up their careers with DevPlot
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card border-border/40 hover:shadow-lg hover:shadow-secondary/5 transition-all relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-24 h-24 bg-secondary/10 rounded-br-full -translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>

              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 dark:bg-secondary/30 flex items-center justify-center">
                    <span className="text-secondary font-bold">AY</span>
                  </div>
                  <div>
                    <CardTitle className="text-base">Ahmet Yılmaz</CardTitle>
                    <CardDescription>Frontend Developer</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-secondary text-secondary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "After adding my DevPlot portfolio to my resume, I got
                  interview calls from three companies I'd been trying to get
                  into for months. I landed my dream job within weeks!"
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border/40 hover:shadow-lg hover:shadow-secondary/5 transition-all relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-24 h-24 bg-secondary/10 rounded-br-full -translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>

              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 dark:bg-secondary/30 flex items-center justify-center">
                    <span className="text-secondary font-bold">ED</span>
                  </div>
                  <div>
                    <CardTitle className="text-base">Elif Demir</CardTitle>
                    <CardDescription>Fullstack Developer</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-secondary text-secondary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "DevPlot helped me showcase my projects in a way that GitHub
                  couldn't. A recruiter specifically mentioned how impressed
                  they were with my portfolio during the interview."
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border/40 hover:shadow-lg hover:shadow-secondary/5 transition-all relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-24 h-24 bg-secondary/10 rounded-br-full -translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>

              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 dark:bg-secondary/30 flex items-center justify-center">
                    <span className="text-secondary font-bold">MK</span>
                  </div>
                  <div>
                    <CardTitle className="text-base">Mehmet Kaya</CardTitle>
                    <CardDescription>Backend Developer</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-secondary text-secondary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "As a backend developer, I struggled to show my work visually.
                  DevPlot's architecture diagrams and API documentation features
                  helped me demonstrate my skills effectively."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-primary to-primary/80 dark:from-primary/90 dark:to-primary/70 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay"></div>

        {/* Animated circles */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float-slow opacity-60"></div>
        <div className="absolute top-1/2 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-float-medium opacity-40"></div>

        <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Start Building Your Future Today
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            Join thousands of developers who are getting noticed, landing
            interviews, and advancing their careers with DevPlot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up" className="flex items-center gap-2">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 shadow-lg shadow-black/10 border-none font-medium hover:scale-105 transition-transform w-full"
              >
                Create Your Portfolio
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/themes" className="flex items-center gap-2">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white bg-white/10 hover:bg-white/20 hover:text-white w-full"
              >
                Browse Themes <Eye className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20 hover:bg-white/20 transition-colors hover:-translate-y-1 cursor-pointer">
              <p className="text-xl font-bold">Seamless</p>
              <p className="text-xs text-primary-foreground/80">
                GitHub Integration
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20 hover:bg-white/20 transition-colors hover:-translate-y-1 cursor-pointer">
              <p className="text-xl font-bold">Responsive</p>
              <p className="text-xs text-primary-foreground/80">
                Mobile-First Design
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20 hover:bg-white/20 transition-colors hover:-translate-y-1 cursor-pointer">
              <p className="text-xl font-bold">Optimized</p>
              <p className="text-xs text-primary-foreground/80">
                SEO Performance
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20 hover:bg-white/20 transition-colors hover:-translate-y-1 cursor-pointer">
              <p className="text-xl font-bold">Secure</p>
              <p className="text-xs text-primary-foreground/80">
                Data Protection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 md:py-24 bg-background dark:bg-background relative">
        <div
          className="absolute inset-0 bg-grid-small-black/[0.1] dark:bg-grid-small-white/[0.1]"
          style={{
            maskImage:
              "radial-gradient(ellipse at center, black, transparent 70%)",
          }}
        />

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-sm px-3 py-1 rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors border-secondary/20">
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know about DevPlot
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem
                value="item-1"
                className="border rounded-lg border-primary/10 px-1 shadow-sm overflow-hidden bg-gradient-to-r from-card to-card/80 hover:from-primary/5 hover:to-card transition-all"
              >
                <AccordionTrigger className="text-left text-lg font-medium py-4 px-4 [&[data-state=open]>div>svg]:text-primary [&[data-state=open]]:text-primary">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Code2 className="h-5 w-5 text-primary" />
                    </div>
                    How does DevPlot work?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-1 pb-4 px-12">
                  <div className="border-l-2 border-primary/20 pl-4 animate-fadeIn">
                    DevPlot helps you create a professional portfolio in
                    minutes. Choose from our templates, import your GitHub
                    projects, customize your layout, and publish your portfolio
                    with a custom domain.
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="border rounded-lg border-primary/10 px-1 shadow-sm overflow-hidden bg-gradient-to-r from-card to-card/80 hover:from-primary/5 hover:to-card transition-all"
              >
                <AccordionTrigger className="text-left text-lg font-medium py-4 px-4 [&[data-state=open]>div>svg]:text-primary [&[data-state=open]]:text-primary">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <HelpCircle className="h-5 w-5 text-primary" />
                    </div>
                    Do I need coding skills to use DevPlot?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-1 pb-4 px-12">
                  <div className="border-l-2 border-primary/20 pl-4 animate-fadeIn">
                    Not at all! We've designed DevPlot to be accessible to
                    developers of all skill levels. Our intuitive interface
                    makes it easy to create a professional portfolio without
                    writing a single line of additional code.
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="border rounded-lg border-primary/10 px-1 shadow-sm overflow-hidden bg-gradient-to-r from-card to-card/80 hover:from-primary/5 hover:to-card transition-all"
              >
                <AccordionTrigger className="text-left text-lg font-medium py-4 px-4 [&[data-state=open]>div>svg]:text-primary [&[data-state=open]]:text-primary">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    Can I use my own domain?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-1 pb-4 px-12">
                  <div className="border-l-2 border-primary/20 pl-4 animate-fadeIn">
                    Yes! You can use our free subdomain
                    (yourusername.devplot.io) or connect your own custom domain.
                    We provide easy-to-follow instructions for setting up your
                    domain with most popular registrars.
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="border rounded-lg border-primary/10 px-1 shadow-sm overflow-hidden bg-gradient-to-r from-card to-card/80 hover:from-primary/5 hover:to-card transition-all"
              >
                <AccordionTrigger className="text-left text-lg font-medium py-4 px-4 [&[data-state=open]>div>svg]:text-primary [&[data-state=open]]:text-primary">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    Is my data secure?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-1 pb-4 px-12">
                  <div className="border-l-2 border-primary/20 pl-4 animate-fadeIn">
                    Absolutely. We take security very seriously. Your data is
                    encrypted and stored securely. We never share your
                    information with third parties, and we use industry-standard
                    security practices to protect your account.
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="border rounded-lg border-primary/10 px-1 shadow-sm overflow-hidden bg-gradient-to-r from-card to-card/80 hover:from-primary/5 hover:to-card transition-all"
              >
                <AccordionTrigger className="text-left text-lg font-medium py-4 px-4 [&[data-state=open]>div>svg]:text-primary [&[data-state=open]]:text-primary">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    How much does DevPlot cost?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-1 pb-4 px-12">
                  <div className="border-l-2 border-primary/20 pl-4 animate-fadeIn">
                    DevPlot offers both free and premium plans. The free plan
                    includes all the essential features to get started, while
                    premium plans offer advanced customization, analytics, and
                    multiple portfolio options. Check our pricing page for
                    details.
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-6"
                className="border rounded-lg border-primary/10 px-1 shadow-sm overflow-hidden bg-gradient-to-r from-card to-card/80 hover:from-primary/5 hover:to-card transition-all"
              >
                <AccordionTrigger className="text-left text-lg font-medium py-4 px-4 [&[data-state=open]>div>svg]:text-primary [&[data-state=open]]:text-primary">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <GitBranch className="h-5 w-5 text-primary" />
                    </div>
                    Can I integrate with GitHub and other platforms?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-1 pb-4 px-12">
                  <div className="border-l-2 border-primary/20 pl-4 animate-fadeIn">
                    Yes! DevPlot seamlessly integrates with GitHub to import
                    your projects. We also support integrations with LinkedIn,
                    Stack Overflow, and other developer platforms to showcase
                    your full technical profile.
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-black text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <Link href="#" className="text-sm text-gray-400 hover:text-white">
              About Us
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white">
              Pricing
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white">
              FAQ
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white">
              Contact
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-400 hover:text-white flex items-center"
            >
              LinkedIn <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
          </div>
          <div className="border-t border-gray-800 pt-2 flex justify-between items-center">
            <div className="flex items-center">
              <Logo />
              <span className="text-sm">DevPlot</span>
            </div>
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} DevPlot. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
