"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

import { studioConfig } from "@/data/customize";
import type { StudioSelection } from "@/data/customize";
import { useStudio } from "./studio-store";

type ShapeId = "round" | "square" | "custom";

/** "Custom" shape randomly picks one of the two standard shapes (once). */
const CUSTOM_PICK: ShapeId = Math.random() < 0.5 ? "round" : "square";

type DecoKind = "none" | "berries" | "sprinkles" | "chocolate";

type DesignStyle = {
  accent: string;
  ring: string;
  board: string;
  deco: DecoKind;
  tierFloor?: number;
};

type TopperSpec = "none" | "strawberry" | "cherry" | "mixed" | "berries" | "sprinkles" | "chocolate";

type CakeEngine = {
  update: (selection: StudioSelection) => void;
  setReducedMotion: (value: boolean) => void;
  dispose: () => void;
  /** diagnostic only */
  __debug: () => Record<string, unknown>;
};

const MAX_TIERS = 3;
const TIER_HEIGHT = 0.5;
const CREAM_HEIGHT = 0.1;
const RIM_HEIGHT = 0.07;
const BOARD_HEIGHT = 0.05;
const PLATE_HEIGHT = 0.06;
const BASE_RADIUS = 1.05;
const TIER_SHRINK = 0.78;

const SIZE_TARGETS: Record<string, { tiers: number; scale: number }> = {
  "1lb": { tiers: 1, scale: 0.78 },
  "2lb": { tiers: 2, scale: 0.9 },
  "3lb": { tiers: 2, scale: 1 },
  "4lb": { tiers: 3, scale: 1.06 },
};
const DEFAULT_SIZE = { tiers: 1, scale: 0.78 };

const FLAVOR_COLORS: Record<string, string> = {
  chocolate: "#5d3a24",
  vanilla: "#f0d9ac",
  "red-velvet": "#7b1f2b",
  strawberry: "#f2a8b4",
  pineapple: "#f3c74f",
};
const FLAVOR_DEFAULT = "#e8cf9f";

const CREAM_COLORS: Record<string, string> = {
  "butter-cream": "#fdf1e3",
  "chocolate-cream": "#5a3b26",
  "fresh-cream": "#fefcf8",
  "tiramisu-cream": "#d9b382",
};
const CREAM_DEFAULT = "#fdf1e3";

const DESIGN_STYLES: Record<string, DesignStyle> = {
  D01: { accent: "#fdf3e7", ring: "#f0cba4", board: "#e6d2b8", deco: "none" },
  D02: { accent: "#fadbe0", ring: "#e99aa5", board: "#ecdcda", deco: "berries" },
  D03: { accent: "#fff1d2", ring: "#f2a24b", board: "#eddfc4", deco: "sprinkles" },
  D04: { accent: "#fcf6ee", ring: "#e3d2bc", board: "#f6efe6", deco: "none", tierFloor: 3 },
  D05: { accent: "#6b3d24", ring: "#8a5a32", board: "#e3d4bd", deco: "chocolate" },
  D06: { accent: "#f8ecd9", ring: "#e9c46a", board: "#eee0c6", deco: "berries" },
  D07: { accent: "#ffffff", ring: "#f2cfdd", board: "#f3e6da", deco: "none" },
  D08: { accent: "#fff4dd", ring: "#f6a447", board: "#ecdab9", deco: "sprinkles" },
};
const DESIGN_DEFAULT: DesignStyle = {
  accent: "#fdf3e7",
  ring: "#f0cba4",
  board: "#e6d2b8",
  deco: "none",
};

function wrapMessage(message: string, limit: number): string[] {
  const trimmed = message.trim();
  if (!trimmed) return ["Your message"];
  const words = trimmed.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const w = word.length > limit ? word.slice(0, limit) : word;
    const next = line ? `${line} ${w}` : w;
    if (next.length <= limit) {
      line = next;
    } else {
      if (line) lines.push(line);
      line = w;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 4);
}

function createMessageTexture(message: string, colorHex: string, charLimit: number): THREE.CanvasTexture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2d canvas unavailable");
  ctx.clearRect(0, 0, width, height);
  const lines = wrapMessage(message, charLimit);
  const fontSize = lines.length <= 1 ? 128 : lines.length === 2 ? 104 : lines.length === 3 ? 88 : 72;
  const family = '"Fraunces", ui-serif, Georgia, serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `600 ${fontSize}px ${family}`;
  ctx.fillStyle = message.trim() ? colorHex : "rgba(74, 51, 36, 0.38)";
  const lineHeight = fontSize * 1.18;
  let y = (height - lineHeight * lines.length) / 2 + lineHeight / 2;
  for (const line of lines) {
    ctx.fillText(line, width / 2, y);
    y += lineHeight;
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function roundedRectShape(width: number, height: number, radius: number): THREE.Shape {
  const s = new THREE.Shape();
  const w = width / 2;
  const h = height / 2;
  const r = Math.min(radius, w, h);
  s.moveTo(-w + r, -h);
  s.lineTo(w - r, -h);
  s.quadraticCurveTo(w, -h, w, -h + r);
  s.lineTo(w, h - r);
  s.quadraticCurveTo(w, h, w - r, h);
  s.lineTo(-w + r, h);
  s.quadraticCurveTo(-w, h, -w, h - r);
  s.lineTo(-w, -h + r);
  s.quadraticCurveTo(-w, -h, -w + r, -h);
  return s;
}

function buildShapeGeometry(shape: ShapeId, radius: number, height: number): THREE.BufferGeometry {
  if (shape === "round") {
    return new THREE.CylinderGeometry(radius, radius, height, 26);
  }
  const w = radius * 2;
  const geometry =
    shape === "square"
      ? new THREE.ExtrudeGeometry(roundedRectShape(w, w, radius * 0.16), {
          depth: height,
          bevelEnabled: true,
          bevelThickness: 0.02,
          bevelSize: 0.03,
          bevelSegments: 1,
          steps: 1,
          curveSegments: 6,
        })
      : new THREE.ExtrudeGeometry(roundedRectShape(w, w, radius * 0.92), {
          depth: height,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.04,
          bevelSegments: 2,
          steps: 1,
          curveSegments: 8,
        });
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

function mixHex(a: string, b: string, t: number): string {
  const ca = new THREE.Color(a);
  const cb = new THREE.Color(b);
  ca.lerp(cb, t);
  return `#${ca.getHexString()}`;
}

function darkerHex(hex: string, amount: number): string {
  const c = new THREE.Color(hex);
  c.multiplyScalar(1 - amount);
  return `#${c.getHexString()}`;
}

function disposeObject(root: THREE.Object3D) {
  root.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry.dispose();
      const material = child.material;
      if (Array.isArray(material)) for (const m of material) m.dispose();
      else material.dispose();
    }
  });
}

// Strawberry body outline as (height, radius) pairs, tip at y=0, flat top at y=0.19.
const STRAWBERRY_PROFILE: [number, number][] = [
  [0, 0],
  [0.008, 0.02],
  [0.02, 0.042],
  [0.04, 0.063],
  [0.062, 0.08],
  [0.088, 0.088],
  [0.115, 0.09],
  [0.14, 0.086],
  [0.16, 0.078],
  [0.175, 0.07],
  [0.185, 0.064],
  [0.19, 0.06],
];

function strawberryRadiusAt(y: number): number {
  const profile = STRAWBERRY_PROFILE;
  if (y <= profile[0][0]) return profile[0][1];
  const last = profile[profile.length - 1];
  if (y >= last[0]) return last[1];
  for (let i = 1; i < profile.length; i++) {
    if (y <= profile[i][0]) {
      const [y0, r0] = profile[i - 1];
      const [y1, r1] = profile[i];
      const t = (y - y0) / (y1 - y0);
      return r0 + (r1 - r0) * t;
    }
  }
  return last[1];
}

function strawberryBodyGeometry(): THREE.LatheGeometry {
  const points = STRAWBERRY_PROFILE.map(([y, r]) => new THREE.Vector2(r, y));
  return new THREE.LatheGeometry(points, 24);
}

let strawberryBodyTextureCache: THREE.CanvasTexture | null = null;

function strawberryBodyTexture(): THREE.CanvasTexture {
  if (strawberryBodyTextureCache) return strawberryBodyTextureCache;
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2d canvas unavailable");
  const gradient = ctx.createRadialGradient(32, 8, 4, 32, 8, 80);
  gradient.addColorStop(0, "#ff8d78");
  gradient.addColorStop(0.35, "#ef5b48");
  gradient.addColorStop(0.72, "#c02e29");
  gradient.addColorStop(1, "#7d1210");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  strawberryBodyTextureCache = texture;
  return texture;
}

// Flat leaf blade: cone rotated so its long axis runs along X, then squashed thin.
function topperLeafGeometry(): THREE.BufferGeometry {
  const geometry = new THREE.ConeGeometry(0.018, 0.055, 5);
  geometry.rotateZ(Math.PI / 2);
  geometry.scale(1, 0.3, 0.8);
  return geometry;
}

function buildToppers(spec: TopperSpec, s: ShapeId, topRadius: number): THREE.Group {
  const group = new THREE.Group();
  const fit = 0.78;
  const ring = topRadius * fit;

  const ball = (color: string, size: number, angle: number, radius: number, lift = 0.03): THREE.Mesh => {
    const geo = new THREE.SphereGeometry(size, 10, 8);
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.55 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(Math.cos(angle) * radius, lift + size, Math.sin(angle) * radius);
    return mesh;
  };
  const leaf = (angle: number, radius: number, lift: number, ballSize: number): THREE.Mesh => {
    const geo = new THREE.ConeGeometry(0.03, 0.07, 6);
    const mat = new THREE.MeshStandardMaterial({ color: "#4e9a44", roughness: 0.9 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(Math.cos(angle) * radius, lift + ballSize * 2 + 0.03, Math.sin(angle) * radius);
    return mesh;
  };
  const stem = (angle: number, radius: number, lift: number, ballSize: number): THREE.Mesh => {
    const geo = new THREE.CylinderGeometry(0.008, 0.008, 0.1, 6);
    const mat = new THREE.MeshStandardMaterial({ color: "#6b4a35", roughness: 0.9 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(Math.cos(angle) * radius, lift + ballSize + 0.05, Math.sin(angle) * radius);
    mesh.rotation.z = 0.3;
    return mesh;
  };

  if (spec === "strawberry") {
    const bodyGeo = strawberryBodyGeometry();
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      map: strawberryBodyTexture(),
      roughness: 0.35,
      sheen: 0.45,
      sheenColor: new THREE.Color("#ff9c85"),
      sheenRoughness: 0.6,
      clearcoat: 0.12,
    });
    // The lathe is open at the flat top, so a small disc caps the hole.
    const capGeo = new THREE.CircleGeometry(0.06, 16);
    const seedGeo = new THREE.SphereGeometry(0.006, 6, 5);
    const seedMat = new THREE.MeshStandardMaterial({ color: "#e7c46c", roughness: 0.45 });
    const crownGeo = topperLeafGeometry();
    const crownMat = new THREE.MeshStandardMaterial({ color: "#4e9a44", roughness: 0.85 });
    const seedRows: [number, number, number][] = [
      [0.05, 3, 0],
      [0.085, 4, 0.5],
      [0.12, 4, 0.15],
      [0.155, 3, 0.65],
    ];
    const berry = (angle: number, radius: number, lift = 0.03): THREE.Group => {
      const fruit = new THREE.Group();
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.castShadow = true;
      fruit.add(body);
      const cap = new THREE.Mesh(capGeo, bodyMat);
      cap.rotation.x = -Math.PI / 2;
      cap.position.y = 0.19;
      fruit.add(cap);
      for (const [y, count, base] of seedRows) {
        const seedRadius = strawberryRadiusAt(y) + 0.004;
        for (let i = 0; i < count; i++) {
          const a = base + (i / count) * Math.PI * 2;
          const seed = new THREE.Mesh(seedGeo, seedMat);
          seed.position.set(Math.cos(a) * seedRadius, y, Math.sin(a) * seedRadius);
          fruit.add(seed);
        }
      }
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 + 0.35;
        const blade = new THREE.Mesh(crownGeo, crownMat);
        blade.position.set(Math.cos(a) * 0.014, 0.192, Math.sin(a) * 0.014);
        blade.rotation.set(0, a, 0.6);
        blade.castShadow = true;
        fruit.add(blade);
      }
      fruit.position.set(Math.cos(angle) * radius, lift, Math.sin(angle) * radius);
      return fruit;
    };
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + 0.4;
      group.add(berry(a, ring, 0.03));
    }
  } else if (spec === "cherry") {
    const bodyGeo = new THREE.SphereGeometry(0.078, 22, 16);
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: "#8c1f2e",
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    const stemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.148, 0),
      new THREE.Vector3(0.014, 0.225, 0.016),
      new THREE.Vector3(0.008, 0.29, 0.03),
      new THREE.Vector3(-0.006, 0.335, 0.026),
    ]);
    const stemGeo = new THREE.TubeGeometry(stemCurve, 14, 0.007, 6, false);
    const stemMat = new THREE.MeshStandardMaterial({ color: "#514131", roughness: 0.6 });
    const leafGeo = topperLeafGeometry();
    const leafMat = new THREE.MeshStandardMaterial({ color: "#4e9a44", roughness: 0.85 });
    const cherry = (angle: number, radius: number, lift = 0.03): THREE.Group => {
      const fruit = new THREE.Group();
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = 0.078;
      body.castShadow = true;
      fruit.add(body);
      const stemMesh = new THREE.Mesh(stemGeo, stemMat);
      stemMesh.castShadow = true;
      fruit.add(stemMesh);
      const leafMesh = new THREE.Mesh(leafGeo, leafMat);
      leafMesh.position.set(0.012, 0.25, 0.02);
      leafMesh.rotation.set(0, 1.05, 0.65);
      leafMesh.castShadow = true;
      fruit.add(leafMesh);
      fruit.position.set(Math.cos(angle) * radius, lift, Math.sin(angle) * radius);
      return fruit;
    };
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + 1.1;
      group.add(cherry(a, ring, 0.03));
    }
  } else if (spec === "mixed") {
    const palette = ["#d4493f", "#8c1f2e", "#f59e42", "#9cbf4f", "#5f84bf", "#e9c46a"];
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2 + 0.2;
      const color = palette[i % palette.length];
      group.add(ball(color, 0.058, a, ring * 0.94));
      if (i % 3 === 0) group.add(leaf(a, ring * 0.94, 0.03, 0.058));
    }
  } else if (spec === "berries") {
    const palette = ["#d4493f", "#b23a4b", "#8c1f2e"];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + Math.random();
      group.add(ball(palette[i % palette.length], 0.06, a, ring * 0.94));
    }
  } else if (spec === "sprinkles") {
    const palette = ["#ef6f6c", "#f2b04a", "#8fb75a", "#6f9fd8", "#c084fc", "#f288b1"];
    for (let i = 0; i < 20; i++) {
      const a = Math.random() * Math.PI * 2;
      const rr = topRadius * (0.42 + Math.random() * (fit - 0.42));
      group.add(ball(palette[i % palette.length], 0.028, a, rr, 0.05));
    }
  } else if (spec === "chocolate") {
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2 + 0.6;
      group.add(ball(i % 2 === 0 ? "#4a2c1a" : "#6b4226", 0.07, a, ring * 0.9));
    }
  }
  return group;
}

type Slot = {
  group: THREE.Group;
  body: THREE.Mesh;
  cream: THREE.Mesh;
  rim: THREE.Mesh;
  board: THREE.Mesh;
};

function createCakeEngine(
  canvas: HTMLCanvasElement,
  container: HTMLElement,
  opts: { reducedMotion: boolean; onFail: () => void }
): CakeEngine {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch {
    throw new Error("WebGL unavailable");
  }
  if (!renderer.capabilities.isWebGL2) {
    renderer.dispose();
    throw new Error("WebGL2 unavailable");
  }
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
  camera.position.set(0, 2.5, 6.4);
  camera.lookAt(0, 1.05, 0);

  scene.add(new THREE.HemisphereLight(0xfff6ee, 0xdcc3a5, 1.2));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(3.5, 6, 4.5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -4;
  key.shadow.camera.right = 4;
  key.shadow.camera.top = 4;
  key.shadow.camera.bottom = -4;
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 14;
  key.shadow.bias = -0.0004;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffe2cc, 0.6);
  fill.position.set(-4, 2, -3.5);
  scene.add(fill);

  const groundGeo = new THREE.CircleGeometry(BASE_RADIUS * 2.6, 48);
  const groundMat = new THREE.MeshStandardMaterial({ color: "#f7efe6", roughness: 1 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0.001;
  ground.receiveShadow = true;
  scene.add(ground);

  const cake = new THREE.Group();
  scene.add(cake);

  const slots: Slot[] = [];
  const decos: (THREE.Group | null)[] = [];
  const bodyMats: THREE.MeshPhysicalMaterial[] = [];
  const creamMats: THREE.MeshPhysicalMaterial[] = [];
  const rimMats: THREE.MeshPhysicalMaterial[] = [];
  const boardMats: THREE.MeshPhysicalMaterial[] = [];
  for (let i = 0; i < MAX_TIERS; i++) {
    const bodyMat = new THREE.MeshPhysicalMaterial({ color: FLAVOR_DEFAULT, roughness: 0.92, clearcoat: 0.08 });
    const creamMat = new THREE.MeshPhysicalMaterial({
      color: CREAM_DEFAULT,
      roughness: 0.55,
      clearcoat: 0.45,
      clearcoatRoughness: 0.25,
    });
    const rimMat = new THREE.MeshPhysicalMaterial({
      color: darkerHex(CREAM_DEFAULT, 0.18),
      roughness: 0.6,
      clearcoat: 0.35,
    });
    const boardMat = new THREE.MeshPhysicalMaterial({ color: "#e6d2b8", roughness: 0.95 });
    const group = new THREE.Group();
    group.visible = false;
    const body = new THREE.Mesh(new THREE.BufferGeometry(), bodyMat);
    const cream = new THREE.Mesh(new THREE.BufferGeometry(), creamMat);
    const rim = new THREE.Mesh(new THREE.BufferGeometry(), rimMat);
    const board = new THREE.Mesh(new THREE.BufferGeometry(), boardMat);
    body.castShadow = true;
    cream.castShadow = true;
    rim.castShadow = true;
    board.castShadow = true;
    group.add(body, cream, rim, board);
    cake.add(group);
    slots.push({ group, body, cream, rim, board });
    decos.push(null);
    bodyMats.push(bodyMat);
    creamMats.push(creamMat);
    rimMats.push(rimMat);
    boardMats.push(boardMat);
  }

  const plateMat = new THREE.MeshPhysicalMaterial({ color: "#e6d2b8", roughness: 0.7, metalness: 0.06 });
  const plate = new THREE.Mesh(new THREE.BufferGeometry(), plateMat);
  plate.position.y = PLATE_HEIGHT / 2;
  plate.castShadow = true;
  cake.add(plate);

  let shape: ShapeId = "round";
  let tiers = 1;
  let lastStructure = "";
  let lastToppersKey = "";
  let lastMsgKey = "";
  let lastMsgStyle = "";
  let currentMessage = "";
  let currentStyleHex = "#4a3324";
  let targetScale = DEFAULT_SIZE.scale;
  let cakeScale = targetScale;
  let rotationY = 0;
  let reduced = opts.reducedMotion;
  let dragging = false;
  let lastX = 0;

  const colorTargets: { mat: THREE.MeshPhysicalMaterial; target: THREE.Color }[] = [];
  let toppersGroup: THREE.Group | null = null;
  let plaque: THREE.Mesh | null = null;
  let messageTexture: THREE.CanvasTexture | null = null;

  const styleLookup = new Map<string, string>(
    studioConfig.messageStyles.map((s) => [s.id, s.swatch])
  );

  function slotRadius(i: number): number {
    return BASE_RADIUS * Math.pow(TIER_SHRINK, i);
  }

  function setGeometry(mesh: THREE.Mesh, geometry: THREE.BufferGeometry) {
    mesh.geometry.dispose();
    mesh.geometry = geometry;
  }

  function rebuildStructure(s: ShapeId, count: number) {
    disposeToppers();
    for (let i = 0; i < MAX_TIERS; i++) {
      const deco = decos[i];
      if (deco) {
        slots[i].group.remove(deco);
        disposeObject(deco);
        decos[i] = null;
      }
    }
    for (let i = 0; i < MAX_TIERS; i++) {
      const slot = slots[i];
      slot.group.visible = i < count;
      if (i >= count) continue;
      const r = slotRadius(i) * (s === "square" ? 0.95 : 1);
      const yBase = PLATE_HEIGHT + i * (TIER_HEIGHT + CREAM_HEIGHT);
      setGeometry(slot.body, buildShapeGeometry(s, r, TIER_HEIGHT));
      slot.body.position.y = yBase + TIER_HEIGHT / 2;
      setGeometry(slot.cream, buildShapeGeometry(s, r * 1.03, CREAM_HEIGHT));
      slot.cream.position.y = yBase + TIER_HEIGHT + CREAM_HEIGHT / 2;
      setGeometry(slot.rim, buildShapeGeometry(s, r * 1.05, RIM_HEIGHT));
      slot.rim.position.y = yBase + TIER_HEIGHT + RIM_HEIGHT / 2 - 0.02;
      if (i > 0) {
        setGeometry(slot.board, buildShapeGeometry(s, r * 1.12, BOARD_HEIGHT));
        slot.board.position.y = yBase - BOARD_HEIGHT / 2;
        slot.board.visible = true;
      } else {
        slot.board.visible = false;
      }

      // Decorative, cake-like details: piped edges, cream seams + drips.
      const deco = new THREE.Group();
      const seam = new THREE.Mesh(new THREE.TorusGeometry(r * 0.98, 0.018, 8, 42), slot.rim.material);
      seam.rotation.x = Math.PI / 2;
      seam.position.y = yBase + TIER_HEIGHT * 0.5;
      seam.castShadow = true;
      deco.add(seam);
      const pip = new THREE.Mesh(new THREE.TorusGeometry(r * 1.03, 0.022, 8, 42), slot.rim.material);
      pip.rotation.x = Math.PI / 2;
      pip.position.y = yBase + 0.07;
      pip.castShadow = true;
      deco.add(pip);
      const topEdgeY = yBase + TIER_HEIGHT + CREAM_HEIGHT;
      const dripGeo = new THREE.CylinderGeometry(0.05, 0.014, 0.2, 6);
      for (let d = 0; d < 9; d++) {
        const a = (d / 9) * Math.PI * 2 + i * 0.7 + d * 0.11;
        const drip = new THREE.Mesh(dripGeo, slot.cream.material);
        drip.position.set(Math.cos(a) * r * 1.02, topEdgeY - 0.05 - 0.1, Math.sin(a) * r * 1.02);
        drip.rotation.z = (d - 4) * 0.02;
        drip.castShadow = true;
        deco.add(drip);
      }
      slot.group.add(deco);
      decos[i] = deco;
    }
    setGeometry(plate, buildShapeGeometry(s, BASE_RADIUS * 1.18, PLATE_HEIGHT));
  }

  function disposeToppers() {
    if (!toppersGroup) return;
    cake.remove(toppersGroup);
    disposeObject(toppersGroup);
    toppersGroup = null;
  }

  function rebuildToppers(spec: TopperSpec, s: ShapeId, topRadius: number) {
    disposeToppers();
    const group = buildToppers(spec, s, topRadius);
    group.position.y =
      PLATE_HEIGHT +
      (tiers - 1) * (TIER_HEIGHT + CREAM_HEIGHT) +
      TIER_HEIGHT +
      CREAM_HEIGHT +
      0.06;
    toppersGroup = group;
    cake.add(group);
  }

  function rebuildPlaque(s: ShapeId, topRadius: number, styleHex: string, message: string) {
    if (plaque) {
      cake.remove(plaque);
      disposeObject(plaque);
      plaque = null;
    }
    if (messageTexture) {
      messageTexture.dispose();
      messageTexture = null;
    }
    const texture = createMessageTexture(message, styleHex, studioConfig.messageCharLimit);
    messageTexture = texture;
    const geometry =
      s === "round"
        ? new THREE.CircleGeometry(topRadius * 0.52, 32)
        : new THREE.PlaneGeometry(topRadius * 1.05, topRadius * 1.05);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = PLATE_HEIGHT + (tiers - 1) * (TIER_HEIGHT + CREAM_HEIGHT) + TIER_HEIGHT + CREAM_HEIGHT + 0.012;
    plaque = mesh;
    cake.add(mesh);
  }

  function refreshMessageTexture() {
    if (!plaque) return;
    const tex = createMessageTexture(currentMessage, currentStyleHex, studioConfig.messageCharLimit);
    if (messageTexture) messageTexture.dispose();
    messageTexture = tex;
    const material = plaque.material as THREE.MeshBasicMaterial;
    material.map = tex;
    material.needsUpdate = true;
  }

  let imageDecal: THREE.Mesh | null = null;
  let imageTexture: THREE.CanvasTexture | null = null;
  let lastImageKey = "";

  /** Overlays the uploaded design reference as an "edible image" on the cake top. */
  function rebuildImageDecal(dataUrl: string | null) {
    if (imageDecal) {
      cake.remove(imageDecal);
      disposeObject(imageDecal);
      imageDecal = null;
    }
    if (imageTexture) {
      imageTexture.dispose();
      imageTexture = null;
    }
    if (!dataUrl) return;
    const img = new window.Image();
    img.onload = () => {
      const canvasEl = document.createElement("canvas");
      canvasEl.width = 512;
      canvasEl.height = 512;
      const ctx = canvasEl.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, 512, 512);
        const d = Math.min(img.width, img.height);
        ctx.save();
        ctx.arc(256, 256, 244, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, (img.width - d) / 2, (img.height - d) / 2, d, d, 8, 8, 496, 496);
        ctx.restore();
      }
      const tex = new THREE.CanvasTexture(canvasEl);
      tex.colorSpace = THREE.SRGBColorSpace;
      imageTexture = tex;
      const geo =
        shape === "square"
          ? new THREE.PlaneGeometry(topRadius() * 1.1, topRadius() * 1.1)
          : new THREE.CircleGeometry(topRadius() * 0.62, 48);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y =
        PLATE_HEIGHT + (tiers - 1) * (TIER_HEIGHT + CREAM_HEIGHT) + TIER_HEIGHT + CREAM_HEIGHT + 0.03;
      imageDecal = mesh;
      cake.add(mesh);
    };
    img.src = dataUrl;
  }

  function topRadius() {
    return slotRadius(tiers - 1);
  }

  function applySelection(sel: StudioSelection) {
    const sizeT = SIZE_TARGETS[sel.size ?? ""] ?? DEFAULT_SIZE;
    const design = DESIGN_STYLES[sel.design ?? ""] ?? DESIGN_DEFAULT;
    const flavorHex = FLAVOR_COLORS[sel.flavor ?? ""] ?? FLAVOR_DEFAULT;
    const creamHex = CREAM_COLORS[sel.cream ?? ""] ?? CREAM_DEFAULT;
    const s: ShapeId =
      sel.shape === "square"
        ? sel.shape
        : sel.shape === "custom"
          ? CUSTOM_PICK
          : "round";
    const tierCount = Math.max(sizeT.tiers, design.tierFloor ?? 0);
    targetScale = sizeT.scale;
    if (reduced) cakeScale = targetScale;

    const structureKey = `${s}:${tierCount}`;
    const structureChanged = structureKey !== lastStructure;
    if (structureChanged) rebuildStructure(s, tierCount);
    lastStructure = structureKey;
    shape = s;
    tiers = tierCount;

    const topIndex = tierCount - 1;
    const topRadius = slotRadius(topIndex);

    colorTargets.length = 0;
    for (let i = 0; i < tierCount; i++) {
      const isTop = i === topIndex;
      const bodyHex = darkerHex(flavorHex, (topIndex - i) * 0.055);
      const creamFinal = isTop ? mixHex(creamHex, design.accent, 0.5) : creamHex;
      const rimHex = isTop ? design.ring : darkerHex(creamHex, 0.18);
      colorTargets.push(
        { mat: bodyMats[i], target: new THREE.Color(bodyHex) },
        { mat: creamMats[i], target: new THREE.Color(creamFinal) },
        { mat: rimMats[i], target: new THREE.Color(rimHex) },
        { mat: boardMats[i], target: new THREE.Color(design.board) }
      );
    }

    const fruitSpec: TopperSpec =
      sel.fruitFilling === "strawberry" || sel.fruitFilling === "cherry" || sel.fruitFilling === "mixed"
        ? sel.fruitFilling
        : "none";
    const topperSpec: TopperSpec = fruitSpec === "none" ? design.deco : fruitSpec;
    const toppersKey = `${topperSpec}:${s}:${tierCount}`;
    if (structureChanged || toppersKey !== lastToppersKey) {
      rebuildToppers(topperSpec, s, topRadius);
      lastToppersKey = toppersKey;
    }

    const styleHex = styleLookup.get(sel.messageStyle) ?? "#4a3324";
    if (structureChanged || sel.message !== lastMsgKey || sel.messageStyle !== lastMsgStyle) {
      rebuildPlaque(s, topRadius, styleHex, sel.message);
      lastMsgKey = sel.message;
      lastMsgStyle = sel.messageStyle;
    }
    currentMessage = sel.message;
    currentStyleHex = styleHex;

    const imageKey = sel.referenceImage?.dataUrl ?? "";
    if (structureChanged || imageKey !== lastImageKey) {
      rebuildImageDecal(sel.referenceImage?.dataUrl ?? null);
      lastImageKey = imageKey;
    }
  }

  function resize() {
    const rect = container.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function onPointerDown(e: PointerEvent) {
    dragging = true;
    lastX = e.clientX;
    e.preventDefault();
  }

  function onPointerMove(e: PointerEvent) {
    if (!dragging) return;
    rotationY += (e.clientX - lastX) * 0.008;
    lastX = e.clientX;
  }

  function onPointerUp() {
    dragging = false;
  }

  function onContextLost(e: Event) {
    e.preventDefault();
    opts.onFail();
  }

  let lastTime = performance.now();
  let raf = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    if (!reduced && !dragging) rotationY += dt * 0.55;
    cake.rotation.y = rotationY;
    cakeScale += (targetScale - cakeScale) * (reduced ? 1 : 1 - Math.exp(-5 * dt));
    cake.scale.setScalar(cakeScale);
    if (reduced) {
      for (const c of colorTargets) c.mat.color.copy(c.target);
    } else {
      const k = 1 - Math.exp(-7 * dt);
      for (const c of colorTargets) c.mat.color.lerp(c.target, k);
    }
    renderer.render(scene, camera);
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  canvas.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("webglcontextlost", onContextLost);
  canvas.style.touchAction = "pan-y";

  resize();
  tick(performance.now());
  if (typeof document !== "undefined" && document.fonts?.ready) {
    document.fonts.ready.then(() => refreshMessageTexture()).catch(() => undefined);
  }

  return {
    update: applySelection,
    setReducedMotion(value: boolean) {
      reduced = value;
      if (reduced) cakeScale = targetScale;
    },
    __debug: () => {
      let topperMeshCount = 0;
      toppersGroup?.traverse((c) => {
        if (c instanceof THREE.Mesh) topperMeshCount += 1;
      });
      return {
        shape,
        tiers,
        targetScale,
        topperMeshCount,
        plaque: plaque !== null,
        toppersWorldY: toppersGroup ? +toppersGroup.position.y.toFixed(3) : null,
      };
    },
    dispose() {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.style.touchAction = "";
      disposeObject(cake);
      groundGeo.dispose();
      groundMat.dispose();
      renderer.dispose();
    },
  };
}

function CakeWebGLFallback({ designId }: { designId?: string }) {
  const design = studioConfig.designs.find((d) => d.id === designId);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
      {design?.image ? (
        <Image
          src={design.image}
          alt={design.label}
          width={320}
          height={320}
          className="aspect-square w-40 rounded-2xl object-cover shadow-card sm:w-48"
        />
      ) : (
        <span className="text-5xl" aria-hidden>
          🎂
        </span>
      )}
      <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
        3D preview isn&apos;t available on this device — see the design reference above.
      </p>
    </div>
  );
}

export function Cake3DViewer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selection = useStudio((s) => s.selection);
  const reducedMotion = useReducedMotion();
  const engineRef = useRef<CakeEngine | null>(null);
  const [failed, setFailed] = useState(false);

  const reduceRef = useRef(false);
  useEffect(() => {
    reduceRef.current = Boolean(reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    try {
      engineRef.current = createCakeEngine(canvas, container, {
        reducedMotion: reduceRef.current,
        onFail: () => setFailed(true),
      });
      (window as unknown as { __cakeDebug?: () => Record<string, unknown> }).__cakeDebug =
        engineRef.current.__debug;
    } catch {
      queueMicrotask(() => setFailed(true));
    }
    return () => {
      engineRef.current?.dispose();
      engineRef.current = null;
      delete (window as unknown as { __cakeDebug?: () => Record<string, unknown> }).__cakeDebug;
    };
  }, []);

  useEffect(() => {
    engineRef.current?.update(selection);
  }, [selection]);

  useEffect(() => {
    engineRef.current?.setReducedMotion(Boolean(reducedMotion));
  }, [reducedMotion]);

  if (failed) return <CakeWebGLFallback designId={selection.design} />;

  return (
    <div
      ref={containerRef}
      className="h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
      role="img"
      aria-label="Live 3D preview of your cake selections"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}