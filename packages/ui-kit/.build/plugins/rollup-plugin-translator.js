import { createFilter } from '@rollup/pluginutils';

const getSfcTemplateLocation = (source) => {
    source = (source || '').toString();

    const regex = /<\/?(template)(.*?)>/gi;

    let match = null;
    let tags = [];

    source = source.replace(/<script(.*?)>([\s\S]*?)<\/script>/gim, match => ' '.repeat(match.length));
    source = source.replace(/<style(.*?)>([\s\S]*?)<\/style>/gim, match => ' '.repeat(match.length));

    while ((match = regex.exec(source)) !== null) {
        tags.push(match.index);
    }

    return tags.length > 1 ? { start: tags[0], end: tags[tags.length - 1] } : false;
}

export default function translator(options = {}) {
    const filter = createFilter(options.include, options.exclude);

    return {
        name: 'ikol:plugin-translator',
        transform: {
            enforce: 'pre',
            handler(code, path) {
                if (!filter(path)) {
                    return;
                } else {
                    if (path.slice(-4) == '.vue') {
                        const t_loc = getSfcTemplateLocation(code);

                        if (t_loc) {
                            let template = code.slice(t_loc.start, t_loc.end);
                            template = template.replace(/\[\[_(.*?)_\]\]/g, (match, str) => `{{_${str}_}}`);
                            code = [code.slice(0, t_loc.start), template, code.slice(t_loc.end)].join('');
                        }
                    }
                    code = code.replace(/\{\{_(\*[a-zA-Z]{2,4}\*)?(.*?)_\}\}/g, '$2');

                    return code;
                }
            },
        },
    }
}
