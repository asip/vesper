import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  legacy: false,
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en: {
      backend: {
        error: {
          api: 'An error has occurred.({message})',
          login: 'Please log in.',
          not_found: 'This {source} has been deleted.',
        },
      },
    },
    ja: {
      backend: {
        error: {
          api: '不具合が発生しました。({message})',
          login: 'ログインしなおしてください。',
          not_found: 'この{source}は削除されています。',
        },
      },
    },
  },
})
