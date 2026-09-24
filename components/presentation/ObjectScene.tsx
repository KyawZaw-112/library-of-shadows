"use client";

import { ContactShadows } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Color, type Group, type Mesh, type MeshStandardMaterial } from "three";

import { chapterSlots, type Slot } from "./chapterObjects";
import { KindMesh } from "./objects";
import { chapters } from "@/lib/presentation";

/** how many objects the stage can hold at once */
const SLOTS = 3;
/** seconds a page change takes */
const DURATION = 1.15;
/** per-slot stagger, so pieces follow each other like a little parade */
const STAGGER = 0.13;

const WHITE = new Color("#ffffff");
const BLACK = new Color("#0a1024");
const T1 = new Color();
const T2 = new Color();
const T3 = new Color();
const T4 = new Color();

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

function pad(list: Slot[] | undefined): (Slot | null)[] {
  const out: (Slot | null)[] = [];
  for (let i = 0; i < SLOTS; i++) out.push(list?.[i] ?? null);
  return out;
}

/** ease-out-back: overshoots slightly, which makes the arrival feel bouncy */
function outBack(t: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

type Layer = { slot: Slot | null; alpha: number; scale: number };

function Stage({ index }: { index: number }) {
  const id = chapters[index]?.id ?? "cover";

  const cur = useRef<(Slot | null)[]>(pad(chapterSlots[id]));
  const prev = useRef<(Slot | null)[]>(pad(chapterSlots[id]));
  const t0 = useRef<number | null>(null);
  const mounted = useRef(false);

  const inGroups = useRef<(Group | null)[]>(Array(SLOTS).fill(null));
  const outGroups = useRef<(Group | null)[]>(Array(SLOTS).fill(null));

  const [incoming, setIncoming] = useState<(Slot | null)[]>(pad(chapterSlots[id]));
  const [outgoing, setOutgoing] = useState<(Slot | null)[]>(Array(SLOTS).fill(null));
  const incomingRef = useRef(incoming);
  const outgoingRef = useRef(outgoing);

  const { camera } = useThree();

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    // what we were showing becomes the outgoing layer
    prev.current = cur.current;
    cur.current = pad(chapterSlots[id]);
    t0.current = null;
    setOutgoing(incomingRef.current);
    setIncoming(cur.current);
    outgoingRef.current = incomingRef.current;
    incomingRef.current = cur.current;
  }, [id]);

  useFrame((state, dt) => {
    const el = state.clock.elapsedTime;
    const k = Math.min(1, dt * 3.2);

    if (t0.current === null) t0.current = el;
    const elapsed = el - t0.current;
    const morphing = elapsed < DURATION + STAGGER * (SLOTS - 1);

    for (let i = 0; i < SLOTS; i++) {
      const b = cur.current[i];
      const a = prev.current[i];

      const local = clamp01((elapsed - i * STAGGER) / DURATION);
      const easeIn = outBack(local);
      const easeOut = local * local;

      /* ---- incoming layer: grow from small, rise, fade in ---- */
      const gIn = inGroups.current[i];
      if (gIn) {
        if (!b) {
          gIn.visible = false;
        } else {
          gIn.visible = true;
          const grow = morphing ? easeIn : 1;
          gIn.position.set(
            b.pos[0] + Math.sin(el * 0.4 + i * 2) * 0.02,
            b.pos[1] + (morphing ? (1 - easeIn) * 0.9 : 0) + Math.sin(el * 1.1 + i * 1.7) * 0.035,
            b.pos[2],
          );
          gIn.scale.setScalar(Math.max(0.001, b.scale * grow));
          gIn.rotation.set(
            0.05 + Math.sin(el * 0.33 + i) * 0.035,
            Math.sin(el * 0.4 + i * 1.4) * 0.16 + (morphing ? (1 - easeIn) * 0.8 : 0),
            Math.sin(el * 0.27 + i * 0.9) * 0.045,
          );
          setLayerAlpha(gIn, morphing ? Math.min(1, local * 2.4) : 1);
          paintLayer(gIn, b, b, 1);
        }
      }

      /* ---- outgoing layer: sink, shrink, fade out ---- */
      const gOut = outGroups.current[i];
      if (gOut) {
        if (!a || !morphing) {
          gOut.visible = false;
        } else {
          gOut.visible = true;
          const fade = 1 - easeOut;
          gOut.position.set(
            a.pos[0] + Math.sin(el * 0.4 + i * 2) * 0.02,
            a.pos[1] - easeOut * 0.95 + Math.sin(el * 1.1 + i * 1.7) * 0.035,
            a.pos[2],
          );
          gOut.scale.setScalar(Math.max(0.001, a.scale * fade));
          gOut.rotation.set(
            0.05 + Math.sin(el * 0.33 + i) * 0.035,
            Math.sin(el * 0.4 + i * 1.4) * 0.16 + easeOut * 0.9,
            Math.sin(el * 0.27 + i * 0.9) * 0.045,
          );
          setLayerAlpha(gOut, fade);
          paintLayer(gOut, a, a, 1);
        }
      }
    }

    // drop the outgoing layer once it has fully receded
    if (!morphing && outgoingRef.current.some(Boolean)) {
      outgoingRef.current = Array(SLOTS).fill(null);
      setOutgoing(outgoingRef.current);
    }

    camera.position.x += (Math.sin(el * 0.22) * 0.1 - camera.position.x) * k;
    camera.position.y += (0.42 - camera.position.y) * k;
    camera.lookAt(0, -0.06, 0);
  });

  return (
    <group position={[0, -0.02, 0]}>
      {Array.from({ length: SLOTS }, (_, i) => (
        <group key={`out-${i}`} ref={(el) => { outGroups.current[i] = el; }}>
          {outgoing[i] && <KindMesh kind={outgoing[i]!.kind} />}
        </group>
      ))}
      {Array.from({ length: SLOTS }, (_, i) => (
        <group key={`in-${i}`} ref={(el) => { inGroups.current[i] = el; }}>
          {incoming[i] && <KindMesh kind={incoming[i]!.kind} />}
        </group>
      ))}
    </group>
  );
}

function setLayerAlpha(root: Group, a: number) {
  root.traverse((o) => {
    const mesh = o as Mesh;
    if (!mesh.isMesh) return;
    const mat = mesh.material as MeshStandardMaterial | undefined;
    if (!mat) return;
    mat.transparent = a < 0.999;
    mat.opacity = a;
  });
}

function paintLayer(root: Group, from: Slot, to: Slot, t: number) {
  const body = T1.set(from.color).lerp(T2.set(to.color), t);
  const accent = T3.set(from.color2).lerp(T4.set(to.color2), t);
  root.traverse((o) => {
    const mesh = o as Mesh;
    if (!mesh.isMesh) return;
    const mat = mesh.material as MeshStandardMaterial | undefined;
    if (!mat?.color) return;
    const { tint = 0, acc = false } = mesh.userData as { tint?: number; acc?: boolean };
    const base = acc ? accent : body;
    if (tint >= 0) mat.color.copy(base).lerp(WHITE, tint);
    else mat.color.copy(base).lerp(BLACK, -tint);
  });
}

export default function ObjectScene({ index }: { index: number }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.42, 4.6], fov: 32 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={1.05} />
      <hemisphereLight args={["#ffffff", "#c9d4ff", 0.55]} />
      <directionalLight
        castShadow
        position={[3, 4.2, 3]}
        intensity={1.15}
        color="#fff6e6"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-3, 1.2, -2]} intensity={0.32} color="#cbd8ff" />
      <Stage index={index} />
      <ContactShadows position={[0, -0.95, 0]} opacity={0.26} scale={9} blur={2.6} far={3.4} color="#3b4874" />
    </Canvas>
  );
}
