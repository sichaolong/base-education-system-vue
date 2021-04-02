import request from '@/utils/request'

export function fetchTeacherInfo(query) {
  return request({
    url: '/user/teacher/info',
    method: 'get',
    params: query
  })
}

export function updateTeacherInfo(data) {
  return request({
    url: '/user/teacher/info/update',
    method: 'post',
    data
  })
}