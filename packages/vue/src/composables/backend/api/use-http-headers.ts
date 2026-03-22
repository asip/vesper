import { computed } from '@vue/reactivity'
import { useLocale } from '../../use-locale'

export const useHttpHeaders = () => {
  const { locale } = useLocale()

  const commonHeaders = computed<Record<string, string>>(() => ({
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
    'Accept-Language': locale.value,
  }))

  return { commonHeaders }
}
