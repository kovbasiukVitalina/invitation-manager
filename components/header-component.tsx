"use client";

import { Home, MailPlus, Mails } from "lucide-react";
import Icon from "./icon-component";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./toogle-mode-component";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const navList = [
  {
    path: "/",
    icon: Home,
    tooltip: "Home",
  },
  {
    path: "/create-invitation",
    icon: MailPlus,
    tooltip: "Create Invitation",
  },
  {
    path: "/invitations",
    icon: Mails,
    tooltip: "Invitations List",
  },
];

const HeaderComponent = () => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };
  }, [isScrolling]);
  return (
    <nav
      className={cn(
        isScrolling
          ? "py-2 w-[calc(100%-2rem)] top-0 left-1/2 -translate-x-1/2 mt-2 rounded-3xl shadow-primary/20 shadow-xl"
          : " w-full py-6",
        "fixed z-10 top-0 left-1/2 -translate-x-1/2 px-6 flex justify-between items-center gap-4 bg-secondary/60 text-primary transition-all duration-300 backdrop-blur-md"
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/" className="text-3xl font-bold">
              LOGO
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Go home</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex gap-4 items-center">
        {navList.map((link) => (
          <TooltipProvider key={link.path}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={link.path}>
                  <Icon
                    name={link.icon}
                    size="30"
                    className={cn(
                      pathname === link.path
                        ? "text-primary"
                        : "text-foreground",
                      "hover:text-primary transition-all hover:scale-125"
                    )}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}

        <ModeToggle />
      </div>
    </nav>
  );
};

export default HeaderComponent;
