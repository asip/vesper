import { computed, type WritableComputedRef } from '@vue/reactivity'

import { $baseUrl } from './nano'

export const useBaseUrlStore = function (): {
  baseURL: WritableComputedRef<string, string>
} {
  const baseURL = computed<string>({
    get() {
      return $baseUrl.get()
    },
    set(value: string) {
      $baseUrl.set(value)
    },
  })

  return { baseURL }
}
