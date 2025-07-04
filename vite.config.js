import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const base = '/wordle/'

export default defineConfig({
  plugins: [svelte()],
  base: '/Wordle/',
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
