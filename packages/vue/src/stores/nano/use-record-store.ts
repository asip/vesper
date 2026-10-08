import { customRef, type Ref } from '@vue/reactivity'
import { persistentMap } from '@nanostores/persistent'

export const useRecordStore = function (
  name: string,
  options?: { watch: boolean },
): Ref<Partial<Record<string, string | undefined>>> {
  const watchOptions = options?.watch ?? true

  const $record = persistentMap<Partial<Record<string, string | undefined>>>(name + ':', {})

  const record = customRef<Partial<Record<string, string | undefined>>>((track, trigger) => {
    return {
      get() {
        if (watchOptions) track()
        return $record.get()
      },
      set(value: Partial<Record<string, string | undefined>>) {
        $record.set(value)
        if (watchOptions) trigger()
      },
    }
  })

  return record
}
