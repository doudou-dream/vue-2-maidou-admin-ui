/**
 * 加载动态路由
 */
const routers = []
const routeFiles = require.context('@/views/', true, /router.js$/)
routeFiles.keys().map(item => {
  if (Object.keys(routeFiles(item).default).length !== 0) {
    routers.push(routeFiles(item).default)
  }
})

export default routers
