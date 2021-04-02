import request from '@/utils/request'

export function fetchInfo(params) {
  return request({
    url: '/declaration-form/teachers/'+params,
    method: 'get',
   // params
  })
}