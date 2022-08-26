import { arraySort } from '@/utils'
import { constantRoutes } from '@/router'
import extensions from '@/utils/extensions'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

/** 菜单排序 */
function routesSort(route) {
  route.forEach(function(item, key) {
    const sort = item.sort
    if (sort === undefined || sort === '') {
      route[key]['sort'] = 100
    } else {
      route[key]['sort'] = sort
    }

    if (item.children) {
      routesSort(item.children)
    }
  })

  arraySort(route, 'sort')
}
const state = {
  routes: [], // 路由菜单
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(extensions, roles)
      routesSort(accessedRoutes)
      // 404页面
      accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
