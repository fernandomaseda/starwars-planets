const nextJest = require('next/jest');

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    collectCoverage: true,
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    collectCoverageFrom: ['./**/*.tsx', './**/*.ts'],
    coverageDirectory: "./coverage",
    setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
    moduleNameMapper: {
        // Handle module aliases (this will be automatically configured for you soon)
        '^@config/(.*)$': '<rootDir>/config/$1',
        '^@components/(.*)$': '<rootDir>/components/$1',
        '^@services/(.*)$': '<rootDir>/services/$1',
        '^@layout/(.*)$': '<rootDir>/layout/$1',
        '^@utils/(.*)$': '<rootDir>/utils/$1',
        '^@assets/(.*)$': '<rootDir>/assets/$1',
    },
    testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);