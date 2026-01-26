/*import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**///*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: {...globals.browser, ...globals.node} } },
  //tseslint.configs.recommended,
//]);
import { FlatCompat } from "@eslint/eslintrc";
import typescript from "@typescript-eslint/eslint-plugin";
import angular from "@angular-eslint/eslint-plugin";
import angularTemplate from "@angular-eslint/eslint-plugin-template";
import tsParser from "@typescript-eslint/parser"; 
const compat = new FlatCompat({ baseDirectory: process.cwd() });

export default [
  // TypeScript файлы
  ...compat.extends("plugin:@angular-eslint/recommended"),
  ...compat.extends("plugin:@typescript-eslint/recommended"),
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: process.cwd(),
        createDefaultProgram: true
      }
    },
    plugins: {
      "@typescript-eslint": typescript,
      "@angular-eslint": angular
    },
    rules: {
      semi: "off",
      quotes: "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@angular-eslint/no-host-metadata-property": "off"
      //semi: ["warn", "always"],
      //quotes: ["warn", "single"]
    }
  },

  // HTML шаблоны
  {
    files: ["src/**/*.html"],
    plugins: {
      "@angular-eslint/template": angularTemplate
    },
    rules: {}
  }
];


