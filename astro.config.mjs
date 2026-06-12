import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Configuração do Astro utilizando o plugin nativo do Vite para Tailwind CSS v4
// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});