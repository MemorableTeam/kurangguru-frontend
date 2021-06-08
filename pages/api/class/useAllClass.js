import useSWR from "swr"
import { globalGet } from "../../../libs/fetcher"

export const useAllClass = (userId) => {
  const getClass = () => globalGet({
    url: `${process.env.API_URL}/class`,
    params: {
      user_id: userId
    }
  })


  const { data, mutate, error } = useSWR(userId ? 'get_class' : null, getClass, {})
  const loading = !data & !error

  return {
    class: data,
    mutateClass: mutate,
    errClass: error,
    loadClass: loading
  }
}