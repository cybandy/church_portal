// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt()

  .overrideRules({
    '@stylistic/eol-last': 'off',
    '@stylistic/semi': 'off',
    '@stylistic/comma-dangle': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  })
