import useSWR from "swr"
import { globalGet } from "../../../libs/fetcher"

export const useTopics = (form) => {
  console.log(form)
  const getTopic = () => globalGet({
    url: `${process.env.API_URL}/topics`,
    headers: {
      Authorization: `Bearer ${form?.token}`
    },
    params: {
      ...form
    },
  })


  const { data, mutate, error } = useSWR(form.token && form.user_id && form.class_id ? 'get_topics' : null, getTopic, {})
  const loading = !data & !error

  return {
    topic: data,
    mutateTopic: mutate,
    errTopic: error,
    loadTopic: loading
  }
}