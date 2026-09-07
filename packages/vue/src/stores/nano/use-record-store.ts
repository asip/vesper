import { ref, computed, watch, type WritableComputedRef } from '@vue/reactivity'
import { persistentAtom } from '@nanostores/persistent'

type StringRecord = Partial<Record<string, string>>

export const useRecordStore = function (key: string): {
  record: WritableComputedRef<StringRecord>
} {
  const recordRef = ref<StringRecord>({})

  const $record = persistentAtom<StringRecord>(
    key,
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
    set(value: StringRecord) {
      recordRef.value = value
      $record.set(value)
    },
  })

  watch(recordRef, () => {
    $record.set(recordRef.value)
  })

  return { record }
}
