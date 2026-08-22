import { computed, watch, type WritableComputedRef } from '@vue/reactivity'
import { persistentAtom } from '@nanostores/persistent'
import { useStore } from '@nanostores/vue'

import type { MorePage } from '~/types'

export const useMorePageStore = function (key?: string | null): {
  morePage: WritableComputedRef<MorePage>
} {
  const toFirstUpper = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  key = key ? `morePageFor${toFirstUpper(key)}` : 'morePage'

  const $morePage = persistentAtom<MorePage>(
    key,
    {
      first: 1,
      pages: 1,
      current: 1,
      prev: false,
      next: false,
      min: 1,
      max: 1,
    },
    {
      encode: JSON.stringify,
      decode: JSON.parse,
    },
  )

  const morePageRef = useStore($morePage)

  const morePage = computed({
    get() {
      return morePageRef.value
    },
    set(value: MorePage) {
      $morePage.set(value)
    },
  })

  watch(morePageRef, () => {
    $morePage.set(morePageRef.value)
  })

  return { morePage }
}
