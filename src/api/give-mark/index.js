// 审核专家打分
import request from '@/utils/request'
export function giveMark(formID, data) {
    return request({
        url: '/evaluate/total-score/' + formID +'/' + data,
        method: 'post',
        
    })
}