import request from '@/utils/request'
// 1. 查 全部待办事项
export function getInfo(userNumber) {
    return request({
        url: '/to-do/get-info/' + userNumber,
        method: 'get',
        //data
    })
}


// 2. 申请修改备案表
// 向 当前审核人 发送 新的待办事项
export function applicationForUpdate(data, userNumber) {
    return request({
        url: '/to-do/save-info/' + userNumber,
        method: 'post',
        data
    })
}

// 3. 删除待办项
export function deleteToDoItem(data, userNumber) {
    return request({
        url: '/to-do/delete-info/' + userNumber,
        method: 'delete',
        data
    })
}

// 校级管理员---》获得等待审核申报表的数量

// 校级管理员---》获得等待校级审核的数量、等待分配的数量

// 评审专家---》获取已分配给自己未评分的

export function getNumbersInfo(userNumber) {
    return request({
        url: '/to-do/get-numbers-info/' + userNumber,
        method: 'get'

    })
}





