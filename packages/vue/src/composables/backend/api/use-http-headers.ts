import { computed, type ComputedRef } from '@vue/reactivity'
import { useLocale } from '../../use-locale'
import { useTimeZone } from '../../use-time-zone'

export const useHttpHeaders = function (): {
  commonHeaders: ComputedRef<Record<string, string>>
} {
  const { locale } = useLocale()
  const { timeZone } = useTimeZone()

  const commonHeaders = computed<Record<string, string>>(() => ({
    Accept: 'application/json',
    'Accept-Language': locale.value,
    'Time-Zone': timeZone.value.client,
  }))

  return { commonHeaders }
}
