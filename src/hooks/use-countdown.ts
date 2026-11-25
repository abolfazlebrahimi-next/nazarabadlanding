import { useEffect, useState } from "react";
import { LAUNCH_DATE } from "@/lib/launch";

export interface CountdownParts {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isLaunched: boolean;
}

function getRemaining(now: Date = new Date()): CountdownParts {
  const delta = Math.max(0, LAUNCH_DATE.getTime() - now.getTime());
  const total = Math.floor(delta / 1000);
  const pad = (v: number) => String(v).padStart(2, "0");
  return {
    days: pad(Math.floor(total / 86_400)),
    hours: pad(Math.floor((total % 86_400) / 3_600)),
    minutes: pad(Math.floor((total % 3_600) / 60)),
    seconds: pad(total % 60),
    isLaunched: delta === 0,
  };
}

const PLACEHOLDER: CountdownParts = {
  days: "--",
  hours: "--",
  minutes: "--",
  seconds: "--",
  isLaunched: false,
};

/**
 * Live countdown to the real launch deadline.
 * The first render (server + hydration) shows a stable placeholder, then the
 * real values kick in after mount — deterministic, no hydration mismatch.
 */
export function useCountdown(): CountdownParts {
  const [parts, setParts] = useState<CountdownParts>(PLACEHOLDER);

  useEffect(() => {
    // Defer the first sync out of the effect body (no cascading render),
    // then tick every second.
    const sync = window.setTimeout(() => setParts(getRemaining()), 0);
    const id = window.setInterval(() => setParts(getRemaining()), 1000);
    return () => {
      window.clearTimeout(sync);
      window.clearInterval(id);
    };
  }, []);

  return parts;
}
