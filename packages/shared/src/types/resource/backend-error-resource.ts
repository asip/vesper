import type { ErrorsResource } from './errors-resource'

export interface BackendErrorResource extends ErrorsResource<string[]> {
  source?: string
  title: string
}
