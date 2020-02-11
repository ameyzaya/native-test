import { axios } from "@/utils/request";

export function ProductList(params) {
  return axios({
    url: `/products/`,
    method: "get",
    params
  });
}