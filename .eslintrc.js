module.exports = {
  root: true,
  env: {
    "es6": true
  },
  parserOptions: {
    "ecmaFeatures": { "jsx": true },
    "ecmaVersion": 2018
  },
  rules: {
    "max-len": ["error", { "code": 120 }],
    "curly": 0,
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: ["const", "let", "var"], next: "*"},
      { blankLine: "any",    prev: ["const", "let", "var"], next: ["const", "let", "var"]}
    ],
  }
};