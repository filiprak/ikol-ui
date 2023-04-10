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
    plugins: [
        '@typescript-eslint',
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
        'prefer-regex-literals': 'off',
        'ik-variables-case': 'error',
    },
    overrides: [
        {
            files: '**/*.js',
        },
        {
            files: '**/*.{ts,vue}',
            rules: {
                'no-redeclare': 'off', // handled by tsc
                '@typescript-eslint/member-ordering': 'error',
                '@typescript-eslint/type-annotation-spacing': 'error',
                '@typescript-eslint/no-inferrable-types': 'error',
                '@typescript-eslint/unified-signatures': 'error',
                '@typescript-eslint/no-invalid-this': 'error',
                '@typescript-eslint/consistent-type-imports': 'error',
                '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
                '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
            },
        },
        {
            files: '**/*.vue',
            rules: {
                'vue/html-indent': ['error', 4],
                'vue/html-self-closing': 'off',
                'vue/first-attribute-linebreak': 'off',
                'vue/html-closing-bracket-newline': 'off',
                'vue/prop-name-casing': 'off',
            },
        },
        {
            files: './tests/**/*.ts',
            rules: {
                'ik-variables-case': 'off'
            },
        },
        {
            files: './tests/**/*.test.ts',
            env: {
                'jest/globals': true,
            },
            plugins: ['jest'],
            extends: ['plugin:jest/recommended'],
        },
    ],
}
