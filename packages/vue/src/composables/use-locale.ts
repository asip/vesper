import type { WritableComputedRef } from '@vue/reactivity'

import { useBrowserLocale } from './browser/use-browser-locale'

import { i18n } from '~/i18n'

export const useLocale = function (): {
  locale: WritableComputedRef<string>
  autodetect: () => void
} {
  const { locale, availableLocales, fallbackLocale } = i18n.global

  const autodetect = (): void => {
    const viewLocale = useBrowserLocale().split('-')[0]

    type AvailableLocales = (typeof availableLocales)[number]

    locale.value = (
      (availableLocales as string[]).includes(viewLocale) ? viewLocale : fallbackLocale.value
    ) as AvailableLocales
  }

  return { locale, autodetect }
}
