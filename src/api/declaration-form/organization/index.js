import request from '@/utils/request'



export function createTable(data) {
    return request({
      url: '/declaration-form/teaching-organization',
      method: 'post',
      data
    })
  }

export function updateTable(params,data) {
    return request({
      url: '/declaration-form/teaching-organization/'+params,
      method: 'post',
      data
    })
  }