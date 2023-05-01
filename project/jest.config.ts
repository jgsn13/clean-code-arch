export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coveragePathIgnorePatterns: ['index.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
