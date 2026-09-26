import React, {useMemo} from 'react';
import {AbsoluteFill, random, useCurrentFrame} from 'remotion';
import type {Luz} from '../config';
import {useRitmo} from './ritmo';

// Rayos volumétricos: abanico de haces que salen de la fuente de luz de
// la escena, desenfocados y sumados en pantalla. Se mueven muy lento,
// como luz atravesando polvo en el set.
export const RayosVolumetricos: React.FC<{luz: Luz}> = ({luz}) => {
	const frame = useCurrentFrame();
	const {graves} = useRitmo();
	const giro = Math.sin(frame / 90) * 2.5;
	const alfa = luz.intensidad * (0.2 + graves * 0.06);
	const haz = `${luz.color}`;
	return (
		<AbsoluteFill
			style={{
				mixBlendMode: 'screen',
				opacity: alfa,
				filter: 'blur(22px)',
				background: `repeating-conic-gradient(from ${120 + giro}deg at ${luz.x}% ${luz.y}%,
					transparent 0deg, ${haz} 2.5deg, transparent 6deg, transparent 11deg,
					${haz} 12.5deg, transparent 15deg, transparent 23deg)`,
				maskImage: `radial-gradient(ellipse 85% 95% at ${luz.x}% ${luz.y}%, #000 0%, rgba(0,0,0,.55) 45%, transparent 85%)`,
				WebkitMaskImage: `radial-gradient(ellipse 85% 95% at ${luz.x}% ${luz.y}%, #000 0%, rgba(0,0,0,.55) 45%, transparent 85%)`,
			}}
		/>
	);
};

// Motas de polvo/aserrín flotando dentro de la luz, con bokeh.
export const Polvo: React.FC<{luz: Luz; semilla: string; cantidad?: number}> = ({luz, semilla, cantidad = 46}) => {
	const frame = useCurrentFrame();
	const motas = useMemo(
		() =>
			new Array(cantidad).fill(0).map((_, i) => ({
				x: random(`${semilla}-x-${i}`) * 100,
				y: random(`${semilla}-y-${i}`) * 100,
				r: 2 + random(`${semilla}-r-${i}`) * 7,
				v: 0.02 + random(`${semilla}-v-${i}`) * 0.05,
				fase: random(`${semilla}-f-${i}`) * Math.PI * 2,
				desenfoque: random(`${semilla}-b-${i}`) < 0.35,
			})),
		[cantidad, semilla],
	);
	return (
		<AbsoluteFill style={{mixBlendMode: 'screen', pointerEvents: 'none'}}>
			{motas.map((m, i) => {
				const x = m.x + Math.sin(frame / 60 + m.fase) * 1.4;
				const y = (m.y - frame * m.v + 100) % 100;
				// Solo brillan dentro del cono de luz.
				const d = Math.hypot((x - luz.x) / 90, (y - luz.y) / 110);
				const brillo = Math.max(0, 1 - d) * luz.intensidad * (0.5 + 0.5 * Math.sin(frame / 25 + m.fase));
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: `${x}%`,
							top: `${y}%`,
							width: m.desenfoque ? m.r * 3 : m.r,
							height: m.desenfoque ? m.r * 3 : m.r,
							borderRadius: '50%',
							background: luz.color,
							opacity: brillo * (m.desenfoque ? 0.35 : 0.8),
							filter: m.desenfoque ? 'blur(6px)' : 'blur(1px)',
						}}
					/>
				);
			})}
		</AbsoluteFill>
	);
};

export const Vineta: React.FC = () => (
	<AbsoluteFill
		style={{
			background:
				'radial-gradient(ellipse 75% 70% at 50% 52%, rgba(20,11,5,0) 45%, rgba(20,11,5,.38) 78%, rgba(12,6,2,.78) 100%)',
		}}
	/>
);

// Grano de película que cambia cada 2 cuadros + un parpadeo de
// exposición mínimo (luces de set reales nunca son 100 % estables).
export const GranoPelicula: React.FC = () => {
	const frame = useCurrentFrame();
	const paso = Math.floor(frame / 2);
	const parpadeo = (random(`flicker-${paso}`) - 0.5) * 0.025;
	return (
		<>
			<AbsoluteFill style={{mixBlendMode: 'overlay', opacity: 0.16}}>
				<svg width="100%" height="100%">
					<filter id={`grano-${paso}`}>
						<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={paso % 97} />
						<feColorMatrix type="saturate" values="0" />
					</filter>
					<rect width="100%" height="100%" filter={`url(#grano-${paso})`} />
				</svg>
			</AbsoluteFill>
			<AbsoluteFill style={{background: parpadeo > 0 ? '#fff' : '#000', opacity: Math.abs(parpadeo)}} />
		</>
	);
};
