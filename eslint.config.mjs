import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  name: 'base',
  files: ['**/*.js', '**/*.vue', '**/*.ts'],
  linterOptions: {
    noInlineConfig: true
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-html': 'off',
    'no-console': 'off',
    'no-unmodified-loop-condition': 'off',
    'no-throw-literal': 'off',
    'import/no-named-as-default': 'off'
  },
  ignores: ['node_modules/', 'dist/', '.nuxt/', '.output/', 'coverage/', 'components.d.ts', 'nuxt.d.ts']
});
