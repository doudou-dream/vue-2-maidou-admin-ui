import Layout from '@/layout'

export default {
  path: '/rule',
  component: Layout,
  children: [
    {
      path: '/rule/index',
      name: 'rule',
      component: () => import('@/views/rule/index'),
      meta: {
        title: '权限管理',
        icon: 'el-icon-menu',
        roles: [
          'maidou.rule.index'
        ]
      }
    }
  ]
}
