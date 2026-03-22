import { Router, RouterConfig } from '@nanostores/router'

export function useNanoRoute<T extends RouterConfig>(router: Router<T>) {
  const page = router.get()

  const params = page?.params
  const query = page?.search
  const path = page?.path

  // globalThis.console.log(path)
  // globalThis.console.log(query)

  return { params, query, path }
}

export type UseNanoRouteType = ReturnType<typeof useNanoRoute>
