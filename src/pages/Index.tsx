import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/marketing/Hero";
import Features from "@/components/marketing/Features";
import PricingSection from "@/components/marketing/Pricing";
import Footer from "@/components/layout/Footer";
import AmbientBackground from "@/components/misc/AmbientBackground";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://example.com';
  const canonical = `${siteUrl}/`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "NovaChat AI",
    description: "Your AI Assistant for Everything — chat, analyze files, and generate code.",
    applicationCategory: "AI Assistant",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <div className="relative min-h-screen">
      <Helmet>
        <title>Your AI Assistant for Everything | NovaChat AI</title>
        <meta name="description" content="Chat with top AI models, analyze files, and build faster. Start free on NovaChat AI." />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <AmbientBackground />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
