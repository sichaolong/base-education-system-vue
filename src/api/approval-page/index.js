import request from '@/utils/request'

// 查
export function fetchInfo() {
  return request({
    url: '/approval-page',
    method: 'get',
   // params
  })
}

// 增
export function updateInfo(data) {
  return request({
    url: '/approval-page',
    method: 'post',
    data
  })
}
// 删
export function deleteInfo(data) {
  return request({
    url: '/approval-page',
    method: 'delete',
    data
  })
}