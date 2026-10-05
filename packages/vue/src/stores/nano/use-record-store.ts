import { ref, computed, watch, type WritableComputedRef } from '@vue/reactivity'
import { persistentMap } from '@nanostores/persistent'

export const useRecordStore = function (
  name: string,
): WritableComputedRef<Partial<Record<string, string | undefined>>> {
  const recordRef = ref<Partial<Record<string, string | undefined>>>({})

  const $record = persistentMap<Partial<Record<string, string | undefined>>>(name + ':', {})

  const record = computed({
    get() {
      recordRef.value = $record.get()
      return recordRef.value
    },
    set(value: Partial<Record<string, string | undefined>>) {
      recordRef.value = value
      $record.set(value)
    },
  })

  watch(recordRef, () => {
    $record.set(recordRef.value)
  })

  return record
}
