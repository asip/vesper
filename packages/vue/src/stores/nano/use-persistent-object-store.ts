import { customRef, type Ref } from '@vue/reactivity'
import { persistentAtom } from '@nanostores/persistent'

export const usePersistentObjectStore = function <T extends object>(
  name: string,
  initial?: T,
  options?: { watch: boolean },
): Ref<T | undefined> {
  const watchOptions = options?.watch ?? true

  const $store = persistentAtom<T | undefined>(name, initial, {
    encode: JSON.stringify,
    decode: JSON.parse,
  })

  const store = customRef<T | undefined>((track, trigger) => {
    return {
      get() {
        if (watchOptions) track()
        return $store.get()
      },
      set(value: T | undefined) {
        $store.set(value)
        if (watchOptions) trigger()
      },
    }
  })

  return store
}
