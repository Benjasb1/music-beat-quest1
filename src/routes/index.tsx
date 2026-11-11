import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  categories,
  POINTS_CORRECT,
  POINTS_WRONG,
  SECONDS_PER_QUESTION,
  type Question,
} from "@/lib/trivia-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trivia Maestra — Elegí tu categoría" },
      { name: "description", content: "Trivia contrarreloj con categorías de música, Maestro Mayor de Obras e Informática, con tabla de puntajes." },
      { property: "og:title", content: "Trivia Maestra — Trivia contrarreloj" },
      { property: "og:description", content: "Elegí categorías, respondé contra el reloj y entrá en la tabla de puntajes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const accent: Record<string, string> = {
  pink: "bg-neon-pink",
  cyan: "bg-neon-cyan",
  lime: "bg-neon-lime",
  orange: "bg-neon-orange",
  yellow: "bg-neon-yellow",
  purple: "bg-neon-purple",
};

type Result = "correct" | "wrong" | "timeout" | null;
type ScoreEntry = { name: string; score: number; date: number };
const STORAGE_KEY = "trivia-maestra-scores";

function loadScores(): ScoreEntry[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function Index() {
  const [selected, setSelected] = useState<string[]>([]);
  const [playing, setPlaying] = useState(false);
  const [name, setName] = useState("");
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => setScores(loadScores()), []);

  const deck = useMemo<(Question & { cat: string })[]>(() => {
    if (!playing) return [];
    return categories
      .filter((c) => selected.includes(c.id))
      .flatMap((c) => c.questions.map((q) => ({ ...q, cat: c.name })))
      .sort(() => Math.random() - 0.5);
  }, [playing, selected]);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const allSelected = selected.length === categories.length;
  const canPlay = selected.length > 0 && name.trim().length > 0;

  const saveScore = (score: number) => {
    const next = [...loadScores(), { name: name.trim(), score, date: Date.now() }]
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setScores(next);
  };

  if (playing)
    return <Game deck={deck} player={name.trim()} onFinish={saveScore} onExit={() => setPlaying(false)} />;

  const total = categories.filter((c) => selected.includes(c.id)).reduce((n, c) => n + c.questions.length, 0);

  return (
    <div className="min-h-screen w-full bg-trivia-bg text-trivia-text">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--neon-purple)_25%,transparent),transparent_60%)]" />
      <header className="relative border-b border-trivia-question-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-neon-pink to-neon-purple font-black">T</div>
            <span className="text-lg font-bold tracking-tight">Trivia Maestra</span>
          </div>
          <span className="text-sm text-trivia-info">{categories.length} categorías · {SECONDS_PER_QUESTION}s por pregunta</span>
        </div>
      </header>

      <main className="relative mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[320px_1fr]">
        <aside className="order-2 h-fit rounded-2xl border border-trivia-question-border bg-trivia-card/80 p-5 backdrop-blur lg:order-1 lg:sticky lg:top-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-trivia-info">Tabla de puntajes</h2>
          {scores.length === 0 ? (
            <p className="mt-6 text-sm text-trivia-info">Todavía no hay partidas. ¡Sé el primero!</p>
          ) : (
            <ol className="mt-4 space-y-1.5">
              {scores.map((s, idx) => (
                <li key={s.date} className="flex items-center gap-3 rounded-lg px-3 py-2 odd:bg-trivia-question-bg/50">
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-md text-xs font-bold ${idx === 0 ? "bg-neon-yellow text-trivia-bg" : idx === 1 ? "bg-trivia-info text-trivia-bg" : idx === 2 ? "bg-neon-orange text-trivia-bg" : "bg-trivia-answer"}`}>{idx + 1}</span>
                  <span className="flex-1 truncate font-medium">{s.name}</span>
                  <span className="font-mono font-bold tabular-nums">{s.score}</span>
                </li>
              ))}
            </ol>
          )}
        </aside>

        <section className="order-1 lg:order-2">
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            Poné a prueba lo que <span className="bg-gradient-to-r from-neon-pink via-neon-orange to-neon-yellow bg-clip-text text-transparent">sabés</span>
          </h1>
          <p className="mt-3 max-w-2xl text-trivia-info">Escribí tu nombre, elegí una o varias categorías y respondé antes de que termine el reloj.</p>

          <div className="mt-6 flex flex-wrap gap-2 text-sm font-medium">
            <span className="rounded-md border border-trivia-correct/50 bg-trivia-correct/15 px-3 py-1">Correcta +{POINTS_CORRECT}</span>
            <span className="rounded-md border border-trivia-wrong/50 bg-trivia-wrong/15 px-3 py-1">Incorrecta {POINTS_WRONG}</span>
            <span className="rounded-md border border-trivia-question-border bg-trivia-question-bg px-3 py-1">Sin responder 0</span>
          </div>

          <label className="mt-8 block">
            <span className="text-sm font-semibold text-trivia-info">Tu nombre</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={24}
              placeholder="Ej: Santino"
              className="mt-2 w-full max-w-sm rounded-xl border border-trivia-question-border bg-trivia-card px-4 py-3 outline-none transition focus:border-neon-pink focus:ring-2 focus:ring-neon-pink/30"
            />
          </label>

          <div className="mt-8 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-trivia-info">Categorías</h2>
            <button onClick={() => setSelected(allSelected ? [] : categories.map((c) => c.id))} className="text-sm font-semibold text-neon-cyan hover:underline">
              {allSelected ? "Quitar todas" : "Seleccionar todas"}
            </button>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((c) => {
              const on = selected.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggle(c.id)}
                  className={`group relative overflow-hidden rounded-xl border p-5 text-left transition-all hover:-translate-y-0.5 ${on ? "border-neon-pink bg-trivia-answer shadow-[0_8px_30px_-10px_var(--neon-pink)]" : "border-trivia-question-border bg-trivia-card hover:border-trivia-answer-hover"}`}
                >
                  <span className={`absolute inset-x-0 top-0 h-1 ${accent[c.color]}`} />
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{c.emoji}</span>
                    <span className={`grid h-6 w-6 place-items-center rounded-full border text-xs font-bold ${on ? "border-neon-pink bg-neon-pink" : "border-trivia-question-border"}`}>{on ? "✓" : ""}</span>
                  </div>
                  <div className="mt-4 font-bold leading-tight">{c.name}</div>
                  <div className="mt-1 text-sm text-trivia-info">{c.questions.length} preguntas</div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              disabled={!canPlay}
              onClick={() => setPlaying(true)}
              className="rounded-xl bg-gradient-to-r from-neon-pink to-neon-orange px-8 py-3.5 font-bold shadow-[0_10px_30px_-10px_var(--neon-pink)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
            >
              Comenzar partida →
            </button>
            <span className="text-sm text-trivia-info">
              {!name.trim() ? "Ingresá tu nombre para empezar" : selected.length === 0 ? "Elegí al menos una categoría" : `${total} preguntas seleccionadas`}
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}

function Game({ deck, player, onFinish, onExit }: { deck: (Question & { cat: string })[]; player: string; onFinish: (s: number) => void; onExit: () => void }) {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<Result>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [time, setTime] = useState(SECONDS_PER_QUESTION);
  const [finished, setFinished] = useState(false);
  const q = deck[i];

  useEffect(() => {
    if (result || finished) return;
    if (time <= 0) {
      setResult("timeout");
      return;
    }
    const t = setTimeout(() => setTime((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [time, result, finished]);

  const answer = (idx: number) => {
    if (result) return;
    setPicked(idx);
    if (idx === q.correct) {
      setResult("correct");
      setScore((s) => s + POINTS_CORRECT);
    } else {
      setResult("wrong");
      setScore((s) => s + POINTS_WRONG);
    }
  };

  const next = useCallback(() => {
    if (i < deck.length - 1) {
      setI(i + 1);
      setResult(null);
      setPicked(null);
      setTime(SECONDS_PER_QUESTION);
    } else {
      setFinished(true);
      onFinish(score);
    }
  }, [i, deck.length, onFinish, score]);

  const pct = (time / SECONDS_PER_QUESTION) * 100;
  const barColor = time > 8 ? "bg-neon-lime" : time > 4 ? "bg-neon-yellow" : "bg-trivia-wrong";
  const letters = ["A", "B", "C", "D"];

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-trivia-bg p-4 text-trivia-text">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--neon-cyan)_18%,transparent),transparent_60%)]" />
      <div className="relative w-full max-w-3xl rounded-2xl border border-trivia-question-border bg-trivia-card p-6 shadow-2xl md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <button onClick={onExit} className="rounded-lg border border-trivia-question-border px-3 py-1.5 text-sm font-medium hover:bg-trivia-answer">← Lobby</button>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-trivia-info">{player}</span>
            <span className="rounded-lg bg-neon-yellow px-3 py-1.5 font-bold text-trivia-bg tabular-nums">{score} pts</span>
          </div>
        </div>

        {finished ? (
          <div className="py-10 text-center">
            <div className="text-5xl">🏆</div>
            <h2 className="mt-4 text-3xl font-black">¡Partida terminada, {player}!</h2>
            <p className="mt-2 text-lg text-trivia-info">Puntaje final: <span className="font-black text-neon-yellow">{score}</span> puntos</p>
            <p className="mt-1 text-sm text-trivia-info">Tu puntaje se guardó en la tabla.</p>
            <button onClick={onExit} className="mt-6 rounded-xl bg-gradient-to-r from-neon-pink to-neon-orange px-8 py-3 font-bold">Volver al lobby</button>
          </div>
        ) : (
          <>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-neon-cyan">{q.cat}</span>
              <span className="text-trivia-info">Pregunta {i + 1} de {deck.length}</span>
            </div>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-trivia-question-bg">
                <div className={`h-full ${barColor} transition-all duration-1000 ease-linear`} style={{ width: `${pct}%` }} />
              </div>
              <span className={`w-12 text-right font-mono text-lg font-bold tabular-nums ${time <= 4 ? "animate-pulse text-trivia-wrong" : ""}`}>{time}s</span>
            </div>

            <h2 className="text-2xl font-bold leading-snug">{q.text}</h2>
            <p className="mb-6 mt-2 text-sm text-trivia-info">
              <span className="text-neon-lime">+{POINTS_CORRECT} si acertás</span> · <span className="text-trivia-wrong">{POINTS_WRONG} si fallás</span> · 0 si no respondés
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {q.answers.map((a, idx) => {
                const isCorrect = result && idx === q.correct;
                const isWrong = result === "wrong" && picked === idx;
                return (
                  <button
                    key={idx}
                    disabled={!!result}
                    onClick={() => answer(idx)}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-4 text-left font-medium transition-all ${
                      isCorrect ? "border-trivia-correct bg-trivia-correct/25" : isWrong ? "border-trivia-wrong bg-trivia-wrong/25" : "border-trivia-question-border bg-trivia-question-bg hover:border-neon-cyan"
                    } ${result ? "cursor-default" : ""}`}
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-trivia-answer text-sm font-bold">{letters[idx]}</span>
                    {a}
                  </button>
                );
              })}
            </div>

            {result && (
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <div className={`rounded-lg px-4 py-2 font-semibold ${result === "correct" ? "bg-trivia-correct/25 text-neon-lime" : result === "wrong" ? "bg-trivia-wrong/25" : "bg-trivia-disabled"}`}>
                  {result === "correct" && `¡Correcto! +${POINTS_CORRECT} puntos`}
                  {result === "wrong" && `Incorrecto: ${POINTS_WRONG} puntos`}
                  {result === "timeout" && "Se acabó el tiempo: 0 puntos"}
                </div>
                <button onClick={next} className="rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple px-6 py-2.5 font-bold">
                  {i === deck.length - 1 ? "Ver resultado" : "Siguiente →"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
