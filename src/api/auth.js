import { axios } from "@/utils/request";

export function Login(payload) {
  return axios({
    url: `/rest-auth/login/`,
    method: "post",
    data: payload
  });
}