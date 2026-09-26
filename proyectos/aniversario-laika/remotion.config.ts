import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
Config.setConcurrency(2);
// Los filtros SVG (gradación, bloom) necesitan GPU por software estable.
Config.setChromiumOpenGlRenderer('angle');
