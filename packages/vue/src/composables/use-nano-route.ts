import type { Router, RouterConfig, ParamsFromConfig } from '@nanostores/router'

export const useNanoRoute = function <T extends RouterConfig>(
  router: Router<T>,
): {
  params: ParamsFromConfig<T>[string] | undefined
  query: Record<string, string> | undefined
  path: string | undefined
} {
  const page = router.get()

  const params = page?.params ? (page.params as ParamsFromConfig<T>[string]) : undefined
  const query = page?.search
  const path = page?.path

  return { params, query, path }
}

export type UseNanoRouteType = ReturnType<typeof useNanoRoute>
