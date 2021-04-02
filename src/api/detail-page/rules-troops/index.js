import request from '@/utils/request'

//获取规章制度建设
export function fetchInfoRule(params) {
  return request({
    url: '/declaration-form/rules-and-regulations/'+params,
    method: 'get',
    //params
  })
}

//获取队伍建设
export function fetchInfoTroop(params) {
    return request({
      url: '/declaration-form/principal/'+params,
      method: 'get',
      //params
    })
  }