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
      { text: "¿Qué rapera canta 'Tusa' junto a Karol G?", answers: ["Lali", "Tini", "Emilia", "Nicki Minaj"], correct: 3 },
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
  {
    id: "mmo",
    name: "Maestro Mayor de Obras",
    emoji: "🏗️",
    color: "yellow",
    questions: [
      { text: "¿En qué escala se dibuja habitualmente la planta de una vivienda?", answers: ["1:1", "1:50", "1:5000", "1:2"], correct: 1 },
      { text: "¿Qué elemento estructural transmite las cargas del edificio al suelo?", answers: ["Viga", "Losa", "Fundación", "Dintel"], correct: 2 },
      { text: "¿Qué representa un plano de corte?", answers: ["Una vista seccionada verticalmente", "La fachada", "El techo visto desde arriba", "La instalación eléctrica"], correct: 0 },
      { text: "¿Cuántos metros cuadrados tiene un ambiente de 4 m × 3,5 m?", answers: ["7,5 m²", "12 m²", "15 m²", "14 m²"], correct: 3 },
      { text: "¿Qué material se obtiene mezclando cemento, arena, piedra y agua?", answers: ["Mortero", "Hormigón", "Yeso", "Cal"], correct: 1 },
      { text: "¿Qué instrumento se usa para verificar que una pared esté vertical?", answers: ["Plomada", "Cinta métrica", "Escuadra", "Llana"], correct: 0 },
      { text: "¿Cómo se llama el elemento horizontal que cubre el vano de una puerta o ventana?", answers: ["Columna", "Zócalo", "Dintel", "Cimiento"], correct: 2 },
    ],
  },
  {
    id: "ti",
    name: "Técnico en Informática",
    emoji: "💻",
    color: "purple",
    questions: [
      { text: "¿Qué componente es considerado el 'cerebro' de la computadora?", answers: ["RAM", "CPU", "Disco duro", "Fuente"], correct: 1 },
      { text: "¿Qué tipo de memoria pierde sus datos al apagar la PC?", answers: ["ROM", "SSD", "RAM", "HDD"], correct: 2 },
      { text: "¿Cuál de estos es un sistema operativo?", answers: ["Linux", "Excel", "Chrome", "Python"], correct: 0 },
      { text: "¿Cuántos bits tiene un byte?", answers: ["4", "16", "2", "8"], correct: 3 },
      { text: "¿Qué placa conecta todos los componentes de la PC?", answers: ["Placa de video", "Motherboard", "Placa de red", "Placa de sonido"], correct: 1 },
      { text: "¿Qué significa la sigla 'GPU'?", answers: ["Unidad de procesamiento gráfico", "Unidad general de energía", "Puerto gráfico universal", "Gestor de programas"], correct: 0 },
      { text: "¿Qué software traduce código fuente completo a lenguaje máquina antes de ejecutarlo?", answers: ["Navegador", "Antivirus", "Compilador", "Driver"], correct: 2 },
    ],
  },
];
