import { axios } from "@/utils/request";

export function UserList(params) {
  return axios({
    url: `/users/`,
    method: "get",
    params
  });
}