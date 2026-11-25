interface LogoProps {
  tone?: "light" | "dark";
  showTag?: boolean;
}

/** Nazarabad Shop brand logo — brand mark image + Persian wordmark. */
export function Logo({ tone = "light", showTag = true }: LogoProps) {
  return (
    <span className={`logo logo--${tone}`} aria-label="نظرآباد شاپ">
      <img
        className="logo__mark"
        src="/brand/logo.png"
        alt=""
        width={512}
        height={322}
        aria-hidden="true"
      />
      <span className="logo__text">
        <span className="logo__name">نظرآباد شاپ</span>
        {showTag && <span className="logo__tag">بازار آنلاین شهر</span>}
      </span>
    </span>
  );
}
