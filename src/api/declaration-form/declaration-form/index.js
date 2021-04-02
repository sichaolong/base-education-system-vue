import request from '@/utils/request'
// 增
export function createTable(data) {
  return request({
    url: '/declaration-form/total',
    method: 'post',
    data
  })
}
// 更新info
export function updateTable(data, formID) {
  return request({
    url: '/declaration-form/total/' + formID,
    method: 'post',
    data
  })
}


