import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import BatteryPack from './BatteryPack.jsx';

/* World-units the drawing must fit inside, worst case over a full turn.
   An orthographic zoom is a pixel scale, so it has to be derived from the
   canvas size or the pack overflows its frame on narrow screens. */
const SPAN = 4.7;

function FitToCanvas() {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  useLayoutEffect(() => {
    camera.zoom = Math.min(size.width, size.height) / SPAN;
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);

  return null;
}

/* Mirrors the CSS tokens in styles.css so the drawing and the page agree. */
const PALETTE = {
  light: { ink: '#101215', paper: '#f2f0ea', accent: '#b07600', faint: '#cbc5b8' },
  dark:  { ink: '#f2f1ee', paper: '#0d0f12', accent: '#ffc61a', faint: '#2d333a' },
};

export default function BatteryScene({ theme }) {
  const host = useRef(null);
  const [visible, setVisible] = useState(true);
  const palette = useMemo(() => PALETTE[theme] ?? PALETTE.dark, [theme]);

  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  // Stop rendering entirely once the drawing scrolls out of view.
  useEffect(() => {
    const el = host.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      rootMargin: '120px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="scene" ref={host}>
      <Canvas
        orthographic
        camera={{ position: [6, 4.2, 7], zoom: 96, near: -50, far: 100 }}
        dpr={[1, 2]}
        frameloop={visible && !reducedMotion ? 'always' : 'demand'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
        fallback={<div className="scene__fallback">3D view unavailable</div>}
      >
        <FitToCanvas />
        <Suspense fallback={null}>
          <BatteryPack palette={palette} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>

      <div className="scene__plate" aria-hidden="true">
        <span>Fig. 01</span>
        <span className="scene__plate-rule" />
        <span>Traction battery — 12 cell, series link</span>
      </div>
    </div>
  );
}
