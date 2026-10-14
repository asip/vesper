import { Ref } from '@vue/reactivity'

export type CookieRef<T> = Ref<T | null | undefined, T | string | null | undefined>
