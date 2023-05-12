import inquirer from 'inquirer';
import path from 'path';
import { useTemplate, useTemplateFile, ROOT_DIR } from '../utils.mjs';
import { kebabize } from '../utils.mjs';

const arg_name = process.argv[2];
const questions = [
    {
        type: 'input',
        name: 'componentName',
        message: 'What is the name of component to generate?',
        validate (input) {
            return !!(input || '').trim();
        },
        _skip: arg_name,
    },
    {
        type: 'list',
        name: 'renderType',
        message: 'What component render type to generate?',
        choices: [
            'Template',
            'Render function',
        ],
    },
].filter(i => !i._skip);

inquirer
    .prompt(questions)
    .then(async answers => {
        const name = answers.componentName || arg_name;
        const template = answers.renderType == 'Template' ? 'component-tpl.vue' : 'component-rdr.vue';
        
        await useTemplateFile(template, path.resolve(ROOT_DIR, `src/components/${name}/${name}.vue`), {
            NAME: name,
            NAME_KEBAB: kebabize(name),
        });

        const css = `.${kebabize(name)} {}\n`;
        await useTemplate(css, path.resolve(ROOT_DIR, `src/components/${name}/${name}.css`), {
            NAME: name,
            NAME_KEBAB: kebabize(name),
        });

        const index = `import ${name} from './${name}.vue';\nexport { ${name} };\n`;
        await useTemplate(index, path.resolve(ROOT_DIR, `src/components/${name}/index.ts`), {
            NAME: name,
            NAME_KEBAB: kebabize(name),
        });

        console.log(`Generated new component: ${name}`);
    });
