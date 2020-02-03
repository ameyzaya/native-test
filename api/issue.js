import instance from './instance';

export function IssueList(params) {
  return instance({
    url: `/issues/`,
    method: 'get',
    params,
  });
}

export function IssueDetail(id, params) {
  return instance({
    url: `/issues/${id}/`,
    method: 'get',
    params,
  });
}

export function PostIssue(payload) {
  return instance({
    url: `/issues/`,
    method: 'post',
    data: payload,
  });
}

export function PatchIssue(id, payload) {
  return instance({
    url: `/issues/${id}/`,
    method: 'patch',
    data: payload,
  });
}

// List of products
export function ProductList(params) {
  return instance({
    url: `/products/`,
    method: 'get',
    params,
  });
}

// List of users
export function UserList(params) {
  return instance({
    url: `/users/`,
    method: 'get',
    params,
  });
}
