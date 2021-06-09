import useSWR from "swr"
import { globalGet } from "../../../libs/fetcher"

export const useScheduleByDay = (day, userId, token) => {
  const getSchedule = () => globalGet({
    url: `${process.env.API_URL}/class/schedule`,
    params: {
      day: day,
      user_id: userId ? userId : undefined,
    },
    headers: {
      'Authorization': token ? `Bearer ${token}` : undefined
    }
  })


  const { data, mutate, error } = useSWR(day && token ? 'get_schedule_by_day' : null, getSchedule, {})
  const loading = !data & !error

  return {
    list: data,
    mutateList: mutate,
    errList: error,
    loadList: loading
  }
}