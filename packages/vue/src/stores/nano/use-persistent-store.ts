import { customRef, type Ref } from '@vue/reactivity'
import { persistentAtom } from '@nanostores/persistent'

export const usePersistentStore = function (
  name: string,
  initial?: string,
  options?: { watch: boolean },
): Ref<string | undefined> {
  const watchOptions = options?.watch ?? true

  const $store = persistentAtom<string | undefined>(name, initial)

  const store = customRef<string | undefined>((track, trigger) => {
    return {
      get() {
        if (watchOptions) track()
        return $store.get()
      },
      set(value: string | undefined) {
        if (watchOptions) $store.set(value)
        trigger()
      },
    }
  })

  return store
}
