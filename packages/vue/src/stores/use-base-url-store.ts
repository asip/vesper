import { computed } from '@vue/reactivity'

import { $baseUrl } from './nano'

export function useBaseUrlStore() {
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
