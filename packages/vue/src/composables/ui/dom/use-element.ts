import { computed, type Ref } from '@vue/reactivity'

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const useElement = function <EL extends Element, P extends string>(
  el: EL | undefined | null,
  { property }: { property: P },
) {
  const propertyRef = computed<string, string | null | undefined>({
    get() {
      return el && property in el
        ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
          ((el as any)[property] as string)
        : ''
    },
    set(value: string | null | undefined) {
      if (el && property in el) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        ;(el as any)[property] = value ?? ''
      }
    },
  })

  const obj: Partial<Record<P, Ref<string, string | null | undefined>>> = {}
  obj[property] = propertyRef

  return obj as Record<P, Ref<string, string | null | undefined>>
}
