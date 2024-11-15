import tseslint from 'typescript-eslint';
import common from 'eslint-config-terrax/common';
import node from 'eslint-config-terrax/node';
import typescript from 'eslint-config-terrax/typescript';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import merge from 'lodash.merge';

const commonFiles = '{js,mjs,cjs,ts}';

const mainRulesets = [...common, ...node, ...typescript].map((config) =>
	merge(config, {
		files: [`**/*${commonFiles}`],
		languageOptions: {
			parserOptions: {
				warnOnUnsupportedTypeScriptVersion: false,
				allowAutomaticSingleRunInference: true,
				project: ['tsconfig.eslint.json', 'packages/*/tsconfig.eslint.json'],
				tsconfigRootDir: import.meta.dirname
			}
		},
		settings: {
			'import-x/resolver': {
				typescript: {
					project: ['tsconfig.eslint.json', 'packages/*/tsconfig.eslint.json']
				}
			}
		}
	})
);

export default tseslint.config(
	...mainRulesets,
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module'
		},
		ignores: ['.git/', '**/dist/', '**/coverage/', '**/node_modules/']
	},
	{
		files: [`**/*${commonFiles}`],
		rules: {
			'import-x/no-duplicates': ['error', { 'prefer-inline': true }]
		}
	},
	eslintPluginPrettierRecommended
);
