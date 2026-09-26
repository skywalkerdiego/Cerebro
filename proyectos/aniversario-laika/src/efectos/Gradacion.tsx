import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useRitmo} from './ritmo';

// Gradación de color cálida tipo película: sube rojos/ámbar en medios y
// altos, baja un poco el azul, levanta negros (nada de negro puro, como
// una copia de proyección) y aplica una curva S suave para dar cuerpo.
export const FiltroCalido: React.FC<{id: string; calidez: number}> = ({id, calidez}) => {
	const c = calidez;
	const r = 1 + 0.09 * c;
	const g = 1 + 0.02 * c;
	const b = 1 - 0.12 * c;
	// Curva S con negros levantados (valores de tabla 0→1).
	const curva = '0.035 0.12 0.3 0.52 0.73 0.89 0.975';
	return (
		<svg width="0" height="0" style={{position: 'absolute'}}>
			<filter id={id} colorInterpolationFilters="sRGB">
				<feColorMatrix
					type="matrix"
					values={`${r} ${0.04 * c} 0 0 0
					         ${0.02 * c} ${g} 0 0 0
					         0 ${0.03 * c} ${b} 0 0
					         0 0 0 1 0`}
				/>
				<feComponentTransfer>
					<feFuncR type="table" tableValues={curva} />
					<feFuncG type="table" tableValues={curva} />
					<feFuncB type="table" tableValues={`0.05 0.13 0.3 0.5 0.7 0.86 0.95`} />
				</feComponentTransfer>
			</filter>
		</svg>
	);
};

// Bloom: copia del plano, quemada a solo sus altas luces (contraste alto
// + brillo bajo) y muy desenfocada, sumada en modo pantalla. Respira un
// poco con los graves de la música.
export const Bloom: React.FC<{children: React.ReactNode; fuerza?: number}> = ({children, fuerza = 1}) => {
	const {graves, compas} = useRitmo();
	const opacidad = Math.min(0.75, (0.32 + graves * 0.18 + compas * 0.08) * fuerza);
	return (
		<>
			<AbsoluteFill
				style={{
					mixBlendMode: 'screen',
					opacity: opacidad,
					filter: 'brightness(0.62) contrast(2.4) saturate(1.3) blur(26px)',
				}}
			>
				{children}
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					mixBlendMode: 'screen',
					opacity: opacidad * 0.45,
					filter: 'brightness(0.55) contrast(2.8) saturate(1.2) blur(70px)',
				}}
			>
				{children}
			</AbsoluteFill>
		</>
	);
};
