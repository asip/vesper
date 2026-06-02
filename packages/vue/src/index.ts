export {
  useOFetch,
  useMutationApi,
  useQueryApi,
  useExternalErrors,
  useApiError,
  useApiError as useAlert,
  useElement,
  useDate,
  useEntity,
  useFlash,
  useConfig,
  useDatetimeLocal,
  useLocale,
  useNanoRoute,
  useTimeZone,
  useMorePage,
  useMorePage as useMoreScroll,
  type UseApiErrorType,
  type UseApiErrorType as UseAlertType,
  type UseFlashType,
  type UseNanoRouteType,
} from './composables'

export { i18n } from './i18n'

export type {
  BackendErrorInfo,
  BackendErrorResource,
  ErrorsResource,
  Flash,
  ErrorMessages,
  AsyncDataRequestStatus,
  MorePage,
} from './types'
