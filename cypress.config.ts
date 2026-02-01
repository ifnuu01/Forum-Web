import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    defaultCommandTimeout: 10000,
    viewportWidth: 1280,
    viewportHeight: 720,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});