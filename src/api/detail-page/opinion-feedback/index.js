import request from '@/utils/request'



export function updateInfo(params,data) {
  return request({
    url: '/declaration-form/opinion-feedback/'+params,
    method: 'post',
    data
  })
}

export function fetchInfo(params) {
  return request({
    url: '/declaration-form/opinion-feedback/'+params,
    method: 'get',

  })
}