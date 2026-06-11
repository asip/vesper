import { computed, type ComputedRef, type WritableComputedRef } from '@vue/reactivity'

import { useBrowserLocale } from './browser/use-browser-locale'

import { i18n } from '~/i18n'

export const useLocale = function (): {
  locale: WritableComputedRef<string>
  shortLocale: ComputedRef<string>
  autodetect: () => void
} {
  const { locale, availableLocales, fallbackLocale } = i18n.global

  const toShortLacale = (locale: string) => locale.split('-')[0]

  const shortLocale = computed(() => toShortLacale(locale.value))

  const autodetect = (): void => {
    const browserLocale = useBrowserLocale()
    const browserShortLocale = toShortLacale(browserLocale)

    type AvailableLocales = (typeof availableLocales)[number]

    locale.value = (
      (availableLocales as string[]).includes(browserLocale) ||
      (availableLocales as string[]).includes(browserShortLocale)
        ? browserLocale
        : fallbackLocale.value
    ) as AvailableLocales
  }

  return { locale, shortLocale, autodetect }
}
