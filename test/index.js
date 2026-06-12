import fs from 'fs';
import { glob } from 'glob';
import path from 'path';
import { fileURLToPath } from 'url';
import hljs from 'highlight.js';
import jac from '../src/languages/jac.js';

const { promises: fsp } = fs;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

hljs.registerLanguage('jac', jac.default || jac);
hljs.debugMode();

function buildPath(...args) {
  return path.join(__dirname, ...args);
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    console.error('Assertion failed:', message);
    console.error('Expected:', expected);
    console.error('Actual:', actual);
    throw new Error(message);
  }
}

async function runMarkupTests() {
  const markupPath = buildPath('markup', 'jac', '*.expect.txt');
  const filenames = glob.sync(markupPath, { windowsPathsNoEscape: true });

  if (filenames.length === 0) {
    console.log('No markup tests found.');
    return;
  }

  for (const filename of filenames) {
    const testName = path.basename(filename, '.expect.txt');
    const sourceName = filename.replace(/\.expect/, '');

    const source = await fsp.readFile(sourceName, 'utf-8');
    const expected = await fsp.readFile(filename, 'utf-8');
    const actual = hljs.highlight(source, { language: 'jac' }).value;

    assertEqual(actual.trim(), expected.trim(), `markup test failed: ${testName}`);
    console.log(`✓ markup ${testName}`);
  }
}

async function runDetectTests() {
  const detectPath = buildPath('detect', 'jac');
  const dir = await fsp.stat(detectPath);
  if (!dir.isDirectory()) {
    throw new Error('Detect directory not found');
  }

  const filenames = (await fsp.readdir(detectPath))
    .filter(fn => fn !== '.DS_Store');

  for (const example of filenames) {
    const filename = path.join(detectPath, example);
    const content = await fsp.readFile(filename, 'utf-8');
    const detectedLanguage = hljs.highlightAuto(content).language;

    assertEqual(detectedLanguage, 'jac', `detect test failed: ${example} should be detected as jac, but was ${detectedLanguage}`);
    console.log(`✓ detect ${example}`);
  }
}

async function main() {
  console.log('Running Jac language tests...\n');
  try {
    await runMarkupTests();
    await runDetectTests();
    console.log('\nAll tests passed!');
    process.exit(0);
  } catch (err) {
    console.error('\nTest run failed:', err.message);
    process.exit(1);
  }
}

main();
