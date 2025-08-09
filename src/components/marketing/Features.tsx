import { Bot, FileUp, Headphones, Code2, Image as ImageIcon, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  { title: "Model Variety", desc: "Switch between GPT-4, Claude, Gemini and more.", Icon: Bot },
  { title: "File Uploads", desc: "Analyze PDFs, docs, spreadsheets and code.", Icon: FileUp },
  { title: "Voice Ready", desc: "Talk hands-free with real-time voice.", Icon: Headphones },
  { title: "Code Native", desc: "Syntax highlighting, review, and fixes.", Icon: Code2 },
  { title: "Multimodal", desc: "Understand images and generate visuals.", Icon: ImageIcon },
  { title: "Privacy First", desc: "Enterprise-grade security & controls.", Icon: ShieldCheck },
];

const Features = () => {
  return (
    <section id="features" className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Everything you need to think and build</h2>
        <p className="text-muted-foreground">A modern conversational workspace designed for creators, teams, and enterprises.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ title, desc, Icon }) => (
          <Card key={title} className="p-6 hover:shadow-elegant transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
                <Icon className="text-foreground" />
              </span>
              <h3 className="font-semibold text-lg">{title}</h3>
            </div>
            <p className="text-muted-foreground text-sm">{desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;
