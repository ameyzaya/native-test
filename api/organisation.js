import instance from './instance';

export function OrganisationList(params) {
  return instance({
    url: `/organisations`,
    method: 'get',
    params,
  });
}

export function OrganisationDetail(id, params) {
  return instance({
    url: `/organisations/${id}`,
    method: 'get',
    params,
  });
}

export function StudentList(params) {
  return instance({
    url: `/students`,
    method: 'get',
    params,
  });
}

export function GradeList(params) {
  return instance({
    url: `/grades`,
    method: 'get',
    params,
  });
}

export function PassageList(params) {
  return instance({
    url: `/passages`,
    method: 'get',
    params,
  });
}
