// Todo el corto vive en la rejilla del ritmo: la música va a 90 BPM y el
// render a 30 fps, así que un pulso = 20 cuadros exactos y un compás
// (4 pulsos) = 80 cuadros. Las escenas, textos y destellos se miden en
// pulsos, nunca en segundos sueltos.

export const FPS = 30;
export const BPM = 90;
export const PULSO = (FPS * 60) / BPM; // 20 cuadros
export const COMPAS = PULSO * 4; // 80 cuadros
export const ANCHO = 1920;
export const ALTO = 1080;

// Si al escuchar el render los golpes caen antes/después del pulso
// visual, ajusta esto (en cuadros, puede ser negativo).
export const DESFASE_MUSICA = 0;

// Transición entre escenas: 1 pulso de fundido cálido.
export const TRANSICION = PULSO;

// Sostiene cada cuadro dos veces (animación "en dos", 12 imágenes por
// segundo) sobre la imagen/clip — el tic característico del stop-motion.
// Textos, grano y luz siguen a 30 fps para que no se vea entrecortado.
export const STOP_MOTION = true;

export const pulsos = (n: number) => Math.round(n * PULSO);

export type Encuadre = {
	escala: number; // 1 = encuadre completo
	x: number; // desplazamiento horizontal en % del cuadro (+ = derecha)
	y: number; // desplazamiento vertical en % del cuadro (+ = abajo)
};

export type Luz = {
	x: number; // origen de los rayos, en % del ancho
	y: number; // origen de los rayos, en % del alto
	color: string;
	intensidad: number; // 0–1
};

export type Escena = {
	id: string;
	pulsos: number; // duración en pulsos (sin contar la transición)
	leyenda?: string;
	// Pulso (dentro de la escena) en el que entra la leyenda con su destello.
	pulsoLeyenda?: number;
	camara: {desde: Encuadre; hasta: Encuadre};
	luz: Luz;
	// Temperatura de la gradación: 0 = neutro, 1 = muy cálido.
	calidez: number;
	// Color base para el marcador de posición mientras no exista el asset.
	fondo: [string, string];
};

// Duraciones idénticas al corto original (10 s, 8 s × 8, 16 s = 90 s).
export const ESCENAS: Escena[] = [
	{
		id: 'intro',
		pulsos: 15,
		camara: {desde: {escala: 1.14, x: 0, y: -3}, hasta: {escala: 1.04, x: -1.5, y: 1}},
		luz: {x: 22, y: 8, color: '#ffcf96', intensidad: 0.9},
		calidez: 0.9,
		fondo: ['#3a2618', '#120b07'],
	},
	{
		id: 'karaoke',
		pulsos: 12,
		leyenda: 'Desafinados, pero juntos',
		pulsoLeyenda: 8,
		camara: {desde: {escala: 1.06, x: -2.5, y: 0}, hasta: {escala: 1.1, x: 2.5, y: -1}},
		luz: {x: 80, y: 0, color: '#d9a8ff', intensidad: 0.7},
		calidez: 0.45,
		fondo: ['#3b2150', '#0f0a1a'],
	},
	{
		id: 'lago',
		pulsos: 12,
		leyenda: 'Tú, yo y la neblina',
		pulsoLeyenda: 8,
		camara: {desde: {escala: 1.03, x: 0, y: 1}, hasta: {escala: 1.12, x: 0.5, y: -0.5}},
		luz: {x: 70, y: 5, color: '#fff1d6', intensidad: 0.85},
		calidez: 0.55,
		fondo: ['#9fb3b2', '#46605d'],
	},
	{
		id: 'venado',
		pulsos: 12,
		leyenda: 'Alguien se coló en la foto',
		pulsoLeyenda: 8,
		camara: {desde: {escala: 1.1, x: 2, y: 0}, hasta: {escala: 1.05, x: -1.5, y: 0.5}},
		luz: {x: 35, y: 0, color: '#fff4e0', intensidad: 0.8},
		calidez: 0.6,
		fondo: ['#8f9a8a', '#3b3a2c'],
	},
	{
		id: 'acuario',
		pulsos: 12,
		leyenda: 'Tú mirabas los peces; yo, a ti',
		pulsoLeyenda: 8,
		camara: {desde: {escala: 1.04, x: 1.5, y: 0}, hasta: {escala: 1.11, x: -1, y: -0.5}},
		luz: {x: 50, y: 0, color: '#9fd8ff', intensidad: 0.6},
		calidez: 0.35,
		fondo: ['#12305a', '#050a18'],
	},
	{
		id: 'navidad',
		pulsos: 12,
		leyenda: 'Nuestra Navidad morada',
		pulsoLeyenda: 8,
		camara: {desde: {escala: 1.05, x: 0, y: 0}, hasta: {escala: 1.12, x: 1, y: 0.5}},
		luz: {x: 18, y: 6, color: '#ffd9a8', intensidad: 0.75},
		calidez: 0.8,
		fondo: ['#5a3f78', '#1a1424'],
	},
	{
		id: 'mundial',
		pulsos: 12,
		leyenda: 'Mismo equipo, siempre',
		pulsoLeyenda: 8,
		camara: {desde: {escala: 1.12, x: 0, y: -1}, hasta: {escala: 1.04, x: 0, y: 0.5}},
		luz: {x: 75, y: 4, color: '#ffe8cc', intensidad: 0.7},
		calidez: 0.7,
		fondo: ['#3f5a3c', '#1e1b16'],
	},
	{
		id: 'rancho',
		pulsos: 12,
		leyenda: 'Hasta de vaqueros',
		pulsoLeyenda: 8,
		camara: {desde: {escala: 1.05, x: -2, y: 0}, hasta: {escala: 1.1, x: 2, y: -0.5}},
		luz: {x: 60, y: 0, color: '#ffb866', intensidad: 1},
		calidez: 1,
		fondo: ['#6a4222', '#1e140c'],
	},
	{
		id: 'doctora',
		pulsos: 12,
		leyenda: 'Mi doctora favorita',
		pulsoLeyenda: 8,
		camara: {desde: {escala: 1.03, x: 0, y: 0.5}, hasta: {escala: 1.12, x: -1, y: -1}},
		luz: {x: 15, y: 10, color: '#fff4de', intensidad: 0.95},
		calidez: 0.6,
		fondo: ['#d8d2c2', '#8a7e6a'],
	},
	{
		id: 'final',
		pulsos: 24,
		camara: {desde: {escala: 1.16, x: 0, y: 1.5}, hasta: {escala: 1.0, x: 0, y: 0}},
		luz: {x: 22, y: 8, color: '#ffcf96', intensidad: 0.9},
		calidez: 0.95,
		fondo: ['#3a2618', '#120b07'],
	},
];

// Cada escena (menos la última) dura su tiempo + la transición, para que
// el fundido se "coma" ese extra y cada escena empiece exactamente en su
// pulso original: intro 0 s, karaoke 10 s, lago 18 s…
export const duracionEscena = (i: number) =>
	pulsos(ESCENAS[i].pulsos) + (i < ESCENAS.length - 1 ? TRANSICION : 0);

export const DURACION_TOTAL = ESCENAS.reduce((t, e) => t + pulsos(e.pulsos), 0);

export const inicioEscena = (i: number) =>
	ESCENAS.slice(0, i).reduce((t, e) => t + pulsos(e.pulsos), 0);
