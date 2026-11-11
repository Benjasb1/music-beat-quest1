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
    id: "musica",
    name: "Música",
    emoji: "🎵",
    color: "pink",
    questions: [
      { text: "¿Qué género se asocia con guitarras eléctricas, ritmos rápidos y actitud rebelde?", answers: ["Rock", "Salsa", "Tango", "Reguetón"], correct: 0 },
      { text: "¿Qué género tiene sus raíces en Jamaica y combina batería con bajo marcado?", answers: ["Cumbia", "Reggae", "Flamenco", "Bachata"], correct: 1 },
      { text: "¿Qué género nació en EE.UU. y destaca por la improvisación y los vientos?", answers: ["Electrónica", "Country", "Jazz", "Reguetón"], correct: 2 },
      { text: "¿Qué estilo surgió en el Río de la Plata con música melancólica y baile elegante?", answers: ["Merengue", "Pop", "Bolero", "Tango"], correct: 3 },
      { text: "¿Qué estilo usa escalas modales e improvisación extensa, pionero en los 60?", answers: ["Jazz modal", "Disco", "Bossa nova", "Salsa"], correct: 0 },
      { text: "¿Cuántas cuerdas tiene una guitarra clásica estándar?", answers: ["4", "6", "8", "12"], correct: 1 },
      { text: "¿Qué instrumento es típico del tango argentino?", answers: ["Bandoneón", "Gaita", "Sitar", "Banjo"], correct: 0 },
      { text: "¿Cuántas teclas tiene un piano estándar?", answers: ["76", "61", "88", "100"], correct: 2 },
      { text: "¿A qué familia pertenece el saxofón?", answers: ["Metales", "Cuerdas", "Percusión", "Viento madera"], correct: 3 },
      { text: "¿Qué instrumento andino se hace con cañas de distinto largo?", answers: ["Charango", "Siku", "Bombo", "Quena"], correct: 1 },
      { text: "¿Quién es conocido como el 'Rey del Pop'?", answers: ["Elvis Presley", "Prince", "Michael Jackson", "Freddie Mercury"], correct: 2 },
      { text: "¿De qué país es la banda Soda Stereo?", answers: ["Argentina", "Chile", "México", "España"], correct: 0 },
      { text: "¿Quién fue el cantante de Queen?", answers: ["Mick Jagger", "Freddie Mercury", "Bono", "Robert Plant"], correct: 1 },
      { text: "¿Qué rapera canta 'Tusa' junto a Karol G?", answers: ["Lali", "Tini", "Emilia", "Nicki Minaj"], correct: 3 },
      { text: "¿Quién compuso 'Las cuatro estaciones'?", answers: ["Mozart", "Bach", "Vivaldi", "Beethoven"], correct: 2 },
    ],
  },
  {
    id: "deportes",
    name: "Deportes",
    emoji: "⚽",
    color: "lime",
    questions: [
      { text: "¿Cuántos jugadores tiene un equipo de fútbol en cancha?", answers: ["9", "10", "11", "12"], correct: 2 },
      { text: "¿Qué país ganó el Mundial de fútbol 2022?", answers: ["Argentina", "Francia", "Brasil", "Croacia"], correct: 0 },
      { text: "¿Cada cuántos años se realizan los Juegos Olímpicos de verano?", answers: ["2", "3", "5", "4"], correct: 3 },
      { text: "¿Cuántos puntos vale un triple en básquet?", answers: ["2", "3", "4", "1"], correct: 1 },
      { text: "¿En qué deporte se destaca Manu Ginóbili?", answers: ["Tenis", "Rugby", "Básquet", "Hockey"], correct: 2 },
      { text: "¿Cómo se llama la selección argentina de rugby?", answers: ["Los Pumas", "Las Leonas", "Los Gladiadores", "Los Cóndores"], correct: 0 },
      { text: "¿Qué torneo de tenis se juega sobre polvo de ladrillo en París?", answers: ["Wimbledon", "US Open", "Australian Open", "Roland Garros"], correct: 3 },
      { text: "¿Cuántos sets se necesitan ganar en un partido de vóley?", answers: ["2", "3", "4", "5"], correct: 1 },
      { text: "¿Qué país organizó el Mundial de fútbol 1978?", answers: ["Argentina", "Brasil", "México", "Uruguay"], correct: 0 },
      { text: "¿Cuántos jugadores hay en cancha por equipo en básquet?", answers: ["4", "6", "5", "7"], correct: 2 },
      { text: "¿En qué deporte se usa un 'stick'?", answers: ["Golf", "Béisbol", "Polo", "Hockey"], correct: 3 },
      { text: "¿Cuánto mide una maratón?", answers: ["42,195 km", "21 km", "50 km", "35 km"], correct: 0 },
      { text: "¿Qué piloto argentino ganó 5 campeonatos de Fórmula 1?", answers: ["Carlos Reutemann", "Juan Manuel Fangio", "Franco Colapinto", "José Froilán González"], correct: 1 },
      { text: "¿Cuánto dura un partido de fútbol reglamentario sin descuento?", answers: ["80 minutos", "100 minutos", "120 minutos", "90 minutos"], correct: 3 },
      { text: "¿En qué deporte se puede hacer un 'ace'?", answers: ["Natación", "Fútbol", "Tenis", "Atletismo"], correct: 2 },
    ],
  },
  {
    id: "cultura",
    name: "Cultura",
    emoji: "📚",
    color: "cyan",
    questions: [
      { text: "¿Quién escribió 'Don Quijote de la Mancha'?", answers: ["Borges", "Cervantes", "García Márquez", "Cortázar"], correct: 1 },
      { text: "¿Quién pintó la 'Mona Lisa'?", answers: ["Leonardo da Vinci", "Picasso", "Van Gogh", "Miguel Ángel"], correct: 0 },
      { text: "¿Cuál es la capital de Australia?", answers: ["Sídney", "Melbourne", "Canberra", "Perth"], correct: 2 },
      { text: "¿Quién escribió 'El Aleph'?", answers: ["Sabato", "Cortázar", "Bioy Casares", "Jorge Luis Borges"], correct: 3 },
      { text: "¿En qué país están las pirámides de Giza?", answers: ["México", "Egipto", "Perú", "Grecia"], correct: 1 },
      { text: "¿Qué día se celebra la Revolución de Mayo en Argentina?", answers: ["25 de mayo", "9 de julio", "20 de junio", "17 de agosto"], correct: 0 },
      { text: "¿Cuál es el río más largo de América del Sur?", answers: ["Paraná", "Orinoco", "Amazonas", "Uruguay"], correct: 2 },
      { text: "¿Quién escribió 'Martín Fierro'?", answers: ["José Hernández", "Domingo Sarmiento", "Leopoldo Lugones", "Esteban Echeverría"], correct: 0 },
      { text: "¿Cuál es el idioma más hablado del mundo como lengua materna?", answers: ["Inglés", "Español", "Chino mandarín", "Hindi"], correct: 2 },
      { text: "¿En qué ciudad está la Torre Eiffel?", answers: ["Roma", "Londres", "Madrid", "París"], correct: 3 },
      { text: "¿Quién pintó 'La noche estrellada'?", answers: ["Monet", "Van Gogh", "Dalí", "Rembrandt"], correct: 1 },
      { text: "¿Cuál es el planeta más grande del sistema solar?", answers: ["Júpiter", "Saturno", "Neptuno", "Tierra"], correct: 0 },
      { text: "¿Cuántos continentes se reconocen habitualmente?", answers: ["4", "5", "6", "7"], correct: 3 },
      { text: "¿Quién escribió 'Cien años de soledad'?", answers: ["Pablo Neruda", "Mario Vargas Llosa", "Gabriel García Márquez", "Isabel Allende"], correct: 2 },
      { text: "¿Qué país regaló la Estatua de la Libertad a EE.UU.?", answers: ["Inglaterra", "Francia", "España", "Italia"], correct: 1 },
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
      { text: "¿En qué año se declaró la independencia argentina?", answers: ["1810", "1816", "1820", "1853"], correct: 1 },
      { text: "¿Qué instrumento inventó Thomas Edison para grabar sonido?", answers: ["Fonógrafo", "Radio", "Teléfono", "Gramófono"], correct: 0 },
      { text: "¿En qué año llegó Colón a América?", answers: ["1500", "1453", "1492", "1510"], correct: 2 },
      { text: "¿Qué banda lanzó 'The Dark Side of the Moon' en 1973?", answers: ["Led Zeppelin", "The Who", "Queen", "Pink Floyd"], correct: 3 },
      { text: "¿Quién creó la bandera argentina?", answers: ["Manuel Belgrano", "José de San Martín", "Mariano Moreno", "Sarmiento"], correct: 0 },
      { text: "¿En qué año cayó el Muro de Berlín?", answers: ["1975", "1989", "1991", "2000"], correct: 1 },
      { text: "¿Qué servicio popularizó la música por streaming desde 2008?", answers: ["Napster", "iTunes", "Spotify", "Winamp"], correct: 2 },
      { text: "¿Qué civilización construyó Machu Picchu?", answers: ["Azteca", "Maya", "Olmeca", "Inca"], correct: 3 },
      { text: "¿En qué año terminó la Segunda Guerra Mundial?", answers: ["1945", "1939", "1950", "1918"], correct: 0 },
      { text: "¿Qué cantante fue apodado 'El Rey del Rock'?", answers: ["Chuck Berry", "Elvis Presley", "Little Richard", "Johnny Cash"], correct: 1 },
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
      { text: "¿Qué indica la cota en un plano?", answers: ["El material", "El color", "Una medida o nivel", "El norte"], correct: 2 },
      { text: "¿Cuántos centímetros tiene un metro?", answers: ["10", "1000", "50", "100"], correct: 3 },
      { text: "¿Qué es la mampostería?", answers: ["Construcción con ladrillos o bloques unidos con mortero", "Una instalación eléctrica", "Un tipo de pintura", "Un plano de techo"], correct: 0 },
      { text: "¿Qué elemento vertical soporta cargas y las transmite a la fundación?", answers: ["Viga", "Columna", "Losa", "Cielorraso"], correct: 1 },
      { text: "¿Qué se coloca dentro del hormigón armado para resistir la tracción?", answers: ["Madera", "Plástico", "Barras de acero", "Vidrio"], correct: 2 },
      { text: "¿Qué vista muestra el exterior frontal de un edificio?", answers: ["Planta", "Corte", "Detalle", "Fachada"], correct: 3 },
      { text: "¿Qué herramienta sirve para comprobar que una superficie esté horizontal?", answers: ["Nivel", "Pinza", "Serrucho", "Tenaza"], correct: 0 },
      { text: "Si en escala 1:100 una pared mide 5 cm en el plano, ¿cuánto mide en la realidad?", answers: ["50 cm", "5 m", "50 m", "0,5 m"], correct: 1 },
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
      { text: "¿Qué dispositivo almacena datos de forma permanente sin partes móviles?", answers: ["HDD", "RAM", "SSD", "CD"], correct: 2 },
      { text: "¿Qué componente provee energía a todos los componentes de la PC?", answers: ["Disipador", "Motherboard", "CPU", "Fuente de alimentación"], correct: 3 },
      { text: "¿Qué es un driver?", answers: ["Software que permite al sistema usar un dispositivo", "Un tipo de virus", "Un cable de red", "Una memoria"], correct: 0 },
      { text: "¿Qué significa 'BIOS'?", answers: ["Sistema operativo binario", "Sistema básico de entrada/salida", "Base de información online", "Bus de entrada serial"], correct: 1 },
      { text: "¿Cuál de estos es un lenguaje de programación?", answers: ["HTML5", "Windows", "Python", "Intel"], correct: 2 },
      { text: "¿Qué puerto se usa comúnmente para conectar un monitor moderno?", answers: ["PS/2", "RJ-11", "VGA serial", "HDMI"], correct: 3 },
      { text: "¿Qué dirección identifica a un equipo en una red?", answers: ["Dirección IP", "Número de serie", "Clave BIOS", "Puerto USB"], correct: 0 },
      { text: "¿Cuántos megabytes tiene aproximadamente un gigabyte?", answers: ["100", "1024", "512", "10000"], correct: 1 },
    ],
  },
];
