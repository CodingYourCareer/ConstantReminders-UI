import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import vueComposable from 'eslint-plugin-vue-composable'

export default createConfigForNuxt({
  ...vueComposable.configs['flat/recommended'],
  features: {
    stylistic: true,
  },
})
