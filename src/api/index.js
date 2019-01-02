import axios from 'axios'
import qs from 'qs'
import {
  PREFIX_URL,
  UAID,
  CHANNEL
} from './config'
import {
  getSign,
  getTime
} from 'common/js/util'

// export function appinfo() {
//   const url = `${PREFIX_URL}/app_info`
//   let data = {
//     uaid: UAID
//   }
//   return axios.get(url, {
//     params: Object.assign({
//       sign: getSign(data)
//     }, data)
//   }).then(function (res) {
//     return Promise.resolve(res)
//   }).catch(res => {
//     return Promise.resolve(res.response.status)
//   })
// }
//
// export function combos_category() {
//   const url = `${PREFIX_URL}/combos_category`
//   let data = {
//     uaid: UAID
//   }
//   return axios.post(url, qs.stringify(Object.assign({
//     sign: getSign(data)
//   }, data))).then(function (res) {
//     return Promise.resolve(res)
//   }).catch(res => {
//     return Promise.resolve(res.response.status)
//   })
// }

// 悬赏具体类别(抖音粉丝...)
export function pub_task(service_group_id) {
  const url = `${PREFIX_URL}/pub_task`
  let data = {
    uaid: UAID,
    timestamp: getTime(),
    service_group_id
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 登录
export function login(wx_login_code) {
  const url = `${PREFIX_URL}/login`
  let data = {
    uaid: UAID,
    wx_login_code,
    timestamp: getTime(),
    user_channel: CHANNEL
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 发布任务
export function pay_and_pub_task(id, title, task_url, num, single_price, price, score, username) {
  const url = `${PREFIX_URL}/pay_and_pub_task`
  let data = {
    id,
    title,
    task_url,
    num,
    single_price,
    price,
    score,
    username,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}


// 主页
export function home_page(page, num) {
  const url = `${PREFIX_URL}/home_page`
  let data = {
    uaid: UAID,
    timestamp: getTime(),
    page,
    num
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 任务详情
export function task_detail(id, username) {
  const url = `${PREFIX_URL}/task_detail`
  let data = {
    uaid: UAID,
    timestamp: getTime(),
    id,
    username
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 发布列表
export function release_management(username, page, num) {
  const url = `${PREFIX_URL}/release_management`
  let data = {
    uaid: UAID,
    timestamp: getTime(),
    username,
    page,
    num
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}
