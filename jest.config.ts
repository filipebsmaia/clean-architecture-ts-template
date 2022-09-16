import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',

    '!<rootDir>/src/adapters/controllers/ControllerAdapter.ts',
    '!<rootDir>/src/adapters/controllers/helpers/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/external/mappers/*.ts',
    '!<rootDir>/src/**/shared/**/*.ts',
    '!<rootDir>/src/**/ports/**/*.ts',
    '!<rootDir>/src/**/errors/*.ts'
  ],
  coverageProvider: 'v8',
  testMatch: [
    '**/?(*.)+(spec|test).[tj]s?(x)'
  ],
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  })

  // Whether to use watchman for file crawling
  // watchman: true,
};
