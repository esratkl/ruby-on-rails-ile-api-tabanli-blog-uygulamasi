const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    video: true,               // 🔥 Bu satır önemli
    videosFolder: "cypress/videos",
    screenshotsFolder: "cypress/screenshots",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
