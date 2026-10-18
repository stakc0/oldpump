import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api/paper/feed': {
        target: 'https://usepaper.app',
        changeOrigin: true,
        secure: true,
      },
      '/api/paper/dex': {
        target: 'https://api.dexscreener.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/paper\/dex/, '/latest/dex/tokens'),
      },
    },
  },
});
