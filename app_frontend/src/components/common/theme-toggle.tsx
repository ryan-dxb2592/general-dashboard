"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            className=" bg-transparent  mr-2 relative"
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <SunIcon className="h-[1.2rem] w-[1.2rem] transition-all dark:rotate-0 dark:scale-100 rotate-0 scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] transition-all dark:rotate-90 dark:scale-0 rotate-0 scale-100" />
            <span className="sr-only">Switch Theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Switch Theme</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ThemeToggle;
