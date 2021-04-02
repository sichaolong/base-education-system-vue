import request from '@/utils/request'

export function fetchInfo(params) {
  return request({
    url: '/declaration-form/specialty-construction/'+params,
    method: 'get',
    //params
  })
}