import request from '@/utils/request'

export function fetchInfo(params) {
  return request({
    url: '/declaration-form/teaching-research/'+params,
    method: 'get',
    //params
  })
}