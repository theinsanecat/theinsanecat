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

// GitHub Pages fallback: emits 404.html (same head, so link previews still work) that sends any
// unknown path back to the app as ?p=<path>. Handles the live site and the /preview/ copy.
function spaFallback() {
  let base = '/'
  return {
    name: 'spa-404-fallback',
    enforce: 'post',
    apply: 'build',
    configResolved(config) {
      base = config.base
    },
    generateBundle(_opts, bundle) {
      const index = bundle['index.html']
      if (!index) return
      const siteRoot = base.replace(/preview\/$/, '')
      const script = `<script>(function(){var l=location,p=l.pathname,r=${JSON.stringify(siteRoot)};` +
        `var b=p.indexOf(r+'preview/')===0?r+'preview/':r;if(p.indexOf(b)!==0)return;` +
        `l.replace(b+'?p='+encodeURIComponent(p.slice(b.length))+l.hash);})();</script>`
      const html = String(index.source).replace('<head>', '<head>\n    ' + script)
      this.emitFile({ type: 'asset', fileName: '404.html', source: html })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/theinsanecat/',
  plugins: [react(), preloadFonts(/assets\/(questrial|mileast)-(?!italic)/), spaFallback()],
})
