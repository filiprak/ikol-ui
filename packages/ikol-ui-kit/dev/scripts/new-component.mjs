import inquirer from 'inquirer';
import path from 'path';
import { useTemplate, useTemplateFile, ROOT_DIR } from '../utils.mjs';
import { kebabize } from '../utils.mjs';

inquirer
    .prompt([
        {
            type: 'input',
            name: 'componentName',
            message: 'What is the name of component to generate?',
            validate (input) {
                return !!(input || '').trim();
            },
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
    ])
    .then(answers => {
        const name = answers.componentName;
        
        useTemplateFile('component.vue', path.resolve(ROOT_DIR, `src/components/${name}/${name}.vue`), {
            NAME: name,
            NAME_KEBAB: kebabize(name),
        });
        useTemplate('', path.resolve(ROOT_DIR, `src/components/${name}/${name}.css`), {
            NAME: name,
            NAME_KEBAB: kebabize(name),
        });
        useTemplate('', path.resolve(ROOT_DIR, `src/components/${name}/index.ts`), {
            NAME: name,
            NAME_KEBAB: kebabize(name),
        });
    });
