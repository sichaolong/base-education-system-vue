import request from '@/utils/request'


export function createTable(data) {
    return request({
      url: '/declaration-form/course-material',
      method: 'post',
      data
    })
  }

export function updateTable(params,data) {
    return request({
      url: '/declaration-form/course-material/'+params,
      method: 'post',
      data
    })
  }