import type { Config } from 'jest';
const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest', // Use vue3-jest to transform .vue files
    '^.+\\.(t|j)s$': 'ts-jest',     // Use ts-jest for TypeScript files
  },
  moduleFileExtensions: ['js', 'ts', 'vue'],
};

export default config;
// export default {
//   preset: 'ts-jest',
//   transform: {
//     '^.+\\.vue$': 'vue-jest',
//     '^.+\\.ts$': 'ts-jest',
//   },
//   testEnvironment: 'jest-environment-jsdom',
//   moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/$1',
//     '^~/(.*)$': '<rootDir>/$1',
//   },
//   collectCoverage: true,
//   collectCoverageFrom: [
//     'components/**/*.vue',
//     'pages/**/*.vue',
//     'layouts/**/*.vue',
//     'store/**/*.ts',
//     'composables/**/*.ts',
//   ],
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], 
// };
