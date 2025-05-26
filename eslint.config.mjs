import js from '@eslint/js';
import globals from 'globals';
import prettierPlugin from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
                sourceType: 'module',
            },
            ecmaVersion: 2022,
            globals: {
                ...globals.node,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            prettier: pluginPrettier,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            'prettier/prettier': 'error',
        },
    },
    {
        files: ['**/*.test.js'],
        languageOptions: {
            globals: globals.jest,
        },
    },
    {
        files: ['**/*.json'],
        languageOptions: {
            parser: (await import('jsonc-eslint-parser')).default,
        },
        rules: {
            'no-unused-expressions': 'off',
        },
    },
]);