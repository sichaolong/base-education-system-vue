import request from '@/utils/request'

export function fetchInfo(params) {
  return request({
    url: '/declaration-form/condition-guarantee/'+params,
    method: 'get',
   // params
  })
}