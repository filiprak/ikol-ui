import { createFilter } from '@rollup/pluginutils'
import { writeFile } from 'fs';
import path from 'path';

export default function css(options = {}) {
    const styles = {};
    const filter = createFilter(["**/*.css"]);

    return {
        name: 'ikol:plugin-css',
        apply: 'build',
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
            async handler(opts, bundle) {
                const outfiles = {};

                Object
                    .keys(bundle)
                    .map((name) => {
                        const original = bundle[name].facadeModuleId;
                        const filename = bundle[name].fileName;

                        if (styles[original]) {
                            outfiles[path.join(opts.dir, filename)] = styles[original];
                        }
                    });

                return Promise.all(
                    Object
                        .keys(outfiles)
                        .map((filename) => {
                            return new Promise((resolve, reject) => {
                                writeFile(filename, outfiles[filename], error => {
                                    if (error) reject(error);
                                    resolve();
                                });
                            })
                        })
                )
            },
        },
    }
}
