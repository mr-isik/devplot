import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Clock,
  MessageSquare,
  Palette,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { createClient } from "@/utils/supabase/server";
import { Hero } from "@/components/landing/Hero";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { PricingSection } from "@/components/landing/PricingSection";
import { UsageStats } from "@/components/landing/UsageStats";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";

export async function generateMetadata() {
  return {
    title: "DevPlot - Developer Portfolio Builder",
    description:
      "Stand out in the tech industry with a professional portfolio that showcases your skills and projects - built in minutes",
  };
}

export default async function Index() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={data.user} />

      {/* Hero Section */}
      <Hero />

      {/* Feature Showcase Section */}
      <FeatureShowcase />

      {/* Usage Statistics TODO: Add this back in later*/}
      {/* <UsageStats /> */}

      {/* Why You Need a Portfolio Section */}
      <section className="w-full py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-small-black/[0.03] dark:bg-grid-small-white/[0.03]"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-accent/10 to-transparent rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/10 to-transparent rounded-full filter blur-3xl opacity-50"></div>

        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 px-3 py-1 text-sm">Why Portfolio?</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why employers value{" "}
              <span className="text-primary">portfolios</span>
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              A strong portfolio is the most effective way to stand out in the
              coding world and land your dream job.
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass dark:glass-dark backdrop-blur-sm border border-border/40 card-hover animate-fade-in">
              <CardHeader>
                <div className="size-12 flex items-center justify-center mb-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-border/30">
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

            <Card className="glass dark:glass-dark backdrop-blur-sm border border-border/40 card-hover animate-fade-in animation-delay-100">
              <CardHeader>
                <div className="size-12 flex items-center justify-center mb-4 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-border/30">
                  <Star className="h-6 w-6 text-accent" />
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

            <Card className="glass dark:glass-dark backdrop-blur-sm border border-border/40 card-hover animate-fade-in animation-delay-200">
              <CardHeader>
                <div className="size-12 flex items-center justify-center mb-4 rounded-lg bg-gradient-to-br from-chart-5/10 to-chart-5/5 border border-border/30">
                  <Users className="h-6 w-6 text-chart-5" />
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

          <div className="mt-16 glass dark:glass-dark backdrop-blur-sm p-6 md:p-8 rounded-xl border border-border/40 max-w-3xl mx-auto animate-fade-in animation-delay-300 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            {/* Animated gradient backgrounds */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>

            {/* Animated border effects */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6 relative z-10">
              <div className="size-14 rounded-full bg-gradient-to-br from-primary to-accent p-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <div className="size-full rounded-full bg-background flex items-center justify-center text-primary-foreground">
                  <Code2 className="size-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                  Scientific fact
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-muted-foreground">
                    An impressive portfolio results in
                  </p>
                  <div className="px-2 py-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-md text-foreground font-semibold">
                    32% more callbacks
                  </div>
                  <p className="text-muted-foreground">on job applications</p>
                </div>
              </div>
            </div>

            <blockquote className="relative border-l-4 border-accent pl-4 py-2 italic text-foreground/90 group-hover:pl-6 transition-all duration-300">
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 size-4 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              "In the talent acquisition battle, a strong developer portfolio is
              the most effective tool above all else. Seeing candidates' code
              and projects provides evidence of consistent growth and real-world
              experience."
              <div className="absolute right-0 bottom-0 size-20 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
            </blockquote>

            <div className="mt-4 text-sm text-right text-muted-foreground flex items-center justify-end gap-2 relative z-10">
              <div className="size-6 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Trophy className="size-3 text-foreground" />
              </div>
              <span>Tech Recruitment Specialist</span>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Preview Section */}
      <section className="w-full py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-small-black/[0.03] dark:bg-grid-small-white/[0.03]"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/20 rounded-full filter blur-3xl opacity-20"></div>

        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 px-3 py-1 text-sm">
              <Palette className="h-3.5 w-3.5 mr-1.5" />
              Themes
            </Badge>
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
                badge: "Popular",
                badgeColor: "bg-primary",
                gradientFrom: "from-primary/30",
                gradientTo: "to-primary/5",
                image: "/themes/minimal-theme-thumbnail.jpg",
                icon: <Code className="h-5 w-5" />,
              },
              {
                title: "Modern",
                description: "Code-focused & modern-style",
                badge: "Professional",
                badgeColor: "bg-accent",
                gradientFrom: "from-accent/30",
                gradientTo: "to-accent/5",
                image: "/themes/modern-theme-thumbnail.jpg",
                icon: <Code2 className="h-5 w-5" />,
              },
              {
                title: "Creative",
                description: "Bold and colorful layout",
                badge: "New",
                badgeColor: "bg-chart-5",
                gradientFrom: "from-chart-5/30",
                gradientTo: "to-chart-5/5",
                image: "/themes/creative-theme-thumbnail.jpg",
                icon: <PaintBucket className="h-5 w-5" />,
              },
            ].map((theme, i) => (
              <div
                key={i}
                className="group relative rounded-xl border border-border/40 overflow-hidden animate-fade-in transition-all duration-300 hover:shadow-xl"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Card background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-sm z-0"></div>

                {/* Top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Animated gradient background */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientTo} opacity-10 group-hover:opacity-20 blur-xl transition-opacity duration-500 group-hover:scale-105 z-0`}
                ></div>

                <div className="relative h-52 bg-gradient-to-br from-muted/80 to-muted/40 flex items-center justify-center px-6 z-10 overflow-hidden border-b border-border/20">
                  {/* Animated particles */}
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`absolute size-2 rounded-full ${theme.badgeColor} opacity-20 animate-float-${idx % 3 === 0 ? "slow" : idx % 3 === 1 ? "medium" : "fast"}`}
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                      }}
                    ></div>
                  ))}

                  {theme.badge && (
                    <div className="absolute top-2 right-2 z-20">
                      <Badge
                        variant="default"
                        className={`${theme.badgeColor} text-primary-foreground px-2 py-0.5 text-xs rounded-md shadow-sm animate-pulse-glow`}
                      >
                        {theme.badge}
                      </Badge>
                    </div>
                  )}

                  <div className="w-full max-w-[280px] h-36 rounded-md backdrop-blur-lg shadow-lg relative overflow-hidden group-hover:scale-105 transition-transform duration-500 border border-border/30">
                    <Image
                      src={theme.image}
                      alt={theme.title}
                      width={280}
                      height={144}
                      className="w-full h-full object-cover object-top absolute inset-0"
                    />

                    {/* Theme icon overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/60 opacity-0 group-hover:opacity-90 flex items-center justify-center transition-opacity duration-300">
                      <div
                        className={`size-12 rounded-full ${theme.badgeColor} flex items-center justify-center text-white`}
                      >
                        {theme.icon}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative p-6 z-10 bg-gradient-to-b from-transparent to-background/5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                      {theme.title}
                    </h3>
                    <div
                      className={`size-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme.badgeColor} text-white`}
                    >
                      <Eye className="size-4" />
                    </div>
                  </div>
                  <p className="text-sm text-foreground/70 mb-4 group-hover:text-foreground/90 transition-colors">
                    {theme.description}
                  </p>
                  <Link
                    href="/themes"
                    className="block w-full group-hover:scale-105 transition-transform duration-300"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:border-primary/50 transition-colors relative overflow-hidden"
                    >
                      <span className="relative z-10">Preview</span>
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                      ></div>
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link href="/themes">
              <Button
                size="lg"
                variant="glass"
                className="group animate-pulse-glow"
                rounded="lg"
              >
                Explore All Themes
                <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="w-full py-20 relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-grid-small-black/[0.03] dark:bg-grid-small-white/[0.03]"></div>

        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 px-3 py-1 text-sm">How It Works</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Create an <span className="text-primary">impressive</span>{" "}
              portfolio in three simple steps
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              DevPlot simplifies the portfolio creation process. No complex
              coding or design knowledge required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-8 -z-10 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary via-accent to-chart-5"></div>

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
              <div
                key={i}
                className="flex flex-col items-center text-center animate-fade-in"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="relative mb-6">
                  <div className="size-16 rounded-full glass dark:glass-dark backdrop-blur-md flex items-center justify-center border border-border/50 shadow-lg z-10">
                    {item.icon}
                  </div>
                  <div className="absolute size-16 rounded-full bg-primary/10 dark:bg-primary/5 -z-10 blur-md"></div>
                  <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-full bg-gradient-to-br from-primary/20 via-accent/20 to-chart-5/20 -z-20 blur-sm animate-pulse-glow"></div>
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
              <Button
                variant="gradient"
                size="lg"
                className="shadow-lg"
                rounded="lg"
              >
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* FAQ Section */}
      <section className="w-full py-20 bg-gradient-to-br from-accent/5 via-background to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-small-black/[0.03] dark:bg-grid-small-white/[0.03]"></div>

        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 px-3 py-1 text-sm">
              <HelpCircle className="h-3.5 w-3.5 mr-1.5" />
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-foreground/80">
              Answers to common questions about DevPlot
            </p>
          </div>

          <div className="max-w-3xl mx-auto glass dark:glass-dark backdrop-blur-sm rounded-xl border border-border/40 p-1">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "Do I need to know coding to use DevPlot?",
                  answer:
                    "No, DevPlot can be used with zero coding knowledge. Our interface works on a drag-and-drop basis and provides everything you need to create a professional portfolio. Of course, if you know coding, you can add custom CSS and HTML to further customize your portfolio.",
                },
                {
                  question: "How can I customize my portfolio?",
                  answer:
                    "DevPlot offers various customization options including themes, colors, fonts, and layout arrangements. With the Pro package, you can make your own design with fully custom CSS or modify existing themes.",
                },
                {
                  question: "Can I automatically import my GitHub projects?",
                  answer:
                    "Yes, DevPlot can connect to your GitHub account and import your repositories directly to your portfolio. The system automatically pulls repo descriptions and language statistics and displays them in your portfolio.",
                },
                {
                  question: "Can I use my own domain name?",
                  answer:
                    "Yes, you can use a custom domain name with our Pro and Team packages. You can connect an existing domain or purchase a new one through DevPlot.",
                },
                {
                  question: "Can I update my portfolio after creating it?",
                  answer:
                    "Absolutely! You can edit your portfolio at any time, add new projects, or update existing ones. Your changes are published instantly, keeping your portfolio always up-to-date.",
                },
                {
                  question: "What happens if I want to cancel?",
                  answer:
                    "You can cancel your subscription at any time with no penalty. You'll continue to have access to all premium features until the end of your payment period. After cancellation, your account will automatically downgrade to the free plan where you can access limited features.",
                },
              ].map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-border/30"
                >
                  <AccordionTrigger className="text-lg font-medium py-4 px-4 hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-1 text-foreground/80">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg mb-8">Have more questions? Contact us:</p>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                <MessageSquare className="h-5 w-5 mr-2" />
                Contact
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-20 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto text-center z-30">
          <Badge
            variant="outline"
            className="mb-6 px-4 py-1.5 text-lg border-primary/30 bg-background/50 backdrop-blur-sm"
          >
            <Sparkles className="h-5 w-5 mr-2 text-primary" />
            Invest in Your Future
          </Badge>

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
              <Button
                variant="gradient"
                size="lg"
                className="shadow-lg animate-pulse-glow px-8"
                rounded="xl"
              >
                <Zap className="h-5 w-5 mr-2" />
                Start Building
              </Button>
            </Link>
            <Link href="/themes">
              <Button
                variant="glass"
                size="lg"
                className="px-8 z-10"
                rounded="xl"
              >
                View Themes
              </Button>
            </Link>
          </div>

          <p className="text-sm text-foreground/60 animate-fade-in animation-delay-500">
            Easy to cancel • 14-day money-back guarantee
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
