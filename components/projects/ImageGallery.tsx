"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Props {
  images:  string[];
  title:   string;
  locked?: boolean;
}

export default function ImageGallery({ images, title, locked = false }: Props) {
  const [active,    setActive]    = useState(0);
  const [lightbox,  setLightbox]  = useState(false);

  if (!images.length) return null;

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  return (
    <>
      {/* ── Main viewer ── */}
      <div className="flex flex-col gap-3">

        {/* Hero image */}
        <div
          className="relative w-full overflow-hidden rounded-lg border border-[#1F2937] cursor-pointer group"
          style={{ aspectRatio: "16/7" }}
          onClick={() => !locked && setLightbox(true)}
        >
          <Image
            key={images[active]}
            src={images[active]}
            alt={`${title} — screenshot ${active + 1}`}
            fill
            priority={active === 0}
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />

          {/* Hover zoom hint */}
          {!locked && images.length > 0 && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-mono text-[10px] uppercase tracking-widest text-white bg-black/60 px-3 py-1.5 rounded">
                EXPAND_VIEW
              </span>
            </div>
          )}

          {/* Locked overlay */}
          {locked && (
            <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-md flex items-center justify-center">
              <span className="border border-red-500/40 text-red-400 text-sm px-6 py-2 rounded uppercase tracking-widest font-mono">
                RESTRICTED — DECRYPT TO VIEW
              </span>
            </div>
          )}

          {/* Prev / Next arrows — only if multiple images */}
          {images.length > 1 && !locked && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/60 border border-[#1F2937] flex items-center justify-center text-white hover:border-[#00C9A7] hover:text-[#00C9A7] transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/60 border border-[#1F2937] flex items-center justify-center text-white hover:border-[#00C9A7] hover:text-[#00C9A7] transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          {/* Counter badge */}
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 font-mono text-[10px] bg-black/70 border border-[#1F2937] px-2 py-1 rounded text-slate-400">
              {active + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnails strip */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative shrink-0 overflow-hidden rounded border transition-all duration-150 ${
                  i === active
                    ? "border-[#00C9A7] shadow-[0_0_8px_rgba(0,201,167,0.4)]"
                    : "border-[#1F2937] opacity-50 hover:opacity-80"
                }`}
                style={{ width: 80, height: 50 }}
                aria-label={`View screenshot ${i + 1}`}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 h-9 w-9 flex items-center justify-center rounded-full border border-[#1F2937] text-slate-400 hover:text-white hover:border-[#00C9A7] transition-colors"
            onClick={() => setLightbox(false)}
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-5xl"
            style={{ aspectRatio: "16/9" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active]}
              alt={`${title} — screenshot ${active + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* Lightbox nav */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full border border-[#1F2937] text-slate-400 hover:text-[#00C9A7] hover:border-[#00C9A7] transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full border border-[#1F2937] text-slate-400 hover:text-[#00C9A7] hover:border-[#00C9A7] transition-colors"
              >
                <ChevronRight size={20} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[11px] text-slate-500">
                {active + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}