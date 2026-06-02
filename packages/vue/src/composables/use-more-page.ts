import { computed /* type WritableComputedRef */ } from '@vue/reactivity'

// import { MorePage } from '~/types'

import { useMorePageStore } from '~/stores'

export const useMorePage = function (options?: { key?: string | null }) {
  const key = options?.key

  const { morePage } = useMorePageStore(key)

  const firstPage = computed<number>({
    get() {
      return morePage.value.first
    },
    set(value: number) {
      const morePage_ = { ...morePage.value }
      morePage_.first = value
      morePage_.current = value

      morePage_.min = value
      morePage_.max = value

      morePage_.prev = false
      morePage_.next = false
      morePage.value = morePage_
    },
  })

  const pages = computed<number>({
    get() {
      return morePage.value.pages
    },
    set(value: number) {
      const morePage_ = { ...morePage.value }
      morePage_.pages = value

      morePage.value = morePage_
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
    const morePage_ = { ...morePage.value }
    morePage_.min = morePage_.current < morePage_.min ? morePage_.current : morePage_.min
    morePage_.max = morePage_.current > morePage_.max ? morePage_.current : morePage_.max
    morePage.value = morePage_
  }

  const prevNext = () => {
    const morePage_ = { ...morePage.value }
    morePage_.prev = morePage_.min <= 1 ? false : true
    morePage_.next = morePage_.max >= morePage_.pages ? false : true
    morePage.value = morePage_
    // console.log(`page prev: ${prev.value}`)
    // console.log(`page next: ${next.value}`)
  }

  const decrement = () => {
    const morePage_ = { ...morePage.value }
    morePage_.current = morePage_.min - 1
    morePage.value = morePage_
    minMaxPage()
    prevNext()
  }

  const increment = () => {
    const morePage_ = { ...morePage.value }
    morePage_.current = morePage_.max + 1
    morePage.value = morePage_
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
