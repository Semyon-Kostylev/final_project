module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {
        'prettier/prettier': [
            'error',
            {
                printWidth: 100,
                singleQuote: true,
                trailingComma: 'none',
                bracketSpacing: true,
                bracketSameLine: false,
                tabWidth: 4,
                semi: false,
                arrowParens: 'avoid',
                vueIndentScriptAndStyle: true
            }
        ],
        'no-console': 'warn',
        'no-debugger': 'warn'
    }
}
