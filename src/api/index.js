import axios from 'axios'
import qs from 'qs'
import {
  PREFIX_URL,
  UAID,
  CHANNEL
} from './config'
import {
  getSign
} from 'common/js/util'

export function appinfo() {
  const url = `${PREFIX_URL}/app_info`
  let data = {
    uaid: UAID
  }
  return axios.get(url, {
    params: Object.assign({
      sign: getSign(data)
    }, data)
  }).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

export function combos_category() {
  const url = `${PREFIX_URL}/combos_category`
  let data = {
    uaid: UAID
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

export function getServices(id) {
  const url = `${PREFIX_URL}/services`
  let data = {
    uaid: UAID,
    service_category_id: id
  }
  return axios.get(url, {
    params: Object.assign({
      sign: getSign(data)
    }, data)
  }).then(function (res) {
    return Promise.resolve(res)
  })
}

export function getCombos(categoryid) {
  const url = `${PREFIX_URL}/combos`
  let data = {
    category_id: categoryid,
    uaid: UAID
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data)))
    .then(function (res) {
      return Promise.resolve(res)
    }).catch(res => {
      return Promise.resolve(res.response.status)
    })
}

export function login(wx_login_code, super_code) {
  const url = `${PREFIX_URL}/wechat_login`
  let data = {
    uaid: UAID,
    wx_login_code,
    user_channel: CHANNEL
  }
  if (super_code) {
    Object.assign(data, {
      super_code
    })
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 统一购买服务，包含套餐
export function addtask(family, user_id, point, service_id, price, addition, comment) {
  const url = `${PREFIX_URL}/wechat/add/task`
  let data = {
    family,
    user_id,
    point,
    service_id,
    price,
    addition,
    pay_type: 'wx',
    uaid: UAID
  }
  if (comment) {
    Object.assign(data, {
      comment
    })
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data)))
    .then(function (res) {
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
  }, data))).then(function (res) {
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
    .then(function (res) {
      return Promise.resolve(res)
    })
    .catch(res => {
      return Promise.resolve(res.response.status)
    })
}

export function wechat_agent_good(user_id) {
  const url = `${PREFIX_URL}/wechat_agent_good`
  let data = {
    uaid: UAID,
    user_id,
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data)))
    .then(function (res) {
      return Promise.resolve(res)
    })
    .catch(res => {
      return Promise.resolve(res.response.status)
    })
}

export function orders(user_id, num, page, status) {
  const url = `${PREFIX_URL}/wechat/buy/record`
  let data = {
    uaid: UAID,
    user_id,
    num,
    page
  }
  if (status) {
    Object.assign(data, {
      status
    })
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
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
  }, data))).then(function (res) {
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
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

export function updateuserinfo(user_id) {
  const url = `${PREFIX_URL}/update_user_info`
  let data = {
    uaid: UAID,
    user_id
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

export function teams(user_id) {
  const url = `${PREFIX_URL}/wechat/team/detail`
  let data = {
    uaid: UAID,
    user_id
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

export function wechat_agent_order(user_id, score, good_id) {
  const url = `${PREFIX_URL}/wechat_agent_order`
  let data = {
    uaid: UAID,
    user_id,
    score,
    good_id
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 团队详情
export function get_next_info(user_id, is_agent, num, page) {
  const url = `${PREFIX_URL}/get_next_info`
  let data = {
    uaid: UAID,
    user_id,
    page,
    num,
    is_agent
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

export function refund(user_id, id) {
  const url = `${PREFIX_URL}/wechat/refund/task/order`
  let data = {
    user_id,
    id,
    uaid: UAID
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

export function secret_list(num, page) {
  const url = `${PREFIX_URL}/wechat/soft/article/list`
  let data = {
    num,
    page,
    uaid: UAID
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

export function secret_details(id, user_id) {
  const url = `${PREFIX_URL}/wechat/soft/article/details`
  let data = {
    id,
    user_id,
    uaid: UAID
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve({data: {code: res.response.status}})
  })
}


export function course_list(user_id, page, num) {
  const url = `${PREFIX_URL}/wechat/course_list`
  let data = {
    user_id,
    page,
    num
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve({data: {code: res.response.status}})
  })
}

export function course_detail(id, user_id) {
  const url = `${PREFIX_URL}/wechat/course_detail`
  let data = {
    id,
    user_id
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve({data: {code: res.response.status}})
  })
}

export function course_add_order(id, user_id, price) {
  const url = `${PREFIX_URL}/wechat/course_add_order`
  let data = {
    id,
    price,
    user_id,
    uaid: UAID,
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve({data: {code: res.response.status}})
  })
}
