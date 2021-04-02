import request from '@/utils/request'


//教学组织
export function fetchInfo(params) {
  return request({
    url: 'declaration-form/future-construction-plan/'+params,
    method: 'get',
    //params
  })
}