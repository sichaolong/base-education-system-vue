import request from '@/utils/request'

export function fetchInfo(params) {
  return request({
    url: '/declaration-form/practical-teaching/'+params,
    method: 'get',
    //params
  })
}