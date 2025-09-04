export interface ButterflyFieldProps {
  count?: number;
  baseWidth?: number;
}
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useSprings, animated, easings, to } from "@react-spring/web";
import BUTTERFLY_SRC from "../assets/butterFly.png";
import BUTTERFLY_PINK from "../assets/pinkButterfly.png";

// Helper to generate random values within a range
const rnd = (min: number, max: number) => Math.random() * (max - min) + min;

// Hook to get viewport size and update on resize
const useViewport = () => {
  const [size, setSize] = useState({ width: 1280, height: 720 });
  useLayoutEffect(() => {
    const set = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);
  return size;
};

export default function ButterflyField({
  count = 30, // Number of butterflies
  baseWidth = 120, // Base width of each butterfly
}: ButterflyFieldProps) {
  const { width, height } = useViewport(); // Get viewport size
  const prefersReduced = useMemo(
    () =>
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false,
    []
  );

  // Define spring values for butterflies' movement
  const [springs, api] = useSprings(count, () => ({
    progress: 0,
    offsetX: -200,
    baseY: rnd(40, Math.max(80, height - 80)),
    dir: Math.random() > 0.5 ? 1 : -1,
    amplitude: rnd(24, 120),
    rotateBase: rnd(-10, 10),
    size: rnd(0.7, 1.3),
    phase: rnd(0, Math.PI * 2),
    waves: Math.round(rnd(1, 3)),
    wingPhase: rnd(0, Math.PI * 2),
    config: { duration: 12000, easing: easings.linear },
  }));

  // Animation loop setup
  useEffect(() => {
    if (prefersReduced) return;
    api.start(() => {
      const loop = async (next: any) => {
        while (true) {
          const dir = Math.random() > 0.5 ? 1 : -1;
          const startX = dir === 1 ? -120 : width + 120;
          const baseY = rnd(40, Math.max(80, height - 80));
          const amplitude = rnd(24, 120);
          const rotateBase = rnd(-12, 12);
          const size = rnd(0.7, 1.3);
          const phase = rnd(0, Math.PI * 2);
          const waves = Math.round(rnd(1, 3));
          const duration = rnd(12000, 26000);
          await next({
            progress: 0,
            offsetX: startX,
            baseY,
            dir,
            amplitude,
            rotateBase,
            size,
            phase,
            waves,
            wingPhase: rnd(0, Math.PI * 2),
            config: { duration: 0 },
          });
          await next({
            progress: 1,
            config: { duration, easing: easings.linear },
          });
        }
      };
      return { to: loop };
    });
  }, [api, width, height, prefersReduced]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {springs.map((spring, i) => {
        const style = {
          position: "absolute" as const,
          top: 0,
          left: 0,
          width: baseWidth,
          willChange: "transform",
          zIndex: to(spring.size, (s) => Math.round(s * 100)),
          transform: to(
            [
              spring.progress,
              spring.offsetX,
              spring.baseY,
              spring.dir,
              spring.amplitude,
              spring.rotateBase,
              spring.size,
              spring.phase,
              spring.waves,
              spring.wingPhase,
            ],
            (p, ox, by, d, amp, rot, s, ph, wav, wp) => {
              const x = ox + d * p * (width + 240);
              const y = by + Math.sin(ph + p * Math.PI * 2 * wav) * amp;
              const wingFlap = Math.sin(wp + p * Math.PI * 32) * 20;
              const bodyTilt = Math.sin(p * Math.PI * 16) * 12;
              return `translate3d(${x}px, ${y}px, 0) rotate(${rot + bodyTilt}deg) scale(${s}) skewY(${wingFlap}deg)`;
            }
          ),
        } as const;

        // Randomize the butterfly images (normal or pink)
        const butterflySrc =
          Math.random() > 0.5 ? BUTTERFLY_SRC : BUTTERFLY_PINK;

        return (
          <animated.img
            key={i}
            src={butterflySrc}
            alt=""
            aria-hidden
            style={style}
            draggable={false}
          />
        );
      })}
    </div>
  );
}
