import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PricingSection from "@/components/marketing/Pricing";

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Pricing | NovaChat AI</title>
        <meta name="description" content="Simple, transparent pricing for NovaChat AI. Start free, upgrade anytime." />
        <link rel="canonical" href={`${window.location.origin}/pricing`} />
      </Helmet>
      <Navbar />
      <main>
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
