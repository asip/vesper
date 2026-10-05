import { useState } from 'nuxt/app'

export const useRecordStore = function <T = string>(name: string): Ref<Record<string, T>> {
  const record = useState<Record<string, T>>(name, () => {
    return {}
  })

  return record
}
