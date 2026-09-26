import { useNuxtApp } from 'nuxt/app'

export const useLocale = function (): {
  locale: WritableComputedRef<string>
  shortLocale: ComputedRef<string | null>
  autodetect: () => void
} {
  const { $i18n } = useNuxtApp()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { locale, availableLocales, fallbackLocale } = $i18n as any

  const toShortLocale = (locale: string | null) => locale?.split('-')[0] ?? null

  const shortLocale = computed(() => toShortLocale(locale.value))

  const autodetect = (): void => {
    const browserLocale = useBrowserLocale()
    const browserShortLocale = toShortLocale(browserLocale)

    // console.log(browserLocale)
    // console.log(locales.value)

    type AvailableLocales = (typeof availableLocales)[number]

    locale.value = (
      (availableLocales as string[]).includes(browserLocale ?? '') ||
      (availableLocales as string[]).includes(browserShortLocale ?? '')
        ? browserLocale
        : fallbackLocale.value
    ) as AvailableLocales
  }

  return { locale, shortLocale, autodetect }
}
