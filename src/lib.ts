import type { ImageMetadata } from 'astro';

const all = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/projects/*/*.{jpg,jpeg,png,webp,avif,svg}',
  { eager: true },
);

export interface ProjectImage {
  name: string;
  src: ImageMetadata;
}

/** Vse slike v mapi projekta, urejene po imenu datoteke (01.jpg, 02.jpg, ...). */
export function imagesFor(slug: string): ProjectImage[] {
  return Object.entries(all)
    .filter(([path]) => path.split('/').at(-2) === slug)
    .map(([path, mod]) => ({ name: path.split('/').at(-1)!, src: mod.default }))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
}

export function coverFor(slug: string, cover?: string): ProjectImage | undefined {
  const imgs = imagesFor(slug);
  return imgs.find((i) => i.name === cover) ?? imgs[0];
}
