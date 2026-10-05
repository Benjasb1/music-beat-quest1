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
      { title: "Trivia Maestra — Elegí tu categoría musical" },
      { name: "description", content: "Trivia musical contrarreloj: elegí categorías, respondé antes de que se acabe el tiempo y sumá puntos." },
      { property: "og:title", content: "Trivia Maestra — Trivia musical contrarreloj" },
      { property: "og:description", content: "Elegí categorías, respondé contra el reloj y sumá puntos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const catStyles: Record<string, string> = {
  pink: "from-neon-pink to-neon-orange",
  cyan: "from-neon-cyan to-neon-purple",
  lime: "from-neon-lime to-neon-cyan",
  orange: "from-neon-orange to-neon-yellow",
};

type Result = "correct" | "wrong" | "timeout" | null;

function Index() {
  const [selected, setSelected] = useState<string[]>([]);
  const [playing, setPlaying] = useState(false);

  const deck = useMemo<(Question & { cat: string })[]>(() => {
    if (!playing) return [];
    const qs = categories
      .filter((c) => selected.includes(c.id))
      .flatMap((c) => c.questions.map((q) => ({ ...q, cat: `${c.emoji} ${c.name}` })));
    return qs.sort(() => Math.random() - 0.5);
  }, [playing, selected]);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const allSelected = selected.length === categories.length;

  if (playing) return <Game deck={deck} onExit={() => setPlaying(false)} />;

  return (
    <div className="min-h-screen w-full bg-trivia-bg bg-[radial-gradient(circle_at_20%_10%,var(--neon-purple)_0%,transparent_40%),radial-gradient(circle_at_80%_90%,var(--neon-pink)_0%,transparent_40%)] p-4 text-trivia-text">
      <div className="mx-auto max-w-4xl py-10">
        <h1 className="bg-gradient-to-r from-neon-yellow via-neon-pink to-neon-cyan bg-clip-text text-center text-5xl font-black tracking-tight text-transparent md:text-7xl">
          Trivia Maestra
        </h1>
        <p className="mt-3 text-center text-lg text-trivia-info">🎶 Elegí una o varias categorías y ganale al reloj</p>

        <div className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-3 text-sm font-bold">
          <span className="rounded-full bg-trivia-correct px-4 py-1.5">✅ Correcta: +{POINTS_CORRECT}</span>
          <span className="rounded-full bg-trivia-wrong px-4 py-1.5">❌ Incorrecta: {POINTS_WRONG}</span>
          <span className="rounded-full bg-trivia-disabled px-4 py-1.5">⏰ Sin responder: 0</span>
          <span className="rounded-full bg-neon-purple px-4 py-1.5">⏱️ {SECONDS_PER_QUESTION}s por pregunta</span>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {categories.map((c) => {
            const on = selected.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${catStyles[c.color]} p-[3px] transition-transform hover:scale-[1.03] ${on ? "scale-[1.02] shadow-[0_0_30px_var(--neon-pink)]" : "opacity-80"}`}
              >
                <div className={`flex h-full items-center gap-4 rounded-[14px] p-5 text-left ${on ? "bg-transparent" : "bg-trivia-card"}`}>
                  <span className="text-5xl">{c.emoji}</span>
                  <div className="flex-1">
                    <div className="text-2xl font-extrabold">{c.name}</div>
                    <div className="text-sm opacity-80">{c.questions.length} preguntas</div>
                  </div>
                  <span className="text-2xl">{on ? "✔️" : "➕"}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setSelected(allSelected ? [] : categories.map((c) => c.id))}
            className="rounded-full border-2 border-neon-cyan px-6 py-3 font-bold text-neon-cyan transition-colors hover:bg-neon-cyan hover:text-trivia-bg"
          >
            {allSelected ? "Quitar todas" : "🌈 Seleccionar todas"}
          </button>
          <button
            disabled={selected.length === 0}
            onClick={() => setPlaying(true)}
            className="rounded-full bg-gradient-to-r from-neon-pink to-neon-orange px-10 py-3 text-lg font-black shadow-[0_0_25px_var(--neon-pink)] transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            ¡Jugar! 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

function Game({ deck, onExit }: { deck: (Question & { cat: string })[]; onExit: () => void }) {
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
    } else setFinished(true);
  }, [i, deck.length]);

  const pct = (time / SECONDS_PER_QUESTION) * 100;
  const barColor = time > 8 ? "bg-neon-lime" : time > 4 ? "bg-neon-yellow" : "bg-trivia-wrong";

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-trivia-bg bg-[radial-gradient(circle_at_80%_10%,var(--neon-cyan)_0%,transparent_35%),radial-gradient(circle_at_10%_90%,var(--neon-purple)_0%,transparent_40%)] p-4 text-trivia-text">
      <div className="w-full max-w-3xl rounded-3xl bg-gradient-to-br from-neon-pink via-neon-purple to-neon-cyan p-[3px] shadow-[0_0_40px_var(--neon-purple)]">
        <div className="rounded-[22px] bg-trivia-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <button onClick={onExit} className="rounded-full bg-trivia-answer px-4 py-1.5 text-sm font-bold hover:bg-trivia-answer-hover">← Lobby</button>
            <div className="rounded-full bg-gradient-to-r from-neon-yellow to-neon-orange px-4 py-1.5 font-black text-trivia-bg">⭐ {score} pts</div>
          </div>

          {finished ? (
            <div className="py-10 text-center">
              <div className="text-6xl">🏆</div>
              <h2 className="mt-4 text-3xl font-black">¡Trivia terminada!</h2>
              <p className="mt-2 text-xl text-trivia-info">Puntaje final: <span className="font-black text-neon-yellow">{score}</span> puntos</p>
              <button onClick={onExit} className="mt-6 rounded-full bg-gradient-to-r from-neon-pink to-neon-orange px-8 py-3 font-black">Volver al lobby</button>
            </div>
          ) : (
            <>
              <div className="mb-2 flex items-center justify-between text-sm font-bold">
                <span className="text-neon-cyan">{q.cat} · {i + 1}/{deck.length}</span>
                <span className={`text-2xl tabular-nums ${time <= 4 ? "animate-pulse text-trivia-wrong" : "text-neon-lime"}`}>⏱️ {time}s</span>
              </div>
              <div className="mb-5 h-3 overflow-hidden rounded-full bg-trivia-question-bg">
                <div className={`h-full ${barColor} transition-all duration-1000 ease-linear`} style={{ width: `${pct}%` }} />
              </div>

              <h2 className="mb-2 text-center text-2xl font-bold">{q.text}</h2>
              <p className="mb-5 text-center text-sm text-trivia-info">
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
                      className={`rounded-xl px-4 py-4 text-lg font-bold transition-all ${
                        isCorrect ? "bg-trivia-correct" : isWrong ? "bg-trivia-wrong" : "bg-trivia-answer hover:scale-[1.02] hover:bg-trivia-answer-hover"
                      } ${result ? "cursor-default" : ""}`}
                    >
                      {a}
                    </button>
                  );
                })}
              </div>

              {result && (
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className={`rounded-xl px-4 py-2 text-lg font-black ${result === "correct" ? "bg-trivia-correct" : result === "wrong" ? "bg-trivia-wrong" : "bg-trivia-disabled"}`}>
                    {result === "correct" && `¡Correcto! +${POINTS_CORRECT} puntos 🎉`}
                    {result === "wrong" && `Incorrecto ${POINTS_WRONG} puntos 😬`}
                    {result === "timeout" && "⏰ Se acabó el tiempo: 0 puntos"}
                  </div>
                  <button onClick={next} className="rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple px-6 py-2.5 font-black">
                    {i === deck.length - 1 ? "Terminar 🏁" : "Siguiente →"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
