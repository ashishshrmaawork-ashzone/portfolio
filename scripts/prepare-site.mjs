import { cp, mkdir } from 'node:fs/promises';
// html/ is the editable source for the deployed design.
await mkdir(new URL('../public/original/', import.meta.url), { recursive: true });
await cp(new URL('../html/', import.meta.url), new URL('../public/original/', import.meta.url), { recursive: true });
