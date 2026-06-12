/*
 * Build the CDN/npm distributables for highlightjs-jac.
 *
 * Mirrors the way the official highlight.js CDN process packages a third-party
 * grammar: rollup wraps src/languages/jac.js as an IIFE that exposes the
 * language function, then terser minifies it. Two artifacts are produced:
 *
 *   dist/jac.min.js      browser IIFE that auto-registers with a global `hljs`
 *   dist/jac.es.min.js   ES module that default-exports the language function
 *
 * Run with: npm run build
 */
import { rollup } from 'rollup';
import { minify } from 'terser';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const require = createRequire(import.meta.url);

const LANGUAGE = 'jac';
const ENTRY = path.join(root, 'src', 'languages', `${LANGUAGE}.js`);
const DIST = path.join(root, 'dist');

// Match the highlight.js CDN terser settings so output is byte-comparable.
const TERSER_OPTIONS = {
  format: { max_line_len: 80, ascii_only: true },
  compress: {
    ecma: 2015,
    unsafe_arrows: true,
    passes: 2,
    unsafe: true,
    dead_code: true,
    toplevel: 'funcs'
  }
};

async function bundle() {
  const hljsVersion = require('highlight.js/package.json').version;
  const header = `/*! \`${LANGUAGE}\` grammar compiled for Highlight.js ${hljsVersion} */`;

  const build = await rollup({ input: ENTRY });
  const { output } = await build.generate({
    format: 'iife',
    name: 'hljsGrammar',
    footer: null
  });
  await build.close();
  const code = output[0].code;

  const iife = `${header}
(function(){
  ${code}
  hljs.registerLanguage('${LANGUAGE}', hljsGrammar);
})();`;
  const esm = `${header}\n${code};\nexport default hljsGrammar;`;

  return { header, iife, esm };
}

async function main() {
  const { iife, esm } = await bundle();

  const miniIIFE = await minify(iife, TERSER_OPTIONS);
  const miniESM = await minify(esm, { ...TERSER_OPTIONS, module: true });

  await fs.mkdir(DIST, { recursive: true });
  await fs.writeFile(path.join(DIST, `${LANGUAGE}.min.js`), miniIIFE.code);
  await fs.writeFile(path.join(DIST, `${LANGUAGE}.es.min.js`), miniESM.code);

  console.log(`Wrote dist/${LANGUAGE}.min.js (${miniIIFE.code.length} bytes)`);
  console.log(`Wrote dist/${LANGUAGE}.es.min.js (${miniESM.code.length} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
