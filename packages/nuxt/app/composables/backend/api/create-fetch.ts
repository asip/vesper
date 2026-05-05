import type { $Fetch } from 'ofetch'

export const createFetch = function (): $Fetch {
  return $fetch.create({}) as $Fetch
}
