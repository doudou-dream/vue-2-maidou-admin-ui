import Layout from '@/layout'

export default {
  path: '/group',
  component: Layout,
  children: [
    {
      path: '/group/index',
      name: 'group',
      component: () => import('@/views/group/index'),
      meta: {
        title: '角色管理',
        icon: 'el-icon-s-operation',
        roles: [
          'maidou.group.index'
        ]
      }
    }
  ]
}
