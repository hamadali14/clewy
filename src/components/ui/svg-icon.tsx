import { cn } from "@/lib/utils";

export type SvgIconName = "blueprint" | "intent" | "schema" | "preview" | "patch" | "spark";

export function SvgIcon({ name, className }: { name: SvgIconName; className?: string }) {
  const common = "fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round";
  return (
    <svg viewBox="0 0 32 32" className={cn("h-6 w-6", className)} aria-hidden="true">
      {name === "blueprint" && (
        <g className={common}>
          <path d="M6 8.5 16 4l10 4.5v14.7L16 28 6 23.2V8.5Z" />
          <path d="m6 8.5 10 4.6 10-4.6M16 13.1V28" />
          <path d="M10.4 16.5h3.2M18.5 18.7h3.1" />
        </g>
      )}
      {name === "intent" && (
        <g className={common}>
          <path d="M16 5v4M16 23v4M5 16h4M23 16h4" />
          <circle cx="16" cy="16" r="7" />
          <circle cx="16" cy="16" r="2.5" />
        </g>
      )}
      {name === "schema" && (
        <g className={common}>
          <rect x="6" y="5" width="20" height="22" rx="4" />
          <path d="M11 11h10M11 16h6M11 21h10" />
        </g>
      )}
      {name === "preview" && (
        <g className={common}>
          <rect x="4.5" y="7" width="23" height="16" rx="4" />
          <path d="M10 27h12M16 23v4M9 12h8M9 17h14" />
        </g>
      )}
      {name === "patch" && (
        <g className={common}>
          <path d="M9 8h14v16H9z" />
          <path d="M13 12h6M13 16h6M13 20h3" />
          <path d="M6 13 3 16l3 3M26 13l3 3-3 3" />
        </g>
      )}
      {name === "spark" && (
        <g className={common}>
          <path d="M16 4l2.4 7.6L26 14l-7.6 2.4L16 24l-2.4-7.6L6 14l7.6-2.4L16 4Z" />
          <path d="m24 22 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" />
        </g>
      )}
    </svg>
  );
}
