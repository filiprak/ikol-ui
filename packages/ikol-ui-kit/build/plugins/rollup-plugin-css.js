import { createFilter } from '@rollup/pluginutils'
import { writeFile } from 'fs';

export default function css(options = {}) {
    const styles = {};
    const filter = createFilter(["**/*.css"]);

    return {
        transform: {
            enforce: 'pre',
            handler(code, path) {
                if (!filter(path)) {
                    return;
                } else {
                    styles[path] = code;
                    return '';
                }
            },
        },
        writeBundle: {
            enforce: 'post',
            async handler() {
                return Promise.all(
                    Object.keys(styles).map((path) => {
                        const outfile = path.replace('/src/', '/dist/');
                        console.log(outfile)
                        return new Promise((resolve, reject) => {
                            writeFile(outfile, styles[path], resolve);
                        })
                    })
                )
            },
        },
    }
}
