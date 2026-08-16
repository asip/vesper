import { computed, type Ref } from '@vue/reactivity'

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const useElement = function <EL extends Element>(
  el: EL | undefined | null,
  { property, properties }: { property?: string; properties?: string[] },
): Record<string, Ref<string, string | null | undefined>> {
  const obj: Partial<Record<string, Ref<string, string | null | undefined>>> = {}

  const toLowerCamel = (str: string) => {
    return str.toLowerCase().replace(/(-[a-z])/g, (group) => group.toUpperCase().replace('-', ''))
  }

  const addPropertyRef = (prop: string) => {
    const dataAttrProp = prop.startsWith('data-')
      ? toLowerCamel(prop.replace('data-', ''))
      : undefined

    const propertyRef = computed<string, string | null | undefined>({
      get() {
        if (dataAttrProp) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return el && 'dataset' in el && dataAttrProp in (el.dataset as any) // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
            ? ((el.dataset as any)[dataAttrProp] as string)
            : ''
        } else {
          return el && prop in el
            ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
              ((el as any)[prop] as string)
            : ''
        }
      },
      set(value: string | null | undefined) {
        if (dataAttrProp) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (el && 'dataset' in el && dataAttrProp in (el.dataset as any)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
            ;(el.dataset as any)[dataAttrProp] = value ?? ''
          }
        } else {
          if (el && prop in el) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
            ;(el as any)[prop] = value ?? ''
          }
        }
      },
    })

    obj[prop] = propertyRef
  }

  if (property) {
    addPropertyRef(property)
  } else if (properties && properties.length > 0) {
    properties.forEach((prop) => {
      addPropertyRef(prop)
    })
  }

  return obj as Record<string, Ref<string, string | null | undefined>>
}
