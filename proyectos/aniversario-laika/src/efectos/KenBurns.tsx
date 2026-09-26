import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Encuadre} from '../config';

// Zoom y paneo lentos, con entrada y salida suaves (como una grúa de
// motion control en un set de stop-motion, no un zoom digital lineal).
export const KenBurns: React.FC<{
	desde: Encuadre;
	hasta: Encuadre;
	children: React.ReactNode;
}> = ({desde, hasta, children}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const u = interpolate(frame, [0, durationInFrames - 1], [0, 1], {
		easing: Easing.bezier(0.37, 0, 0.63, 1),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const escala = desde.escala + (hasta.escala - desde.escala) * u;
	const x = desde.x + (hasta.x - desde.x) * u;
	const y = desde.y + (hasta.y - desde.y) * u;
	return (
		<AbsoluteFill
			style={{
				transform: `translate(${x}%, ${y}%) scale(${escala})`,
				transformOrigin: '50% 50%',
				willChange: 'transform',
			}}
		>
			{children}
		</AbsoluteFill>
	);
};
