import type { I18n } from 'vue-i18n'

export let i18n: I18n | undefined

export const setI18n = function (value: I18n) {
  i18n = value
}
