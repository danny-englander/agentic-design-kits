import type { GalleryItem } from '@agentic-design-kits/verdigris/types';
import moonrise from '../assets/gallery/moonrise.jpg';
import leafAndPetal from '../assets/gallery/leaf-and-petal.jpg';
import copperCurrent from '../assets/gallery/copper-current.jpg';
import readerInGreen from '../assets/gallery/reader-in-green.jpg';
import redSunPeak from '../assets/gallery/red-sun-peak.jpg';
import tigerPeonies from '../assets/gallery/tiger-peonies.jpg';
import totems from '../assets/gallery/totems.jpg';
import woodcutScroll from '../assets/gallery/woodcut-scroll.jpg';
import greenRelief from '../assets/gallery/green-relief.jpg';
import gildedPanel from '../assets/gallery/gilded-panel.jpg';

// Artwork by Danny Englander. The alt text and captions were written by hand; the files' own
// metadata holds only the prompts that made them. Portrait, square and landscape are mixed, so
// both layouts have something to do.
export const gallery: GalleryItem[] = [
  {
    src: moonrise,
    alt: 'A pale green planet rises behind a forest at night, with a copper moon above and an orange tree in front.',
    caption: 'Moonrise over the wood',
  },
  {
    src: leafAndPetal,
    alt: 'Woodcut leaves and cream petals on black, beside a strip of patterned verdigris.',
    caption: 'Leaf and petal',
  },
  {
    src: copperCurrent,
    alt: 'Swirling bands of verdigris green and black, edged in copper.',
    caption: 'Copper current',
  },
  {
    src: readerInGreen,
    alt: 'A woman in a green dress writes beside an open book under flowering branches, a domed temple behind her.',
    caption: 'The reader',
  },
  {
    src: redSunPeak,
    alt: 'A small red sun sits just above a sharp mountain peak in a teal evening sky.',
    caption: 'Red sun, high peak',
  },
  {
    src: tigerPeonies,
    alt: 'A blue-green tiger roars through a thicket of white and pink peonies.',
    caption: 'Tiger in the peonies',
  },
  {
    src: totems,
    alt: 'Upright folk patterns in black, cream and orange on green, one carved with a face.',
    caption: 'Totems',
  },
  {
    src: woodcutScroll,
    alt: 'Black and tan woodcut scrolls on a mottled verdigris ground, with a touch of red.',
    caption: 'Scroll',
  },
  {
    src: greenRelief,
    alt: 'A carved relief tile of green acanthus scrolls and a single pink rose, in a beaded frame.',
    caption: 'Green relief',
  },
  {
    src: gildedPanel,
    alt: 'A verdigris panel with gilded scrollwork and turquoise flowers around a gold rosette.',
    caption: 'Gilded panel',
  },
];
