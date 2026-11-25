import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarClock, Sparkles } from "lucide-react";
import { useCountdown } from "@/hooks/use-countdown";
import { toFaDigits } from "@/lib/phone";
import { HERO } from "@/data/content";
import { LAUNCH_DATE_FA, PLATFORM_STATUS } from "@/lib/launch";
import { EASE } from "@/lib/motion";

function Digit({ value, label }: { value: string; label: string }) {
  return (
    <div className="cd-box" role="group" aria-label={`${label}: ${toFaDigits(value)}`}>
      <div className="cd-box__num" dir="ltr" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
          >
            {toFaDigits(value)}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="cd-box__label">{label}</div>
    </div>
  );
}

/** Launch countdown panel — real deadline, Asia/Tehran, Persian numerals. */
export function Countdown() {
  const { days, hours, minutes, seconds, isLaunched } = useCountdown();
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="cd-panel"
      initial={{ opacity: 0, y: reduce ? 0 : 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.75, duration: 0.7, ease: EASE }}
      aria-label="شمارش معکوس تا افتتاحیه نظرآباد شاپ"
    >
      <div className="cd-panel__head">
        <span className="cd-panel__icon" aria-hidden="true">
          <CalendarClock />
        </span>
        <span className="cd-panel__label">
          {isLaunched ? "افتتاحیه انجام شد!" : HERO.countLabel}
        </span>
      </div>

      {isLaunched && PLATFORM_STATUS === "pre-launch" ? (
        <motion.div
          className="cd-launched"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          role="status"
        >
          <span className="cd-launched__icon" aria-hidden="true">
            <Sparkles />
          </span>
          <p className="cd-launched__title">زمان راه‌اندازی فرا رسیده است!</p>
          <p className="cd-launched__text">برای اطلاع از شروع فعالیت، از فرم عضویت استفاده کنید.</p>
        </motion.div>
      ) : (
        <div className="cd-grid">
          <Digit value={days} label="روز" />
          <Digit value={hours} label="ساعت" />
          <Digit value={minutes} label="دقیقه" />
          <Digit value={seconds} label="ثانیه" />
        </div>
      )}

      <div className="cd-panel__date">
        <Sparkles aria-hidden="true" />
        شروع رسمی: {LAUNCH_DATE_FA}
      </div>
    </motion.div>
  );
}
