import useSWR from "swr"
import { globalGet } from "../../../libs/fetcher"

export const useUser = (userId) => {
  const getUser = () => globalGet({
    url: `${process.env.API_URL}/users`,
    params: {
      id: userId
    }
  })


  const { data, mutate, error } = useSWR(userId ? 'get_user' : null, getUser, {})
  const loading = !data & !error
  console.log(data, 'use User')
  return {
    user: data,
    mutateUser: data,
    errUser: error,
    loadUser: loading
  }
}