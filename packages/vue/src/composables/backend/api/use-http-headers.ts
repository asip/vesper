import { computed, type ComputedRef } from '@vue/reactivity'
import { useLocale } from '../../use-locale'

export const useHttpHeaders = function (): {
  commonHeaders: ComputedRef<Record<string, string>>
} {
  const { locale } = useLocale()

  const commonHeaders = computed<Record<string, string>>(() => ({
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
    'Accept-Language': locale.value,
  }))

  return { commonHeaders }
}
