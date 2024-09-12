module.exports = {
    env: {
        browser: true
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
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
        'eqeqeq': 'off',
        'semi': ['warn', 'always'],
        'indent': ['error', 4, {
            SwitchCase: 1,
            ignoredNodes: ['ClassBody.body > PropertyDefinition[decorators.length>0] > Identifier'],
        }],
        'no-var': 'error',
        'no-unused-vars': 'off',
        'no-undef': 'off',
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
        'func-call-spacing': 'off',
        'prefer-arrow-callback': 'error',
        'prefer-regex-literals': 'off',
    },
    overrides: [
        {
            files: '**/*.js',
        },
        {
            files: '**/*.{ts,vue}',
            rules: {
                'no-redeclare': 'off', // handled by tsc
                'no-use-before-define': 'off', // handled by tsc
                '@typescript-eslint/func-call-spacing': 'error',
                '@typescript-eslint/unified-signatures': 'off',
                '@typescript-eslint/member-ordering': 'off',
                '@typescript-eslint/type-annotation-spacing': 'error',
                '@typescript-eslint/no-inferrable-types': 'error',
                '@typescript-eslint/unified-signatures': 'error',
                '@typescript-eslint/no-invalid-this': 'error',
                '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
                '@typescript-eslint/consistent-type-imports': 'error',
                '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
                '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
                '@typescript-eslint/naming-convention': ['error',
                    {
                        selector: 'variable',
                        format: ['snake_case', 'UPPER_CASE'],
                        types: ['array', 'boolean', 'number', 'string'],
                    },
                    {
                        selector: ['class', 'interface', 'typeAlias', 'enum'],
                        prefix: ['Ik', 'HTML'],
                        format: ['PascalCase'],
                    },
                ],
            },
        },
        {
            files: '**/*.vue',
            rules: {
                'vue/html-indent': ['error', 4],
                'vue/html-self-closing': 'off',
                'vue/v-on-event-hyphenation': 'off',
                'vue/first-attribute-linebreak': 'off',
                'vue/html-closing-bracket-newline': 'off',
                'vue/this-in-template': 'error',
                'vue/require-default-prop': 'off',
                'vue/require-valid-default-prop': 'error',
                'vue/require-explicit-emits': 'off',
                'vue/order-in-components': 'off',
                'vue/prop-name-casing': 'off',
                'vue/multi-word-component-names': 'off',
                'vue-no-null-default': 'error',
                'vue-prop-name-casing': ['error', 'snake_case'],
                '@typescript-eslint/unified-signatures': 'off',
            },
        },
        {
            files: './tests/**/*.test.ts',
            env: {
                'jest/globals': true,
            },
            plugins: ['jest'],
            extends: ['plugin:jest/recommended'],
            rules: {
                '@typescript-eslint/naming-convention': 'off',
            },
        },
        {
            files: './tests/**/*.{ts,vue}',
            rules: {
                '@typescript-eslint/naming-convention': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                'symbol-description': 'off',
                'no-array-constructor': 'off',
                'prefer-arrow-callback': 'off',
                'no-new-func': 'off',
            },
        },
    ],
}
