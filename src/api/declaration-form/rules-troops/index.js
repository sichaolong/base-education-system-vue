import request from '@/utils/request'

export function createTable(data) {
    return request({
      url: '/declaration-form/rules-and-regulations',
      method: 'post',
      data
    })
  }

export function updateTable(params,data) {
    return request({
      url: '/declaration-form/rules-and-regulations/'+params,
      method: 'post',
      data
    })
  }