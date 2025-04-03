import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@styles/(.*)$': '<rootDir>/src/styles/$1',
        // CSS modules
        '\\.(scss|sass|css)$': 'identity-obj-proxy',
    },
    testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }],
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
};

export default config;
