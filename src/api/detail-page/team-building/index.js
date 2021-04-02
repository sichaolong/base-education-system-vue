import request from '@/utils/request'

export function fetchInfo(params) {
  return request({
    url: '/declaration-form/team-building/'+params,
    method: 'get',
    //params
  })
}