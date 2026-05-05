import { useRequestFetch } from 'nuxt/app'
import type { $Fetch } from 'ofetch'

export const createRequestFetch = function (): $Fetch {
  return useRequestFetch() as $Fetch
}
