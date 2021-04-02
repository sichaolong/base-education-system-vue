// 申报表的评分分配
import request from '@/utils/request'


// 1. 获取审核过的申报表，包含分配的、未分配的
export function fetchInfoAll() {
    return request({
        url: '/dispatch-form/all',
        method: 'get',
        // params
    })
}

// 2. 获取未分配的申报表
export function fetchInfoUndispatch() {
    return request({
        url: '/dispatch-form/undispatch',
        method: 'get',
        // params
    })
}

// 3. 将勾选中的审核表 分配给 专家

export function updateDispatchInfo(userNumber, data) {
    return request({
        url: '/dispatch-form/' + userNumber,
        method: 'post',
        // params
        data: data
    })
}

// 4. 获取评审专家
export function fetchUserInfo() {
    return request({
        url: '/dispatch-form/users',
        method: 'get',
        // params
        //data:data
    })
}



