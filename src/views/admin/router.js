import Layout from '@/layout'

export default {
  path: '/admin',
  component: Layout,
  children: [
    {
      path: '/admin/index',
      name: 'admin',
      component: () => import('@/views/admin/index'),
      meta: {
        title: '账号管理',
        icon: 'el-icon-user-solid',
        roles: [
          'maidou.group.index'
        ]
      }
    }
  ]
}
