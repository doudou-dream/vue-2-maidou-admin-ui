const Mock = require('mockjs')

const data = Mock.mock({
  'items|10': [{
    id: '@id',
    title: '@name(1)',
    url: '@name(1)',
    method: '@name(1)',
    slug: '@name(1)',
    name: '@name(1)',
    nickname: '@name(1)',
    create_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})

module.exports = [
  // demo
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length + 10,
          items: items,
          page: 1,
          limit: 10
        }
      }
    }
  }
]
