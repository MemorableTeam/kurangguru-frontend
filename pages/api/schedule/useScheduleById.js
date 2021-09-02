import useSWR from "swr"
import { globalGet } from "../../../libs/fetcher"

export const useScheduleById = (day, userId, token) => {
  const getScheduleList = () => globalGet({
    url: `${process.env.API_URL}/class/schedule`,
    params: {
      day: day,
      user_id: userId ? userId : undefined,
    },
    headers: {
      'Authorization': token ? `Bearer ${token}` : undefined
    }
  })


  const { data, mutate, error } = useSWR(day && userId && token ? 'get_schedule_by_id' : null, getScheduleList, {})
  const loading = !data & !error

  return {
    list: data,
    mutateList: mutate,
    errList: error,
    loadList: loading
  }
}