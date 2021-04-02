import request from '@/utils/request'


export function createTable(data) {
    return request({
      url: '/declaration-form/team-building',
      method: 'post',
      data
    })
  }

export function updateTable(params,data) {
    return request({
      url: '/declaration-form/team-building/'+params,
      method: 'post',
      data
    })
  }