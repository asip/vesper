import { useI18n, type Composer } from 'vue-i18n'

import { i18n } from '~/i18n'

export const useI18nGlobal = function (): Composer {
  return i18n ? (i18n.global as Composer) : useI18n()
}
