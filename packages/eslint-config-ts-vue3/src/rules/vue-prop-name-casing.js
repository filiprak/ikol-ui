const utils = require('eslint-plugin-vue/lib/utils');
const casing = require('eslint-plugin-vue/lib/utils/casing');
const allowedCaseOptions = ['camelCase', 'snake_case'];

function create(context) {
    const options = context.options[0];
    const caseType = allowedCaseOptions.includes(options) ? options : 'camelCase';
    const checker = casing.getChecker(caseType);

    function processProps(props) {
        for (const item of props) {
            const propName = item.propName;
            if (propName == null) {
                continue;
            }
            if (propName == 'modelValue') {
                continue;
            }
            if (!checker(propName)) {
                context.report({
                    node: item.node,
                    messageId: 'invalidCase',
                    data: {
                        name: propName,
                        caseType,
                    },
                });
            }
        }
    }
    return utils.compositingVisitors(
        utils.defineScriptSetupVisitor(context, {
            onDefinePropsEnter(_node, props) {
                processProps(props);
            },
        }),
        utils.executeOnVue(context, (obj) => {
            processProps(utils.getComponentPropsFromOptions(obj));
        })
    );
}

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description:
                'enforce specific casing for the Prop name in Vue components',
        },
        fixable: null, // null or "code" or "whitespace"
        schema: [
            {
                enum: allowedCaseOptions,
            },
        ],
        messages: {
            invalidCase: 'Prop "{{name}}" is not in {{caseType}}.',
        },
    },
    create,
};
