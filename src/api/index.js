import request from '../utils/axios'

export function login(params) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: params
  })
}
