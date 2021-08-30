import useSWR from "swr"
import { globalGet } from "../../../libs/fetcher"

export const useClassByUser = (form) => {
  const getClass = () => globalGet({
    url: `${process.env.API_URL}/class/user`,
    headers: {
      Authorization: `Bearer ${form?.token}`
    },
    params: {
      user_id: form?.userId
    },
  })


  const { data, mutate, error } = useSWR(form?.userId ? 'get_class_by_user' : null, getClass, {})
  const loading = !data & !error

  return {
    class: data,
    mutateClass: mutate,
    errClass: error,
    loadClass: loading
  }
}