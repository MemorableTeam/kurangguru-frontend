import useSWR from "swr"
import { globalGet } from "../../../libs/fetcher"

export const useClassById = (id) => {
  const getClass = () => globalGet({
    url: `${process.env.API_URL}/class`,
    params: {
      id: id
    }
  })


  const { data, mutate, error } = useSWR(id ? 'get_class_by_id' : null, getClass, {})
  const loading = !data & !error

  return {
    class: data,
    mutateClass: mutate,
    errClass: error,
    loadClass: loading
  }
}