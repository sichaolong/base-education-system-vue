import request from '@/utils/request'

export function createTable(data) {
    return request({
      url: '/declaration-form/principal',
      method: 'post',
      data
    })
  }

  export function updateTable(params,data) {
    return request({
      url: 'declaration-form/principal/'+params,
      method: 'post',
      data
    })
  }