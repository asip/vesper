import { useState } from 'nuxt/app'

interface MorePage {
  current: number
  prev: boolean
  next: boolean
  min: number
  max: number
}

export const useMorePage = function ({
  key = null,
  page = 1,
  pages,
}: {
  key?: string | null
  page: number
  pages: number
}): {
  currentPage: WritableComputedRef<number>
  prev: WritableComputedRef<boolean>
  next: WritableComputedRef<boolean>
  pagePrev: WritableComputedRef<boolean>
  pageNext: WritableComputedRef<boolean>
  minPage: WritableComputedRef<number>
  maxPage: WritableComputedRef<number>
  init: () => void
  decrement: () => void
  increment: () => void
} {
  const toFirstUpper = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const morePage = useState<MorePage>(key ? `morePageFor${toFirstUpper(key)}` : 'morePage', () => {
    return {
      current: 1,
      prev: false,
      next: false,
      min: 1,
      max: 1,
    }
  })

  const currentPage = computed<number>({
    get() {
      return morePage.value.current
    },
    set(value: number) {
      morePage.value.current = value
    },
  })

  const prev = computed<boolean>({
    get() {
      return morePage.value.prev
    },
    set(value: boolean) {
      morePage.value.prev = value
    },
  })
  const next = computed<boolean>({
    get() {
      return morePage.value.next
    },
    set(value: boolean) {
      morePage.value.next = value
    },
  })

  const minPage = computed<number>({
    get() {
      return morePage.value.min
    },
    set(value: number) {
      morePage.value.min = value
    },
  })
  const maxPage = computed<number>({
    get() {
      return morePage.value.max
    },
    set(value: number) {
      morePage.value.max = value
    },
  })

  const minMaxPage = () => {
    morePage.value.min = morePage.value.current < page ? morePage.value.current : page
    morePage.value.max = morePage.value.current > page ? morePage.value.current : page
  }

  const prevNext = () => {
    if (morePage.value.current === 1) morePage.value.prev = false
    if (morePage.value.current === pages) morePage.value.next = false
    // console.log(`page prev: ${prev.value}`)
    // console.log(`page next: ${next.value}`)
  }

  const init = () => {
    morePage.value.current = page
    morePage.value.prev = true
    morePage.value.next = true
    minMaxPage()
    prevNext()
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
    currentPage,
    prev,
    next,
    pagePrev: prev,
    pageNext: next,
    minPage,
    maxPage,
    init,
    decrement,
    increment,
  }
}

export const useMoreScroll = useMorePage
