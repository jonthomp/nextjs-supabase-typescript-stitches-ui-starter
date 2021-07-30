/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
  verbose: true,
  testRegex: "((\\.|/*.)(spec|test))\\.tsx?$",
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/cypress/",
    "<rootDir>/node_modules/",
  ],

  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/__mocks__/cssTransform.js",
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "jest-extended",
    "jest-localstorage-mock",
    "<rootDir>/jest.setup.ts",
  ],
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js",
  },
  globals: {
    window: {},
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.jest.json",
    },
  },
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};

module.exports = config;
