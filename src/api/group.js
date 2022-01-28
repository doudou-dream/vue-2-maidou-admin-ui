import request from '@/utils/request'

/**
 * 列表
 * @param params
 * @returns {AxiosPromise}
 */
export function list(params) {
  return request({
    url: '/group',
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
    url: '/group',
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
    url: `/group/${id}`,
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
    url: `/group/${id}`,
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
    url: `/group/${id}`,
    method: 'delete'
  })
}

/**
 * 权限列表
 * @returns {AxiosPromise}
 */
export function rule(params) {
  return request({
    url: `/group/rule`,
    method: 'get',
    params
  })
}
/**
 * 权限列表
 * @returns {AxiosPromise}
 */
export function access(id, data) {
  return request({
    url: `/group/${id}`,
    method: 'patch',
    data
  })
}
