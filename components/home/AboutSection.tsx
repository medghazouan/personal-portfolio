"use client";

import { MapPin, ArrowDown, ArrowRight, ChevronRight } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* Tiny helper — applies fade+slide styles based on visibility */
function reveal(visible: boolean, delay = 0) {
  return {
    opacity:    visible ? 1 : 0,
    transform:  visible ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 180ms ease ${delay}ms, transform 180ms ease ${delay}ms`,
  };
}

export default function AboutSection() {
  const section  = useScrollReveal({ threshold: 0.05 });
  const image    = useScrollReveal({ threshold: 0.1  });
  const meta     = useScrollReveal({ threshold: 0.1  });
  const heading  = useScrollReveal({ threshold: 0.1  });
  const bio1     = useScrollReveal({ threshold: 0.1  });
  const bio2     = useScrollReveal({ threshold: 0.1  });
  const comment  = useScrollReveal({ threshold: 0.1  });
  const ctas     = useScrollReveal({ threshold: 0.1  });

  return (
    <section
      className="relative z-10 flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 py-16 md:py-0 font-mono"
    >
      {/* Scanline */}
      <div className="scanline-overlay" aria-hidden="true" />

      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#00C9A7 1px, transparent 1px), linear-gradient(90deg, #00C9A7 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-[#9d4edd]/5 blur-[120px]" />
      </div>

      {/* Terminal window */}
      <div
        ref={section.ref}
        className="relative z-10 w-full max-w-6xl border border-[#1F2937] bg-[#0d0d0d] shadow-[0_0_80px_rgba(0,201,167,0.06)]"
        style={reveal(section.visible, 0)}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-[#1F2937] bg-[#0a0a0a] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-slate-600">
            ghazouan_os // operator_profile.tsx
          </span>
          <div className="w-14" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">

          {/* LEFT: sidebar */}
          <div className="flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-[#1F2937] bg-[#0a0a0a] p-6 lg:col-span-4">

            <div className="flex items-center justify-between border-b border-[#1F2937] pb-3 text-[10px] uppercase tracking-widest text-slate-500">
              <span>Explorer</span>
              <span className="text-[#00C9A7]">01.jpg</span>
            </div>

            {/* Photo */}
            <div
              ref={image.ref}
              className="group relative"
              style={reveal(image.visible, 60)}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#1F2937] bg-[#111827]">
                <Image
                  src="/images/me.jpeg"
                  alt="Mohamed Ghazouan"
                  fill
                  className="object-cover opacity-80 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                />
                <div className="absolute left-0 top-0 h-4 w-4 border-l border-t border-[#00C9A7]" />
                <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-[#00C9A7]" />
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#00C9A7]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>

            {/* Meta */}
            <div
              ref={meta.ref}
              className="mt-auto space-y-3"
              style={reveal(meta.visible, 120)}
            >
              <div className="flex items-center gap-3 text-[11px]">
                <MapPin size={12} className="shrink-0 text-[#00C9A7]" />
                <span className="text-slate-500">LOC:</span>
                <span className="text-slate-200">MOROCCO_MA</span>
              </div>
              
              
            </div>
          </div>

          {/* RIGHT: editor */}
          <div className="flex flex-col lg:col-span-8">

            {/* Tab bar */}
            <div className="flex border-b border-[#1F2937] bg-[#0a0a0a]">
              <div className="flex items-center gap-2 border-r border-[#1F2937] bg-[#0d0d0d] px-5 py-2.5 text-xs text-[#00C9A7]">
                <span className="text-[#00C9A7]/40">{"</>"}</span>
                operator_bio.tsx
              </div>
              <div className="flex items-center gap-2 border-r border-[#1F2937] px-5 py-2.5 text-xs text-slate-600">
                skills.ts
              </div>
            </div>

            {/* Editor body */}
            <div className="relative flex-1 p-6 md:p-10">

              {/* Line numbers */}
              <div className="absolute bottom-0 left-4 top-6 flex w-10 select-none flex-col items-end border-r border-[#1F2937]/50 pr-3 text-[11px] leading-[2rem] text-slate-700">
                {Array.from({ length: 10 }, (_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>

              <div className="pl-10 space-y-8">

                {/* Heading */}
                <div ref={heading.ref} className="space-y-1" style={reveal(heading.visible, 0)}>
                  <div className="flex items-center gap-2 text-xs text-[#9d4edd]">
                    <ChevronRight size={13} />
                    <span className="text-slate-500">export const</span>
                    <span className="text-[#00C9A7]">Operator</span>
                    <span className="text-slate-500">= () =&gt; {"{"}</span>
                  </div>
                  <h2 className="pl-4 text-3xl md:text-5xl font-bold text-white leading-tight">
                    Mohamed{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#00C9A7] to-[#00a892]">
                      Ghazouan
                    </span>
                  </h2>
                </div>

                
                {/* Bio */}
                <div className="pl-4 space-y-4 max-w-xl text-sm leading-relaxed text-slate-400">
                  <p ref={bio1.ref} style={reveal(bio1.visible, 60)}>
                    I’m a{" "}
                    <span className="text-white font-medium">Full-Stack Developer & AI Builder</span>{" "}
                    based in Morocco, creating useful digital products that blend{" "}
                    <span className="text-[#00C9A7]">modern_web</span>{" "}
                    with smart solutions.
                  </p>
                  <p ref={bio2.ref} style={reveal(bio2.visible, 100)}>
                    I enjoy building web apps, AI features, and smooth user experiences that help
                    turn ideas into real, practical tools.
                  </p>
                  <p ref={comment.ref} className="italic text-slate-600" style={reveal(comment.visible, 140)}>
                    {"// I like building things that are simple, useful, and made to last."}
                  </p>
                </div>



                {/* CTAs */}
                <div ref={ctas.ref} className="flex flex-wrap gap-3 pl-4" style={reveal(ctas.visible, 160)}>
                  <GlowButton href="/contact" variant="primary" size="sm" icon={<ArrowRight size={14} />}>
                    Init Contact
                  </GlowButton>
                  <GlowButton href="/cv.pdf" variant="outline" size="sm" icon={<ArrowDown size={14} />}>
                    cat resume.pdf
                  </GlowButton>
                </div>

              </div>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between bg-[#00C9A7] px-4 py-1 text-[10px] font-bold uppercase text-[#0a0a0a]">
              <span>Ln 10, Col 32</span>
              <span>CLEARANCE_LEVEL: 5</span>
              <span>TypeScript JSX</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}