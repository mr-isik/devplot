import { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Terms of Use | DevPlot",
  description: "DevPlot platform terms of use and conditions.",
};

export default function TermsOfUsePage() {
  return (
    <Container>
      <div className="py-16">
        <h1 className="text-4xl font-bold mb-8">Terms of Use</h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              1. General Provisions
            </h2>
            <p>
              By using the DevPlot platform, you are deemed to have accepted
              these terms of use. These terms constitute a legal agreement
              governing your use of our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Service Usage</h2>
            <p>
              When using our platform, you agree to comply with the following
              rules:
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>Provide accurate and up-to-date information</li>
              <li>Maintain your account security</li>
              <li>Comply with laws and ethical rules</li>
              <li>Respect the rights of other users</li>
              <li>Not compromise platform security</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              3. Intellectual Property Rights
            </h2>
            <p>
              All content on our platform (software, design, text, images, etc.)
              is the intellectual property of DevPlot. Unauthorized use,
              copying, or distribution of this content is prohibited.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. User Content</h2>
            <p>
              You are responsible for the content you share on our platform.
              Your content must comply with laws and ethical rules.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Service Changes</h2>
            <p>
              DevPlot reserves the right to modify, update, or terminate its
              services without prior notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              6. Limitation of Liability
            </h2>
            <p>
              DevPlot does not guarantee that the platform will operate without
              interruption or error. Users use the platform at their own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              7. Account Termination
            </h2>
            <p>
              DevPlot reserves the right to suspend or permanently close
              accounts that violate the terms of use.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              8. Dispute Resolution
            </h2>
            <p>
              Disputes arising from these terms of use are subject to the laws
              of the Republic of Turkey, and Istanbul Courts and Execution
              Offices have jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
            <p>
              For questions regarding the terms of use, you can contact us at{" "}
              <a
                href="mailto:legal@devplot.com"
                className="text-primary hover:underline"
              >
                legal@devplot.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
