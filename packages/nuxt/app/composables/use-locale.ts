import { useNuxtApp } from 'nuxt/app'
import type { Composer } from 'vue-i18n'

export const useLocale = function (): {
  locale: WritableComputedRef<string>
  shortLocale: ComputedRef<string | null>
  autodetect: () => void
} {
  const { $i18n } = useNuxtApp()
  const { locale, availableLocales, fallbackLocale } = $i18n as Composer

  const toShortLocale = (locale: string | null) => locale?.split('-')[0] ?? null

  const shortLocale = computed(() => toShortLocale(locale.value))

  const browserLocale = useBrowserLocale()
  const browserShortLocale = toShortLocale(browserLocale)

  type AvailableLocales = (typeof availableLocales)[number]

  const autodetect = (): void => {
    locale.value = (
      (availableLocales as string[]).includes(browserLocale ?? '') ||
      (availableLocales as string[]).includes(browserShortLocale ?? '')
        ? browserLocale
        : fallbackLocale.value
    ) as AvailableLocales
  }

  return { locale, shortLocale, autodetect }
}
