import request from '@/utils/request'



export function createTable(data) {
    return request({
      url: '/declaration-form/practical-teaching',
      method: 'post',
      data
    })
  }

export function updateTable(params,data) {
    return request({
      url: '/declaration-form/practical-teaching/'+params,
      method: 'post',
      data
    })
  }