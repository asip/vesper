import type { Router, RouterConfig, ParamsFromConfig } from '@nanostores/router'

export const useNanoRoute = function <T extends RouterConfig>(
  router: Router<T>,
): {
  params: ParamsFromConfig<T>[string] | undefined
  query: Record<string, string> | undefined
  path: string | undefined
} {
  const page = router.get()

  const params = page?.params as ParamsFromConfig<T>[string]
  const query = page?.search
  const path = page?.path

  // globalThis.console.log(path)
  // globalThis.console.log(query)

  return { params, query, path }
}

export type UseNanoRouteType = ReturnType<typeof useNanoRoute>
