import React from 'react';
import {Composition} from 'remotion';
import {Aniversario} from './Aniversario';
import {ALTO, ANCHO, DURACION_TOTAL, FPS} from './config';

export const Root: React.FC = () => (
	<Composition
		id="Aniversario"
		component={Aniversario}
		durationInFrames={DURACION_TOTAL}
		fps={FPS}
		width={ANCHO}
		height={ALTO}
	/>
);
