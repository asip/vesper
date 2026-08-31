export const useFormAction = function () {
  const submit = (ev: SubmitEvent) => {
    const el = ev.target as HTMLFormElement
    el.submit()
  }

  return { submit }
}
