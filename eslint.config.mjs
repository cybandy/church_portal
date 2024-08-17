// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu(
    {
      vue: true,
      typescript:true
    },
    {
      // specify files and rules to apply to those files
      files: ['**/*.vue', '**/*.ts'],
      rules: {
        '@stylistic/eol-last': 'off'
      }
    },
    {
      // rules to apply to other files not specified above
    },
    {
      plugins: [
        'eslint-plugin-you-dont-need-lodash-underscore'
      ]
    }
    
  )
  
)

