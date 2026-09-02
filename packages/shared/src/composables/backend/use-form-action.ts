export const useFormAction = function () {
  const submit = (ev: Event | SubmitEvent) => {
    const el = ev.target as HTMLFormElement
    el.submit()
  }

  return { submit }
}
