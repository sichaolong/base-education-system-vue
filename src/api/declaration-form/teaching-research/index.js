import request from '@/utils/request'

export function createTable(data) {
    return request({
      url: '/declaration-form/teaching-research',
      method: 'post',
      data
    })
  }

export function updateTable(params,data) {
    return request({
      url: '/declaration-form/teaching-research/'+params,
      method: 'post',
      data
    })
  }