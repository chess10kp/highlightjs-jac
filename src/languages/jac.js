/*
Language: Jac
Description: Jac is an AI-native, full-stack programming language with Python-like semantics and C-style braces. It compiles to Python bytecode, JavaScript, and native machine code.
Website: https://www.jac-lang.org
Category: common
*/

/** @type LanguageFn */
export default function(hljs) {
  const regex = hljs.regex;
  const IDENT_RE = /[\p{XID_Start}_]\p{XID_Continue}*/u;

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
    // access modifiers / qualifiers
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
    // OSP (Object-Spatial Programming)
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
    'await',
    'awaiting',
    // module qualifiers
    'to',
    'cl',
    'sv',
    'na',
    // declarations
    'glob',
    'has',
    'include',
    'test',
    'report',
    'skip',
    'assert',
    'delete',
    'flow',
    'wait',
    'impl'
  ];

  // Python built-ins Jac inherits since it compiles to Python.
  const BUILT_INS = [
    '__import__',
    'all',
    'any',
    'ascii',
    'bin',
    'bool',
    'breakpoint',
    'bytearray',
    'bytes',
    'callable',
    'chr',
    'classmethod',
    'compile',
    'delattr',
    'dict',
    'dir',
    'divmod',
    'enumerate',
    'eval',
    'exec',
    'filter',
    'format',
    'getattr',
    'globals',
    'hasattr',
    'hash',
    'help',
    'id',
    'input',
    'isinstance',
    'issubclass',
    'iter',
    'len',
    'list',
    'locals',
    'map',
    'max',
    'min',
    'next',
    'object',
    'open',
    'ord',
    'pow',
    'print',
    'property',
    'range',
    'repr',
    'reversed',
    'round',
    'set',
    'setattr',
    'slice',
    'sorted',
    'staticmethod',
    'sum',
    'vars',
    'zip'
  ];

  const LITERALS = [
    'True',
    'False',
    'None'
  ];

  // Core types from the Jac spec plus common Python types inherited at runtime.
  const TYPES = [
    'type',
    'str',
    'int',
    'float',
    'list',
    'tuple',
    'set',
    'dict',
    'bool',
    'bytes',
    'any',
    'i8',
    'u8',
    'i16',
    'u16',
    'i32',
    'u32',
    'i64',
    'u64',
    'f32',
    'f64',
    'complex',
    'Self'
  ];

  const KEYWORDS = {
    $pattern: IDENT_RE,
    keyword: RESERVED_WORDS,
    built_in: BUILT_INS,
    literal: LITERALS,
    type: TYPES
  };

  // Block comments: #* ... *#
  const BLOCK_COMMENT = hljs.COMMENT(
    /#\*/,
    /\*#/
  );

  const LINE_COMMENT = hljs.COMMENT(
    /#/,
    /$/
  );

  const SUBST = {
    className: 'subst',
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS,
    illegal: /#/
  };

  const LITERAL_BRACKET = {
    begin: /\{\{/,
    relevance: 0
  };

  const STRING = {
    className: 'string',
    contains: [ hljs.BACKSLASH_ESCAPE ],
    variants: [
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'''/,
        end: /'''/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"""/,
        end: /"""/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'/,
        end: /'/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"/,
        end: /"/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([bB][rR]|[rR][bB]|[bB])'''/,
        end: /'''/,
        contains: [ hljs.BACKSLASH_ESCAPE ]
      },
      {
        begin: /([bB][rR]|[rR][bB]|[bB])"""/,
        end: /"""/,
        contains: [ hljs.BACKSLASH_ESCAPE ]
      },
      {
        begin: /([bB][rR]|[rR][bB]|[bB])'/,
        end: /'/,
        contains: [ hljs.BACKSLASH_ESCAPE ]
      },
      {
        begin: /([bB][rR]|[rR][bB]|[bB])"/,
        end: /"/,
        contains: [ hljs.BACKSLASH_ESCAPE ]
      },
      {
        begin: /([rR])'''/,
        end: /'''/,
        contains: []
      },
      {
        begin: /([rR])"""/,
        end: /"""/,
        contains: []
      },
      {
        begin: /([rR])'/,
        end: /'/,
        contains: []
      },
      {
        begin: /([rR])"/,
        end: /"/,
        contains: []
      },
      {
        begin: /'''/,
        end: /'''/,
        relevance: 10
      },
      {
        begin: /"""/,
        end: /"""/,
        relevance: 10
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };

  // Number literal definitions (same as Python, since Jac inherits the semantics)
  const digitpart = '[0-9](_?[0-9])*';
  const pointfloat = `(\\b(${digitpart}))?\\.(${digitpart})|\\b(${digitpart})\\.`;
  const lookahead = `\\b|${RESERVED_WORDS.join('|')}`;
  const NUMBER = {
    className: 'number',
    relevance: 0,
    variants: [
      {
        begin: `(\\b(${digitpart})|(${pointfloat}))[eE][+-]?(${digitpart})[jJ]?(?=${lookahead})`
      },
      {
        begin: `(${pointfloat})[jJ]?`
      },
      {
        begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${lookahead})`
      },
      {
        begin: `\\b0[bB](_?[01])+[lL]?(?=${lookahead})`
      },
      {
        begin: `\\b0[oO](_?[0-7])+[lL]?(?=${lookahead})`
      },
      {
        begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${lookahead})`
      },
      {
        begin: `\\b(${digitpart})[jJ](?=${lookahead})`
      }
    ]
  };

  const classNameIdent = new RegExp('(?!\\b(?:' + RESERVED_WORDS.join('|') + ')\\b)' + IDENT_RE.source, 'u');

  // Edge and connect operators (graph syntax in Jac)
  // Spec: -->  <--  <-->  ++>  <++  <++>  ->:  <-:  +>:  <+:
  // Longer alternatives must come before their prefixes.
  const EDGE_OPERATOR = {
    className: 'operator',
    match: /-->|\+\+>|<-->|<--|->:|<-:|\+>:|<\+\+>|<\+\+|<\+:|:->|:<-|:\+>|:<\+/
  };

  // General operators (Python-style + Jac-specific)
  // Note: => is excluded because it is in the illegal pattern.
  // Note: = is excluded from the main operator because it is only
  // highlighted as operator inside function call arguments.
  const JSX = {
    begin: /<[A-Za-z_\/!]/,
    end: />/,
    relevance: 0,
    contains: [
      STRING,
      NUMBER,
      BLOCK_COMMENT,
      LINE_COMMENT
    ]
  };

  const JSX_FRAGMENT = {
    match: /<>|<\/>/,
    relevance: 0
  };

  const OPERATOR = {
    className: 'operator',
    match: /:=|\+=|-=|\*=|\/=|\/\/=|%=|\*\*=|@=|&=|\|=|\^=|<<=|>>=|\|>|<\||:>|<:|==|!=|<=|>=|\*\*|\/\/|<<|>>|\+\+|--|&&|\|\||\.>|<\.|\.\.|->|\+|-|\*|\/|%|@|<|>|!|&|\||\^|~|\?(?!\w)/
  };

  const ASSIGN_OPERATOR = {
    className: 'operator',
    match: /=/
  };

  const SELF_VAR = {
    scope: 'variable.language',
    match: /\b(self|props|super|here|root|visitor)\b/
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
          BLOCK_COMMENT,
          LINE_COMMENT,
          OPERATOR,
          ASSIGN_OPERATOR,
          SELF_VAR
        ]
      }
    ]
  };

  const CALL_ARGS = {
    begin: /\(/,
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: KEYWORDS,
    contains: [
      'self',
      NUMBER,
      STRING,
      BLOCK_COMMENT,
      LINE_COMMENT,
      OPERATOR,
      ASSIGN_OPERATOR,
      SELF_VAR
    ]
  };

  SUBST.contains = [
    'self',
    STRING
  ];

  return {
    name: 'Jac',
    aliases: [
      'jac'
    ],
    unicodeRegex: true,
    keywords: KEYWORDS,
    illegal: /(<\?)|=>/,
    contains: [
      NUMBER,
      EDGE_OPERATOR,
      SELF_VAR,
      {
        // eat "if" prior to string so that it won't accidentally be
        // labeled as an f-string
        beginKeywords: 'if',
        relevance: 0
      },
      { match: /\bor\b/, scope: 'keyword' },
      { match: /\.\.\./, scope: 'literal' },
      STRING,
      BLOCK_COMMENT,
      LINE_COMMENT,
      JSX_FRAGMENT,
      JSX,
      {
        className: 'meta',
        begin: /^[\t ]*@/,
        end: /(?=#)|$/,
        contains: [
          NUMBER,
          PARAMS,
          STRING
        ]
      },
      OPERATOR,
      CALL_ARGS,
      {
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
        match: [
          /\b(?:obj|node|edge|walker|class|enum)\b/,
          /(?::(pub|priv|protect|static|override|abs)\b)?\s*/,
          classNameIdent
        ],
        scope: {
          1: 'keyword',
          3: 'title.class'
        },
        contains: [
          {
            begin: /\(\s*/,
            end: /\s*\)/,
            contains: [
              {
                match: classNameIdent,
                scope: 'title.class.inherited'
              }
            ]
          },
          {
            begin: /:\s*/,
            end: /(?=[{;])/,
            contains: [
              {
                match: classNameIdent,
                scope: 'type'
              }
            ]
          },
          BLOCK_COMMENT,
          LINE_COMMENT
        ]
      }
    ]
  };
}
