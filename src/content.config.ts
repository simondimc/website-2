import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const categories = {
  ilustracija: 'Ilustracija',
  portreti: 'Portreti',
  skecirka: 'Skecirka',
} as const;

const projects = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['ilustracija', 'skecirka', 'portreti']),
    year: z.number(),
    summary: z.string(),
    // ime datoteke v mapi projekta, npr. "02.jpg"; če ga ni, se uporabi prva slika
    cover: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { projects };
