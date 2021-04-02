import request from '@/utils/request'


//教学组织
export function fetchInfo(params) {
  return request({
    url: '/declaration-form/teaching-organization/'+params,
    method: 'get',
    //params
  })
}



