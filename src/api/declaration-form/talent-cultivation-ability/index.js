import request from '@/utils/request'


export function createTable(data) {
    return request({
      url: '/declaration-form/talent-cultivation-ability',
      method: 'post',
      data
    })
  }

export function updateTable(params,data) {
    return request({
      url: '/declaration-form/talent-cultivation-ability/'+params,
      method: 'post',
      data
    })
  }