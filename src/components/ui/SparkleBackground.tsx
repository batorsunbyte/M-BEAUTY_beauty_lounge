type SparkleBackgroundProps = {
  particleColor: string;
  speed?: number;
  particleDensity?: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
};

/**
 * Lightweight, GPU-cheap ambient glow.
 *
 * Replaces the old tsparticles canvas (which ran a 120fps requestAnimationFrame
 * with per-particle opacity animation in EVERY section — the main cause of jank,
 * especially on mobile). This is pure CSS: two soft radial glows tinted with the
 * section's accent color. No canvas, no rAF, no per-frame work.
 */
export function SparkleBackground({ particleColor, className = "" }: SparkleBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 z-[1] pointer-events-none ${className}`}
      style={{
        backgroundImage:
          `radial-gradient(45% 38% at 50% 0%, ${particleColor}14, transparent 70%),` +
          `radial-gradient(35% 32% at 85% 95%, ${particleColor}10, transparent 70%)`,
      }}
    />
  );
}
