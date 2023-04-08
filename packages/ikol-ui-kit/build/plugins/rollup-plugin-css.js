import { createFilter } from '@rollup/pluginutils'

export default function css(options = {}) {
    const styles = {};
    const filter = createFilter(["**/*.css"]);
    return {
        // enforce: 'pre',
        // apply: 'build',

        transform(code, path) {
            if (!filter(path)) {
                return;
            } else {
                styles[path] = code;
                console.log(path)
                return 'body { color: red; }';
            }
        },
        // generateBundle() {
        //     // console.log(styles)
        //     /* Outputs css files doesn't touch js files */
        //     return Promise.all(Object.keys(styles).map((key) => {
        //         /* Output the files to their directory in dist */
        //         /* basically fileName.replace("src", "dist")
        //            writeFileSync Each File
        //          */
        //     }))
        // },
    }
}
