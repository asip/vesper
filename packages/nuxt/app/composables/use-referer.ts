import { useState } from 'nuxt/app'

export const useReferer = function () {
  const referers = useState<Record<string, string>>('referers', () => {
    return {}
  })

  return { referers }
}
