import { computed, type WritableComputedRef } from '@vue/reactivity'
import { persistentAtom } from '@nanostores/persistent'

export const usePersistentStore = function (key: string): WritableComputedRef<string | undefined> {
  const $store = persistentAtom<string | undefined>(key, undefined)

  const store = computed<string | undefined>({
    get() {
      return $store.get()
    },
    set(value: string | undefined) {
      $store.set(value)
    },
  })

  return store
}
