import useSWR from "swr"
import { globalGet } from "../../../libs/fetcher"

export const useAllClass = (form) => {
  const getClass = () => globalGet({
    url: `${process.env.API_URL}/class`,
    params: {
      ...form
    }
  })

  const { data, mutate, error } = useSWR(form.user_id ? 'get_class' : null, getClass, {})
  const loading = !data & !error

  return {
    class: data,
    mutateClass: mutate,
    errClass: error,
    loadClass: loading
  }
}