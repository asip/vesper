import { WritableComputedRef } from '@vue/reactivity'
import { useRecordStore } from '~/stores'

export const useRecord = function (key: string): {
  record: WritableComputedRef<Partial<Record<string, string>>>
} {
  const { record } = useRecordStore(key)

  return { record }
}
