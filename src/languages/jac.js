/*
Language: Jac
Description: Jac is an AI-native, full-stack programming language with Python-like semantics and C-style braces. It compiles to Python bytecode, JavaScript, and native machine code.
Website: https://www.jac-lang.org
Category: common
*/

/** @type LanguageFn */
export default function(hljs) {
  const regex = hljs.regex;

  // TODO: confirm exact identifier rules. Python uses Unicode XID; Jac is
  // currently ASCII-only on the implementations we target.
  const IDENT_RE = /[A-Za-z_][A-Za-z0-9_]*/;

  // TODO: fill in from the Jac language reference.
  const RESERVED_WORDS = [
    // archetypes
    'obj',
    'node',
    'edge',
    'walker',
    'class',
    'enum',
    // abilities
    'can',
    'def',
    'init',
    'postinit',
    // access modifiers
    'pub',
    'priv',
    'protect',
    'static',
    'override',
    'abs',
    // control flow
    'if',
    'elif',
    'else',
    'while',
    'for',
    'match',
    'case',
    'switch',
    'default',
    // OSP
    'visit',
    'disengage',
    'spawn',
    'here',
    'root',
    'visitor',
    'entry',
    'exit',
    // AI / integration
    'sem',
    'by',
    // module / exception
    'with',
    'import',
    'from',
    'as',
    'in',
    'is',
    'and',
    'or',
    'not',
    'return',
    'raise',
    'try',
    'except',
    'finally',
    'break',
    'continue',
    'pass',
    'del',
    'global',
    'nonlocal',
    'lambda',
    'yield',
    'async',
    'await'
  ];

  // TODO: enumerate built-ins shipped with the standard library.
  const BUILT_INS = [];

  // TODO: confirm the set of literal constants.
  const LITERALS = [
    'True',
    'False',
    'None'
  ];

  // TODO: collect the core type names exposed by the type system.
  const TYPES = [
    'int',
    'float',
    'complex',
    'str',
    'bytes',
    'bool',
    'list',
    'tuple',
    'set',
    'frozenset',
    'dict',
    'any',
    'Self'
  ];

  const KEYWORDS = {
    $pattern: /[A-Za-z_]\w*/,
    keyword: RESERVED_WORDS,
    built_in: BUILT_INS,
    literal: LITERALS,
    type: TYPES
  };

  // TODO: support `#* ... *#` block comments in addition to single-line `#`.
  const COMMENT = hljs.COMMENT(
    /#/,
    /$/,
    { relevance: 0 }
  );

  // TODO: triple-quoted strings, f-strings, raw/byte prefixes, brace
  // substitution `f"...{expr}..."`.
  const STRING = {
    className: 'string',
    contains: [ hljs.BACKSLASH_ESCAPE ],
    variants: [
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };

  // TODO: hex / octal / binary / float / scientific / underscore separators.
  const NUMBER = {
    className: 'number',
    relevance: 0,
    variants: [
      { begin: /\b\d+\b/ },
      { begin: /\.\d+/ },
      { begin: /\b\d+\.\d+/ }
    ]
  };

  const PARAMS = {
    className: 'params',
    variants: [
      {
        className: '',
        begin: /\(\s*\)/,
        skip: true
      },
      {
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          'self',
          NUMBER,
          STRING,
          COMMENT
        ]
      }
    ]
  };

  return {
    name: 'Jac',
    aliases: [
      'jac'
    ],
    keywords: KEYWORDS,
    // C-style braces + semicolons are valid (and common) Jac syntax;
    // keep this open while the grammar is fleshed out.
    illegal: /<\//,
    contains: [
      NUMBER,
      {
        scope: 'variable.language',
        match: /\bself\b/
      },
      STRING,
      COMMENT,
      {
        // `def name(...)` and `can name(...)`
        match: [
          /\b(?:def|can)\b/, /\s+/,
          IDENT_RE
        ],
        scope: {
          1: 'keyword',
          3: 'title.function'
        },
        contains: [ PARAMS ]
      },
      {
        variants: [
          {
            match: [
              /\b(?:obj|class|node|edge|walker|enum)\b/, /\s+/,
              IDENT_RE
            ]
          }
        ],
        scope: {
          1: 'keyword',
          3: 'title.class'
        }
      }
    ]
  };
}
