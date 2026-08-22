import { computed } from '@vue/reactivity'

import { useMorePageStore } from '~/stores'

export const useMorePage = function (options?: { key?: string | null }) {
  const key = options?.key

  const { morePage } = useMorePageStore(key)

  const firstPage = computed<number>({
    get() {
      return morePage.value.first
    },
    set(value: number) {
      morePage.value.first = value
      morePage.value.current = value

      morePage.value.min = value
      morePage.value.max = value

      morePage.value.prev = false
      morePage.value.next = false
    },
  })

  const pages = computed<number>({
    get() {
      return morePage.value.pages
    },
    set(value: number) {
      morePage.value.pages = value
      minMaxPage()
      prevNext()
    },
  })

  const currentPage = computed<number>(() => morePage.value.current)

  const prev = computed<boolean>(() => morePage.value.prev)
  const next = computed<boolean>(() => morePage.value.next)

  const minPage = computed<number>(() => morePage.value.min)
  const maxPage = computed<number>(() => morePage.value.max)

  const minMaxPage = () => {
    morePage.value.min =
      morePage.value.current < morePage.value.min ? morePage.value.current : morePage.value.min
    morePage.value.max =
      morePage.value.current > morePage.value.max ? morePage.value.current : morePage.value.max
  }

  const prevNext = () => {
    morePage.value.prev = morePage.value.min <= 1 ? false : true
    morePage.value.next = morePage.value.max >= morePage.value.pages ? false : true
  }

  const decrement = () => {
    morePage.value.current = morePage.value.min - 1
    minMaxPage()
    prevNext()
  }

  const increment = () => {
    morePage.value.current = morePage.value.max + 1
    minMaxPage()
    prevNext()
  }

  return {
    firstPage,
    pages,
    currentPage,
    prev,
    next,
    minPage,
    maxPage,
    decrement,
    increment,
  }
}
