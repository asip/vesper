import { useState } from 'nuxt/app'

export const useReferer = function (): {
  referers: Ref<Record<string, string>>
} {
  const referers = useState<Record<string, string>>('referers', () => {
    return {}
  })

  return { referers }
}
