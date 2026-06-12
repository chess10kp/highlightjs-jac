# highlightjs-jac

[Jac](https://www.jac-lang.org) language definition for [highlight.js](https://highlightjs.org/).

The grammar is modeled after the upstream `python.js` definition and covers Jac-specific
constructs including archetypes, edge/connect operators, block comments, f-strings, JSX,
decorators, and Object-Spatial Programming keywords.

## Install

### npm

```bash
npm install highlightjs-jac
```

```js
import hljs from 'highlight.js';
import jac from 'highlightjs-jac';

hljs.registerLanguage('jac', jac);

const html = hljs.highlight(code, { language: 'jac' }).value;
```

### Browser / CDN

The prebuilt `dist/jac.min.js` registers itself against a global `hljs`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/styles/default.min.css">
<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/highlight.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/highlightjs-jac/dist/jac.min.js"></script>
<script>hljs.highlightAll();</script>
```

## File extension

`.jac`

## Development

```bash
npm install      # install dev dependencies
npm test         # run markup + auto-detect tests
npm run build    # regenerate dist/jac.min.js and dist/jac.es.min.js
```

Tests live under `test/`. Markup tests pair a `*.txt` source with a `*.expect.txt`
snapshot of the produced HTML; detect tests live in `test/detect/jac/`.

## Layout

```
.
├── src/
│   └── languages/
│       └── jac.js           # Jac language definition
├── dist/
│   ├── jac.min.js           # browser IIFE (auto-registers with global hljs)
│   └── jac.es.min.js        # minified ES module
├── tools/
│   └── build.js             # rollup + terser build for dist/
├── test/
│   ├── index.js             # test runner
│   ├── detect/jac/          # auto-detection samples
│   └── markup/jac/          # markup coverage tests (*.txt + *.expect.txt)
├── jac.spec                 # formal grammar reference
└── LICENSE
```

## License

BSD-3-Clause — see [LICENSE](./LICENSE).
