import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const tiers = [
  { name: "Free", price: "$0", note: "20 messages/day", cta: "Get Started", popular: false },
  { name: "Plus", price: "$20", note: "Unlimited + premium models", cta: "Upgrade", popular: true },
  { name: "Pro", price: "$40", note: "API + team features", cta: "Go Pro", popular: false },
];

const Pricing = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Simple, transparent pricing</h2>
        <p className="text-muted-foreground">Start free. Upgrade when you’re ready — cancel anytime.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((t) => (
          <Card key={t.name} className={`p-6 ${t.popular ? 'border-2 border-primary shadow-elegant' : ''}`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold">{t.name}</h3>
              {t.popular && (
                <span className="text-xs px-2 py-1 rounded-full bg-secondary">Popular</span>
              )}
            </div>
            <div className="text-4xl font-extrabold mb-2">{t.price}<span className="text-base font-medium text-muted-foreground">/mo</span></div>
            <p className="text-muted-foreground mb-6">{t.note}</p>
            <Button asChild variant={t.popular ? 'hero' : 'outline'} className="w-full">
              <Link to="/chat">{t.cta}</Link>
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
