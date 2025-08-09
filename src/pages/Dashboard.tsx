import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Dashboard | NovaChat AI</title>
        <meta name="description" content="Manage your account, subscription, and preferences." />
        <link rel="canonical" href={`${window.location.origin}/dashboard`} />
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Authentication is not yet configured. Connect Supabase to enable sign-in, billing, and more.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
