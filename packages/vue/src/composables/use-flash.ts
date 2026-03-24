import { ref } from '@vue/reactivity'

import type { Flash } from '../interfaces'

export const useFlash = function () {
  const flash = ref<Flash>({})

  const clearFlash = (): void => {
    flash.value = {}
  }

  return { flash, clearFlash }
}

export type UseFlashType = ReturnType<typeof useFlash>
