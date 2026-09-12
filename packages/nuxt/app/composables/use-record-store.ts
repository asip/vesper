import { useState } from 'nuxt/app'

export const useRecordStore = function <T = string>(
  key: string,
): {
  record: Ref<Record<string, T>>
} {
  const record = useState<Record<string, T>>(key, () => {
    return {}
  })

  return { record }
}
