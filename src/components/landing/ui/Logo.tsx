interface LogoProps {
  tone?: "light" | "dark";
  showTag?: boolean;
}

/** Nazarabad Shop brand logo — hand-crafted SVG mark + Persian wordmark. */
export function Logo({ tone = "light", showTag = true }: LogoProps) {
  return (
    <span className={`logo logo--${tone}`} aria-label="نظرآباد شاپ">
      <svg
        className="logo__mark"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        {/* handle */}
        <path
          d="M16 17.5v-3.4C16 9.9 19.6 6.5 24 6.5s8 3.4 8 7.6v3.4"
          stroke="#F4773D"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        {/* bag body */}
        <rect x="7.5" y="17" width="33" height="24.5" rx="8.5" fill="#064E45" />
        <rect
          x="7.5"
          y="17"
          width="33"
          height="24.5"
          rx="8.5"
          fill="url(#logoShine)"
        />
        {/* leaf */}
        <path
          d="M24 35.6c-3.9 0-6.4-2.5-6.4-6.3 4.9-.6 8.7 1.6 8.7 5 0 .5 0 1-.2 1.4-.6-.1-1.3-.1-2.1-.1Z"
          fill="#A9C6A2"
        />
        <path
          d="M17.6 29.3c2.8 1.9 5.2 3.5 8.7 5"
          stroke="#064E45"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <circle cx="30.5" cy="27" r="2.4" fill="#F4773D" />
        <defs>
          <linearGradient
            id="logoShine"
            x1="8"
            y1="17"
            x2="41"
            y2="42"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0D6856" />
            <stop offset="1" stopColor="#064E45" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <span className="logo__text">
        <span className="logo__name">نظرآباد شاپ</span>
        {showTag && <span className="logo__tag">بازار آنلاین شهر</span>}
      </span>
    </span>
  );
}
