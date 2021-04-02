import request from '@/utils/request'

export function fetchRoleList(query) {
  return request({
    url: '/role/list/'+query,
    method: 'get',
    //params: query
  })
}
