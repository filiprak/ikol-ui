const { isSnakeCase } = require('../utils');

module.exports = {
    meta: {
        type: 'problem',
        schema: [] // no options
    },
    create: function (context) {
        return {
            'Identifier': (node) => {
                const parent = node.parent;
                const name = node.name;

                if (parent && parent.type === 'VariableDeclarator') {
                    const is_func_var = parent.init && parent.init.type === 'FunctionExpression';

                    if (!is_func_var && !isSnakeCase(name)) {
                        context.report({
                            node: node,
                            message: `Variable "${name}" is not valid snake_case|SNAKE_CASE format`
                        });
                    }
                }
            },
        };
    }
};
