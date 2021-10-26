module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "@vue/typescript"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "off" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/no-parsing-error": [
      "error",
      {
        // "control-character-in-input-stream": false,
        // "abrupt-closing-of-empty-comment": false,
        // "absence-of-digits-in-numeric-character-reference": false,
        // "cdata-in-html-content": false,
        // "character-reference-outside-unicode-range": false,
        // "control-character-reference": false,
        // "eof-before-tag-name": false,
        // "eof-in-cdata": false,
        // "eof-in-comment": false,
        // "eof-in-tag": false,
        // "incorrectly-closed-comment": false,
        // "incorrectly-opened-comment": false,
        // "invalid-first-character-of-tag-name": false,
        // "missing-attribute-value": false,
        // "missing-end-tag-name": false,
        // "missing-semicolon-after-character-reference": false,
        // "missing-whitespace-between-attributes": false,
        // "nested-comment": false,
        // "noncharacter-character-reference": false,
        // "noncharacter-in-input-stream": false,
        // "null-character-reference": false,
        // "surrogate-character-reference": false,
        // "surrogate-in-input-stream": false,
        // "unexpected-character-in-attribute-name": false,
        // "unexpected-character-in-unquoted-attribute-value": false,
        // "unexpected-equals-sign-before-attribute-name": false,
        // "unexpected-null-character": false,
        // "unexpected-question-mark-instead-of-tag-name": false,
        // "unexpected-solidus-in-tag": false,
        // "unknown-named-character-reference": false,
        // "end-tag-with-attributes": false,
        // "duplicate-attribute": false,
        // "end-tag-with-trailing-solidus": false,
        // "non-void-html-element-start-tag-with-trailing-solidus": false,
        // "x-invalid-end-tag": false,
        // "x-invalid-namespace": false,
      },
    ],
    quotes: [0, "single"], // 禁用引号检查	引号类型 `` "" ''
    semi: 0, // 禁用分号检查	[1, "always"]: 需要分号, [2, "never"]: 不加分号, 0: 禁用此项
    "vue/html-self-closing": "off",
    indent: "off", // 禁用缩进检查
    "prettier/prettier": "off",
    // allowEmptyCatch: true,
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
