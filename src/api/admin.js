import request from '@/utils/request'

/**
 * 列表
 * @param params
 * @returns {AxiosPromise}
 */
export function list(params) {
  return request({
    url: '/admin',
    method: 'get',
    params
  })
}

/**
 * 创建
 * @param data
 * @returns {AxiosPromise}
 */
export function create(data) {
  return request({
    url: '/admin',
    method: 'post',
    data
  })
}

/**
 * 修改
 * @param id
 * @param data
 * @returns {AxiosPromise}
 */
export function update(id, data) {
  return request({
    url: `/admin/${id}`,
    method: 'put',
    data
  })
}

/**
 * 详情
 * @param id
 * @returns {AxiosPromise}
 */
export function detail(id) {
  return request({
    url: `/admin/${id}`,
    method: 'get'
  })
}

/**
 * 删除
 * @param id
 * @returns {AxiosPromise}
 */
export function del(id) {
  return request({
    url: `/admin/${id}`,
    method: 'delete'
  })
}

/**
 * 密码修改
 * @param data
 * @returns {AxiosPromise}
 */
export function modifyPassword(data) {
  return request({
    url: `/admin/modify-password`,
    method: 'patch',
    data
  })
}

/**
 * 角色列表
 * @returns {AxiosPromise}
 */
export function group(params) {
  return request({
    url: `/admin/group`,
    method: 'get',
    params
  })
}

/**
 * 角色列表
 * @returns {AxiosPromise}
 */
export function access(id, params) {
  return request({
    url: `/admin/${id}`,
    method: 'patch',
    params
  })
}
