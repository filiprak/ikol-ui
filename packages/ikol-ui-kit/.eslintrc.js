module.exports = {
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        extraFileExtensions: ['.vue'],
    },
    extends: [
        'standard',
        'plugin:vue/vue3-recommended',
    ],
    rules: {
        'no-console': 'error',
        'semi': 'off',
        'indent': ['error', 4],
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'never',
        }],
        'space-before-function-paren': 'off',
        'camelcase': 'off',
        'ik-variables-case': 'error',
    },
    plugins: [
        '@typescript-eslint',
    ],
    overrides: [
        {
            files: '**/*.ts',
            rules: {
                '@typescript-eslint/quotes': ['error', 'single', {
                    avoidEscape: true,
                    allowTemplateLiterals: true,
                }],
            },
        },
        {
            files: '**/*.vue',
            rules: {
                'vue/html-indent': ['error', 4],
                'vue/html-self-closing': 'off',
                'vue/first-attribute-linebreak': 'off',
                'vue/html-closing-bracket-newline': 'off',
            },
        },
        {
            files: '**/*.test.ts',
            env: {
                'jest/globals': true,
            },
            plugins: ['jest'],
            extends: ['plugin:jest/recommended'],
        }
    ],
}
