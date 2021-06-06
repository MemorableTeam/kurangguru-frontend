import { globalPatch } from "../../../libs/fetcher"

export const actionUser = {
  updateUser: (data) => {
    globalPatch({
      url: `${process.env.API_URL}/users`,
      data: data,
      hearder: {
        'user-token': 'rtre'
      }
    })
  }
}