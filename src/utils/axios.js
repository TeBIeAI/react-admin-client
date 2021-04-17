import axios from 'axios'
import { getStorage } from '@/utils'

const request = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000
})

request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    getStorage('hc-token') && (config.headers.authorization = getStorage('hc-token'))
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // let loading = document.getElementById('i-loading')
    // if (loading) {
    //   loading.setAttribute('class', 'i-loading-out')
    //   loading.style.display = 'none'
    // }

    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default request
