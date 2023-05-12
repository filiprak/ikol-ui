import { existsSync } from 'fs';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function useTemplateFile(filename, outputFilepath, variables) {
  const data = await readFile(path.resolve(__dirname, 'templates', filename), 'utf8');
  return useTemplate(data, outputFilepath, variables);
}

export async function useTemplate(templateStr, outputFilepath, variables) {
  const updatedTemplate = templateStr.replace(/\[\[([a-zA-Z0-9_]+)\]\]/g, (match, key) => {
    return variables[key] || match;
  });

  if (!existsSync(path.dirname(outputFilepath))) {
    await mkdir(path.dirname(outputFilepath));
  }
  await writeFile(outputFilepath, updatedTemplate);
}

export const kebabize = str => {
  return str.split('').map((letter, idx) => {
      return letter.toUpperCase() === letter
          ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
          : letter;
  }).join('');
}

export const ROOT_DIR = path.resolve(__dirname, '..');
