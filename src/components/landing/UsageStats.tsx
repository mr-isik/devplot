import { BarChart3, Code2, GlobeIcon, Trophy, Users } from "lucide-react";

const stats = [
  {
    value: "3,000+",
    label: "Portfolios Created",
    description: "Successful portfolios created by developers",
    icon: <Code2 className="h-5 w-5 text-primary" />,
    color: "from-primary/10 to-transparent",
    accent: "bg-primary",
  },
  {
    value: "89%",
    label: "Job Success Rate",
    description: "Rate of DevPlot users receiving job offers",
    icon: <Trophy className="h-5 w-5 text-chart-5" />,
    color: "from-chart-5/10 to-transparent",
    accent: "bg-chart-5",
  },
  {
    value: "5+",
    label: "Premium Themes",
    description: "Professional-looking unique theme options",
    icon: <GlobeIcon className="h-5 w-5 text-accent" />,
    color: "from-accent/10 to-transparent",
    accent: "bg-accent",
  },
  {
    value: "15K+",
    label: "Active Users",
    description: "Active developers in Turkey and worldwide",
    icon: <Users className="h-5 w-5 text-chart-3" />,
    color: "from-chart-3/10 to-transparent",
    accent: "bg-chart-3",
  },
];

export function UsageStats() {
  return (
    <section className="w-full py-16 bg-muted/20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-small-black/[0.03] dark:bg-grid-small-white/[0.03]"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/20 rounded-full filter blur-3xl opacity-20"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-8 items-start">
          <div className="max-w-md">
            <BarChart3 className="h-8 w-8 text-primary mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-primary">DevPlot</span> in Numbers
            </h2>
            <p className="text-lg text-foreground/80 mb-6">
              Thousands of developers trust DevPlot to create their portfolios
              and advance their careers.
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 flex-1 w-full">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative backdrop-blur-sm rounded-xl border border-border/40 overflow-hidden transition-all duration-300 hover:shadow-xl animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card background with gradient and glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/60 z-0"></div>

                {/* Top accent line with animation */}
                <div
                  className={`absolute top-0 left-0 h-1 w-full ${stat.accent} opacity-70 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                ></div>

                {/* Glowing orb background effect */}
                <div
                  className={`absolute top-1/2 right-0 w-32 h-32 bg-gradient-to-br ${stat.color.replace("10", "30")} rounded-full -translate-y-1/2 translate-x-1/2 filter blur-xl opacity-10 group-hover:opacity-30 group-hover:scale-125 transition-all duration-500 z-0`}
                ></div>

                {/* Content */}
                <div className="p-6 relative z-10">
                  <div className={`flex items-center justify-between mb-4`}>
                    <div className="bg-gradient-to-r p-2 rounded-lg border border-border/30 group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-md">
                      <div className="glass dark:glass-dark rounded-lg flex items-center justify-center p-1">
                        {stat.icon}
                      </div>
                    </div>
                    <div
                      className={`h-8 w-24 bg-gradient-to-r ${stat.color} rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-300`}
                    ></div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {stat.value}
                  </h3>
                  <div className="text-sm font-medium text-primary mb-2 group-hover:scale-105 transition-transform origin-left">
                    {stat.label}
                  </div>
                  <p className="text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors">
                    {stat.description}
                  </p>

                  {/* Subtle hover indicator */}
                  <div className="absolute bottom-3 right-3 size-6 rounded-full border border-border/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/50 backdrop-blur-sm">
                    <div className={`size-3 rounded-full ${stat.accent}`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
