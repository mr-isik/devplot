import { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Privacy Policy | DevPlot",
  description:
    "DevPlot privacy policy and information about personal data protection.",
};

export default function PrivacyPolicyPage() {
  return (
    <Container>
      <div className="py-16">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              At DevPlot, the security and privacy of your personal data is
              important to us. This privacy policy explains how we collect, use,
              store, and share your personal data as a data controller under the
              Personal Data Protection Law No. 6698 ("PDPL").
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Collected Data</h2>
            <p>
              When using our services, we may collect the following personal
              data:
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>Identity information such as name, surname, email address</li>
              <li>Contact information</li>
              <li>Usage statistics and preferences</li>
              <li>
                Education, work experience, project informations, skills,
                personal informations
              </li>
              <li>
                Technical data (IP address, browser information, device
                information)
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              3. Purpose of Data Usage
            </h2>
            <p>We use the collected data for the following purposes:</p>
            <ul className="list-disc pl-6 mt-4">
              <li>To provide and improve our services</li>
              <li>To manage user accounts</li>
              <li>Security and fraud prevention</li>
              <li>To fulfill our legal obligations</li>
              <li>To improve user experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p>
              We take appropriate technical and administrative measures for the
              security of your personal data. Your data is stored encrypted and
              protected against unauthorized access.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Data Sharing</h2>
            <p>
              Your personal data is not shared with third parties except for
              legal obligations. Sharing with our service providers is carried
              out within the scope of data processing agreements and in
              compliance with PDPL.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p>Under PDPL, you have the following rights:</p>
            <ul className="list-disc pl-6 mt-4">
              <li>Learn whether your personal data is being processed</li>
              <li>
                Request information if your personal data has been processed
              </li>
              <li>
                Learn the purpose of processing your personal data and whether
                it is used in accordance with its purpose
              </li>
              <li>
                Know the third parties to whom your personal data is transferred
                domestically or abroad
              </li>
              <li>
                Request correction if your personal data is incomplete or
                incorrectly processed
              </li>
              <li>
                Request deletion or destruction of your personal data within the
                framework of the conditions stipulated in Article 7 of PDPL
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
            <p>
              For questions or requests regarding our privacy policy, you can
              contact us at{" "}
              <a
                href="mailto:privacy@devplot.com"
                className="text-primary hover:underline"
              >
                privacy@devplot.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Updates</h2>
            <p>
              This privacy policy may be updated periodically. You will be
              notified of any significant changes.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
