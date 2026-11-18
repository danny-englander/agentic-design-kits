import type { GalleryItem } from '@agentic-design-kits/swiss-minimal/types';
import moonRocketPeak from '../assets/gallery/moon-rocket-peak.jpg';
import egretMoon from '../assets/gallery/egret-moon.jpg';
import whiteHat from '../assets/gallery/white-hat.jpg';
import redStairs from '../assets/gallery/red-stairs.jpg';
import alpineHut from '../assets/gallery/alpine-hut.jpg';
import stoneCurves from '../assets/gallery/stone-curves.jpg';
import snowWall from '../assets/gallery/snow-wall.jpg';
import snowPeak from '../assets/gallery/snow-peak.jpg';

// Artwork by Danny Englander. The alt text and captions were written by hand; the files' own
// metadata holds only the prompts that made them. Portrait, square and landscape are mixed, so
// both layouts have something to do.
export const gallery: GalleryItem[] = [
  {
    src: moonRocketPeak,
    alt: 'A rocket climbs on a white trail above a huge orange moon rising behind a snowy peak at dusk.',
    caption: 'Launch window',
  },
  {
    src: egretMoon,
    alt: 'A white egret flies across a deep blue sky toward a crescent moon.',
    caption: 'Egret and crescent',
  },
  {
    src: whiteHat,
    alt: 'A woman in a wide white sun hat and an orange coat, against a flat teal sky.',
    caption: 'The white hat',
  },
  {
    src: redStairs,
    alt: 'A woman stands at the top of a red staircase between pale walls, a curved shadow beside her.',
    caption: 'Red stairs',
  },
  {
    src: alpineHut,
    alt: 'A hut with an orange roof and a white cross on a russet ridge, below a snowy mountain.',
    caption: 'Hut on the ridge',
  },
  {
    src: stoneCurves,
    alt: 'A small figure stands among huge curved stone forms under a bright blue sky.',
    caption: 'Among the curves',
  },
  {
    src: snowWall,
    alt: 'A lone walker on a snowy ridge beside a tall white wall, with cliffs and the sea below.',
    caption: 'The long wall',
  },
  {
    src: snowPeak,
    alt: 'A snow-covered peak against a clear, deep blue sky.',
    caption: 'Clear summit',
  },
];
