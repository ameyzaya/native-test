import instance from './instance';

export function Login(payload) {
  return instance({
    url: `/rest-auth/login/`,
    method: 'post',
    data: payload,
  });
}
