import request from '@/utils/request'


// 1. 在approval-page中根据formID获取当前点击申报表的整体信息
export function getForm(formID) {
  return request({
    url: '/declaration-form/total/' + formID,
    method: 'get',

  })
}


// 2. 更新当前表单的审核状态和审核人
export function updateInfo(params, data) {
  return request({
    url: 'declaration-form/status-reviewer/' + params,
    method: 'post',
    data
  })
}
