import request from '@/utils/request'


export function createTable(data) {
    return request({
      url: '/declaration-form/condition-guarantee',
      method: 'post',
      data
    })
  }

export function updateTable(params,data) {
    return request({
      url: '/declaration-form/condition-guarantee/'+params,
      method: 'post',
      data
    })
  }