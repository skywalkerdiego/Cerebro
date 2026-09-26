import React, {useEffect, useState} from 'react';
import {getVideoMetadata} from '@remotion/media-utils';
import {
	continueRender,
	delayRender,
	AbsoluteFill,
	Freeze,
	Img,
	OffthreadVideo,
	getStaticFiles,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {STOP_MOTION, type Escena as TipoEscena} from '../config';
import {KenBurns} from '../efectos/KenBurns';
import {Bloom, FiltroCalido} from '../efectos/Gradacion';
import {Polvo, RayosVolumetricos, Vineta} from '../efectos/Atmosfera';
import {Destello, Leyenda} from '../texto/Textos';

const EXTENSIONES_VIDEO = ['mp4', 'webm', 'mov'];
const EXTENSIONES_IMAGEN = ['jpg', 'jpeg', 'png', 'webp'];

// Busca public/escenas/<id>.<ext>: primero clip (Kling/Runway/Sora),
// luego imagen fija (Midjourney). Si no hay nada, marcador de posición.
const buscarAsset = (id: string): {tipo: 'video' | 'imagen'; src: string} | null => {
	const archivos = new Set(getStaticFiles().map((f) => f.name));
	for (const ext of EXTENSIONES_VIDEO) {
		if (archivos.has(`escenas/${id}.${ext}`)) return {tipo: 'video', src: staticFile(`escenas/${id}.${ext}`)};
	}
	for (const ext of EXTENSIONES_IMAGEN) {
		if (archivos.has(`escenas/${id}.${ext}`)) return {tipo: 'imagen', src: staticFile(`escenas/${id}.${ext}`)};
	}
	return null;
};

// Un clip de 5 s de Kling se estira (cámara lenta) para cubrir los 8–10 s
// de la escena en vez de congelarse al final.
const Clip: React.FC<{src: string; style: React.CSSProperties}> = ({src, style}) => {
	const {fps, durationInFrames} = useVideoConfig();
	const [velocidad, setVelocidad] = useState<number | null>(null);
	const [espera] = useState(() => delayRender(`Leyendo duración de ${src}`));
	useEffect(() => {
		getVideoMetadata(src)
			.then(({durationInSeconds}) => setVelocidad(Math.min(1, (durationInSeconds * fps - 2) / durationInFrames)))
			.catch(() => setVelocidad(1))
			.finally(() => continueRender(espera));
	}, [src, fps, durationInFrames, espera]);
	if (velocidad === null) return null;
	return <OffthreadVideo src={src} muted style={style} playbackRate={velocidad} />;
};

const Medio: React.FC<{escena: TipoEscena}> = ({escena}) => {
	const asset = buscarAsset(escena.id);
	const cubrir: React.CSSProperties = {width: '100%', height: '100%', objectFit: 'cover'};
	if (asset?.tipo === 'video') return <Clip src={asset.src} style={cubrir} />;
	if (asset?.tipo === 'imagen') return <Img src={asset.src} style={cubrir} />;
	return (
		<AbsoluteFill
			style={{
				background: `radial-gradient(ellipse at 40% 35%, ${escena.fondo[0]}, ${escena.fondo[1]} 75%)`,
				alignItems: 'center',
				justifyContent: 'center',
				color: 'rgba(232,220,199,.5)',
				fontFamily: 'monospace',
				fontSize: 30,
			}}
		>
			falta public/escenas/{escena.id}.jpg (o .mp4)
		</AbsoluteFill>
	);
};

// Sostiene la imagen en cuadros pares: animación "en dos".
const EnDos: React.FC<{children: React.ReactNode}> = ({children}) => {
	const frame = useCurrentFrame();
	if (!STOP_MOTION) return <>{children}</>;
	return <Freeze frame={frame - (frame % 2)}>{children}</Freeze>;
};

export const Escena: React.FC<{escena: TipoEscena}> = ({escena}) => {
	const {durationInFrames} = useVideoConfig();
	const filtro = `calido-${escena.id}`;
	const plano = (
		<EnDos>
			<KenBurns desde={escena.camara.desde} hasta={escena.camara.hasta}>
				<Medio escena={escena} />
			</KenBurns>
		</EnDos>
	);
	return (
		<AbsoluteFill style={{backgroundColor: '#140c07', overflow: 'hidden'}}>
			<FiltroCalido id={filtro} calidez={escena.calidez} />
			<AbsoluteFill style={{filter: `url(#${filtro}) saturate(1.05)`}}>
				{plano}
				<Bloom>{plano}</Bloom>
				<RayosVolumetricos luz={escena.luz} />
				<Polvo luz={escena.luz} semilla={escena.id} />
			</AbsoluteFill>
			<Vineta />
			{escena.leyenda && escena.pulsoLeyenda != null ? (
				<>
					<Destello pulso={escena.pulsoLeyenda} />
					<Leyenda texto={escena.leyenda} pulso={escena.pulsoLeyenda} duracion={durationInFrames} />
				</>
			) : null}
		</AbsoluteFill>
	);
};
