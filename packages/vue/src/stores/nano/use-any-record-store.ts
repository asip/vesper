import { customRef, type Ref } from '@vue/reactivity'
import { persistentMap } from '@nanostores/persistent'

export const useAnyRecordStore = function <T extends object>(
  name: string,
  options?: { watch: boolean },
): Ref<Partial<Record<string, T | undefined>>> {
  const watchOptions = options?.watch ?? true

  const $record = persistentMap<Partial<Record<string, T | undefined>>>(
    name + ':',
    {},
    {
      encode: JSON.stringify,
      decode: JSON.parse,
    },
  )

  const record = customRef<Partial<Record<string, T | undefined>>>((track, trigger) => {
    return {
      get() {
        if (watchOptions) track()
        return $record.get()
      },
      set(value: Partial<Record<string, T | undefined>>) {
        $record.set(value)
        if (watchOptions) trigger()
      },
    }
  })

  return record
}
