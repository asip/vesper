import { ref, computed, watch, type WritableComputedRef } from '@vue/reactivity'
import { persistentMap } from '@nanostores/persistent'

export const useAnyRecordStore = function <T extends object>(
  name: string,
): WritableComputedRef<Partial<Record<string, T | undefined>>> {
  const recordRef = ref<Partial<Record<string, T | undefined>>>({})

  const $record = persistentMap<Partial<Record<string, T | undefined>>>(
    name + ':',
    {},
    {
      encode: JSON.stringify,
      decode: JSON.parse,
    },
  )

  const record = computed({
    get() {
      recordRef.value = $record.get()
      return recordRef.value
    },
    set(value: Partial<Record<string, T | undefined>>) {
      recordRef.value = value
      $record.set(value)
    },
  })

  watch(recordRef, () => {
    $record.set(recordRef.value)
  })

  return record
}
