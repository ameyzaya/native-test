import { axios } from "@/utils/request";

export function PostComment(payload) {
  return axios({
    url: `/comments/`,
    method: "post",
    data: payload
  });
}
