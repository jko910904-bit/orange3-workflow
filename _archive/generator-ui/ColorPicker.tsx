"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ColorPicker.module.css";

/** HSV + alpha (0–100). Source of truth for Style Inspector color. */
export type HsvaColor = {
  h: number;
  s: number;
  v: number;
  a: number;
};

export function clamp(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

export function clampHsva(c: HsvaColor): HsvaColor {
  return {
    h: ((Math.round(c.h) % 360) + 360) % 360,
    s: clamp(Math.round(c.s), 0, 100),
    v: clamp(Math.round(c.v), 0, 100),
    a: clamp(Math.round(c.a), 0, 100),
  };
}

function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const hh = ((h % 360) + 360) % 360;
  const ss = clamp(s, 0, 100) / 100;
  const vv = clamp(v, 0, 100) / 100;
  const c = vv * ss;
  const x = c * (1 - Math.abs(((hh / 60) % 2) - 1));
  const m = vv - c;
  let rp = 0;
  let gp = 0;
  let bp = 0;
  if (hh < 60) [rp, gp, bp] = [c, x, 0];
  else if (hh < 120) [rp, gp, bp] = [x, c, 0];
  else if (hh < 180) [rp, gp, bp] = [0, c, x];
  else if (hh < 240) [rp, gp, bp] = [0, x, c];
  else if (hh < 300) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];
  return [
    Math.round((rp + m) * 255),
    Math.round((gp + m) * 255),
    Math.round((bp + m) * 255),
  ];
}

function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  const rr = clamp(r, 0, 255) / 255;
  const gg = clamp(g, 0, 255) / 255;
  const bb = clamp(b, 0, 255) / 255;
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === rr) h = 60 * (((gg - bb) / d) % 6);
    else if (max === gg) h = 60 * ((bb - rr) / d + 2);
    else h = 60 * ((rr - gg) / d + 4);
  }
  if (h < 0) h += 360;
  const s = max === 0 ? 0 : (d / max) * 100;
  const v = max * 100;
  return { h: Math.round(h), s: Math.round(s), v: Math.round(v) };
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rr = clamp(r, 0, 255) / 255;
  const gg = clamp(g, 0, 255) / 255;
  const bb = clamp(b, 0, 255) / 255;
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0;
  let s = 0;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === rr) h = 60 * (((gg - bb) / d) % 6);
    else if (max === gg) h = 60 * ((bb - rr) / d + 2);
    else h = 60 * ((rr - gg) / d + 4);
    if (h < 0) h += 360;
  }
  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function toHexByte(n: number): string {
  return clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0").toUpperCase();
}

export function hsvToHex(h: number, s: number, v: number): string {
  const [r, g, b] = hsvToRgb(h, s, v);
  return `${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}`;
}

export function hexToHsv(raw: string): { h: number; s: number; v: number } {
  const cleaned = raw.trim().replace(/^#/, "");
  let hex = cleaned;
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
    /* Fallback ≈ #228BE6 */
    return { h: 208, s: 85, v: 90 };
  }
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return rgbToHsv(r, g, b);
}

/** Default primary ≈ #228BE6 (hue ~208). */
export const DEFAULT_HSVA: HsvaColor = (() => {
  const { h, s, v } = hexToHsv("228BE6");
  return { h, s, v, a: 100 };
})();

export function parseHexInput(raw: string): string | null {
  const cleaned = raw.trim().replace(/^#/, "");
  let hex = cleaned;
  if (hex.length === 3 && /^[0-9a-fA-F]{3}$/.test(hex)) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) return null;
  return hex.toUpperCase();
}

export type ColorPair = {
  primary: string;
  secondary: string;
};

/**
 * Primary = HSV color (rgba when alpha < 100%).
 * Secondary = darker shade of the same hue (opaque HSL, L ≈ 80% of primary L).
 */
export function colorPairFromHsva(color: HsvaColor): ColorPair {
  const c = clampHsva(color);
  const [r, g, b] = hsvToRgb(c.h, c.s, c.v);
  const hex = `${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}`;
  const primary =
    c.a < 100
      ? `rgba(${r}, ${g}, ${b}, ${+(c.a / 100).toFixed(3)})`
      : `#${hex}`;

  const { h, s, l } = rgbToHsl(r, g, b);
  const secondaryL = clamp(Math.round(l * 0.8), 0, 100);
  const secondary = `hsl(${h} ${s}% ${secondaryL}%)`;

  return { primary, secondary };
}

function EyedropperIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M16.5 3.5l4 4M14 6l4 4M3 21l7.5-7.5M12.5 8.5l3 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 5.5l4 4-1.2 1.2a2 2 0 0 1-2.8 0l-1.2-1.2a2 2 0 0 1 0-2.8L14.5 5.5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function useEyeDropperSupported(): boolean {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    setOk(typeof window !== "undefined" && "EyeDropper" in window);
  }, []);
  return ok;
}

type ColorPickerProps = {
  value: HsvaColor;
  onChange: (next: HsvaColor) => void;
};

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const color = clampHsva(value);
  const hex = hsvToHex(color.h, color.s, color.v);
  const [hexDraft, setHexDraft] = useState(hex);
  const [alphaDraft, setAlphaDraft] = useState(String(color.a));
  const svRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const alphaRef = useRef<HTMLDivElement>(null);
  const eyeDropperOk = useEyeDropperSupported();

  useEffect(() => {
    setHexDraft(hex);
  }, [hex]);

  useEffect(() => {
    setAlphaDraft(String(color.a));
  }, [color.a]);

  const hueColor = `hsl(${color.h} 100% 50%)`;
  const opaqueRgb = (() => {
    const [r, g, b] = hsvToRgb(color.h, color.s, color.v);
    return `rgb(${r}, ${g}, ${b})`;
  })();

  function commit(patch: Partial<HsvaColor>) {
    onChange(clampHsva({ ...color, ...patch }));
  }

  function pointerRatio(
    el: HTMLElement,
    clientX: number,
    clientY: number,
    axis: "x" | "y" | "both",
  ): { x: number; y: number } {
    const rect = el.getBoundingClientRect();
    const x = clamp((clientX - rect.left) / Math.max(rect.width, 1), 0, 1);
    const y = clamp((clientY - rect.top) / Math.max(rect.height, 1), 0, 1);
    if (axis === "x") return { x, y: 0 };
    if (axis === "y") return { x: 0, y };
    return { x, y };
  }

  function bindDrag(
    ref: React.RefObject<HTMLDivElement | null>,
    axis: "x" | "y" | "both",
    apply: (x: number, y: number) => void,
  ) {
    return (e: React.PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      e.preventDefault();
      el.setPointerCapture(e.pointerId);
      const move = (ev: PointerEvent) => {
        const { x, y } = pointerRatio(el, ev.clientX, ev.clientY, axis);
        apply(x, y);
      };
      const up = (ev: PointerEvent) => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerup", up);
        el.removeEventListener("pointercancel", up);
        if (el.hasPointerCapture(ev.pointerId)) {
          el.releasePointerCapture(ev.pointerId);
        }
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", up);
      el.addEventListener("pointercancel", up);
      const { x, y } = pointerRatio(el, e.clientX, e.clientY, axis);
      apply(x, y);
    };
  }

  async function pickFromScreen() {
    if (!eyeDropperOk || !window.EyeDropper) return;
    try {
      const dropper = new window.EyeDropper();
      const result = await dropper.open();
      const parsed = parseHexInput(result.sRGBHex);
      if (!parsed) return;
      const { h, s, v } = hexToHsv(parsed);
      commit({ h, s, v });
    } catch {
      /* user cancelled */
    }
  }

  function onHexBlur() {
    const parsed = parseHexInput(hexDraft);
    if (!parsed) {
      setHexDraft(hex);
      return;
    }
    const { h, s, v } = hexToHsv(parsed);
    commit({ h, s, v });
    setHexDraft(parsed);
  }

  function onAlphaBlur() {
    const n = Number.parseInt(alphaDraft.replace(/%/g, ""), 10);
    if (!Number.isFinite(n)) {
      setAlphaDraft(String(color.a));
      return;
    }
    commit({ a: n });
  }

  return (
    <div className={styles.card}>
      <div
        ref={svRef}
        className={styles.sv}
        style={{ backgroundColor: hueColor }}
        onPointerDown={bindDrag(svRef, "both", (x, y) =>
          commit({ s: x * 100, v: (1 - y) * 100 }),
        )}
        role="slider"
        aria-label="채도 · 명도"
        aria-valuetext={`채도 ${color.s}%, 명도 ${color.v}%`}
        tabIndex={0}
      >
        <div className={styles.svWhite} />
        <div className={styles.svBlack} />
        <span
          className={styles.svThumb}
          style={{
            left: `${color.s}%`,
            top: `${100 - color.v}%`,
            background: opaqueRgb,
          }}
        />
      </div>

      <div className={styles.slidersRow}>
        {eyeDropperOk ? (
          <button
            type="button"
            className={styles.eyedropper}
            onClick={() => void pickFromScreen()}
            aria-label="화면에서 색 추출"
            title="화면에서 색 추출"
          >
            <EyedropperIcon />
          </button>
        ) : null}
        <div className={styles.sliders}>
          <div
            ref={hueRef}
            className={styles.hueTrack}
            onPointerDown={bindDrag(hueRef, "x", (x) => commit({ h: x * 360 }))}
            role="slider"
            aria-label="색상"
            aria-valuemin={0}
            aria-valuemax={360}
            aria-valuenow={color.h}
            tabIndex={0}
          >
            <span
              className={styles.trackThumb}
              style={{ left: `${(color.h / 360) * 100}%` }}
            />
          </div>
          <div
            ref={alphaRef}
            className={styles.alphaTrack}
            onPointerDown={bindDrag(alphaRef, "x", (x) =>
              commit({ a: x * 100 }),
            )}
            role="slider"
            aria-label="불투명도"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={color.a}
            tabIndex={0}
          >
            <div className={styles.alphaChecker} />
            <div
              className={styles.alphaFill}
              style={{
                background: `linear-gradient(to right, transparent, ${opaqueRgb})`,
              }}
            />
            <span
              className={styles.trackThumb}
              style={{ left: `${color.a}%` }}
            />
          </div>
        </div>
      </div>

      <div className={styles.inputs}>
        <label className={styles.format}>
          <span className={styles.srOnly}>색상 형식</span>
          <select className={styles.formatSelect} value="hex" disabled>
            <option value="hex">Hex</option>
          </select>
        </label>
        <label className={styles.hexField}>
          <span className={styles.srOnly}>Hex</span>
          <span className={styles.hexHash} aria-hidden>
            #
          </span>
          <input
            className={styles.hexInput}
            value={hexDraft}
            onChange={(e) => setHexDraft(e.target.value.replace(/^#/, ""))}
            onBlur={onHexBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              }
            }}
            spellCheck={false}
            autoComplete="off"
            aria-label="Hex 색상"
          />
        </label>
        <label className={styles.alphaField}>
          <span className={styles.srOnly}>불투명도</span>
          <input
            className={styles.alphaInput}
            value={alphaDraft}
            onChange={(e) => setAlphaDraft(e.target.value)}
            onBlur={onAlphaBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              }
            }}
            inputMode="numeric"
            aria-label="불투명도 퍼센트"
          />
          <span className={styles.alphaSuffix} aria-hidden>
            %
          </span>
        </label>
      </div>
    </div>
  );
}

declare global {
  interface EyeDropper {
    open: () => Promise<{ sRGBHex: string }>;
  }

  interface Window {
    EyeDropper?: new () => EyeDropper;
  }
}
