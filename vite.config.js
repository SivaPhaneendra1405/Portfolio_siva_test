import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // Using relative base paths './' ensures that the build is relocatable and assets
  // load correctly regardless of whether the site is hosted on a root domain
  // (e.g. siva-qa.com), a user page (siva.github.io), or a project repo path (siva.github.io/portfolio)
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  }
});
