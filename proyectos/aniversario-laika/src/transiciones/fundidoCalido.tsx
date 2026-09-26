import React from 'react';
import {AbsoluteFill, Easing, interpolate} from 'remotion';
import type {TransitionPresentation, TransitionPresentationComponentProps} from '@remotion/transitions';

type Props = Record<string, never>;

// Disolvencia cruzada con "fuga de luz" ámbar: la escena que sale se
// desenfoca y se calienta, la que entra aparece desde un ligero acercamiento,
// y un velo de luz cálida cubre el punto medio del fundido.
const FundidoCalido: React.FC<TransitionPresentationComponentProps<Props>> = ({
	children,
	presentationDirection,
	presentationProgress,
}) => {
	const p = Easing.inOut(Easing.cubic)(presentationProgress);
	if (presentationDirection === 'exiting') {
		return (
			<AbsoluteFill style={{filter: `blur(${p * 6}px) brightness(${1 + p * 0.15})`}}>{children}</AbsoluteFill>
		);
	}
	const fuga = Math.sin(Math.PI * presentationProgress);
	return (
		<AbsoluteFill>
			<AbsoluteFill style={{opacity: p, transform: `scale(${1.025 - 0.025 * p})`}}>{children}</AbsoluteFill>
			<AbsoluteFill
				style={{
					mixBlendMode: 'screen',
					opacity: interpolate(fuga, [0, 1], [0, 0.45]),
					background:
						'radial-gradient(ellipse 60% 80% at 15% 30%, rgba(255,176,96,.9), rgba(255,120,60,.25) 45%, transparent 75%)',
				}}
			/>
		</AbsoluteFill>
	);
};

export const fundidoCalido = (): TransitionPresentation<Props> => ({component: FundidoCalido, props: {}});
