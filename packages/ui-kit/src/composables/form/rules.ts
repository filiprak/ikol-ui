import type { IkFieldValidateRule } from '@ui/composables/form/field';
import { isDigitsOnly, isEmail, isHex6, isNumeric, isString, isUrl, isValidPassword } from '@ui/utils/helpers';

export const DEFAULT_RULES: Record<string, IkFieldValidateRule> = {
    required: (val) => {
        return (!val && val !== 0) || (typeof val === 'object' && (val))
            ? '{{_*en*This field cannot be empty._}}'
            : true;
    },
    email: (val) => {
        return !isEmail(isString(val) ? val.trim() : val) ? '{{_*en*Enter correct email address._}}' : true;
    },
    password: (val) => {
        return !isValidPassword(val) ? '{{_*en*Password should consist of at least 8 characters, lower and upper-case letters and digits or special characters._}}' : true;
    },
    url: (val) => {
        return !isUrl(val) ? '{{_*en*Enter valid URL._}}' : true;
    },
    range: (val, params) => {
        const min = params.min;
        const max = params.max;
        return !isNumeric(val) || Number(val) > Number(max) || Number(val) < Number(min)
            ? '{{_*en*Enter values between_}} ' + min + ' {{_*en*and_}} ' + max + '.'
            : true;
    },
    number: (val) => {
        return !isNumeric(val)
            ? '{{_*en*Enter a numeric value._}} {{_*en*Decimal values should be separated by a comma._}}'
            : true;
    },
    digits: (val) => {
        return !isDigitsOnly(val) ? '{{_*en*Enter digits only._}}' : true;
    },
    maxlength: (val, params) => {
        return !isString(val) || val.length > Number(params.maxlength)
            ? '{{_*en*Enter no more than_}} ' + params.maxlength + ' {{_*en*characters._}}'
            : true;
    },
    minlength: (val, params) => {
        return !isString(val) || val.length < Number(params.minlength)
            ? '{{_*en*Enter at least_}} ' + params.minlength + ' {{_*en*characters._}}'
            : true;
    },
    max: (val, params) => {
        return (!isNumeric(val) || Number(val) > Number(params.max))
            ? '{{_*en*Enter value less than or equal to_}} ' + params.max + '.'
            : true;
    },
    min: (val, params) => {
        return (!isNumeric(val) || Number(val) < Number(params.min))
            ? '{{_*en*Enter value greater than or equal to_}} ' + params.min + '.'
            : true;
    },
    step: (val, params) => {
        return (!isNumeric(val) || Number(val) % Number(params.step) !== 0)
            ? '{{_*en*Enter a multiple_}} ' + params.step + '.'
            : true;
    },
    csshexcolor6: (val) => {
        return !isHex6(val) ? '{{_*en*Enter valid RGB color code._}}' : true;
    },
};
