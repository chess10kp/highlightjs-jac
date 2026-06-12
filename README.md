# highlightjs-jac

Jac language definition for [highlight.js](https://highlightjs.org/).

The grammar is modeled after the upstream `python.js` definition and covers Jac-specific
constructs including archetypes, edge operators, block comments, and f-strings.

## Layout

```
.
├── src/
│   └── languages/
│       └── jac.js           # Jac language definition
├── test/
│   ├── index.js             # test runner
│   ├── detect/
│   │   └── jac/
│   │       ├── default.txt  # detection sample
│   │       └── tricky.txt
│   └── markup/
│       └── jac/
│           ├── keywords.txt
│           ├── keywords.expect.txt
│           ├── numbers.txt
│           ├── numbers.expect.txt
│           └── ... (many more coverage tests)
└── jac.spec                 # formal grammar reference
```

## Install

Not published yet. Once shipped:

```bash
npm install highlightjs-jac
```

```js
import hljs from 'highlight.js';
import jac from 'highlightjs-jac';

hljs.registerLanguage('jac', jac);
```

## File extension

`.jac`

## License

BSD-3-Clause
