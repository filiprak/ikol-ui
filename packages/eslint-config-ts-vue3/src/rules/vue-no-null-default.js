const utils = require('eslint-plugin-vue/lib/utils');
const { capitalize } = require('eslint-plugin-vue/lib/utils/casing');

const NATIVE_TYPES = new Set([
    'String',
    'Number',
    'Boolean',
    'Function',
    'Object',
    'Array',
    'Symbol',
    'BigInt',
]);

function getDefaultNode(propDefValue) {
    return utils.findProperty(propDefValue, 'default');
}

function getValueType(targetNode) {
    const node = utils.skipChainExpression(targetNode);
    switch (node.type) {
        case 'Identifier': {
            if (node.name === 'undefined') {
                return {
                    function: false,
                    type: node.name,
                };
            }
            break;
        }
        case 'CallExpression': {
            // Symbol(), Number() ...
            if (
                node.callee.type === 'Identifier' &&
                NATIVE_TYPES.has(node.callee.name)
            ) {
                return {
                    function: false,
                    type: node.callee.name,
                };
            }
            break;
        }
        case 'TemplateLiteral': {
            // String
            return {
                function: false,
                type: 'String',
            };
        }
        case 'Literal': {
            // String, Boolean, Number
            if (node.value === null && !node.bigint) return null;
            const type = node.bigint ? 'BigInt' : capitalize(typeof node.value);
            if (NATIVE_TYPES.has(type)) {
                return {
                    function: false,
                    type,
                };
            }
            break;
        }
        case 'ArrayExpression': {
            // Array
            return {
                function: false,
                type: 'Array',
            };
        }
        case 'ObjectExpression': {
            // Object
            return {
                function: false,
                type: 'Object',
            };
        }
        case 'FunctionExpression': {
            return {
                function: true,
                expression: false,
                type: 'Function',
                functionBody: node.body,
            };
        }
        case 'ConditionalExpression': {
            const consType = node.consequent ? getValueType(node.consequent) : undefined;
            const alterType = node.alternate ? getValueType(node.alternate) : undefined;

            if (consType === null || alterType === null) {
                return null;
            } else {
                return consType || alterType;
            }
        }
        case 'ArrowFunctionExpression': {
            if (node.expression) {
                const valueType = getValueType(node.body);
                return {
                    function: true,
                    expression: true,
                    type: 'Function',
                    functionBody: node.body,
                    returnType: valueType ? valueType.type : null,
                };
            }

            return {
                function: true,
                expression: false,
                type: 'Function',
                functionBody: node.body,
            };
        }
    }
    return null;
}

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'disallow prop default null value',
            categories: undefined,
        },
        fixable: 'code',
        messages: {
            noNullDefault: 'Props must use `undefined` instead of `null` as default value (Vue does not ensure `null` typesafe).',
        },
    },
    create(context) {
        function processProp(prop, withDefaultsExpressions) {
            if (prop.type === 'object') {
                if (prop.value.type !== 'ObjectExpression') {
                    return;
                }
                const defaultNode = getDefaultNode(prop.value);
                if (!defaultNode) {
                    return;
                }
                verifyDefaultExpression(defaultNode.value);
            } else if (prop.type === 'type') {
                const defaultNode = withDefaultsExpressions && withDefaultsExpressions[prop.propName];
                if (!defaultNode) {
                    return;
                }
                verifyDefaultExpression(defaultNode);
            }
        }

        function processProps(props, withDefaultsExpressions) {
            for (const prop of props) {
                processProp(prop, withDefaultsExpressions);
            }
        }

        function verifyDefaultExpression(defaultNode) {
            const type = getValueType(defaultNode);

            if (type === null || type?.returnType === null) {
                context.report({
                    node: defaultNode,
                    messageId: 'noNullDefault',
                });
            }
        }
        return utils.compositingVisitors(
            utils.executeOnVueComponent(context, (obj) => {
                processProps(utils.getComponentPropsFromOptions(obj));
            }),
            utils.defineScriptSetupVisitor(context, {
                onDefinePropsEnter(node, props) {
                    processProps(props, utils.getWithDefaultsPropExpressions(node));
                },
            })
        );
    },
};
