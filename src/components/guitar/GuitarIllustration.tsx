import { cn } from "@/lib/utils";
import type { BodyShape, Finish } from "@/lib/products";

/**
 * Procedural SVG guitar illustration.
 * Renders a stylized premium guitar from a body shape + finish gradient.
 */
export function GuitarIllustration({
  shape,
  finish,
  className,
  id,
}: {
  shape: BodyShape;
  finish: Finish;
  className?: string;
  id: string;
}) {
  const uid = `${id}-${finish.id}`;
  const hw =
    finish.hardware === "gold"
      ? "#c9a86b"
      : finish.hardware === "chrome"
      ? "#c8c8d0"
      : "#2a2a30";
  const hwDark =
    finish.hardware === "gold"
      ? "#8a6c38"
      : finish.hardware === "chrome"
      ? "#84848e"
      : "#111114";

  return (
    <svg
      viewBox="0 0 200 520"
      className={cn("h-full w-auto", className)}
      role="img"
      aria-label={`${finish.name} guitar`}
    >
      <defs>
        <radialGradient id={`body-${uid}`} cx="50%" cy="42%" r="75%">
          <stop offset="0%" stopColor={finish.from} />
          <stop offset="55%" stopColor={finish.via} />
          <stop offset="100%" stopColor={finish.to} />
        </radialGradient>
        <linearGradient id={`neck-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3d2b1a" />
          <stop offset="50%" stopColor="#5e4426" />
          <stop offset="100%" stopColor="#2e1f10" />
        </linearGradient>
        <linearGradient id={`sheen-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`hw-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hw} />
          <stop offset="100%" stopColor={hwDark} />
        </linearGradient>
      </defs>

      {/* Headstock */}
      <path
        d="M88 6 Q100 0 112 6 L116 52 L84 52 Z"
        fill={`url(#neck-${uid})`}
        stroke={hwDark}
        strokeWidth="1"
      />
      {/* Tuning pegs */}
      {[14, 26, 38].map((y) => (
        <g key={y}>
          <circle cx="80" cy={y} r="4" fill={`url(#hw-${uid})`} />
          <circle cx="120" cy={y} r="4" fill={`url(#hw-${uid})`} />
        </g>
      ))}
      {/* Nut */}
      <rect x="84" y="52" width="32" height="5" rx="1" fill="#e8e0d0" />

      {/* Neck */}
      <rect x="86" y="57" width="28" height="218" fill={`url(#neck-${uid})`} />
      {/* Frets */}
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={i}
          x="86"
          y={70 + i * 17}
          width="28"
          height="1.6"
          fill={hw}
          opacity="0.75"
        />
      ))}
      {/* Inlays */}
      {[3, 5, 7, 9].map((n) => (
        <circle
          key={n}
          cx="100"
          cy={70 + (n - 0.5) * 17}
          r="2.4"
          fill="#e8e0d0"
          opacity="0.9"
        />
      ))}

      {/* Body */}
      <BodyPath shape={shape} uid={uid} />

      {/* Sound hole or pickups */}
      {shape === "acoustic" ? (
        <>
          <circle cx="100" cy="330" r="30" fill="#14100a" />
          <circle cx="100" cy="330" r="30" fill="none" stroke={hw} strokeWidth="2.5" />
          <circle cx="100" cy="330" r="35" fill="none" stroke={finish.to} strokeWidth="1.5" opacity="0.6" />
        </>
      ) : (
        <>
          <rect x="76" y="300" width="48" height="16" rx="5" fill="#14100a" stroke={hwDark} strokeWidth="1.5" />
          <rect x="76" y="345" width="48" height="16" rx="5" fill="#14100a" stroke={hwDark} strokeWidth="1.5" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <circle cx={83 + i * 6.8} cy="308" r="1.8" fill={hw} />
              <circle cx={83 + i * 6.8} cy="353" r="1.8" fill={hw} />
            </g>
          ))}
        </>
      )}

      {/* Bridge */}
      <rect x="80" y={shape === "acoustic" ? 385 : 388} width="40" height="10" rx="3" fill={shape === "acoustic" ? "#2a1c0e" : `url(#hw-${uid})`} />

      {/* Strings */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line
          key={i}
          x1={89 + i * 4.4}
          y1="54"
          x2={89 + i * 4.4}
          y2="392"
          stroke="#d8d4c8"
          strokeWidth={0.7 + (5 - i) * 0.12}
          opacity="0.85"
        />
      ))}

      {/* Controls (electric only) */}
      {shape !== "acoustic" && (
        <>
          <circle cx="136" cy="392" r="6" fill={`url(#hw-${uid})`} />
          <circle cx="150" cy="378" r="6" fill={`url(#hw-${uid})`} />
        </>
      )}
    </svg>
  );
}

function BodyPath({ shape, uid }: { shape: BodyShape; uid: string }) {
  const fill = `url(#body-${uid})`;
  const sheen = `url(#sheen-${uid})`;
  const common = { stroke: "rgba(0,0,0,0.45)", strokeWidth: 1.5 };

  switch (shape) {
    case "single-cut":
      return (
        <g>
          <path
            d="M100 258 C 52 258, 26 286, 26 336 C 26 402, 54 452, 100 452 C 150 452, 176 408, 174 352 C 172 310, 158 284, 132 272 C 120 266, 112 258, 100 258 Z"
            fill={fill}
            {...common}
          />
          <path
            d="M100 262 C 60 262, 38 288, 36 330 C 60 300, 90 284, 128 280 C 118 270, 110 262, 100 262 Z"
            fill={sheen}
          />
        </g>
      );
    case "double-cut":
      return (
        <g>
          <path
            d="M100 258 C 88 258, 84 268, 72 268 C 44 268, 26 296, 26 340 C 26 404, 56 452, 100 452 C 144 452, 174 404, 174 340 C 174 296, 156 268, 128 268 C 116 268, 112 258, 100 258 Z"
            fill={fill}
            {...common}
          />
          <path
            d="M100 262 C 66 268, 44 288, 38 326 C 62 298, 92 286, 130 284 C 120 272, 110 262, 100 262 Z"
            fill={sheen}
          />
        </g>
      );
    case "offset":
      return (
        <g>
          <path
            d="M100 258 C 82 258, 76 270, 60 272 C 34 276, 24 302, 28 340 C 32 380, 44 408, 68 428 C 92 448, 136 452, 158 428 C 178 406, 178 368, 168 336 C 160 310, 150 290, 130 276 C 118 268, 112 258, 100 258 Z"
            fill={fill}
            {...common}
          />
          <path
            d="M100 262 C 70 268, 46 288, 40 322 C 66 296, 96 286, 132 284 C 122 272, 110 262, 100 262 Z"
            fill={sheen}
          />
        </g>
      );
    case "vee":
      return (
        <g>
          <path
            d="M100 258 L 34 452 L 78 452 L 100 366 L 122 452 L 166 452 Z"
            fill={fill}
            {...common}
          />
          <path d="M100 262 L 58 386 L 76 386 Z" fill={sheen} />
        </g>
      );
    case "hollow":
      return (
        <g>
          <path
            d="M100 258 C 86 258, 82 268, 70 270 C 42 274, 26 300, 26 342 C 26 406, 56 454, 100 454 C 144 454, 174 406, 174 342 C 174 300, 158 274, 130 270 C 118 268, 114 258, 100 258 Z"
            fill={fill}
            {...common}
          />
          {/* f-holes */}
          <path
            d="M56 322 C 52 334, 52 348, 58 358 M144 322 C 148 334, 148 348, 142 358"
            stroke="#14100a"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M100 262 C 66 268, 44 290, 38 328 C 62 300, 92 288, 130 286 C 120 272, 112 262, 100 262 Z"
            fill={sheen}
          />
        </g>
      );
    case "acoustic":
    default:
      return (
        <g>
          <path
            d="M100 258 C 78 258, 64 272, 62 292 C 60 308, 66 316, 62 328 C 54 348, 40 352, 38 380 C 36 420, 64 456, 100 456 C 136 456, 164 420, 162 380 C 160 352, 146 348, 138 328 C 134 316, 140 308, 138 292 C 136 272, 122 258, 100 258 Z"
            fill={fill}
            {...common}
          />
          <path
            d="M100 262 C 82 262, 70 274, 68 292 C 84 280, 108 276, 128 282 C 122 268, 112 262, 100 262 Z"
            fill={sheen}
          />
        </g>
      );
  }
}
