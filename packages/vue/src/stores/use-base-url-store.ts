import { computed } from '@vue/reactivity'

import { $baseUrl } from './nano'

export const useBaseUrlStore = function () {
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
