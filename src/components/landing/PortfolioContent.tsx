import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Sparkles, Trophy, Palette, Users } from "lucide-react";

export function PortfolioContent() {
  return (
    <section className="w-full py-20 bg-muted/10">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Showcase your <span className="text-primary">best work</span>
          </h2>
          <p className="text-lg text-foreground/80 mb-8">
            Build a comprehensive portfolio that highlights your skills and
            achievements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "About Me",
              description:
                "Share your story, passion for coding, and what makes you unique as a developer",
              icon: <Users className="h-6 w-6" />,
              badge: "Essential",
            },
            {
              title: "Projects",
              description:
                "Showcase your best work with detailed case studies, live demos, and GitHub links",
              icon: <Code2 className="h-6 w-6" />,
              badge: "Featured",
            },

            {
              title: "Skills & Technologies",
              description:
                "Highlight your technical expertise with skill bars and technology stacks",
              icon: <Sparkles className="h-6 w-6" />,
              badge: "Essential",
            },
            {
              title: "Experience",
              description:
                "Detail your professional journey with timeline-based work history",
              icon: <Trophy className="h-6 w-6" />,
              badge: "Key",
            },
            {
              title: "Education",
              description:
                "Display your academic background and certifications",
              icon: <Palette className="h-6 w-6" />,
              badge: "Important",
            },
            {
              title: "Contact Info",
              description:
                "Make it easy for recruiters to reach out with your contact details",
              icon: <Users className="h-6 w-6" />,
              badge: "Essential",
            },
          ].map((item, i) => (
            <Card
              key={i}
              className="border border-border/40 hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="size-12 flex items-center justify-center rounded-lg bg-muted">
                    {item.icon}
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    {item.badge}
                  </Badge>
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
