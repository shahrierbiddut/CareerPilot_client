import ContactPageClient from "./ContactPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | CareerPilot AI",
  description: "Get in touch with the CareerPilot AI team for support, business inquiries, or general questions.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
