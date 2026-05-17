import { useState } from 'nuxt/app'

interface MorePage {
  first: number
  pages: number
  current: number
  prev: boolean
  next: boolean
  min: number
  max: number
}

export const useMorePage = function (options?: { key?: string | null }): {
  currentPage: ComputedRef<number>
  prev: ComputedRef<boolean>
  next: ComputedRef<boolean>
  minPage: ComputedRef<number>
  maxPage: ComputedRef<number>
  initBefore: (page: number) => void
  initAfter: (pages: number) => void
  decrement: () => void
  increment: () => void
} {
  const key = options?.key

  const toFirstUpper = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const morePage = useState<MorePage>(key ? `morePageFor${toFirstUpper(key)}` : 'morePage', () => {
    return {
      first: 1,
      pages: 1,
      current: 1,
      prev: false,
      next: false,
      min: 1,
      max: 1,
    }
  })

  const currentPage = computed<number>(() => morePage.value.current)

  const prev = computed<boolean>(() => morePage.value.prev)
  const next = computed<boolean>(() => morePage.value.next)

  const minPage = computed<number>(() => morePage.value.min)
  const maxPage = computed<number>(() => morePage.value.max)

  const minMaxPage = () => {
    morePage.value.min =
      morePage.value.current < morePage.value.first ? morePage.value.current : morePage.value.first
    morePage.value.max =
      morePage.value.current > morePage.value.first ? morePage.value.current : morePage.value.first
  }

  const prevNext = () => {
    morePage.value.prev = morePage.value.min === 1 ? false : true
    morePage.value.next = morePage.value.max === morePage.value.pages ? false : true
    // console.log(`page prev: ${prev.value}`)
    // console.log(`page next: ${next.value}`)
  }

  const initBefore = (page: number) => {
    morePage.value.first = page
    morePage.value.current = page

    morePage.value.prev = false
    morePage.value.next = false
  }

  const initAfter = (pages: number) => {
    morePage.value.pages = pages
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
    minPage,
    maxPage,
    initBefore,
    initAfter,
    decrement,
    increment,
  }
}

export const useMoreScroll = useMorePage
