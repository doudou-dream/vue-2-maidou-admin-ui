import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/login/info',
    method: 'get',
    params: { token }
  })
}

export function logout(id) {
  return request({
    url: `/login/logout/${id}`,
    method: 'delete'
  })
}
