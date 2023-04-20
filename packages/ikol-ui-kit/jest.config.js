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
    moduleNameMapper: {
        '^@/tests/(.*)$': '<rootDir>/tests/$1',
        '^@/(.*)$': '<rootDir>/src/$1',
        '^.*\\.css$': 'identity-obj-proxy',
    },
    transform: {
        '^.*\\.ts$': 'ts-jest',
        '^.*\\.js$': 'babel-jest',
        '^.*\\.vue$': '@vue/vue3-jest',
    },
    // collectCoverageFrom: [
    //     'src/**/*.{ts,js,vue}',
    //     '!**/*.d.ts',
    // ],
}
