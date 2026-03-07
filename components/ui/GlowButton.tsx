import { ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "outline" | "ghost";
type Size    = "sm" | "md" | "lg";

interface GlowButtonProps {
  children:   ReactNode;
  variant?:   Variant;
  size?:      Size;
  href?:      string;
  external?:  boolean;
  onClick?:   () => void;
  type?:      "button" | "submit" | "reset";
  disabled?:  boolean;
  className?: string;
  icon?:      ReactNode;
}

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "glow-btn glow-btn-primary",
  outline: "glow-btn glow-btn-outline",
  ghost:
    "glow-btn border border-transparent text-slate-400 hover:text-[var(--color-primary)] hover:border-[var(--color-border)] transition-colors duration-200",
};

export default function GlowButton({
  children,
  variant  = "primary",
  size     = "md",
  href,
  external = false,
  onClick,
  type     = "button",
  disabled = false,
  className = "",
  icon,
}: GlowButtonProps) {
  const classes = [
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
}