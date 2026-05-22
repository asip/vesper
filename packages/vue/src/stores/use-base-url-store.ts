import { computed, type WritableComputedRef } from '@vue/reactivity'
import { persistentAtom } from '@nanostores/persistent'

const $baseURL = persistentAtom<string | undefined>('baseURL', undefined)

export const useBaseUrlStore = function (): {
  baseURL: WritableComputedRef<string | undefined>
} {
  const baseURL = computed<string | undefined>({
    get() {
      return $baseURL.get()
    },
    set(value: string) {
      $baseURL.set(value)
    },
  })

  return { baseURL }
}
