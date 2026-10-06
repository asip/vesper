import { computed, type WritableComputedRef } from '@vue/reactivity'
import { persistentAtom } from '@nanostores/persistent'

export const usePersistentObjectStore = function <T extends object>(
  name: string,
): WritableComputedRef<T | undefined> {
  const $store = persistentAtom<T | undefined>(name, undefined, {
    encode: JSON.stringify,
    decode: JSON.parse,
  })

  const store = computed<T | undefined>({
    get() {
      return $store.get()
    },
    set(value: T | undefined) {
      $store.set(value)
    },
  })

  return store
}
