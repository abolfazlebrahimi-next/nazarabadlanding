import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";

interface SectionHeadProps {
  eyebrow?: string;
  icon?: LucideIcon;
  title: string;
  desc?: string;
  dark?: boolean;
  side?: boolean;
  center?: boolean;
}

/** Consistent section heading block: eyebrow chip + title + description. */
export function SectionHead({
  eyebrow,
  icon: Icon,
  title,
  desc,
  dark = false,
  side = false,
  center = false,
}: SectionHeadProps) {
  return (
    <Reveal
      className={`section-head${dark ? " section-head--dark" : ""}${
        side ? " section-head--side" : ""
      }${center ? " section-head--center" : ""}`}
    >
      {eyebrow && (
        <span className="section-head__eyebrow">
          {Icon && <Icon aria-hidden="true" />}
          {eyebrow}
        </span>
      )}
      <h2 className="section-head__title">{title}</h2>
      {desc && <p className="section-head__desc">{desc}</p>}
    </Reveal>
  );
}
