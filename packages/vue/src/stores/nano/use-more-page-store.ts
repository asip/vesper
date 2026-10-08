import { customRef, /* watch, */ type Ref } from '@vue/reactivity'
import { persistentAtom } from '@nanostores/persistent'
import { useStore } from '@nanostores/vue'

import type { MorePage } from '~/types'

export const useMorePageStore = function (key?: string | null): Ref<MorePage> {
  key = key ? 'morePage:' + key : 'morePage'

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

  const morePage = customRef<MorePage>((track, trigger) => {
    return {
      get() {
        track()
        return { ...morePageRef.value }
      },
      set(value: MorePage) {
        $morePage.set(value)
        trigger()
      },
    }
  })

  return morePage
}
