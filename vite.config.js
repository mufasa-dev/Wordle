import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const base = '/wordle/'

export default defineConfig({
  plugins: [svelte()],
  base: '/wordle/',
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
