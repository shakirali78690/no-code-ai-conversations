import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Palette, Sun, Moon } from "lucide-react";

const THEME_KEY = "novachat-theme" as const;

type ThemeOption = "light" | "dark" | "ocean" | "forest" | "sunset";

const labels: Record<ThemeOption, string> = {
  light: "Light",
  dark: "Dark",
  ocean: "Ocean Blue",
  forest: "Forest Green",
  sunset: "Sunset Purple",
};

const ThemeIcon = ({ theme }: { theme: ThemeOption }) => {
  if (theme === "light") return <Sun className="size-4" />;
  if (theme === "dark") return <Moon className="size-4" />;
  return <Palette className="size-4" />;
};

function applyTheme(theme: ThemeOption) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  // Keep Tailwind dark mode behaviors for the explicit dark theme only
  root.classList.toggle("dark", theme === "dark");
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeOption>(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem(THEME_KEY)) as ThemeOption | null;
    return saved ?? "light";
  });

  useEffect(() => {
    applyTheme(theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch {}
  }, [theme]);

  const items = useMemo<ThemeOption[]>(() => ["light", "dark", "ocean", "forest", "sunset"], []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Change theme">
          <ThemeIcon theme={theme} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((key) => (
          <DropdownMenuItem key={key} onClick={() => setTheme(key)} className={theme === key ? "font-medium text-primary" : ""}>
            <span className="mr-2">
              {key === "light" ? <Sun className="size-4" /> : key === "dark" ? <Moon className="size-4" /> : <Palette className="size-4" />}
            </span>
            {labels[key]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
