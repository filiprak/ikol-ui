module.exports = {
    env: {
        browser: true
    },
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
        'semi': ['warn', 'always'],
        'indent': ['error', 4],
        'no-var': 'error',
        'no-unused-vars': 'off',
        'no-undef': 'error',
        'no-console': 'error',
        'no-prototype-builtins': 'off',
        'no-useless-escape': 'off',
        'no-case-declarations': 'off',
        'brace-style': ['error', '1tbs', { allowSingleLine: true }],
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'only-multiline',
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
            files: '**/*.js',
        },
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
