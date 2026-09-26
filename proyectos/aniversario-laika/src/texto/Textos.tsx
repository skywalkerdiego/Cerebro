import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {loadFont as cargarFraunces} from '@remotion/google-fonts/Fraunces';
import {loadFont as cargarCaveat} from '@remotion/google-fonts/Caveat';
import {PULSO} from '../config';

const {fontFamily: SERIF} = cargarFraunces('italic', {weights: ['400'], subsets: ['latin', 'latin-ext']});
cargarFraunces('normal', {weights: ['400'], subsets: ['latin', 'latin-ext']});
const {fontFamily: MANO} = cargarCaveat('normal', {weights: ['500'], subsets: ['latin', 'latin-ext']});

const ARENA = '#E8DCC7';
const AVENA = '#D4B895';
const sombra = '0 2px 30px rgba(20,12,6,.65), 0 1px 3px rgba(20,12,6,.5)';

const suave = Easing.bezier(0.22, 1, 0.36, 1);
const entrada = (frame: number, inicio: number, dur: number) =>
	interpolate(frame, [inicio, inicio + dur], [0, 1], {easing: suave, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

// Una palabra: sube, se enfoca y aparece. `inicio` en cuadros.
const Palabra: React.FC<{texto: string; inicio: number; dur?: number}> = ({texto, inicio, dur = PULSO * 0.9}) => {
	const frame = useCurrentFrame();
	const u = entrada(frame, inicio, dur);
	return (
		<span
			style={{
				display: 'inline-block',
				opacity: u,
				transform: `translateY(${(1 - u) * 18}px)`,
				filter: `blur(${(1 - u) * 8}px)`,
				whiteSpace: 'pre',
			}}
		>
			{texto}
		</span>
	);
};

// Destello cálido de "foto" que cae justo en el pulso de la leyenda.
export const Destello: React.FC<{pulso: number}> = ({pulso}) => {
	const frame = useCurrentFrame();
	const t0 = pulso * PULSO;
	const a = interpolate(frame, [t0 - 3, t0, t0 + PULSO * 0.8], [0, 0.55, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.quad),
	});
	return <AbsoluteFill style={{background: '#fff4e2', opacity: a, mixBlendMode: 'screen'}} />;
};

// Leyenda de cada viñeta: una palabra por medio pulso a partir del golpe.
export const Leyenda: React.FC<{texto: string; pulso: number; duracion: number}> = ({texto, pulso, duracion}) => {
	const frame = useCurrentFrame();
	const t0 = pulso * PULSO;
	const salida = interpolate(frame, [duracion - PULSO * 1.5, duracion - PULSO * 0.5], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const velo = entrada(frame, t0, PULSO);
	const palabras = texto.split(' ');
	return (
		<AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', opacity: salida}}>
			<AbsoluteFill
				style={{
					background: 'linear-gradient(to top, rgba(18,10,5,.72), rgba(18,10,5,0) 34%)',
					opacity: velo,
				}}
			/>
			<div
				style={{
					position: 'relative',
					marginBottom: 118,
					fontFamily: SERIF,
					fontStyle: 'italic',
					fontSize: 76,
					letterSpacing: '-0.01em',
					color: ARENA,
					textShadow: sombra,
				}}
			>
				{palabras.map((p, i) => (
					<Palabra key={i} texto={i < palabras.length - 1 ? `${p} ` : p} inicio={t0 + 4 + i * (PULSO / 2)} />
				))}
			</div>
			<div
				style={{
					position: 'absolute',
					bottom: 96,
					height: 2,
					width: 260 * entrada(frame, t0 + PULSO, PULSO * 2),
					background: AVENA,
					opacity: 0.6,
				}}
			/>
		</AbsoluteFill>
	);
};

// Título de la intro: "Dos años" letra por letra en cuartos de pulso.
export const Titulo: React.FC<{pulso: number; salida: number}> = ({pulso, salida}) => {
	const frame = useCurrentFrame();
	const t0 = pulso * PULSO;
	const fuera = interpolate(frame, [salida * PULSO, salida * PULSO + PULSO], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const letras = 'Dos años'.split('');
	return (
		<AbsoluteFill style={{padding: '0 0 0 118px', justifyContent: 'flex-start', opacity: fuera}}>
			<div style={{marginTop: 150, fontFamily: SERIF, fontStyle: 'italic', color: ARENA, textShadow: sombra}}>
				<div style={{fontSize: 150, lineHeight: 1}}>
					{letras.map((l, i) => (
						<Palabra key={i} texto={l} inicio={t0 + i * (PULSO / 4)} dur={PULSO * 1.2} />
					))}
				</div>
				<div style={{fontSize: 58, color: AVENA, marginTop: 14, marginLeft: 6}}>
					<Palabra texto="hechos a mano" inicio={t0 + PULSO * 2} dur={PULSO * 1.5} />
				</div>
			</div>
		</AbsoluteFill>
	);
};

// Cierre: tres líneas, cada una en su pulso.
export const Cierre: React.FC<{pulsos: [number, number, number]}> = ({pulsos: [a, b, c]}) => {
	const frame = useCurrentFrame();
	const velo = entrada(frame, a * PULSO - PULSO, PULSO * 2);
	return (
		<AbsoluteFill style={{alignItems: 'center'}}>
			<AbsoluteFill
				style={{background: 'linear-gradient(to bottom, rgba(26,17,11,.82), rgba(26,17,11,0) 52%)', opacity: velo}}
			/>
			<div style={{marginTop: 150, textAlign: 'center', textShadow: sombra}}>
				<div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 92, color: ARENA}}>
					<Palabra texto="Feliz aniversario, mi amor." inicio={a * PULSO} dur={PULSO * 1.5} />
				</div>
				<div style={{fontFamily: SERIF, fontSize: 40, color: AVENA, marginTop: 24}}>
					<Palabra
						texto="Gracias por estos dos años. Vamos por todos los que faltan."
						inicio={b * PULSO}
						dur={PULSO * 1.5}
					/>
				</div>
				<div style={{fontFamily: MANO, fontSize: 84, color: ARENA, marginTop: 30, transform: 'rotate(-2deg)'}}>
					<Palabra texto="Diego" inicio={c * PULSO} dur={PULSO * 1.5} />
				</div>
			</div>
		</AbsoluteFill>
	);
};
