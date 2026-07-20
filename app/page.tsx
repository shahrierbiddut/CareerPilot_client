import HeroSection from "./components/hero/HeroSection";
import TrustedCompanies from "./components/hero/TrustedCompanies";
import FeaturesSection from "./components/sections/FeaturesSection";
import WorkflowSection from "./components/sections/WorkflowSection";
import StatisticsSection from "./components/sections/StatisticsSection";
import TestimonialsSection from "./components/sections/TestimonialsSection";
import ResourcesSection from "./components/sections/ResourcesSection";
import BlogSection from "./components/sections/BlogSection";
import FAQSection from "./components/sections/FAQSection";
import NewsletterSection from "./components/sections/NewsletterSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustedCompanies />
      <FeaturesSection />
      <WorkflowSection />
      <StatisticsSection />
      <TestimonialsSection />
      <ResourcesSection />
      <BlogSection />
      <FAQSection />
      <NewsletterSection />
    </main>
  );
}
