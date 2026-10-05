export interface Question {
  text: string;
  answers: string[];
  correct: number;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  color: string; // token name suffix
  questions: Question[];
}

export const POINTS_CORRECT = 5;
export const POINTS_WRONG = -3;
export const SECONDS_PER_QUESTION = 15;

export const categories: Category[] = [
  {
    id: "generos",
    name: "Géneros",
    emoji: "🎸",
    color: "pink",
    questions: [
      { text: "¿Qué género se asocia con guitarras eléctricas, ritmos rápidos y actitud rebelde?", answers: ["Rock", "Salsa", "Tango", "Reguetón"], correct: 0 },
      { text: "¿Qué género tiene sus raíces en Jamaica y combina batería con bajo marcado?", answers: ["Cumbia", "Reggae", "Flamenco", "Bachata"], correct: 1 },
      { text: "¿Qué género nació en EE.UU. y destaca por la improvisación y los vientos?", answers: ["Electrónica", "Country", "Jazz", "Reguetón"], correct: 2 },
      { text: "¿Qué estilo surgió en el Río de la Plata con música melancólica y baile elegante?", answers: ["Merengue", "Pop", "Bolero", "Tango"], correct: 3 },
      { text: "¿Qué estilo usa escalas modales e improvisación extensa, pionero en los 60?", answers: ["Jazz modal", "Disco", "Bossa nova", "Salsa"], correct: 0 },
    ],
  },
  {
    id: "instrumentos",
    name: "Instrumentos",
    emoji: "🎹",
    color: "cyan",
    questions: [
      { text: "¿Cuántas cuerdas tiene una guitarra clásica estándar?", answers: ["4", "6", "8", "12"], correct: 1 },
      { text: "¿Qué instrumento es típico del tango argentino?", answers: ["Bandoneón", "Gaita", "Sitar", "Banjo"], correct: 0 },
      { text: "¿Cuántas teclas tiene un piano estándar?", answers: ["76", "61", "88", "100"], correct: 2 },
      { text: "¿A qué familia pertenece el saxofón?", answers: ["Metales", "Cuerdas", "Percusión", "Viento madera"], correct: 3 },
      { text: "¿Qué instrumento andino se hace con cañas de distinto largo?", answers: ["Charango", "Siku", "Bombo", "Quena"], correct: 1 },
    ],
  },
  {
    id: "artistas",
    name: "Artistas",
    emoji: "🎤",
    color: "lime",
    questions: [
      { text: "¿Quién es conocido como el 'Rey del Pop'?", answers: ["Elvis Presley", "Prince", "Michael Jackson", "Freddie Mercury"], correct: 2 },
      { text: "¿De qué país es la banda Soda Stereo?", answers: ["Argentina", "Chile", "México", "España"], correct: 0 },
      { text: "¿Quién fue el cantante de Queen?", answers: ["Mick Jagger", "Freddie Mercury", "Bono", "Robert Plant"], correct: 1 },
      { text: "¿Qué artista argentina canta 'Muchachos' (no) y 'Tusa' (sí) junto a Karol G?", answers: ["Lali", "Tini", "Emilia", "Nicki Minaj"], correct: 3 },
      { text: "¿Quién compuso 'Las cuatro estaciones'?", answers: ["Mozart", "Bach", "Vivaldi", "Beethoven"], correct: 2 },
    ],
  },
  {
    id: "historia",
    name: "Historia",
    emoji: "📻",
    color: "orange",
    questions: [
      { text: "¿En qué década surgió el rock and roll?", answers: ["1930", "1950", "1970", "1990"], correct: 1 },
      { text: "¿De qué ciudad eran los Beatles?", answers: ["Liverpool", "Londres", "Manchester", "Dublín"], correct: 0 },
      { text: "¿En qué año fue el festival de Woodstock?", answers: ["1965", "1972", "1980", "1969"], correct: 3 },
      { text: "¿Qué formato reemplazó masivamente al cassette en los 90?", answers: ["Vinilo", "MP3", "CD", "Streaming"], correct: 2 },
      { text: "¿Qué compositor siguió componiendo tras quedar sordo?", answers: ["Beethoven", "Chopin", "Haydn", "Liszt"], correct: 0 },
    ],
  },
];
