module.exports = {
    extends: 'stylelint-config-recommended',
    rules: {
        'no-descending-specificity': null,
        'no-empty-source': null,
        'font-family-no-missing-generic-family-keyword': null,
        'selector-class-pattern': /^ik-((-?[a-z0-9]+)+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$/,
    },
}
