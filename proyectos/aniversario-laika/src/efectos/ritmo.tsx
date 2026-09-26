import React, {createContext, useContext, useMemo} from 'react';
import {staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {useAudioData, visualizeAudio} from '@remotion/media-utils';
import {DESFASE_MUSICA, PULSO} from '../config';

export const MUSICA = staticFile('musica.mp3');

type Ritmo = {
	cuadro: number; // cuadro global del corto
	fase: number; // 0→1 dentro del pulso actual
	golpe: number; // envolvente del pulso: 1 justo en el golpe, cae a 0
	compas: number; // igual, pero solo en el primer pulso de cada compás
	graves: number; // energía real de graves de la música (0–1)
};

const Contexto = createContext<Ritmo>({cuadro: 0, fase: 0, golpe: 0, compas: 0, graves: 0});

// Envolvente de ataque rápido y caída exponencial, como un bombo.
const envolvente = (fase: number) => Math.exp(-fase * 5);

export const ProveedorRitmo: React.FC<{children: React.ReactNode}> = ({children}) => {
	const cuadro = useCurrentFrame();
	const {fps} = useVideoConfig();
	const audio = useAudioData(MUSICA);

	const t = cuadro - DESFASE_MUSICA;
	const fase = (((t % PULSO) + PULSO) % PULSO) / PULSO;
	const fc = (((t % (PULSO * 4)) + PULSO * 4) % (PULSO * 4)) / PULSO; // 0–4

	const graves = useMemo(() => {
		if (!audio || t < 0) return 0;
		const bandas = visualizeAudio({fps, frame: t, audioData: audio, numberOfSamples: 32, smoothing: true});
		// Las 4 primeras bandas ≈ graves (bombo y bajo).
		const g = (bandas[0] + bandas[1] + bandas[2] + bandas[3]) / 4;
		return Math.min(1, g * 2.2);
	}, [audio, fps, t]);

	const valor = useMemo<Ritmo>(
		() => ({cuadro, fase, golpe: envolvente(fase), compas: fc < 1 ? envolvente(fc) : 0, graves}),
		[cuadro, fase, fc, graves],
	);
	return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
};

export const useRitmo = () => useContext(Contexto);
