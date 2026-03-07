"use client";



import Link from "next/link";

import { usePathname } from "next/navigation";

import { Terminal, Menu, X } from "lucide-react";

import { useState, useEffect, useRef } from "react";



const NAV_LINKS = [

  { href: "/",         label: "HOME"     },

  { href: "/projects", label: "PROJECTS" },

  { href: "/arsenal",  label: "ARSENAL"  },

  { href: "/logs",     label: "LOGS"     },

] as const;



export default function Navbar() {

  const pathname              = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [hidden,     setHidden]     = useState(false);

  const lastY                 = useRef(0);



  /* Hide on scroll down, reveal on scroll up */

  useEffect(() => {

    const onScroll = () => {

      const y     = window.scrollY;

      const delta = y - lastY.current;



      // Only trigger after scrolling past 80px (ignore hero top)

      if (y < 80) {

        setHidden(false);

      } else if (delta > 4) {

        // Scrolling down — hide

        setHidden(true);

        setMobileOpen(false);

      } else if (delta < -4) {

        // Scrolling up — show

        setHidden(false);

      }



      lastY.current = y;

    };



    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);

  }, []);



  return (

    <header

      className="sticky top-0 z-50 w-full border-b border-[#1F2937] bg-[#0a0a0a]/80 backdrop-blur-md"

      style={{

        transform:  hidden ? "translateY(-100%)" : "translateY(0)",

        transition: "transform 200ms ease",

      }}

    >

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">



        {/* Brand */}

        <Link href="/" className="group flex items-center gap-3">

          <Terminal size={18} className="text-[#00C9A7] animate-pulse" />

          <span className="font-mono text-xs uppercase tracking-widest text-[#00C9A7]">

            SYSTEM_STATUS:{" "}

            <span className="font-bold text-white transition-colors group-hover:text-[#00C9A7]">

              ONLINE

            </span>

          </span>

        </Link>



        {/* Desktop nav */}

        <nav className="hidden items-center gap-8 md:flex">

          {NAV_LINKS.map(({ href, label }) => {

            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (

              <Link

                key={href}

                href={href}

                className={`nav-link font-mono ${active ? "active" : ""}`}

              >

                {label}

              </Link>

            );

          })}

        </nav>



        {/* CTA + status */}

        <div className="hidden items-center gap-4 md:flex">

          <div className="flex items-center gap-2">

            <div className="relative flex h-2 w-2">

              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />

            </div>

            <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">

              SYS.ONLINE

            </span>

          </div>

          <Link href="/contact" className="glow-btn glow-btn-outline px-4 py-2 text-xs">

            INIT_CONTACT →

          </Link>

        </div>



        {/* Mobile toggle */}

        <button

          className="text-[#00C9A7] md:hidden"

          onClick={() => setMobileOpen((v) => !v)}

          aria-label="Toggle menu"

        >

          {mobileOpen ? <X size={20} /> : <Menu size={20} />}

        </button>

      </div>



      {/* Mobile menu */}

      <div

        className="overflow-hidden border-t border-[#1F2937] bg-[#0a0a0a] md:hidden"

        style={{

          maxHeight:  mobileOpen ? "300px" : "0",

          transition: "max-height 200ms ease",

        }}

      >

        <div className="flex flex-col gap-4 px-6 py-4">

          {NAV_LINKS.map(({ href, label }) => {

            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (

              <Link

                key={href}

                href={href}

                onClick={() => setMobileOpen(false)}

                className={`nav-link font-mono ${active ? "active" : ""} text-sm`}

              >

                {label}

              </Link>

            );

          })}

          <Link

            href="/contact"

            onClick={() => setMobileOpen(false)}

            className="glow-btn glow-btn-outline mt-2 self-start px-4 py-2 text-xs"

          >

            INIT_CONTACT →

          </Link>

        </div>

      </div>

    </header>

  );

}