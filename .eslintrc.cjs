module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'airbnb-base',
		'airbnb-typescript/base',
		'plugin:prettier/recommended',
	],
	rules: {
		'no-param-reassign': 0,
		'import/no-cycle': 0,
		'class-methods-use-this': 0,
		'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
		'import/newline-after-import': ['error', { count: 1 }],
		'import/order': [
			'error',
			{
				'newlines-between': 'always',
				groups: ['external', 'internal'],
			},
		],
	},
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'import-no-duplicates-prefix-resolved-path'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		project: './packages/pdfb/tsconfig.json',
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
};
