import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-20 md:pt-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-[600px] w-[1200px] max-w-none blur-3xl opacity-50 bg-gradient-primary rounded-full mx-auto translate-y-[-30%]" />
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-border/70 bg-secondary px-3 py-1 text-xs text-muted-foreground mb-4">
            New • Multimodal + Voice
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            Your AI Assistant for Everything
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Chat with state-of-the-art models, analyze files, generate code, and collaborate in real time — all in one beautiful, secure platform.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/chat">Start Chatting</Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Free tier available • No credit card required</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
