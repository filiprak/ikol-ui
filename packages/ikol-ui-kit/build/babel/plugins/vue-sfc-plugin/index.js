const { parse, compileTemplate, compileScript } = require('@vue/compiler-sfc')

module.exports = function () {
    return {
        parserOverride(code, opts) {
            const { descriptor } = parse(code)
            console.log(descriptor);
            return code;
        },
    };
};
