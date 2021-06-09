import useSWR from "swr"
import { globalGet } from "../../../libs/fetcher"

export const useMembersById = (form) => {
  const getMembers = () => globalGet({
    url: `${process.env.API_URL}/members`,
    headers: {
      Authorization: `Bearer ${form?.token}`
    },
    params: {
      ...form
    },
  })


  const { data, mutate, error } = useSWR(form?.token && form?.user_id && form?.class_id ? 'get_member_by_id' : null, getMembers, {})
  const loading = !data & !error

  return {
    member: data,
    mutateMember: mutate,
    errMember: error,
    loadMember: loading
  }
}