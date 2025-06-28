import { MoonIcon, SunIcon, LaptopIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./button";
import { Typography } from "./typography";

const themes = [
  { key: "light", icon: SunIcon, label: "Light" },
  { key: "dark", icon: MoonIcon, label: "Dark" },
  { key: "system", icon: LaptopIcon, label: "System" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 transition-colors rounded-full px-1">
      <Typography variant="muted" className="ml-3">
      Theme
      </Typography>
      {themes.map(({ key, icon: Icon, label }) => (
        <div key={key} className={`relative flex items-center rounded-full hover:bg-neutral-200 hover:dark:bg-neutral-900 cursor-pointer ${theme === key ? "pr-3 bg-accent dark:bg-neutral-900" : "group"}`}>
          <Button
            variant="ghost"
            aria-label={`Switch to ${label.toLowerCase()} mode`}
            className='p-2 rounded-full hover:bg-transparent hover:dark:bg-transparent'
            onClick={() => setTheme(key)}
            tabIndex={0}
            type="button"
          >
            <span className="sr-only">{label} theme</span>
            <Icon className="size-5" />
          </Button>
          {theme === key && (
            <span className="ml-2 text-xs font-medium text-primary block sm:inline">{label}</span>
          )}
        </div>
      ))}
    </div>
  );
} 