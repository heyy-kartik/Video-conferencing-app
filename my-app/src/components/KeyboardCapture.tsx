"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** A single token in the display buffer — either a plain character or a special-key label. */
type Token = { type: "char"; value: string } | { type: "special"; value: string };

/** Milliseconds between each typewriter tick (lower = faster). */
const TYPEWRITER_INTERVAL_MS = 40;

/** Maximum characters kept in the rendered output before old ones are dropped. */
const MAX_CHARS = 4000;

function keyEventToToken(e: KeyboardEvent): Token | null {
  if (e.isComposing) return null;

  switch (e.key) {
    case "Backspace":
      return { type: "special", value: "BACKSPACE" };
    case "Enter":
      return { type: "char", value: "\n" };
    case "Tab":
      e.preventDefault();
      return { type: "char", value: "\t" };
    case "Escape":
      return { type: "special", value: "ESCAPE" };
    case " ":
      return { type: "char", value: " " };
    default:
      if (e.key.length === 1) {
        return { type: "char", value: e.key };
      }
      // Non-printable keys rendered as [KeyName]
      return { type: "char", value: `[${e.key}]` };
  }
}

export default function KeyboardCapture() {
  const [active, setActive] = useState(false);
  const [displayed, setDisplayed] = useState("");

  // Queue of tokens waiting to be flushed by the typewriter timer
  const queueRef = useRef<Token[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // We store the latest displayed value in a ref so the timer callback
  // always reads the most current value without needing it in deps.
  const displayedRef = useRef("");
  displayedRef.current = displayed;

  // ── Typewriter flush ──────────────────────────────────────────────────────
  const startTimer = useCallback(() => {
    if (timerRef.current !== null) return; // already running
    timerRef.current = setInterval(() => {
      const queue = queueRef.current;
      if (queue.length === 0) {
        // Queue drained — stop the timer until new tokens arrive
        if (timerRef.current !== null) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        return;
      }

      const token = queue.shift()!;
      setDisplayed((prev) => {
        let next = prev;
        if (token.type === "special" && token.value === "BACKSPACE") {
          next = prev.slice(0, -1);
        } else if (token.type === "special" && token.value === "ESCAPE") {
          next = "";
        } else {
          next = prev + token.value;
        }
        if (next.length > MAX_CHARS) {
          next = next.slice(next.length - MAX_CHARS);
        }
        return next;
      });
    }, TYPEWRITER_INTERVAL_MS);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // ── Keyboard listener ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!active) {
      stopTimer();
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      // Avoid hijacking typing in real input elements
      const target = e.target as HTMLElement;
      const tag = target.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      const token = keyEventToToken(e);
      if (token === null) return;

      queueRef.current.push(token);
      startTimer();
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, startTimer, stopTimer]);

  // Cleanup timer on unmount
  useEffect(() => () => stopTimer(), [stopTimer]);

  const handleClear = () => {
    queueRef.current = [];
    setDisplayed("");
  };

  const lineCount = displayed.split("\n").length;

  return (
    <section className="mx-auto w-full max-w-3xl space-y-4 p-4">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Keyboard Echo
          </h2>
          <p className="text-sm text-sky-200/70">
            {active
              ? "Capture is ON — type anywhere on the page."
              : "Toggle capture to start recording keystrokes."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Clear button */}
          <button
            onClick={handleClear}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            Clear
          </button>

          {/* Toggle button */}
          <button
            onClick={() => setActive((v) => !v)}
            className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition ${
              active
                ? "bg-[#0E78F9] text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500"
                : "bg-white/10 text-white/80 hover:bg-white/15"
            }`}
          >
            {active ? "● Capturing" : "Start Capture"}
          </button>
        </div>
      </div>

      {/* ── Screen panel ── */}
      <div
        className={`rounded-2xl border transition-colors ${
          active
            ? "border-[#0E78F9]/60 shadow-lg shadow-blue-500/10"
            : "border-white/10"
        } bg-[#1C1F2E] p-5`}
      >
        {/* Panel toolbar */}
        <div className="mb-3 flex items-center justify-between text-xs text-white/40">
          <div className="flex items-center gap-2">
            {/* Traffic-light dots for a "console" feel */}
            <span className="inline-block size-2.5 rounded-full bg-red-500/70" />
            <span className="inline-block size-2.5 rounded-full bg-yellow-400/70" />
            <span className="inline-block size-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 font-mono">keyboard-echo</span>
          </div>
          <span>{lineCount} line{lineCount !== 1 ? "s" : ""}</span>
        </div>

        {/* Output area */}
        <pre className="min-h-[220px] whitespace-pre-wrap break-words font-mono text-sm leading-6 text-green-400">
          {displayed || (
            <span className="text-white/25">
              {active
                ? "Start typing…"
                : "Enable capture to see your keystrokes here."}
            </span>
          )}
          {/* Blinking cursor */}
          {active && (
            <span className="inline-block w-2 animate-pulse bg-green-400 align-middle">
              &nbsp;
            </span>
          )}
        </pre>

        {/* Key legend */}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-white/40">
          {[
            ["Esc", "clear"],
            ["⌫", "delete"],
            ["↵", "newline"],
            ["Tab", "indent"],
          ].map(([key, label]) => (
            <span key={key} className="flex items-center gap-1">
              <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono">
                {key}
              </kbd>
              <span>{label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Info note ── */}
      <p className="text-center text-xs text-white/30">
        Typing inside inputs or text areas is never captured. Non-printable keys
        appear as{" "}
        <code className="rounded bg-white/5 px-1 font-mono">[KeyName]</code>{" "}
        tokens.
      </p>
    </section>
  );
}
