import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Injects <link rel="preload"> for the above-the-fold fonts (hashed build filenames),
// so headings don't flash in a fallback font on first load.
function preloadFonts(match /* RegExp on the emitted file name */) {
  let base = '/'
  return {
    name: 'preload-fonts',
    apply: 'build',
    configResolved(config) {
      base = config.base
    },
    transformIndexHtml(_html, ctx) {
      if (!ctx.bundle) return []
      return Object.keys(ctx.bundle)
        .filter((file) => file.endsWith('.woff2') && match.test(file))
        .map((file) => ({
          tag: 'link',
          attrs: { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: '', href: base + file },
          injectTo: 'head',
        }))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/theinsanecat/',
  plugins: [react(), preloadFonts(/assets\/(questrial|mileast)-(?!italic)/)],
})
