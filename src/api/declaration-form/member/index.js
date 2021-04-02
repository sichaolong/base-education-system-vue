import request from '@/utils/request'


export function createTable(data) {
    return request({
      url: '/declaration-form/teachers',
      method: 'post',
      data
    })
  }

export function updateTable(params,data) {
    return request({
      url: '/declaration-form/teachers/'+params,
      method: 'post',
      data
    })
  }