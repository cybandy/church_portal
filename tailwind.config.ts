import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme.js'

export default <Partial<Config>>{
  theme: {
    extend: {
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9'
      },
      fontFamily: {
        sans: ['Noto Sans', ...fontFamily.sans]
      }
    }
  }
}
