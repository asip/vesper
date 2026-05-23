import { useRuntimeConfig } from 'nuxt/app'

export const useApiConfig = function (): {
  baseURL: ComputedRef<string>
} {
  const runtimeConfig = useRuntimeConfig()

  const baseOrigin = computed<string | undefined>(() => {
    if (import.meta.client) {
      return runtimeConfig.public.backendApiOrigin as string
    } else if (import.meta.server) {
      return (runtimeConfig.backendApiOrigin ?? runtimeConfig.public.backendApiOrigin) as string
    }
  })

  const basePath = runtimeConfig.public.backendApiPath as string

  const baseURL = computed<string>(() => `${baseOrigin.value}${basePath}`)

  return { baseURL }
}
