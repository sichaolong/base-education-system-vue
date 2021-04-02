import request from '@/utils/request'

export function fetchInfo(params) {
  return request({
    url: '/declaration-form/principal/'+params,
    method: 'get',
    //params
  })
}
