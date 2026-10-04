import { computed } from '@vue/reactivity'
import Cookies from 'js-cookie'

import { CookieRef } from '~/types'

interface CookieAttributes {
  /**
   * Define when the cookie will be removed. Value can be a Number
   * which will be interpreted as days from time of creation or a
   * Date instance. If omitted, the cookie becomes a session cookie.
   */
  expires?: number | Date | undefined

  /**
   * Define the path where the cookie is available. Defaults to '/'
   */
  path?: string | undefined

  /**
   * Define the domain where the cookie is available. Defaults to
   * the domain of the page where the cookie was created.
   */
  domain?: string | undefined

  /**
   * A Boolean indicating if the cookie transmission requires a
   * secure protocol (https). Defaults to false.
   */
  secure?: boolean | undefined

  /**
   * Asserts that a cookie must not be sent with cross-origin requests,
   * providing some protection against cross-site request forgery
   * attacks (CSRF)
   */
  sameSite?: 'strict' | 'Strict' | 'lax' | 'Lax' | 'none' | 'None' | undefined

  /**
   * An attribute which will be serialized, conformably to RFC 6265
   * section 5.2.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [property: string]: any
}

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
