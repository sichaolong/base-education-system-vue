import request from '@/utils/request'

export function fetchInfo(params) {
  return request({
    url: '/declaration-form/talent-cultivation-ability/'+params,
    method: 'get',
    //params
  })
}