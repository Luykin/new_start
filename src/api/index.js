import axios from 'axios'
import qs from 'qs'
import {
  PREFIX_URL,
  UAID
} from './config'
import {
  getSign
} from 'common/js/util'

export function login(wx_login_code, super_code) {
  const url = `${PREFIX_URL}/wechat_login`
  let data = {
    uaid: UAID,
    wx_login_code
  }
  if (super_code) {
    Object.assign(data, {
      super_code
    })
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function(res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

export function withdrawlist(user_id, num, page) {
  const url = `${PREFIX_URL}/wechat_withdraw_list`
  let data = {
    uaid: UAID,
    user_id,
    num,
    page
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function(res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

export function withdraw(user_id, score) {
  const url = `${PREFIX_URL}/wechat_withdraw`
  let data = {
    uaid: UAID,
    user_id,
    score
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data)))
    .then(function(res) {
      return Promise.resolve(res)
    })
    .catch(res => {
      return Promise.resolve(res.response.status)
    })
}

export function orders(username, num, page) {
  const url = `${PREFIX_URL}/orders`
  let data = {
    uaid: UAID,
    username,
    num,
    page,
    timestamp: getTime()
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function(res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

export function message() {
  const url = `${PREFIX_URL}/message`
  let data = {
    uaid: UAID,
    timestamp: getTime()
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function(res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

export function addorder(good_id, score, price, username) {
  const url = `${PREFIX_URL}/add_order`
  let data = {
    uaid: UAID,
    timestamp: getTime(),
    good_id,
    score,
    app_version: '1.0.0',
    channel: 'wx',
    pay_type: 'wx',
    price,
    username
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function(res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

export function updateuserinfo(username) {
  const url = `${PREFIX_URL}/update_user_info`
  let data = {
    uaid: UAID,
    username,
    timestamp: getTime()
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function(res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

export function teams(username) {
  const url = `${PREFIX_URL}/teams`
  let data = {
    uaid: UAID,
    username,
    timestamp: getTime()
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function(res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

