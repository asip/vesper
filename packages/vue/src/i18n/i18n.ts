import { createI18n } from 'vue-i18n'

import { locales } from './locales'

const { en, ja } = locales

export const i18n = createI18n({
  legacy: false,
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en,
    ja,
  },
})
