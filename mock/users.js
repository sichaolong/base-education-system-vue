const Mock = require('mockjs')

const data = Mock.mock({
  'items|20': [{
    userNumber: '@id',
    name: '@cname()',
    college: '@cword(3, 4)',
    'role|1': ['教师', '院级管理员', '校级管理院', '评审专家'],
  }]
})

module.exports = [
  {
    url: '/user/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          items,
          total: items.length
        }
      }
    }
  }
]