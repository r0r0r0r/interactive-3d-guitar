export default function Loading() {
  return (
    <div className="flex min-h-svh items-center justify-center" role="status" aria-label="Loading">
      <div className="flex flex-col items-center gap-6">
        {/* Vibrating string loader */}
        <svg width="120" height="40" viewBox="0 0 120 40" aria-hidden>
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M4 ${14 + i * 6} Q 60 ${14 + i * 6}, 116 ${14 + i * 6}`}
              stroke="var(--gold)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity={0.4 + i * 0.3}
            >
              <animate
                attributeName="d"
                dur={`${0.7 + i * 0.15}s`}
                repeatCount="indefinite"
                values={`M4 ${14 + i * 6} Q 60 ${14 + i * 6}, 116 ${14 + i * 6};
                         M4 ${14 + i * 6} Q 60 ${4 + i * 6}, 116 ${14 + i * 6};
                         M4 ${14 + i * 6} Q 60 ${24 + i * 6}, 116 ${14 + i * 6};
                         M4 ${14 + i * 6} Q 60 ${14 + i * 6}, 116 ${14 + i * 6}`}
              />
            </path>
          ))}
        </svg>
        <p className="text-xs uppercase tracking-[0.4em] text-muted">Tuning up…</p>
      </div>
    </div>
  );
}
