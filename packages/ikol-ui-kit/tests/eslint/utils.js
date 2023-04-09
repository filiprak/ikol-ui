const lower_snakecase_regex = new RegExp(/^[_$]?[a-z0-9]+(_[a-z0-9]+)*$/);
const upper_snakecase_regex = new RegExp(/^[_$]?[A-Z0-9]+(_[A-Z0-9]+)*$/);
const pascalcase_regex = new RegExp(/^([A-Z][a-z0-9]*)+$/);
const camelcase_regex = new RegExp(/^([a-z0-9]+)(([A-Z][a-z0-9]*)+)?$/);

module.exports = {
    isSnakeCase: function (string) {
        return string.match(lower_snakecase_regex) || string.match(upper_snakecase_regex);
    },
    isPascalCase: (string) => {
        return string.match(pascalcase_regex);
    },
    isCamelCase: (string) => {
        return string.match(camelcase_regex)
    },
    testRegex: (string, regexes) => {
        if (!Array.isArray(regexes)) {
            regexes = [regexes];
        }
        for (let i = 0; i < regexes.length; i++) {
            if (regexes[i].test(string)) {
                return true;
            }
        }
        return false;
    }
};
