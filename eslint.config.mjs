import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "script"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
];

module.exports = {
  root: true,
  env: {
      browser: true,
      es2021: true,
  },
  extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
  ],
  parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
  },
  rules: {
      // Suas regras personalizadas aqui
  },
}
