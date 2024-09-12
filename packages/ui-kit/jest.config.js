module.exports = {
    rootDir: './',
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        customExportConditions: ['node', 'node-addons'],
    },
    testMatch: [
        '<rootDir>/tests/**/*.test.ts',
    ],
    moduleFileExtensions: [
        'vue',
        'ts',
        'js',
    ],
    moduleDirectories: [
        'node_modules',
    ],
    setupFilesAfterEnv: [
        './jest.setup.js',
    ],
    moduleNameMapper: {
        '^@ui/tests/(.*)$': '<rootDir>/tests/$1',
        '^@ui/(.*)$': '<rootDir>/src/$1',
        '^.*\\.css$': 'identity-obj-proxy',
    },
    transform: {
        '^.*\\.ts$': ['ts-jest', { diagnostics: { exclude: ['**'] } }],
        '^.*\\.js$': 'babel-jest',
        // '^.*\\.vue$': '@vue/vue3-jest',
        // Solution from https://github.com/vuejs/core/issues/8301
        // @todo remove after the issue is resolved
        "^.+\\.vue$": "./tests/vue3JestHack.js",
    },
    // collectCoverageFrom: [
    //     'src/**/*.{ts,js,vue}',
    //     '!**/*.d.ts',
    // ],
}
