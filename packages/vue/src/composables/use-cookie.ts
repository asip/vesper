import { computed } from '@vue/reactivity'
import Cookies from 'js-cookie'

import type { CookieAttributes, CookieRef } from '~/types'

export const useCookie = function (name: string, options?: CookieAttributes): CookieRef {
  const cookie: CookieRef = computed<string | null | undefined>({
    get() {
      return Cookies.get(name)
    },
    set(value: string | null | undefined) {
      if (value) {
        Cookies.set(name, value, options)
      } else {
        Cookies.remove(name, options)
      }
    },
  })

  return cookie
}
