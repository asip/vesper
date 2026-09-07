import { useRecordStore } from '~/stores'

export const useRecord = function (key: string) {
  const { record } = useRecordStore(key)

  return { record }
}
