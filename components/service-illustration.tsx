interface ServiceIllustrationProps {
  variant: "flight" | "visa" | "passport" | "finance" | "business";
  className?: string;
}

/**
 * Signature line-art panels standing in for photography. Each mark is
 * drawn from the same visual vocabulary as the rest of the site (ink
 * navy line work, a single gold stamp accent, paper background) so the
 * services section reads as one continuous document rather than stock
 * photography bolted onto a travel-agency template.
 */
export function ServiceIllustration({ variant, className }: ServiceIllustrationProps) {
  return (
    <div
      className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-boarding-paper ${className ?? ""}`}
    >
      <div className="absolute inset-0 bg-perforated-x opacity-40" aria-hidden />
      <svg
        viewBox="0 0 240 200"
        className="relative h-2/3 w-2/3"
        fill="none"
        stroke="#10203A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {variant === "flight" && (
          <>
            <path d="M20 120 L100 105 L140 40 L155 40 L130 108 L200 100 L215 112 L145 132 L125 175 L112 175 L118 135 L60 143 L45 160 L33 160 L45 135 Z" />
            <circle cx="60" cy="30" r="3" fill="#C89B3C" stroke="none" />
            <path d="M45 30 H100" strokeDasharray="4 6" />
          </>
        )}
        {variant === "visa" && (
          <>
            <rect x="45" y="35" width="150" height="105" rx="8" />
            <circle cx="90" cy="88" r="24" />
            <path d="M78 88 l9 9 l18 -20" />
            <path d="M130 68 H170" />
            <path d="M130 84 H170" />
            <path d="M130 100 H155" />
            <circle cx="180" cy="145" r="20" stroke="#C89B3C" />
            <path d="M170 145 h20 M180 135 v20" stroke="#C89B3C" />
          </>
        )}
        {variant === "passport" && (
          <>
            <rect x="70" y="25" width="100" height="140" rx="6" />
            <circle cx="120" cy="75" r="22" />
            <path d="M104 75 a16 22 0 0 1 32 0" />
            <path d="M120 53 v44" />
            <path d="M92 130 H148" />
            <path d="M92 145 H148" />
            <rect x="40" y="55" width="20" height="90" rx="3" stroke="#C89B3C" transform="rotate(-8 50 100)" />
          </>
        )}
        {variant === "finance" && (
          <>
            <path d="M30 150 L70 110 L105 130 L150 75 L210 40" />
            <path d="M180 40 H210 V70" />
            <circle cx="70" cy="110" r="4" fill="#10203A" stroke="none" />
            <circle cx="105" cy="130" r="4" fill="#10203A" stroke="none" />
            <circle cx="150" cy="75" r="4" fill="#10203A" stroke="none" />
            <circle cx="190" cy="150" r="22" stroke="#C89B3C" />
            <path d="M190 140 v20 M182 145 q8 -6 16 0 q8 6 -16 10" stroke="#C89B3C" />
          </>
        )}
        {variant === "business" && (
          <>
            <path d="M45 165 V85 L120 45 L195 85 V165" />
            <path d="M45 165 H195" />
            <path d="M85 165 V115 H100 V165" />
            <path d="M140 165 V115 H155 V165" />
            <path d="M110 90 H130" />
            <circle cx="185" cy="55" r="18" stroke="#C89B3C" />
            <path d="M177 55 l6 6 l12 -13" stroke="#C89B3C" />
          </>
        )}
      </svg>
    </div>
  );
}
