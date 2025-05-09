import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, ZapIcon, Sparkles, Star } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Free",
    description:
      "Perfect for getting started, access to basic portfolio features",
    price: "$0",
    priceText: "free forever",
    features: [
      "1 portfolio creation",
      "5 projects",
      "Basic themes",
      "DevPlot branding",
      "Community support",
    ],
    buttonText: "Start Free",
    buttonVariant: "outline" as const,
    href: "/sign-up",
    gradient: "from-muted-foreground/10 via-muted-foreground/5 to-transparent",
    icon: <Star className="size-4 text-muted-foreground" />,
  },
  {
    name: "Pro",
    description: "Most popular option for professional developers",
    price: "$19",
    priceText: "per month",
    badge: "Popular",
    features: [
      "5 portfolio creations",
      "Unlimited projects",
      "All premium themes",
      "Custom domain",
      "AI content generation",
      "GitHub integration",
      "SEO optimization",
      "Priority support",
    ],
    buttonText: "Upgrade to Pro",
    buttonVariant: "glow" as const,
    href: "/sign-up?plan=pro",
    featured: true,
    gradient: "from-primary/30 via-accent/20 to-transparent",
    icon: <ZapIcon className="size-4 text-primary" />,
  },
  {
    name: "Team",
    description: "Top-tier features for large teams and companies",
    price: "$39",
    priceText: "per month",
    features: [
      "10 team members",
      "Unlimited portfolios",
      "Unlimited projects",
      "All premium themes",
      "Multiple custom domains",
      "AI content generation",
      "Team management panel",
      "Advanced analytics",
      "24/7 priority support",
    ],
    buttonText: "View Team Plan",
    buttonVariant: "default" as const,
    href: "/contact",
    gradient: "from-chart-5/20 via-chart-5/10 to-transparent",
    icon: <Sparkles className="size-4 text-chart-5" />,
  },
];

export function PricingSection() {
  return (
    <section className="w-full py-20 bg-muted/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-small-black/[0.05] dark:bg-grid-small-white/[0.05]"></div>
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-br from-primary/20 to-primary/0 blur-3xl opacity-50 rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-br from-accent/20 to-accent/0 blur-3xl opacity-50 rounded-full"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-sm">
            Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Invest in your career
          </h2>
          <p className="text-lg text-foreground/80 mb-8">
            Choose a plan that fits your needs - a good portfolio always pays
            for itself.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden animate-fade-in group transition-all duration-300 ${
                tier.featured
                  ? "border-primary/30 shadow-lg hover:shadow-xl"
                  : "border-border/80 hover:shadow-md"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card background effects */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-30 group-hover:opacity-50 transition-opacity duration-500`}
              ></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Animated background orbs */}
              <div className="absolute -bottom-16 -right-16 size-32 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              <div className="absolute -top-16 -left-16 size-32 rounded-full bg-gradient-to-br from-accent/20 to-transparent blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>

              {tier.badge && (
                <div className="absolute top-0 right-0 z-10">
                  <Badge
                    variant="default"
                    className="rounded-tl-none rounded-br-none m-0 px-3 py-1 bg-primary/90 animate-pulse-glow shadow-sm"
                  >
                    {tier.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    {tier.name}
                    <div className="size-6 rounded-full flex items-center justify-center bg-gradient-to-br from-background to-muted p-1 group-hover:scale-110 transition-transform">
                      {tier.icon}
                    </div>
                  </CardTitle>

                  <div className="size-8 rounded-full glass dark:glass-dark backdrop-blur-md flex items-center justify-center border border-border/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="size-5 rounded-full bg-gradient-to-br from-primary to-accent opacity-80"></div>
                  </div>
                </div>
                <CardDescription className="text-foreground/70 group-hover:text-foreground/90 transition-colors">
                  {tier.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 relative z-10">
                <div className="flex items-baseline text-foreground">
                  <span className="text-4xl font-bold group-hover:text-primary transition-colors">
                    {tier.price}
                  </span>
                  <span className="ml-2 text-sm text-foreground/70">
                    / {tier.priceText}
                  </span>
                </div>
                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-foreground group-hover:translate-x-1 transition-transform duration-300 opacity-80 hover:opacity-100"
                      style={{ transitionDelay: `${idx * 50}ms` }}
                    >
                      <CheckCircle2 className="h-5 w-5 mr-3 flex-shrink-0 text-chart-5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="relative z-10">
                <Link href={tier.href} className="w-full">
                  <Button
                    variant={tier.buttonVariant}
                    size="lg"
                    className="w-full group-hover:shadow-md transition-shadow duration-300"
                    rounded={tier.featured ? "lg" : "default"}
                  >
                    {tier.buttonText}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center glass dark:glass-dark p-6 md:p-8 rounded-xl border border-border/40 max-w-3xl mx-auto backdrop-blur-md hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-chart-5/5 rounded-xl opacity-30"></div>
          <h3 className="text-xl md:text-2xl font-semibold mb-4 relative z-10">
            Have special requirements?
          </h3>
          <p className="text-foreground/80 mb-6 relative z-10">
            We offer custom plans for partners, educational institutions, or
            special requirements.
          </p>
          <Link href="/contact" className="relative z-10">
            <Button variant="outline" size="lg" className="group">
              Contact Us
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-md"></div>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
