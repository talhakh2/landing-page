import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

/* ── Pack dimensions (world units) ──────────────────────────
   One tray, twelve cells in two rows, serpentine busbar links.
   Everything is derived from these so the geometry stays coherent. */
const TRAY = { w: 3.4, h: 0.34, d: 1.66 };
const CELL = { w: 0.44, h: 1.0, d: 0.62 };
const COLS = 6;
const SPACING = 0.54;
const ROW_Z = [-0.36, 0.36];

const COL_X = Array.from(
  { length: COLS },
  (_, i) => (i - (COLS - 1) / 2) * SPACING
);

const CELL_Y = TRAY.h / 2 + CELL.h / 2;
const CELL_TOP = TRAY.h / 2 + CELL.h;
const POST = { r: 0.055, h: 0.15 };
const POST_Y = CELL_TOP + POST.h / 2;
const BAR_Y = CELL_TOP + POST.h;

/**
 * A solid drawn the way a drafter would: the faces are filled with the page
 * colour purely so they hide the lines behind them, then the silhouette and
 * corner edges are stroked in ink. No lighting, no shading, no gradients.
 */
function Solid({ w, h, d, position, ink, paper, thresholdAngle = 1 }) {
  const geo = useMemo(() => new THREE.BoxGeometry(w, h, d), [w, h, d]);
  const edges = useMemo(
    () => new THREE.EdgesGeometry(geo, thresholdAngle),
    [geo, thresholdAngle]
  );

  return (
    <group position={position}>
      <mesh geometry={geo}>
        <meshBasicMaterial
          color={paper}
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={ink} />
      </lineSegments>
    </group>
  );
}

/** Terminal post — same hidden-line treatment, cylindrical. */
function Post({ position, ink, paper, accent }) {
  const geo = useMemo(
    () => new THREE.CylinderGeometry(POST.r, POST.r, POST.h, 20),
    []
  );
  const edges = useMemo(() => new THREE.EdgesGeometry(geo, 30), [geo]);

  return (
    <group position={position}>
      <mesh geometry={geo}>
        <meshBasicMaterial
          color={paper}
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={accent ?? ink} />
      </lineSegments>
    </group>
  );
}

/** The serpentine link path: front row left→right, across, back row right→left. */
function useBusbars() {
  return useMemo(() => {
    const bars = [];
    // front row
    for (let i = 0; i < COLS - 1; i++) {
      bars.push({
        w: SPACING - 0.1,
        d: 0.11,
        position: [(COL_X[i] + COL_X[i + 1]) / 2, BAR_Y, ROW_Z[0]],
      });
    }
    // crossover at the far end
    bars.push({
      w: 0.11,
      d: ROW_Z[1] - ROW_Z[0] - 0.08,
      position: [COL_X[COLS - 1], BAR_Y, 0],
    });
    // back row
    for (let i = 0; i < COLS - 1; i++) {
      bars.push({
        w: SPACING - 0.1,
        d: 0.11,
        position: [(COL_X[i] + COL_X[i + 1]) / 2, BAR_Y, ROW_Z[1]],
      });
    }
    return bars;
  }, []);
}

/** Output leads — curved polylines leaving the two free terminals. */
function useLeads() {
  return useMemo(() => {
    const make = (z, flip) =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(COL_X[0], BAR_Y, z),
        new THREE.Vector3(COL_X[0] - 0.3, BAR_Y + 0.14, z * 1.05),
        new THREE.Vector3(COL_X[0] - 0.58, BAR_Y - 0.22, z * 1.2 + flip * 0.05),
        new THREE.Vector3(COL_X[0] - 0.7, TRAY.h / 2 + 0.05, z * 1.3 + flip * 0.08),
        new THREE.Vector3(COL_X[0] - 0.74, -TRAY.h / 2 - 0.3, z * 1.32 + flip * 0.08),
      ])
        .getPoints(40)
        .map((p) => [p.x, p.y, p.z]);

    return [make(ROW_Z[0], -1), make(ROW_Z[1], 1)];
  }, []);
}

export default function BatteryPack({ palette, reducedMotion }) {
  const group = useRef(null);
  const { ink, paper, accent, faint } = palette;

  const busbars = useBusbars();
  const leads = useLeads();

  // Datum rectangle on the floor plane — the drawing's ground reference.
  const datum = useMemo(() => {
    const x = TRAY.w / 2 + 0.26;
    const z = TRAY.d / 2 + 0.22;
    const y = -TRAY.h / 2 - 0.46;
    return [
      [-x, y, -z],
      [x, y, -z],
      [x, y, z],
      [-x, y, z],
      [-x, y, -z],
    ];
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    if (reducedMotion) {
      g.rotation.y = -0.62;
      g.rotation.x = 0.06;
      return;
    }

    // Slow continuous turn, plus a gentle lean toward the cursor.
    const t = Math.min(delta, 0.05);
    g.rotation.y += t * 0.18;

    const targetX = 0.06 + state.pointer.y * 0.16;
    const targetZ = state.pointer.x * -0.05;
    g.rotation.x += (targetX - g.rotation.x) * Math.min(1, t * 3);
    g.rotation.z += (targetZ - g.rotation.z) * Math.min(1, t * 3);

    // Barely-there float so it never reads as a frozen render.
    g.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.045;
  });

  return (
    <group ref={group} rotation={[0.06, -0.62, 0]}>
      <Line points={datum} color={faint} lineWidth={1} />

      {/* Tray */}
      <Solid w={TRAY.w} h={TRAY.h} d={TRAY.d} position={[0, 0, 0]} ink={ink} paper={paper} />

      {/* Cells */}
      {ROW_Z.map((z) =>
        COL_X.map((x) => (
          <Solid
            key={`cell-${x}-${z}`}
            w={CELL.w}
            h={CELL.h}
            d={CELL.d}
            position={[x, CELL_Y, z]}
            ink={ink}
            paper={paper}
          />
        ))
      )}

      {/* Terminal posts */}
      {ROW_Z.map((z) =>
        COL_X.map((x) => (
          <Post
            key={`post-${x}-${z}`}
            position={[x, POST_Y, z]}
            ink={ink}
            paper={paper}
            accent={accent}
          />
        ))
      )}

      {/* Busbar links */}
      {busbars.map((bar, i) => (
        <Solid
          key={`bar-${i}`}
          w={bar.w}
          h={0.05}
          d={bar.d}
          position={bar.position}
          ink={accent}
          paper={paper}
        />
      ))}

      {/* Output leads */}
      {leads.map((points, i) => (
        <Line key={`lead-${i}`} points={points} color={accent} lineWidth={1.6} />
      ))}
    </group>
  );
}
