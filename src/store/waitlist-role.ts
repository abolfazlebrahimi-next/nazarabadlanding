import { create } from "zustand";
import type { UserRole } from "@/services/waitlist";

interface WaitlistRoleState {
  role: UserRole;
  setRole: (role: UserRole) => void;
  /** Preset a role (e.g. from seller/courier CTAs) and smooth-scroll to the form. */
  presetRole: (role: UserRole) => void;
}

export const useWaitlistRole = create<WaitlistRoleState>((set) => ({
  role: "customer",
  setRole: (role) => set({ role }),
  presetRole: (role) => {
    set({ role });
    if (typeof document !== "undefined") {
      document
        .getElementById("waitlist")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  },
}));
