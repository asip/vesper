import { ref, type Ref } from '@vue/reactivity'

import type { Flash } from '~/types'

export const useFlash = function (): {
  flash: Ref<
    {
      notice?: string | undefined
      alert?: string | undefined
    },
    | Flash
    | {
        notice?: string | undefined
        alert?: string | undefined
      }
  >
  clearFlash: () => void
} {
  const flash = ref<Flash>({})

  const clearFlash = (): void => {
    flash.value = {}
  }

  return { flash, clearFlash }
}

export type UseFlashType = ReturnType<typeof useFlash>
