// Solution from https://github.com/vuejs/core/issues/8301
// @todo remove after the issue is resolved
require('@vue/compiler-sfc').registerTS(() => require('typescript'));
module.exports = require('@vue/vue3-jest');
