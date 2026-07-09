import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

/* Which files under public/images actually exist, resolved at build time.
   images.ts uses this to point <img src> straight at the Unsplash fallback
   when the local file is missing — without it, every missing image costs a
   404 round-trip before the fallback even starts loading (slow first paint,
   especially on mobile). Restart the dev server after adding real photos. */
function listImages(dir: string, prefix = ''): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? listImages(path.join(dir, e.name), `${prefix}${e.name}/`)
      : [`${prefix}${e.name}`],
  )
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Relative base: the built site works from any origin/subpath
  // (GitHub Pages project page today, custom domain later).
  base: './',
  define: {
    __LOCAL_IMAGES__: JSON.stringify(listImages(path.resolve(__dirname, 'public/images'))),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
