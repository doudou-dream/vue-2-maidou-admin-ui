const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // token
  avatar: state => state.user.avatar, // 头像
  name: state => state.user.name, // 账号
  roles: state => state.user.roles, // 权限
  permission_routes: state => state.permission.routes// 路由
}
export default getters
