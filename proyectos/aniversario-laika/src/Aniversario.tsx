import React from 'react';
import {AbsoluteFill, Audio, interpolate, useCurrentFrame} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {DESFASE_MUSICA, DURACION_TOTAL, ESCENAS, PULSO, TRANSICION, duracionEscena} from './config';
import {Escena} from './escenas/Escena';
import {GranoPelicula} from './efectos/Atmosfera';
import {MUSICA, ProveedorRitmo} from './efectos/ritmo';
import {fundidoCalido} from './transiciones/fundidoCalido';
import {Cierre, Titulo} from './texto/Textos';

// Negro nogal al inicio y al final (abre en el primer pulso, cierra en
// los últimos dos compases con la música).
const Telon: React.FC = () => {
	const frame = useCurrentFrame();
	const a = interpolate(
		frame,
		[0, PULSO, DURACION_TOTAL - PULSO * 2, DURACION_TOTAL - 1],
		[1, 0, 0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	return <AbsoluteFill style={{background: '#2b1f17', opacity: a}} />;
};

export const Aniversario: React.FC = () => {
	return (
		<ProveedorRitmo>
			<AbsoluteFill style={{backgroundColor: '#140c07'}}>
				<TransitionSeries>
					{ESCENAS.map((escena, i) => (
						<React.Fragment key={escena.id}>
							<TransitionSeries.Sequence durationInFrames={duracionEscena(i)}>
								<Escena escena={escena} />
								{escena.id === 'intro' ? <Titulo pulso={10} salida={13.5} /> : null}
								{escena.id === 'final' ? <Cierre pulsos={[18, 20, 21]} /> : null}
							</TransitionSeries.Sequence>
							{i < ESCENAS.length - 1 ? (
								<TransitionSeries.Transition
									presentation={fundidoCalido()}
									timing={linearTiming({durationInFrames: TRANSICION})}
								/>
							) : null}
						</React.Fragment>
					))}
				</TransitionSeries>
				<GranoPelicula />
				<Telon />
				<Audio
					src={MUSICA}
					startFrom={Math.max(0, -DESFASE_MUSICA)}
					volume={(f) =>
						interpolate(f, [0, PULSO, DURACION_TOTAL - PULSO * 4, DURACION_TOTAL], [0, 1, 1, 0], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						})
					}
				/>
			</AbsoluteFill>
		</ProveedorRitmo>
	);
};
