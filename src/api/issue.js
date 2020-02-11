import { axios } from "@/utils/request";

export function IssueList(params) {
  return axios({
    url: `/issues/`,
    method: "get",
    params
  });
}

export function IssueDetail(id, params) {
  return axios({
    url: `/issues/${id}`,
    method: "get",
    params
  });
}

export function PostIssue(payload) {
  return axios({
    url: `/issues/`,
    method: "post",
    data: payload
  });
}

export function UpdateIssue(id, payload) {
  return axios({
    url: `/issues/${id}/`,
    method: "patch",
    data: payload
  });
}

export function DeleteIssue(id, params) {
  return axios({
    url: `/issues/${id}/`,
    method: "delete",
    params
  });
}
