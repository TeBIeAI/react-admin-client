import request from '../utils/axios'

export function user_info(params) {
  return request({
    url: '/api/user/userinfo',
    method: 'get',
    params
  })
}

export function getusers(params) {
  return request({
    url: '/api/user/get_users',
    method: 'get',
    params
  })
}

export function updateUser(params) {
  return request({
    url: '/api/user/update_user',
    method: 'post',
    data: params
  })
}

export function getroles(params) {
  return request({
    url: '/api/role/get_roles',
    method: 'get',
    params
  })
}

export function del_user(params) {
  return request({
    url: '/api/user/del_user',
    method: 'delete',
    params
  })
}
