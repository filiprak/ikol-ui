module.exports = {
    extends: [require('@ikol/eslint-config-ts-vue3/extend')],
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
}
