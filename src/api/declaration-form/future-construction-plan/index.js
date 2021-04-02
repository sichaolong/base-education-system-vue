import request from '@/utils/request'


export function createTable(data) {
    return request({
      url: '/declaration-form/future-construction-plan',
      method: 'post',
      data
    })
  }

export function updateTable(params,data) {
    return request({
      url: '/declaration-form/future-construction-plan/'+params,
      method: 'post',
      data
    })
  }