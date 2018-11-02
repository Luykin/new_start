import axios from 'axios'
import qs from 'qs'
import {
  PREFIX_URL,
  UAID
} from './config'
import {
  getTime,
  getSign
} from 'common/js/util'

export function login(nickname, avatar, wx_login_code, super_code) {
  const url = `${PREFIX_URL}/login`
  let data = {
    channel: 'wx',
    uaid: UAID,
    federated: 2,
    app_version: '1.0.0',
    wx_login_code,
    timestamp: getTime()
  }
  if (nickname && avatar) {
    Object.assign(data, {
      nickname,
      avatar
    })
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
    return Promise.resolve(res)
  })
}

export function transaction(direction, username, score) {
  const url = `${PREFIX_URL}/add/transaction`
  let data = {
    uaid: UAID,
    direction,
    username,
    score,
    timestamp: getTime()
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function(res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res)
  })
}

export function transactionlist(username, num, page) {
  const url = `${PREFIX_URL}/transaction_list`
  let data = {
    uaid: UAID,
    username,
    timestamp: getTime()
  }
  if (num && (page || page === 0)) {
    Object.assign(data, {
      num,
      page
    })
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function(res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res)
  })
}

export function goodlist() {
  const url = `${PREFIX_URL}/goods`
  let data = {
    uaid: UAID,
    timestamp: getTime()
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function(res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res)
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
    return Promise.resolve(res)
  })
}

export function withdrawlist(username, num, page) {
  const url = `${PREFIX_URL}/withdraw_list`
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
    return Promise.resolve(res)
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
    return Promise.resolve(res)
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
    return Promise.resolve(res)
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
    return Promise.resolve(res)
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
    return Promise.resolve(res)
  })
}

export function withdraw(username, score) {
  const url = `${PREFIX_URL}/withdraw`
  let data = {
    uaid: UAID,
    username,
    score,
    timestamp: getTime()
  }
  return axios.post(url, qs.stringify(Object.assign({
      sign: getSign(data)
    }, data)))
    .then(function(res) {
      return Promise.resolve(res)
    })
    .catch(res => {
      return Promise.resolve(res)
    })
}