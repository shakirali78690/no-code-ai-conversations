const Footer = () => {
  return (
    <footer className="border-t border-border/60 mt-20">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2 font-semibold mb-3">
            <span className="inline-block h-6 w-6 rounded-md bg-gradient-primary shadow-glow" aria-hidden />
            <span>NovaChat AI</span>
          </div>
          <p className="text-muted-foreground">Your AI assistant for everything. Chat, analyze, and create with a modern conversational platform.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Product</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li><a className="hover:text-foreground" href="#features">Features</a></li>
            <li><a className="hover:text-foreground" href="/pricing">Pricing</a></li>
            <li><a className="hover:text-foreground" href="/chat">Chat</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li><a className="hover:text-foreground" href="#">Security</a></li>
            <li><a className="hover:text-foreground" href="#">Privacy</a></li>
            <li><a className="hover:text-foreground" href="#">Status</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-muted-foreground text-xs">© {new Date().getFullYear()} NovaChat Inc. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
