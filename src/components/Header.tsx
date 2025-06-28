import * as React from "react";
import { Logo } from "./ui/Logo";
import { ThemeToggle } from "./ui/ThemeToggle";
import { Avatar } from "./ui/Avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { LogOutIcon } from "lucide-react";

interface HeaderProps {
  user?: { email: string; avatarUrl?: string };
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const initials = user?.email
    ? user.email[0].toUpperCase()
    : "M";
  return (
    <header className="w-full flex items-center justify-between px-4 py-2 border-b bg-background/80 backdrop-blur-md sticky top-0 z-40">
      <Logo className="shrink-0" />
      <div className="flex items-center gap-4 ml-auto">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="focus:outline-none">
              <Avatar src={user?.avatarUrl} fallback={initials} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[140px] p-1 bg-popover border rounded-md shadow-lg">
            <DropdownMenuItem onClick={onLogout} className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-accent">
              <LogOutIcon className="size-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}; 