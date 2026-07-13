import type { BackendErrorResource } from './backend-error-resource'
import type { ErrorMessages } from '../error-messages'
import type { ErrorsResource } from './errors-resource'

export type BackendErrorsResource<T extends object = BackendErrorResource> =
  | ErrorsResource<ErrorMessages<string>>
  | T
