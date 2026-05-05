import type { WritableComputedRef } from '@vue/reactivity'

import { i18n } from '~/i18n'

export const useLocale = function (): {
  locale: WritableComputedRef<'en' | 'ja', 'en' | 'ja'>
  autodetect: () => void
} {
  const { locale, availableLocales, fallbackLocale } = i18n.global

  const autodetect = (): void => {
    const viewLocale = (globalThis.navigator.language || globalThis.navigator.languages[0]).split(
      '-',
    )[0]

    type AvailableLocales = (typeof availableLocales)[number]

    locale.value = (
      (availableLocales as string[]).includes(viewLocale) ? viewLocale : fallbackLocale.value
    ) as AvailableLocales
  }

  return { locale, autodetect }
}
