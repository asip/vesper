import { ref, computed, watch, type WritableComputedRef } from '@vue/reactivity'
import { persistentAtom } from '@nanostores/persistent'

type StringRecord<T = string> = Partial<Record<string, T>>

export const useRecordStore = function <T = string>(
  key: string,
): {
  record: WritableComputedRef<StringRecord<T>>
} {
  const recordRef = ref<StringRecord<T>>({})

  const $record = persistentAtom<StringRecord<T>>(
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
    set(value: StringRecord<T>) {
      recordRef.value = value
      $record.set(value)
    },
  })

  watch(recordRef, () => {
    $record.set(recordRef.value)
  })

  return { record }
}
