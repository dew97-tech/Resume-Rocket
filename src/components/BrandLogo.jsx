export default function BrandLogo({ size = 36, className = '', withText = false }) {
  return (
    <div className={`brand-logo-wrap ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Hard Offset Drop Shadow for the entire rocket emblem */}
        <g transform="translate(3, 3)">
          {/* Shadow silhouette */}
          <path
            d="M26 4C26 4 19 6 15 11C11.5 15.5 10 22 10 22L7 24L7 28L11 27L12 31L16 31L18 28C18 28 24.5 26.5 29 23C34 19 36 12 36 12C36 12 29 12 26 4Z"
            fill="#000000"
          />
        </g>

        {/* Exhaust Flame Blast */}
        <path
          d="M10 28L4 36L12 30L10 28Z"
          fill="#FB923C"
          stroke="#000000"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M8 30L3 38L10 32L8 30Z"
          fill="#FFE600"
        />
        {/* Spark Star */}
        <path
          d="M4 25L5 27L7 27.5L5.5 29L6 31L4 30L2 31L2.5 29L1 27.5L3 27L4 25Z"
          fill="#FFE600"
          stroke="#000000"
          strokeWidth="1.5"
        />

        {/* Left Fin */}
        <path
          d="M10 22L4 26L5 30L11 27L10 22Z"
          fill="#FFE600"
          stroke="#000000"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Right Fin */}
        <path
          d="M18 30L21 36L25 35L22 29L18 30Z"
          fill="#FFE600"
          stroke="#000000"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Rocket Main Fuselage */}
        <path
          d="M26 4C26 4 18 6 14 11C10.5 15.5 9 22 9 22L18 31C18 31 24.5 29.5 29 26C34 22 36 14 36 14C36 14 29 13 26 4Z"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Nose Cone Accent */}
        <path
          d="M26 4C26 4 23 4.8 20.5 7L29 15.5C31.2 13 32 10 32 10C32 10 29 8 26 4Z"
          fill="#FF4D4D"
          stroke="#000000"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Porthole Window */}
        <circle
          cx="21"
          cy="19"
          r="4.5"
          fill="#00F0FF"
          stroke="#000000"
          strokeWidth="2.5"
        />
        <circle
          cx="19.8"
          cy="17.8"
          r="1.5"
          fill="#FFFFFF"
        />
      </svg>

      {withText && (
        <span
          style={{
            fontFamily: "'Space Grotesk', 'Plus Jakarta Sans', sans-serif",
            fontWeight: 900,
            fontSize: `${size * 0.55}px`,
            letterSpacing: '-0.03em',
            color: 'var(--neo-ink, #000000)',
          }}
        >
          ResumeRocket
        </span>
      )}
    </div>
  );
}
