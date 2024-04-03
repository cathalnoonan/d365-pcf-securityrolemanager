// @ts-check

/**
 * @type { import('jest').Config }
 */
module.exports = {
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/",
  ],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    // transform files with ts-jest
    "^.+\\.(js|ts)$": ["ts-jest", {
      // allow js in typescript
      allowJs: true,
    }]
  }
};
