import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-block h-6 w-6 rounded-md bg-gradient-primary shadow-glow" aria-hidden />
          <span>NovaChat AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/" className={({isActive}) => isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}>Home</NavLink>
          <a href="#features" className="text-muted-foreground hover:text-foreground">Features</a>
          <NavLink to="/pricing" className={({isActive}) => isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}>Pricing</NavLink>
          <NavLink to="/chat" className={({isActive}) => isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}>Chat</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/dashboard">Sign in</Link>
          </Button>
          <Button asChild variant="hero" size="sm">
            <Link to="/chat">Start Chatting</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
