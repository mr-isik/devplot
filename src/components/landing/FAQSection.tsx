import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageSquare } from "lucide-react";
import Link from "next/link";

const FAQSection = () => {
  return (
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
  );
};

export default FAQSection;
