# highlightjs-jac

Jac language definition for [highlight.js](https://highlightjs.org/).

> Scaffold-only. The language grammar in `src/languages/jac.js` is a skeleton modeled after
> the upstream `python.js` definition. Flesh out the keyword, string, and number modes
> before publishing.

## Layout

```
.
├── src/
│   └── languages/
│       └── jac.js           # Jac language definition
└── test/
    ├── detect/
    │   └── jac/
    │       └── default.txt  # detection sample
    └── markup/
        └── jac/
            ├── keywords.txt
            ├── keywords.expect.txt
            ├── numbers.txt
            └── numbers.expect.txt
```

## Install

Not published yet. Once shipped:

```bash
npm install highlightjs-jac
```

```js
const hljs = require('highlight.js');
const jac  = require('highlightjs-jac');

hljs.registerLanguage('jac', jac);
```

## File extension

`.jac`

## License

BSD-3-Clause
