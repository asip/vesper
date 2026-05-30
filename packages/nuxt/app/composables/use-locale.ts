import { useNuxtApp } from 'nuxt/app'
import { useBrowserLocale } from '#i18n'

export const useLocale = function (): {
  locale: WritableComputedRef<string>
  autodetect: () => void
} {
  const { $i18n } = useNuxtApp()
  const { locale, availableLocales, fallbackLocale } = $i18n

  const autodetect = (): void => {
    const browserLocale: string | null = useBrowserLocale()?.split('-')[0] ?? null
    // console.log(browserLocale)
    // console.log(locales.value)

    type AvailableLocales = (typeof $i18n.availableLocales)[number]

    locale.value = (
      (availableLocales as string[]).includes(browserLocale ?? '')
        ? browserLocale
        : fallbackLocale.value
    ) as AvailableLocales
  }

  return { locale, autodetect }
}
