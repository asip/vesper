import type { Flash } from '../../interfaces'

import { ref } from 'vue'

export const useFlash = function () {
  const flash = ref<Flash>({})

  const clearFlash = (): void => {
    flash.value = {}
  }

  return { flash, clearFlash }
}

export type UseFlashType = ReturnType<typeof useFlash>
