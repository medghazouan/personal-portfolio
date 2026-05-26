"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FolderKanban,
  Wrench,
  ScrollText,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { href: "/", label: "HOME", icon: Home },
  { href: "/projects", label: "PROJECTS", icon: FolderKanban },
  { href: "/arsenal", label: "ARSENAL", icon: Wrench },
  { href: "/logs", label: "LOGS", icon: ScrollText },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (y < 80) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bottom-6 left-1/2 -translate-x-1/2 md:top-1/2 md:bottom-auto md:left-6 md:translate-x-0 md:-translate-y-1/2 ${
        hidden 
          ? "translate-y-32 md:-translate-y-1/2 md:-translate-x-32 opacity-0" 
          : "translate-y-0 md:-translate-y-1/2 opacity-100"
      }`}
    >
      <nav className="flex flex-row md:flex-col items-center gap-2 md:gap-6 rounded-[40px] border border-white/[0.12] bg-white/[0.04] p-2 md:p-2.5 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-2xl">
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className={`group relative flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-[24px] transition-all duration-300 ease-out ${
                active
                  ? "bg-white/[0.08] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.2)]"
                  : "text-white/50 hover:bg-white/[0.03] hover:text-white/80"
              }`}
            >
              <Icon
                size={24}
                strokeWidth={1.75}
                className={`transition-all duration-300 ${
                  active 
                    ? "scale-100 fill-white text-white" 
                    : "scale-95 opacity-80 group-hover:scale-100 group-hover:opacity-100"
                }`}
              />
            </Link>
          );
        })}
      </nav>
    </header>
  );
}