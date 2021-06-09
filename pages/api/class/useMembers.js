import useSWR from "swr"
import { globalGet } from "../../../libs/fetcher"

export const useMembers = (form) => {
  const getMembers = () => globalGet({
    url: `${process.env.API_URL}/members`,
    headers: {
      Authorization: `Bearer ${form?.token}`
    },
    params: {
      ...form
    },
  })


  const { data, mutate, error } = useSWR(form.token && form.class_id ? 'get_members' : null, getMembers, {})
  const loading = !data & !error

  return {
    member: data,
    mutateMember: mutate,
    errMember: error,
    loadMember: loading
  }
}