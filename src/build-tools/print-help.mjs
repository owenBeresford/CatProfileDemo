console.log("All the following commands should be prefixed with 'npm run ':");
const text = {
  help: { cmd: "help", english: "prints this large block of text" },
  app: {
    cmd: "app",
    english: "runs the App/ service, doesn't print many messages ",
  },
  " - ": { cmd: "start", english: "same" },
  " -  ": {
    cmd: "stayup:app",
    english: "Launches App inside nodemon, same as above",
  },
  stop: {
    cmd: "stop",
    english: "When the service was started normaly this can stop it tidily.",
  },
  init: {
    cmd: "init",
    english:
      "TO COME, ensure all attached tooling has been configured.  This manual step is to reduce the number of files in repo",
  },

  "build:app": {
    cmd: "build:app",
    english: "builds both FE and BE, errors to terminal",
  },
  "build:client": { cmd: "build:client", english: "just builds the FE" },
  "build:server": { cmd: "build:server", english: "just builds the BE" },

  lint: {
    cmd: "lint",
    english: "Runs the standard tidy command, and standard reformatter",
  },
  "build:docs": {
    cmd: "build:docs",
    english: "generates HTML docs from the source",
  },
  docs: {
    cmd: "docs",
    english: "Runs a mininal webserver to host the docs on localhost",
  },

  "test:app": {
    cmd: "test:app",
    english: "Runs all the following test scripts... ",
  },
  vitest: { cmd: "vitest", english: "Run the tests written in vitest." },
  "vitest:ui": {
    cmd: "vitest:ui",
    english: "Launch the vitest GUI (and run tests).",
  },
  jest: {
    cmd: "jest",
    english: "Runs tests written for Jest (API test mostly)",
  },
  storybook: {
    cmd: "test:storybook",
    english: "Runs tests written in Storybook",
  },
  " -   ": {
    cmd: "build:storybook",
    english: "Builds tests (only when adding more storybook tests)",
  },
};
console.table(text);
