import { useState } from 'nuxt/app'

export const useRecord = function (key: string): {
  record: Ref<Record<string, string>>
} {
  const record = useState<Record<string, string>>(key, () => {
    return {}
  })

  return { record }
}
