import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

interface Question {
  text: string;
  answers: string[];
  correct: number;
  difficulty: string;
  points: number;
}

const questions: Question[] = [
  {
    text: "¿Qué género musical se asocia con guitarras eléctricas, ritmos rápidos y actitud rebelde?",
    answers: ["Rock", "Salsa", "Tango", "Reguetón"],
    correct: 0,
    difficulty: "fácil",
    points: 10,
  },
  {
    text: "¿Cuál de estos géneros tiene sus raíces en Jamaica y combina ritmo de batería con bajo marcado?",
    answers: ["Reggae", "Cumbia", "Flamenco", "Bachata"],
    correct: 0,
    difficulty: "fácil",
    points: 10,
  },
  {
    text: "¿Qué estilo musical se caracteriza por los cuatros, las maracas y ritmos caribeños?",
    answers: ["Salsa", "Metal", "Jazz", "Pop"],
    correct: 0,
    difficulty: "fácil",
    points: 10,
  },
  {
    text: "¿Qué género nació en Estados Unidos y destaca por la improvisación y el uso de instrumentos de viento?",
    answers: ["Jazz", "Electrónica", "Country", "Reguetón"],
    correct: 0,
    difficulty: "medio",
    points: 20,
  },
  {
    text: "¿Qué estilo musical latino surgió en la región del Río de la Plata y tiene música melancólica y baile elegante?",
    answers: ["Tango", "Merengue", "Pop", "Bolero"],
    correct: 0,
    difficulty: "medio",
    points: 20,
  },
  {
    text: "¿Cuál de estos géneros es conocido por sus ritmos vocales rápidos, orientación urbana y producción con sintetizadores?",
    answers: ["Hip-hop", "Folk", "Ópera", "Disco"],
    correct: 0,
    difficulty: "medio",
    points: 20,
  },
  {
    text: "¿Qué género musical moderno usa patrones de percusión sincopados y nació en la zona de Jamaica y Panamá?",
    answers: ["Reguetón", "Rock clásico", "Funk", "Blues"],
    correct: 0,
    difficulty: "difícil",
    points: 30,
  },
  {
    text: "¿Qué estilo se caracteriza por su uso de escalas modales, improvisación extensa y fue pionero en los años 60?",
    answers: ["Jazz modal", "Disco", "Bossa nova", "Salsa"],
    correct: 0,
    difficulty: "difícil",
    points: 30,
  },
  {
    text: "¿Cuál de estos géneros combina elementos de música electrónica con voces procesadas y énfasis en el ambiente?",
    answers: ["Ambient", "Country", "Reggae", "Pop latino"],
    correct: 0,
    difficulty: "difícil",
    points: 30,
  },
];

function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const question = questions[currentIndex];

  const selectAnswer = useCallback(
    (selected: number) => {
      if (answered) return;
      setAnswered(true);
      setSelectedIndex(selected);

      if (selected === question.correct) {
        setScore((prev) => prev + question.points);
      } else {
        setScore((prev) => prev - Math.max(5, Math.floor(question.points / 2)));
      }
    },
    [answered, question],
  );

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setAnswered(false);
      setSelectedIndex(null);
    } else {
      setFinished(true);
    }
  }, [currentIndex]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedIndex(null);
    setFinished(false);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#111] p-4 flex items-center justify-center">
      <div className="w-full max-w-[720px] rounded-2xl bg-[#1f1f2e] p-6 shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
        <h1 className="mb-4 text-center text-[#f7f7f7] text-3xl font-bold">Trivia Musical</h1>
        <p className="mb-5 text-center text-[#b8c0ff] text-[0.95rem]">
          Adivina el género musical o la cultura general musical. Comienza en fácil y avanza hasta difícil.
        </p>

        <div className="mb-5 rounded-xl border border-[#33334f] bg-[#28293f] p-5">
          {!finished ? (
            <>
              <h2 className="mb-4 text-center text-[#f7f7f7] text-xl font-semibold">
                {question.text} ({question.difficulty})
              </h2>
              <div className="flex flex-col gap-2">
                {question.answers.map((answer, index) => {
                  const isCorrect = index === question.correct;
                  const isWrong = selectedIndex === index && selectedIndex !== question.correct;

                  return (
                    <button
                      key={index}
                      disabled={answered}
                      onClick={() => selectAnswer(index)}
                      className={[
                        "w-full rounded-[10px] px-3 py-3 text-[#fff] transition-colors duration-200",
                        "bg-[#3b3d66] hover:bg-[#5b5ec6]",
                        answered && "cursor-default",
                        isCorrect ? "bg-[#2cae2c] hover:bg-[#2cae2c]" : "",
                        isWrong ? "bg-[#c12f2f] hover:bg-[#c12f2f]" : "",
                      ].join(" ")}
                    >
                      {answer}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <h2 className="text-center text-[#f7f7f7] text-xl font-semibold">
              ¡Trivia terminada! Tu puntaje final es {score} puntos.
            </h2>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-base font-bold text-[#f7f7f7]">
            Puntos: <span>{score}</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleNext}
              disabled={!answered || finished}
              className="rounded-[10px] bg-[#5b5ec6] px-4 py-2.5 text-[#fff] transition-colors disabled:cursor-not-allowed disabled:bg-[#44476c]"
            >
              {currentIndex === questions.length - 1 && !finished ? "Terminar" : "Siguiente"}
            </button>
            <button
              onClick={handleRestart}
              className="rounded-[10px] bg-[#5b5ec6] px-4 py-2.5 text-[#fff] transition-colors"
            >
              Reiniciar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
