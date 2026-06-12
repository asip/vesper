import { useNuxtApp } from 'nuxt/app'
import { useBrowserLocale } from '#i18n'

export const useLocale = function (): {
  locale: WritableComputedRef<string>
  shortLocale: ComputedRef<string | null>
  autodetect: () => void
} {
  const { $i18n } = useNuxtApp()
  const { locale, availableLocales, fallbackLocale } = $i18n

  const toShortLacale = (locale: string | null) => locale?.split('-')[0] ?? null

  const shortLocale = computed(() => toShortLacale(locale.value))

  const autodetect = (): void => {
    const browserLocale = useBrowserLocale()
    const browserShortLocale = toShortLacale(browserLocale)

    // console.log(browserLocale)
    // console.log(locales.value)

    type AvailableLocales = (typeof $i18n.availableLocales)[number]

    locale.value = (
      (availableLocales as string[]).includes(browserLocale ?? '') ||
      (availableLocales as string[]).includes(browserShortLocale ?? '')
        ? browserLocale
        : fallbackLocale.value
    ) as AvailableLocales
  }

  return { locale, shortLocale, autodetect }
}
