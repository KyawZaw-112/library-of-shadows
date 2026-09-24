"use client";

import { RoundedBox } from "@react-three/drei";
import type { ReactNode } from "react";

/**
 * 25 distinct pieces, all chunky-flat and toy-like so they read as one family.
 * Each mesh carries userData.tint (-1..1) / userData.acc (accent colour).
 * The scene recolours them every frame, so a piece can morph from one
 * chapter's palette to the next without remounting.
 */

const MAT = { roughness: 0.42, metalness: 0.03 };
const R = 0.09;

type Rest = Record<string, unknown>;

function Box({
  tint = 0,
  acc = false,
  w,
  h,
  d,
  r = R,
  ...rest
}: { tint?: number; acc?: boolean; w: number; h: number; d: number; r?: number } & Rest) {
  return (
    <RoundedBox args={[w, h, d]} radius={r} smoothness={3} castShadow receiveShadow userData={{ tint, acc }} {...rest}>
      <meshStandardMaterial {...MAT} />
    </RoundedBox>
  );
}

function Geo({
  tint = 0,
  acc = false,
  children,
  ...rest
}: { tint?: number; acc?: boolean; children: ReactNode } & Rest) {
  return (
    <mesh castShadow receiveShadow userData={{ tint, acc }} {...rest}>
      {children}
      <meshStandardMaterial {...MAT} />
    </mesh>
  );
}

function Ring({
  args,
  tint = 0,
  rot,
  pos,
}: {
  args: [number, number, number, number];
  tint?: number;
  rot: [number, number, number];
  pos: [number, number, number];
}) {
  return (
    <Geo tint={tint} rotation={rot} position={pos}>
      <torusGeometry args={args} />
    </Geo>
  );
}

export type Kind =
  | "bookStack" | "openBook" | "people" | "pillars" | "clock" | "shelf" | "gift" | "phone"
  | "funnel" | "tags" | "donut" | "coins" | "bars" | "scale" | "megaphone" | "columns"
  | "badges" | "cone" | "path" | "trophy" | "cart" | "box" | "heart" | "star" | "letter";

const K: Record<Kind, () => ReactNode> = {
  /* 1. a tilted pile of books + bookmark — the brand */
  bookStack: () => (
    <>
      <Box w={1.4} h={0.3} d={1.04} tint={-0.14} position={[-0.06, -0.64, 0.02]} rotation={[0, 0.18, 0]} />
      <Box w={1.28} h={0.28} d={0.96} tint={0.18} position={[0.08, -0.34, -0.05]} rotation={[0, -0.14, 0]} />
      <Box w={1.16} h={0.26} d={0.88} tint={0.4} position={[-0.02, -0.06, 0.06]} rotation={[0, 0.1, 0]} />
      <Geo acc position={[0.36, -0.14, 0.46]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.14, 0.66, 0.04]} />
      </Geo>
    </>
  ),

  /* 2. a book held open, pages fanned */
  openBook: () => (
    <>
      <Box w={0.72} h={0.1} d={0.96} r={0.04} tint={0.1} position={[-0.4, -0.5, 0]} rotation={[0, 0, 0.22]} />
      <Box w={0.72} h={0.1} d={0.96} r={0.04} tint={0.26} position={[0.4, -0.5, 0]} rotation={[0, 0, -0.22]} />
      <Geo tint={-0.2} position={[0, -0.56, 0]}>
        <boxGeometry args={[0.16, 0.1, 0.92]} />
      </Geo>
      <Geo acc position={[0, 0.06, 0.5]} rotation={[0.5, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.03]} />
      </Geo>
    </>
  ),

  /* 3. six founders */
  people: () => (
    <>
      {[-1.02, -0.62, -0.21, 0.21, 0.62, 1.02].map((x, i) => (
        <group key={i} position={[x, 0, Math.abs(x) * 0.3]}>
          <Geo tint={0.08 + i * 0.07} position={[0, 0.36, 0]}>
            <sphereGeometry args={[0.24, 28, 22]} />
          </Geo>
          <Geo tint={-0.2 + i * 0.05} position={[0, -0.16, 0]}>
            <cylinderGeometry args={[0.16, 0.22, 0.56, 24]} />
          </Geo>
        </group>
      ))}
    </>
  ),

  /* 4. three pillars */
  pillars: () => (
    <>
      <Box w={0.46} h={0.52} d={0.46} tint={-0.04} position={[-0.7, -0.62, 0]} />
      <Geo tint={0.36} position={[-0.7, -0.24, 0]}>
        <sphereGeometry args={[0.18, 24, 18]} />
      </Geo>
      <Box w={0.46} h={0.9} d={0.46} tint={0.14} position={[0, -0.44, 0]} />
      <Geo tint={0.46} position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.2, 24, 18]} />
      </Geo>
      <Box w={0.46} h={1.26} d={0.46} tint={0.28} position={[0.7, -0.26, 0]} />
      <Geo tint={0.56} position={[0.7, 0.46, 0]}>
        <sphereGeometry args={[0.22, 24, 18]} />
      </Geo>
    </>
  ),

  /* 5. clock — no time */
  clock: () => (
    <>
      <Geo tint={0.62} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.64, 0.64, 0.16, 40]} />
      </Geo>
      <Ring args={[0.65, 0.1, 14, 40]} tint={-0.06} rot={[Math.PI / 2, 0, 0]} pos={[0, 0, 0]} />
      <Geo acc position={[0.16, 0.15, 0.13]} rotation={[0, 0, -0.6]}>
        <boxGeometry args={[0.48, 0.07, 0.05]} />
      </Geo>
      <Geo acc position={[-0.12, -0.2, 0.13]} rotation={[0, 0, 0.9]}>
        <boxGeometry args={[0.36, 0.07, 0.05]} />
      </Geo>
      <Geo acc position={[0, 0, 0.13]}>
        <sphereGeometry args={[0.06, 16, 12]} />
      </Geo>
    </>
  ),

  /* 6. shelf + magnifier */
  shelf: () => (
    <>
      <Box w={1.98} h={0.16} d={0.46} tint={-0.24} position={[0, -0.72, 0]} />
      <Box w={1.98} h={0.1} d={0.1} tint={-0.24} position={[0, 0.02, 0.18]} />
      <Box w={0.1} h={1.6} d={0.46} tint={-0.24} position={[-0.94, 0.06, 0]} />
      <Box w={0.1} h={1.6} d={0.46} tint={-0.24} position={[0.94, 0.06, 0]} />
      {[0, 1, 2, 3, 4].map((i) => {
        const h = 0.52 + ((i * 3) % 3) * 0.14;
        return (
          <Box key={i} w={0.21} h={h} d={0.32} r={0.04} tint={i * 0.14} position={[-0.68 + i * 0.34, -0.62 + h / 2, 0]} />
        );
      })}
      <Ring args={[0.27, 0.07, 12, 32]} tint={0.5} rot={[0.14, 0, 0]} pos={[0.58, 0.42, 0.44]} />
      <Geo acc position={[0.78, 0.02, 0.44]} rotation={[0, 0, -0.7]}>
        <boxGeometry args={[0.36, 0.07, 0.07]} />
      </Geo>
    </>
  ),

  /* 7. gift box */
  gift: () => (
    <>
      <Box w={1.06} h={0.86} d={0.96} tint={0.08} position={[0, -0.36, 0]} />
      <Box w={0.18} h={0.9} d={1.0} tint={-0.24} position={[0, -0.36, 0]} />
      <Box w={1.1} h={0.9} d={0.18} tint={-0.24} position={[0, -0.36, 0]} />
      <Ring args={[0.18, 0.06, 12, 28]} tint={0.7} rot={[Math.PI / 2, 0, 0]} pos={[0, 0.14, 0]} />
      <Geo acc position={[0.26, 0.36, 0]}>
        <sphereGeometry args={[0.12, 20, 16]} />
      </Geo>
      <Geo acc position={[-0.26, 0.36, 0]}>
        <sphereGeometry args={[0.12, 20, 16]} />
      </Geo>
    </>
  ),

  /* 8. phone + pins */
  phone: () => (
    <>
      <Box w={0.96} h={1.6} d={0.15} r={0.15} tint={0.68} position={[0, -0.06, 0]} />
      <Box w={0.78} h={1.34} d={0.04} r={0.07} tint={-0.06} position={[0, -0.06, 0.09]} />
      <Geo acc position={[-0.18, 0.08, 0.16]}>
        <sphereGeometry args={[0.1, 20, 16]} />
      </Geo>
      <Geo acc position={[0.2, -0.32, 0.16]}>
        <sphereGeometry args={[0.08, 20, 16]} />
      </Geo>
      <Geo acc position={[0, -0.66, 0.16]}>
        <sphereGeometry args={[0.06, 20, 16]} />
      </Geo>
    </>
  ),

  /* 9. funnel rings */
  funnel: () => (
    <>
      {[0, 1, 2, 3].map((i) => (
        <Geo key={i} tint={i * 0.14} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.62 - i * 0.44, 0]}>
          <torusGeometry args={[0.82 - i * 0.19, 0.09, 14, 36]} />
        </Geo>
      ))}
      <Geo acc position={[0, -0.76, 0]}>
        <sphereGeometry args={[0.16, 20, 16]} />
      </Geo>
    </>
  ),

  /* 10. price tags */
  tags: () => (
    <>
      <Box w={0.98} h={0.56} d={0.1} r={0.13} tint={-0.16} position={[-0.18, -0.46, -0.18]} rotation={[0, 0.24, -0.13]} />
      <Box w={0.98} h={0.56} d={0.1} r={0.13} tint={0.04} position={[0.2, -0.02, 0]} rotation={[0, -0.18, 0.11]} />
      <Box w={0.98} h={0.56} d={0.1} r={0.13} tint={0.26} position={[-0.14, 0.42, 0.18]} rotation={[0, 0.28, -0.09]} />
      <Geo acc position={[-0.54, -0.52, -0.18]}>
        <sphereGeometry args={[0.06, 16, 12]} />
      </Geo>
    </>
  ),

  /* 11. donut */
  donut: () => (
    <>
      <Geo tint={0.2} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <torusGeometry args={[0.54, 0.22, 18, 40]} />
      </Geo>
      <Geo acc rotation={[Math.PI / 2, 0, 0]} position={[0, 0.1, 0.03]}>
        <torusGeometry args={[0.32, 0.06, 12, 32]} />
      </Geo>
      <Geo acc position={[-0.44, 0.64, 0]}>
        <sphereGeometry args={[0.1, 18, 14]} />
      </Geo>
      <Geo acc position={[0.46, 0.52, 0]}>
        <sphereGeometry args={[0.08, 18, 14]} />
      </Geo>
      <Geo acc position={[0, -0.64, 0]}>
        <sphereGeometry args={[0.07, 18, 14]} />
      </Geo>
    </>
  ),

  /* 12. coin stack */
  coins: () => (
    <>
      {[0, 1, 2, 3].map((i) => (
        <Geo key={i} tint={i * 0.1} rotation={[0, i * 0.5, 0]} position={[0, -0.64 + i * 0.22, 0]}>
          <cylinderGeometry args={[0.44, 0.44, 0.2, 32]} />
        </Geo>
      ))}
      <Geo acc position={[0.6, -0.74, 0.32]}>
        <sphereGeometry args={[0.15, 20, 16]} />
      </Geo>
    </>
  ),

  /* 13. bar chart */
  bars: () => (
    <>
      {[0.44, 0.76, 1.06, 1.42].map((h, i) => (
        <Box key={i} w={0.36} h={h} d={0.36} r={0.07} tint={i * 0.16} position={[-0.78 + i * 0.52, -0.86 + h / 2, 0]} />
      ))}
      <Geo acc position={[0.78, 0.7, 0]} rotation={[0, 0, -0.5]}>
        <coneGeometry args={[0.17, 0.36, 20]} />
      </Geo>
    </>
  ),

  /* 14. balance scale */
  scale: () => (
    <>
      <Geo tint={-0.28} position={[0, -0.62, 0]}>
        <cylinderGeometry args={[0.16, 0.24, 0.54, 24]} />
      </Geo>
      <Box w={1.8} h={0.11} d={0.13} r={0.05} tint={0.12} position={[0, 0.32, 0]} />
      <Geo acc position={[-0.1, 0.86, 0]}>
        <sphereGeometry args={[0.09, 16, 12]} />
      </Geo>
      <Geo tint={0.44} position={[-0.76, 0.04, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.1, 28]} />
      </Geo>
      <Geo tint={0.44} position={[0.76, 0.04, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.1, 28]} />
      </Geo>
    </>
  ),

  /* 15. megaphone */
  megaphone: () => (
    <>
      <Geo tint={0.06} rotation={[0, 0, -0.5]} position={[-0.2, 0.1, 0]}>
        <coneGeometry args={[0.52, 0.96, 28]} />
      </Geo>
      <Geo tint={-0.32} rotation={[0, 0, -0.5]} position={[-0.7, -0.2, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.44, 20]} />
      </Geo>
      <Geo acc position={[0.52, 0.54, 0]}>
        <sphereGeometry args={[0.11, 18, 14]} />
      </Geo>
      <Geo acc position={[0.8, 0.18, 0]}>
        <sphereGeometry args={[0.09, 18, 14]} />
      </Geo>
      <Geo acc position={[0.64, -0.26, 0]}>
        <sphereGeometry args={[0.07, 18, 14]} />
      </Geo>
    </>
  ),

  /* 16. rival columns */
  columns: () => (
    <>
      <Box w={2.0} h={0.13} d={0.56} tint={-0.26} position={[0, -0.82, 0]} />
      {[
        [-0.72, 0.76],
        [-0.24, 1.02],
        [0.24, 0.58],
        [0.72, 0.88],
      ].map(([x, h], i) => (
        <Box key={i} w={0.36} h={h} d={0.36} r={0.07} tint={i * 0.16} position={[x, -0.75 + h / 2, 0]} />
      ))}
      <Geo acc position={[0.24, 0.02, 0.26]}>
        <sphereGeometry args={[0.1, 18, 14]} />
      </Geo>
    </>
  ),

  /* 17. check badges */
  badges: () => (
    <>
      {[
        [-0.64, 0.34],
        [0, 0.6],
        [0.64, 0.34],
        [-0.34, -0.44],
        [0.34, -0.44],
      ].map(([x, y], i) => (
        <group key={i} position={[x, y, 0]}>
          <Box w={0.46} h={0.46} d={0.13} r={0.14} tint={i * 0.14} />
          <Geo acc position={[-0.05, 0, 0.1]} rotation={[0, 0, 0.75]}>
            <boxGeometry args={[0.16, 0.06, 0.05]} />
          </Geo>
          <Geo acc position={[0.06, 0.05, 0.1]} rotation={[0, 0, -0.6]}>
            <boxGeometry args={[0.28, 0.06, 0.05]} />
          </Geo>
        </group>
      ))}
    </>
  ),

  /* 18. traffic cone */
  cone: () => (
    <>
      <Geo tint={0.08} position={[0, -0.24, 0]}>
        <coneGeometry args={[0.58, 1.18, 28]} />
      </Geo>
      <Ring args={[0.34, 0.05, 10, 28]} tint={0.7} rot={[Math.PI / 2, 0, 0]} pos={[0, -0.1, 0]} />
      <Box w={1.28} h={0.18} d={0.64} r={0.08} tint={-0.3} position={[0, -0.82, 0]} />
    </>
  ),

  /* 19. stepping-stone path with flag */
  path: () => (
    <>
      {[0, 1, 2, 3].map((i) => (
        <Box
          key={i}
          w={0.54}
          h={0.18}
          d={0.44}
          r={0.07}
          tint={i * 0.15}
          position={[-0.8 + i * 0.47, -0.78 + i * 0.38, 0]}
        />
      ))}
      <Geo tint={-0.42} position={[0.7, 0.36, 0]}>
        <cylinderGeometry args={[0.036, 0.036, 1.34, 12]} />
      </Geo>
      <Geo acc position={[0.85, 0.88, 0]}>
        <boxGeometry args={[0.31, 0.23, 0.036]} />
      </Geo>
    </>
  ),

  /* 20. trophy */
  trophy: () => (
    <>
      <Geo tint={0.26} position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.46, 0.23, 0.7, 28]} />
      </Geo>
      <Geo tint={0.26} position={[0, -0.54, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.34, 20]} />
      </Geo>
      <Box w={0.7} h={0.15} d={0.7} r={0.07} tint={-0.16} position={[0, -0.76, 0]} />
      <Ring args={[0.19, 0.05, 10, 24]} tint={0.8} rot={[0, 0, 0.42]} pos={[-0.54, 0.04, 0]} />
      <Ring args={[0.19, 0.05, 10, 24]} tint={0.8} rot={[0, 0, -0.42]} pos={[0.54, 0.04, 0]} />
    </>
  ),

  /* 21. shopping cart */
  cart: () => (
    <>
      <Box w={1.02} h={0.14} d={0.62} r={0.06} tint={0.1} position={[0, 0.06, 0]} />
      <Box w={0.12} h={0.62} d={0.1} tint={0.1} position={[-0.44, -0.24, 0.24]} rotation={[0, 0, 0.18]} />
      <Box w={0.12} h={0.62} d={0.1} tint={0.1} position={[0.44, -0.24, 0.24]} rotation={[0, 0, -0.18]} />
      <Box w={0.12} h={0.62} d={0.1} tint={0.1} position={[-0.44, -0.24, -0.24]} rotation={[0, 0, 0.18]} />
      <Box w={0.12} h={0.62} d={0.1} tint={0.1} position={[0.44, -0.24, -0.24]} rotation={[0, 0, -0.18]} />
      <Geo acc position={[0, 0.46, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
      </Geo>
      <Geo tint={-0.3} position={[-0.4, -0.6, 0.3]}>
        <cylinderGeometry args={[0.11, 0.11, 0.1, 20]} />
      </Geo>
      <Geo tint={-0.3} position={[0.4, -0.6, 0.3]}>
        <cylinderGeometry args={[0.11, 0.11, 0.1, 20]} />
      </Geo>
    </>
  ),

  /* 22. delivery box */
  box: () => (
    <>
      <Box w={1.08} h={0.92} d={0.92} tint={0.12} position={[0, -0.28, 0]} />
      <Box w={1.12} h={0.16} d={0.96} tint={0.3} position={[0, 0.24, 0]} rotation={[0.06, 0, 0]} />
      <Geo tint={-0.2} position={[0, -0.28, 0.47]}>
        <boxGeometry args={[0.5, 0.5, 0.05]} />
      </Geo>
      <Geo acc position={[0, 0.24, 0.52]} rotation={[0.5, 0, 0]}>
        <boxGeometry args={[0.24, 0.26, 0.03]} />
      </Geo>
    </>
  ),

  /* 23. heart — community */
  heart: () => (
    <>
      <Geo tint={0.3} position={[-0.24, 0.16, 0]} rotation={[0, 0, 0.5]}>
        <sphereGeometry args={[0.34, 28, 22]} />
      </Geo>
      <Geo tint={0.3} position={[0.24, 0.16, 0]} rotation={[0, 0, -0.5]}>
        <sphereGeometry args={[0.34, 28, 22]} />
      </Geo>
      <Geo tint={0.3} position={[0, -0.22, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.56, 0.56, 0.4]} />
      </Geo>
    </>
  ),

  /* 24. star — reviews */
  star: () => (
    <>
      <Geo tint={0.5} position={[0, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.62, 0.62, 0.2, 5]} />
      </Geo>
      <Geo tint={0.5} position={[0, 0.1, 0]} rotation={[0, Math.PI / 2, Math.PI / 2]}>
        <cylinderGeometry args={[0.62, 0.62, 0.2, 5]} />
      </Geo>
      <Geo acc position={[0, 0.1, 0.24]}>
        <sphereGeometry args={[0.1, 18, 14]} />
      </Geo>
    </>
  ),

  /* 25. envelope — orders and LINE */
  letter: () => (
    <>
      <Box w={1.24} h={0.86} d={0.1} r={0.06} tint={0.16} position={[0, -0.06, 0]} />
      <Geo tint={-0.14} position={[0, 0.14, 0.06]} rotation={[0.6, 0, 0]}>
        <boxGeometry args={[1.1, 0.62, 0.04]} />
      </Geo>
      <Geo acc position={[0, -0.06, 0.08]}>
        <boxGeometry args={[0.2, 0.2, 0.04]} />
      </Geo>
    </>
  ),
};

export function KindMesh({ kind }: { kind: string }) {
  const render = K[kind as Kind];
  return render ? <>{render()}</> : null;
}
