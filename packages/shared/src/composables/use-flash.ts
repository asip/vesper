import { ref, type Ref } from '@vue/reactivity'

import type { Flash } from '~/types'

export const useFlash = function <F extends Flash = Flash>(): {
  flash: Ref<F>
  clearFlash: () => void
} {
  const flash = ref<F>({} as F)

  const clearFlash = (): void => {
    flash.value = {}
  }

  return { flash: flash as Ref<F>, clearFlash }
}
