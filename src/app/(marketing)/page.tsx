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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10 dark:from-background dark:via-background/90 dark:to-primary/10 border-b border-border relative overflow-hidden">
        <div
          className="absolute inset-0 bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]"
          style={{
            maskImage:
              "radial-gradient(circle at center, black, transparent 80%)",
          }}
        />

        <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center z-10 relative">
          <Badge className="mb-4 text-sm px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors border-primary/20">
            Developer-First Portfolio Platform
          </Badge>
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary dark:from-primary dark:to-secondary/80">
              Showcase Your Code. <br /> Advance Your Career.
            </h1>
            <p className="max-w-[700px] text-lg md:text-xl text-foreground/80 dark:text-foreground/80 mx-auto">
              Build a professional developer portfolio in minutes, not weeks.
              <span className="font-medium text-primary">
                {" "}
                Stand out from the crowd
              </span>{" "}
              and land your dream job.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all group"
            >
              <Link href="/auth/register" className="flex items-center gap-2">
                Start Building Free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/20 hover:bg-primary/10 hover:text-primary"
            >
              <Link href="/examples" className="flex items-center gap-2">
                View Examples <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur-sm opacity-70 animate-pulse"></div>
            <div className="aspect-[16/9] w-full relative bg-card dark:bg-card rounded-xl overflow-hidden border-2 border-border/50 shadow-2xl">
              <Tabs defaultValue="portfolio1" className="w-full h-full">
                <TabsList className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-background/80 backdrop-blur-sm border border-border/50">
                  <TabsTrigger value="portfolio1">Modern</TabsTrigger>
                  <TabsTrigger value="portfolio2">Classic</TabsTrigger>
                  <TabsTrigger value="portfolio3">Minimal</TabsTrigger>
                </TabsList>
                <TabsContent value="portfolio1" className="w-full h-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center space-y-4 p-8 w-full text-center">
                      <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
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
                      <div className="h-16 w-16 rounded-full bg-secondary/20 flex items-center justify-center">
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
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
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

          <div className="flex items-center justify-center gap-8 mt-12">
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-primary">3000+</p>
              <p className="text-sm text-muted-foreground">
                Portfolios Created
              </p>
            </div>
            <div className="h-10 border-l border-border"></div>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-primary">89%</p>
              <p className="text-sm text-muted-foreground">
                Improved Job Success
              </p>
            </div>
            <div className="h-10 border-l border-border"></div>
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
            <Card className="border-border/40 bg-card hover:shadow-lg hover:shadow-primary/5 transition-all hover:-translate-y-1 hover:border-primary/20">
              <CardHeader>
                <Trophy className="h-10 w-10 mb-2 text-primary" />
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
            <Card className="border-border/40 bg-card hover:shadow-lg hover:shadow-primary/5 transition-all hover:-translate-y-1 hover:border-primary/20">
              <CardHeader>
                <Github className="h-10 w-10 mb-2 text-primary" />
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
            <Card className="border-border/40 bg-card hover:shadow-lg hover:shadow-primary/5 transition-all hover:-translate-y-1 hover:border-primary/20">
              <CardHeader>
                <Linkedin className="h-10 w-10 mb-2 text-primary" />
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
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-primary/10 p-3 rounded-full">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">15min</h3>
              <p className="text-sm text-muted-foreground">
                Average Setup Time
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-primary/10 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">78%</h3>
              <p className="text-sm text-muted-foreground">
                More Interview Calls
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-primary/10 p-3 rounded-full">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">4.9/5</h3>
              <p className="text-sm text-muted-foreground">User Satisfaction</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-primary/10 p-3 rounded-full">
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
        <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Start Building Your Future Today
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            Join thousands of developers who are getting noticed, landing
            interviews, and advancing their careers with DevPlot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 shadow-lg shadow-black/10 border-none font-medium"
            >
              <Link href="/auth/register" className="flex items-center gap-2">
                Create Your Portfolio
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white bg-white/10 hover:bg-white/20 hover:text-white"
            >
              <Link href="/examples" className="flex items-center gap-2">
                Browse Examples <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
              <p className="text-xl font-bold">Seamless</p>
              <p className="text-xs text-primary-foreground/80">
                GitHub Integration
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
              <p className="text-xl font-bold">Responsive</p>
              <p className="text-xs text-primary-foreground/80">
                Mobile-First Design
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
              <p className="text-xl font-bold">Optimized</p>
              <p className="text-xs text-primary-foreground/80">
                SEO Performance
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
              <p className="text-xl font-bold">Secure</p>
              <p className="text-xs text-primary-foreground/80">
                Data Protection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with disclaimer */}
      <footer className="w-full py-8 bg-background dark:bg-background border-t border-border">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-medium mb-3">DevPlot</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DevPlot. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
