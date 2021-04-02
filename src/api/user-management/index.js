import request from '@/utils/request'

export function fetchUserList(data) {
  return request({
    url: '/users/list',
    method: 'post',
    data:data
  })
}


export function fetchUser(userNumber) {
  return request({
    url: '/users/detail/' + userNumber,
    method: 'get',
    //params: { userNumber }
  })
}

export function createUser(data) {
  return request({
    url: '/users/create',
    method: 'post',
    data
  })
}

export function deleteUser(userNumber) {
  return request({
    url: '/users/delete/' + userNumber,
    method: 'delete',
    //data: { userNumber }
  })
}

export function updateUser(data, userNumber) {
  return request({
    url: '/users/update/' + userNumber,
    method: 'post',
    data
  })
}


export function fetchCollegeList() {
  return request({
    url: '/college/list',
    method: 'get'
  })
}
