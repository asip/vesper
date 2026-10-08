import { customRef } from '@vue/reactivity'
import Cookies from 'js-cookie'

import type { CookieAttributes, CookieRef } from '~/types'

export const useCookie = function (
  name: string,
  options?: CookieAttributes & { watch?: boolean },
): CookieRef {
  const watchOption = options?.watch ?? true
  if (options?.watch) delete options.watch

  const cookie: CookieRef = customRef<string | null | undefined>((track, trigger) => {
    return {
      get() {
        if (watchOption) track()
        return Cookies.get(name)
      },
      set(value: string | null | undefined) {
        if (value) {
          Cookies.set(name, value, options)
        } else {
          Cookies.remove(name, options)
        }
        if (watchOption) trigger()
      },
    }
  })

  return cookie
}
