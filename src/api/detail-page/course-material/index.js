import request from '@/utils/request'


//教学组织
export function fetchInfo(params) {
  return request({
    url: 'declaration-form/course-material/'+params,
    method: 'get',
    //params
  })
}