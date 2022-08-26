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
  // 登录认证
  {
    url: '/login',
    type: 'post',
    response: console => {
      return {
        code: 0,
        data: {
          token: 'maidou'
        },
        message: '登录成功'
      }
    }
  },
  // 获取权限和用户信息
  {
    url: '/login/info',
    type: 'get',
    response: console => {
      return {
        code: 0,
        data: {
          roles: [
            'maidou.admin.index', 'maidou.admin.create', 'maidou.admin.access', 'maidou.admin.update', 'maidou.admin.detail', 'maidou.admin.modifyPassword', 'maidou.admin.delete',
            'maidou.rule.index',
            'maidou.group.index'
          ],
          name: '麦兜',
          avatar: null
        },
        message: '获取成功'
      }
    }
  },
  // 退出登录
  {
    url: '/login/logout',
    type: 'delete',
    response: console => {
      return {
        code: 0,
        data: {},
        message: '退出成功'
      }
    }
  },
  // 管理员列表
  {
    url: '/admin',
    type: 'get',
    response: console => {
      const items = data.items
      return {
        code: 0,
        data: {
          total: items.length + 10,
          data: items,
          limit: 10
        },
        message: ''
      }
    }
  },
  // 角色列表
  {
    url: '/group',
    type: 'get',
    response: console => {
      const items = data.items
      return {
        code: 0,
        data: {
          total: items.length + 10,
          data: items,
          limit: 10
        },
        message: ''
      }
    }
  },
  // 权限列表
  {
    url: '/rule',
    type: 'get',
    response: console => {
      const items = data.items
      return {
        code: 0,
        data: {
          total: items.length + 10,
          data: items,
          limit: 10
        },
        message: ''
      }
    }
  }
]
