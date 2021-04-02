import request from '@/utils/request'

export function createTable(data) {
    return request({
      url: '/declaration-form/specialty-construction',
      method: 'post',
      data
    })
  }

export function updateTable(params,data) {
    return request({
      url: '/declaration-form/specialty-construction/'+params,
      method: 'post',
      data
    })
  }