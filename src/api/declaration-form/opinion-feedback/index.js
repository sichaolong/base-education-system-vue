import request from '@/utils/request'
// 根据默认数据在填写完申报表的同时创建 表 opinionFeedback表
export function createOpinionTable(data) {
    return request({
      url: '/declaration-form/opinion-feedback',
      method: 'post',
      data
      
    })
  }