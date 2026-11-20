import type { RelatedSite } from '@agentic-design-kits/verdigris/types';

// The footer's related column (Footer in COMPONENTS.md): the landing page for both kits, and the
// other kit's demo, each with the mark from its own top bar, in its own colors. The ∞ is Overused
// Grotesk Bold's and the ❦ Cormorant's, as paths, since neither site loads the other's typeface.
export const related: RelatedSite[] = [
  {
    label: 'Agentic Design Kits',
    href: 'https://www.agenticdesignkits.com',
    mark: 'M16.76 14.47Q15.73 14.47 14.88 13.67Q14.02 12.86 13.59 11.54Q14 10.7 14.83 10.11Q15.66 9.52 16.68 9.52Q17.8 9.52 18.48 10.22Q19.17 10.91 19.17 12.05Q19.17 13.13 18.5 13.8Q17.84 14.47 16.76 14.47ZM12.18 9.3Q11.17 7.77 9.72 6.97Q8.27 6.16 6.54 6.16Q4.93 6.16 3.68 6.92Q2.42 7.68 1.71 9.02Q1 10.35 1 12.08Q1 13.78 1.7 15.08Q2.41 16.38 3.66 17.11Q4.91 17.84 6.54 17.84Q8.08 17.84 9.43 17.09Q10.79 16.35 11.82 14.96Q12.96 16.35 14.36 17.09Q15.76 17.84 17.38 17.84Q19.08 17.84 20.34 17.12Q21.6 16.4 22.3 15.1Q23 13.8 23 12.05Q23 10.29 22.3 8.96Q21.6 7.64 20.34 6.9Q19.08 6.16 17.41 6.16Q15.89 6.16 14.54 6.97Q13.19 7.77 12.18 9.3ZM4.86 12.08Q4.86 11.33 5.17 10.76Q5.47 10.18 6 9.85Q6.53 9.52 7.2 9.52Q8.26 9.52 9.02 10.27Q9.78 11.01 10.34 12.57Q9.82 13.46 9.09 13.97Q8.37 14.47 7.36 14.47Q6.24 14.47 5.55 13.81Q4.86 13.15 4.86 12.08Z',
    color: { light: '#cc2812', dark: '#ff4b2b' },
  },
  {
    label: 'Swiss Minimal',
    href: 'https://www.swissminimal.ch',
    mark: 'M9 2h6v7h7v6h-7v7H9v-7H2V9h7z',
    color: { light: '#cc2812', dark: '#ff4b2b' },
  },
];
