import { customRef } from '@vue/reactivity'
import Cookies from 'js-cookie'

import type { CookieAttributes, CookieRef } from '~/types'

type CookieOptions = CookieAttributes & { watch?: boolean }

export const useCookie = function <T extends object | string = string>(
  name: string,
  options?: CookieOptions,
): CookieRef<T> {
  const watchOption = options?.watch ?? true
  if (options?.watch) delete options.watch

  const cookie: CookieRef<T> = customRef<T | null | undefined, T | string | null | undefined>(
    (track, trigger) => {
      return {
        get() {
          let cookieValue = Cookies.get(name)
          if (watchOption) track()
          try {
            return cookieValue ? (JSON.parse(cookieValue) as T) : undefined
          } catch {
            return cookieValue as T
          }
        },
        set(value: T | string | null | undefined) {
          if (typeof value == 'string') {
            Cookies.set(name, value, options)
          } else if (value !== null && typeof value == 'object') {
            Cookies.set(name, JSON.stringify(value), options)
          } else if (value === null || typeof value == 'undefined') {
            Cookies.remove(name, options)
          }
          if (watchOption) trigger()
        },
      }
    },
  )

  return cookie
}
