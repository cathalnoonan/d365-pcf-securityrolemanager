module.exports = {
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
